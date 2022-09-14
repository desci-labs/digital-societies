import { PinataPinResponse } from "@pinata/sdk";
import { useModalContext } from "components/Modal/Modal";
import ErrorView from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { useSetTx } from "context/useTx";
import { getBytesFromCIDString } from "helper";
import { useSBTContractFactory } from "hooks/useContract";
import { useContractWrite } from "wagmi";
import { MetadataValues } from "../types";

export default function useCreateType(address: string) {
  const { showModal } = useModalContext();
  const { setTx, reset } = useSetTx();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);

  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract.address!,
    contractInterface: tokenContract.interface!,
    functionName: "mintTokenType",
  });

  async function launch(metadata: MetadataValues) {
    try {
      reset();

      showModal(Processing, { message: 'Pining Metadata to ipfs...' });
      let imageHash: string = metadata.image.ipfsHash,
        logoHash: string = metadata.logo.ipfsHash;

      if (!metadata.image.ipfsHash && !metadata.image.file) throw new Error("Please select an image icon to upload");
      if (!metadata.logo.ipfsHash && !metadata.logo.file) throw new Error("Please select a logo icon to upload");

      if (!metadata.image.ipfsHash) {
        const formdata = new FormData();
        formdata.append("image", metadata.image.name);
        formdata.append(metadata.image.name, metadata.image.file);

        const res = await fetch("/api/pinFileToIpfs", {
          method: "POST",
          body: formdata,
        });
        const [pinnedImageResponse] = (await res.json()) as PinataPinResponse[];
        imageHash = pinnedImageResponse.IpfsHash;
      }

      if (!metadata.logo.ipfsHash) {
        const formdata = new FormData();
        formdata.append("logo", metadata.logo.name);
        formdata.append(metadata.logo.name, metadata.logo.file);
        const res = await fetch("/api/pinFileToIpfs", {
          method: "POST",
          body: formdata,
        });
        const [pinnedImageResponse] = (await res.json()) as PinataPinResponse[];
        logoHash = pinnedImageResponse.IpfsHash;
      }

      const meta = { ...metadata, image: imageHash, logo: logoHash };
      const metaRes = await fetch("/api/pinJsonToIpfs", {
        method: "POST",
        body: JSON.stringify(meta),
      });
      const pinnedMetadataRes = (await metaRes.json()) as PinataPinResponse;
      const metadataHex = getBytesFromCIDString(pinnedMetadataRes.IpfsHash)

      showModal(Processing, { message: 'Confirming transaction...' })
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: metadataHex,
      });
      setTx({ txInfo: tx, message: 'Minting new type...' })
      await tx.wait();
      showModal(Success, { message: 'Credential minted'});
    } catch (e: any) {
      console.log('Error ', e?.data?.message, e?.message);
      showModal(ErrorView, { message: "Error processing transaction", })
    }

  }
  return { launch, isLoading, isSuccess };
}
