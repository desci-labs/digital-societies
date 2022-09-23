import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { pinMetadataToIpfs } from "helper/web3";
import { useSBTContractFactory } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { setCredential } from "services/credentials/credentialSlice";
import { PendingCredential } from "services/credentials/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useAccount, useContractWrite } from "wagmi";
import { MetadataValues } from "../types";

export default function useCreateCredential(address: string) {
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);
  const { address: mintedBy } = useAccount();
  const { showModal } = useModalContext();

  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract?.address!,
    contractInterface: tokenContract?.interface!,
    functionName: "mintTokenType",
  });

  async function launch(metadata: MetadataValues) {
    try {

      if (!mintedBy) throw Error("Check wallet connection and try again!!!");

      if (!metadata.banner.ipfsHash && !metadata.banner.file) throw new Error("Please select a banner image to upload");
      if (!metadata.badge.ipfsHash && !metadata.badge.file) throw new Error("Please select a badge icon to upload");

      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Pinning Metadata to IPFS..." });
      
      const cid = await pinMetadataToIpfs(metadata);
      
      updateTx({ step: Step.submit, message: "Confirming transaction..." });
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: cid,
      });

      const typeId = await tokenContract?.totalTypes();

      const credential: PendingCredential = { id: typeId + 1, cid, address, mintedBy, metadata, pending: true, dateCreated: Date.now() };
      dispatch(setCredential({ address, credential }))
      updateTx({ step: Step.broadcast, txHash: tx.hash, message: `Deploying ${metadata.name} credential`, previewLink: { href: `/credentials/${typeId + 1}?address=${address}`, caption: "Preview" } });
      showModal(TransactionPrompt, {});
      await tx.wait();

      dispatch(setFormLoading(false));
      updateTx({ step: Step.success, message: "", txHash: tx.hash, previewLink: { href: `orgs/${address}`, caption: "View" } });
    } catch (e: any) {
      updateTx({ step: Step.error, message: "Error processing transaction!!!" });
      dispatch(setFormLoading(false));
      dispatch(setFormError({ title: `Error deploying ${metadata.name}`, details: "" }));
    }

  }
  return { launch, isLoading: form_loading || isLoading, isSuccess };
}
