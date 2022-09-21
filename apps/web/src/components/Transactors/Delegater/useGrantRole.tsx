import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { DELEGATE_ROLE } from "constants/roles";
import { useSBTContractFactory } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { addDelegate } from "services/orgs/orgSlice";
import { useGetOrg } from "services/orgs/hooks";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useContractWrite } from "wagmi";
import { DelegaterValues } from "../types";

export default function useGrantRole(address: string) {
  const { showModal } = useModalContext();
  const dispatch = useDispatch();
  const org = useGetOrg(address);
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  const getContract = useSBTContractFactory();
  const tokenContract = getContract(address);

  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract.address!,
    contractInterface: tokenContract.interface!,
    functionName: "grantRole",
  });

  async function grantRole(metadata: DelegaterValues) {
    try {
      if (org?.delegates?.includes(metadata.delegate)) return;
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Confirm transaction..." })

      const args = [DELEGATE_ROLE, metadata.delegate]
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: args,
      });

      showModal(TransactionPrompt, {});
      dispatch(addDelegate({ org: address, delegate: metadata.delegate }))
      updateTx({ step: Step.broadcast, txHash: tx.hash, message: "Adding delegate..." })

      await tx.wait();

      dispatch(setFormLoading(false));
      updateTx({ step: Step.success, txHash: tx.hash, message: "" })
    } catch (e: any) {
      dispatch(setFormLoading(false));
      console.log('Error ', e?.data?.message, e?.message);
      updateTx({ step: Step.error, message: "An error occured while adding delegate" });
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }

  }
  return { grantRole, isLoading: isLoading || form_loading, isSuccess };
}
