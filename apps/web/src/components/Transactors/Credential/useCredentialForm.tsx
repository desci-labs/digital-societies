import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { pinMetadataToIpfs } from "helper/web3";
import { useSBTContractFactory } from "hooks/useContract";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredential } from "services/credentials/credentialSlice";
import { useGetCredential } from "services/credentials/hooks";
import { PendingCredential } from "services/credentials/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useAccount, useContractWrite } from "wagmi";
import { LauncherFormValues, LaunchMode } from "../types";

type Launcher = (metadata: LauncherFormValues) => Promise<void>;

export default function useCredentialForm(address: string, tokenType?: number) {
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);
  const credential = useGetCredential(address, tokenType!);
  const { address: mintedBy } = useAccount();
  const { showModal } = useModalContext();
  const { watch } = useFormContext<LauncherFormValues>();
  const mode = watch("mode");
  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract?.address!,
    contractInterface: tokenContract?.interface!,
    functionName: mode === "create" ? "mintTokenType" : "updateTypeURI",
  });

  async function launch(metadata: LauncherFormValues) {
    try {
      if (!mintedBy) throw Error("Check wallet connection and try again!!!");

      if (!metadata.banner.ipfsHash && !metadata.banner.file) throw new Error("Please select a banner image to upload");
      if (!metadata.badge.ipfsHash && !metadata.badge.file) throw new Error("Please select a badge icon to upload");

      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Pinning Metadata to IPFS..." });
      
      const { mode, ...meta } = metadata;
      const cid = await pinMetadataToIpfs(meta);

      updateTx({ step: Step.submit, message: "Confirming transaction..." });
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: cid,
      });

      const typeId = await tokenContract?.totalTypes() ?? 0;
      const credential: PendingCredential = { id: typeId + 1, cid, address, mintedBy, metadata: meta, pending: true, dateCreated: Date.now() };
      dispatch(setCredential({ address, credential }))
      const previewLink = `/credentials/${typeId + 1}?address=${address}`;
      updateTx({ step: Step.broadcast, txHash: tx.hash, message: `Deploying ${metadata.name} credential`, previewLink: { href: previewLink, caption: "Preview" } });
      showModal(TransactionPrompt, {});
      await tx.wait();

      dispatch(setFormLoading(false));
      updateTx({ step: Step.success, message: "", txHash: tx.hash, previewLink: { href: previewLink, caption: "View" } });
    } catch (e: any) {
      updateTx({ step: Step.error, message: "Error processing transaction!!!" });
      dispatch(setFormLoading(false));
      dispatch(setFormError({ title: `Error deploying ${metadata.name}`, details: "" }));
    }

  }

  async function update(metadata: LauncherFormValues) {
    
    try {
      if (!mintedBy) throw Error("Check wallet connection and try again!!!");
      if (!tokenType || !credential) throw Error("Check wallet connection and try again!!!");

      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Pinning update to IPFS..." });
      showModal(TransactionPrompt, {});
      
      const { mode, ...meta } = metadata;
      const cid = await pinMetadataToIpfs(meta);
      console.log('cid ', cid);
      const update = { ...credential, cid, metadata: meta, } as PendingCredential;
      dispatch(setCredential({ address, credential: update }))
      
      updateTx({ step: Step.submit, message: "Confirming transaction..." });
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [tokenType, cid],
      });

      updateTx({ step: Step.broadcast, txHash: tx.hash, message: `Updating ${metadata.name}` });
     
      await tx.wait();

      dispatch(setFormLoading(false));
      updateTx({ step: Step.success, message: "", txHash: tx.hash });
    } catch (e: any) {
      dispatch(setCredential({ address, credential: credential! }))
      updateTx({ step: Step.error, message: `Error updating ${metadata.name}` });
      dispatch(setFormLoading(false));
      dispatch(setFormError({ title: `Error updating ${metadata.name}` }));
    }
  }

  const lauchers: Record<LaunchMode, Launcher> = { "create": launch, "update": update }

  return { launch: lauchers[mode], isLoading: form_loading || isLoading, isSuccess };
}