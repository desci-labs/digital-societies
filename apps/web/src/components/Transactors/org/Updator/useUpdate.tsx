import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { MetadataValues } from "components/Transactors/types";
import { pinMetadataToIpfs } from "helper/web3";
import { useTokenContract } from "hooks/useContract";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetOrg } from "services/orgs/hooks";
import { setOrg } from "services/orgs/orgSlice";
import { PendingOrg } from "services/orgs/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useContractWrite } from "wagmi";

export default function useUpdate(address: string) {
  const org = useGetOrg(address)
  const { showModal } = useModalContext();
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  const getContract = useTokenContract();
  const tokenContract = getContract(address);
  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract?.address!,
    contractInterface: tokenContract?.interface!,
    functionName: "setContractURI",
  });

  useEffect(() => () => { dispatch(setFormError(null)) });

  async function run(metadata: MetadataValues) {
    try {
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Pinning Metadata to IPFS..." });
      showModal(TransactionPrompt, {});

      const cid = await pinMetadataToIpfs(metadata);

      updateTx({ step: Step.submit, message: "Confirm transaction..." });

      const preview = {
        ...org,
        cid,
        metadata,
      } as PendingOrg;

      dispatch(setOrg(preview));

      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: cid,
      });
      updateTx({ step: Step.broadcast, txHash: tx.hash, message: `Updating ${metadata.name}` });
      await tx.wait();
      updateTx({ step: Step.success, message: "", txHash: tx.hash });
      dispatch(setFormLoading(false));
    } catch (e: any) {
      dispatch(setOrg(org!));
      updateTx({ step: Step.error, message: "Error updating metadata!!!" });
      dispatch(setFormLoading(false));
      dispatch(setFormError({ title: `Error updating ${metadata.name}` }));
    }
  }
  return { run, isLoading: form_loading || isLoading, isSuccess };
}
