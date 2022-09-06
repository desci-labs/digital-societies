import { PinataPinResponse } from "@pinata/sdk";
import { useSetModal } from "components/Modal/Modal";
import Error from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { useSetTx } from "context/useTx";
import { useFactoryContract } from "hooks/useContract";
import { useContractWrite } from "wagmi";
import { MetadataValues } from "./types";

export default function useLaunch() {
  const { showModal } = useSetModal();
  const { setTx, reset } = useSetTx();
  const factoryContract = useFactoryContract();
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: factoryContract.address!,
    contractInterface: factoryContract.interface!,
    functionName: "deployToken",
  });

  async function launch(metadata: MetadataValues) {
    try {
      reset();

      const formdata = new FormData();
      formdata.append("name", metadata.image.name);
      formdata.append(metadata.image.name, metadata.image.file);
      
      showModal(Processing, { message: 'Pining Metadata to ipfs...' })
      const res = await fetch("/api/pinFileToIpfs", {
        method: "POST",
        body: formdata,
      });
      const pinnedImageResponse = (await res.json()) as PinataPinResponse;
      // console.log(pinnedImageResponse);

      const meta = { ...metadata, image: pinnedImageResponse.IpfsHash };
      const metaRes = await fetch("/api/pinJsonToIpfs", {
        method: "POST",
        body: JSON.stringify(meta),
      });
      const pinnedMetadataRes = (await metaRes.json()) as PinataPinResponse;
      // console.log(pinnedMetadataRes);

      showModal(Processing, { message: 'Confirming transaction...' })
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [metadata.name, metadata.symbol],
      });
      setTx({ txInfo: tx, message: 'Processing transaction' })
      await tx.wait();
      showModal(Success, {});
    } catch (e: any) {
      console.log('Error ', e?.data?.message, e?.message);
      showModal(Error, { message: "Error processing transaction", })
    }

  }
  console.log(data, isLoading, isSuccess);
  return { launch, isLoading, isSuccess };
}
