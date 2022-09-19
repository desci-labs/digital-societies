import { useModalContext } from "components/Modal/Modal";
import Error from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { MetadataValues } from "components/Transactors/types";
import { useSetTx } from "context/useTx";
import { utils } from "ethers";
import { pinMetadataToIpfs } from "helper/web3";
import { useFactoryContract } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { setOrg } from "services/orgs/orgSlice";
import { PendingOrg } from "services/orgs/types";
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
      showModal(Processing, { message: "Pining Metadata to ipfs..." });
      const cid =  await pinMetadataToIpfs(metadata);
      showModal(Processing, { message: `Deploying ${metadata.name}...` });

      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [metadata.name, metadata.symbol, cid],
      });
      setTx({ txInfo: tx, message: "Processing transaction" });
      
      const receipt = await tx.wait();
      const address = utils.getAddress("0x" + receipt.logs[3].topics?.[1].slice(26));
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

      dispatch(setOrg(preview));
      setTx({ txInfo: tx, message: "" });
      reset();
      showModal(Success, { previewLink: `orgs/${address}` });
    } catch (e: any) {
      console.log("Error ", e?.data?.message, e?.message);
      showModal(Error, { message: "Error processing transaction" });
    }
  }
  return { launch, isLoading, isSuccess };
}
