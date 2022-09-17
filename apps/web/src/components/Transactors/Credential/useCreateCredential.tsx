import { PinataPinResponse } from "@pinata/sdk";
import { useModalContext } from "components/Modal/Modal";
import ErrorView from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { useSetTx } from "context/useTx";
import { BigNumber } from "ethers";
import { getBytesFromCIDString } from "helper";
import { useSBTContractFactory } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { setCredential } from "services/credentials/credentialSlice";
import { PendingCredential } from "services/credentials/types";
import { useAccount, useContractWrite } from "wagmi";
import { MetadataValues } from "../types";

export default function useCreateCredential(address: string) {
  const { showModal } = useModalContext();
  const { setTx, reset } = useSetTx();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);
  const dispatch = useDispatch();
  const { address: mintedBy } = useAccount();

  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract.address!,
    contractInterface: tokenContract.interface!,
    functionName: "mintTokenType",
  });

  async function launch(metadata: MetadataValues) {
    try {
      if (!mintedBy) throw Error("Check wallet connection and try again!!!");
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
      const cid = getBytesFromCIDString(pinnedMetadataRes.IpfsHash)

      showModal(Processing, { message: 'Confirming transaction...' })
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: cid,
      });
      setTx({ txInfo: tx, message: 'Minting new type...' })
      
      const receipt = await tx.wait();
      const block = await tokenContract.provider.getBlock(receipt.blockNumber)
      console.log('receitp ', receipt);
      const id = await tokenContract.totalTypes();
      console.log('receitp ', id);
      const credential: PendingCredential = { id, cid, address, mintedBy, metadata, pending: true, dateCreated: block.timestamp * 1000 };
      
      dispatch(setCredential({ address, credential }))
      showModal(Success, { previewLink: `/credentials/${id}?address=${address}` });
    } catch (e: any) {
      console.log('Error ', e?.data?.message, e?.message);
      showModal(ErrorView, { message: "Error processing transaction", })
    }

  }
  return { launch, isLoading, isSuccess };
}
