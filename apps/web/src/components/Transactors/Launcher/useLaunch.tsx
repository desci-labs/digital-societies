import { PinataPinResponse } from "@pinata/sdk";
import { useModalContext } from "components/Modal/Modal";
import Error from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { MetadataValues } from "components/Transactors/types";
import { useSetTx } from "context/useTx";
import { getBytesFromCIDString } from "helper";
import { useFactoryContract } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { setOrg } from "services/orgs/orgSlice";
import { Org, PendingOrg } from "services/orgs/types";
import { useContractWrite } from "wagmi";

export default function useLaunch() {
  const { showModal } = useModalContext();
  const { setTx, reset } = useSetTx();
  const factoryContract = useFactoryContract();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: factoryContract.address!,
    contractInterface: factoryContract.interface!,
    functionName: "deployToken",
  });

  async function launch(metadata: MetadataValues) {
    try {
      reset();

      const formdata = new FormData();
      formdata.append("image", metadata.image.name);
      formdata.append("logo", metadata.logo.name);
      formdata.append(metadata.image.name, metadata.image.file);
      formdata.append(metadata.logo.name, metadata.logo.file);

      showModal(Processing, { message: "Pining Metadata to ipfs..." });
      const res = await fetch("/api/pinFileToIpfs", {
        method: "POST",
        body: formdata,
      });
      const [pinnedImageResponse, pinnedLogoResponse] =
        (await res.json()) as PinataPinResponse[];

      const meta = {
        ...metadata,
        image: pinnedImageResponse.IpfsHash,
        logo: pinnedLogoResponse.IpfsHash,
      };
      const metaRes = await fetch("/api/pinJsonToIpfs", {
        method: "POST",
        body: JSON.stringify(meta),
      });
      const pinnedMetadataRes = (await metaRes.json()) as PinataPinResponse;
      const cid = getBytesFromCIDString(pinnedMetadataRes.IpfsHash);

      showModal(Processing, { message: "Confirming transaction..." });

      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [metadata.name, metadata.symbol, cid],
      });
      setTx({ txInfo: tx, message: "Processing transaction" });
      
      const receipt = await tx.wait();
      const address = "0x" + receipt.logs[3].topics?.[1].slice(26);
      const block = await factoryContract.provider.getBlock(receipt.blockNumber)
      const preview: PendingOrg = {
        cid,
        metadata,
        address,
        admin: metadata.issuer,
        revocations: [],
        delegates: [metadata.issuer],
        dateCreated: block.timestamp * 1000,
        pending: true,
      };
      
      dispatch(setOrg(preview))    
      setTx({ txInfo: tx, message: "" });
      showModal(Success, { previewLink: `orgs/${address}` });
    } catch (e: any) {
      console.log("Error ", e?.data?.message, e?.message);
      showModal(Error, { message: "Error processing transaction" });
    }
  }
  return { launch, isLoading, isSuccess };
}
