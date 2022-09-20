import { useModalContext } from "components/Modal/Modal";
import ErrorView from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { useSetTx } from "context/useTx";
import { pinMetadataToIpfs } from "helper/web3";
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
      
      if (!metadata.banner.ipfsHash && !metadata.banner.file) throw new Error("Please select a banner image to upload");
      if (!metadata.badge.ipfsHash && !metadata.badge.file) throw new Error("Please select a badge icon to upload");
      
      showModal(Processing, { message: 'Pining Metadata to ipfs...' });
      const cid = await pinMetadataToIpfs(metadata)

      showModal(Processing, { message: 'Confirming transaction...' })
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: cid,
      });
      setTx({ txInfo: tx, message: 'Minting new type...' })
      const typeId = await tokenContract.totalTypes();

      const credential: PendingCredential = { id: typeId + 1, cid, address, mintedBy, metadata, pending: true, dateCreated: Date.now() };
      dispatch(setCredential({ address, credential }))
      showModal(Processing, { message: 'Confirming transaction...', previewLink: `/credentials/${typeId + 1}?address=${address}` })
      await tx.wait();
      
      showModal(Success, { previewLink: `/credentials/${typeId + 1}?address=${address}`, message: '' });
    } catch (e: any) {
      console.log('Error ', e?.data?.message, e?.message);
      showModal(ErrorView, { message: "Error processing transaction", })
    }

  }
  return { launch, isLoading, isSuccess };
}
