import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { DELEGATE_ROLE } from "constants/roles";
import { useTokenContract } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { addDelegate, removeDelegate } from "services/orgs/reducer";
import { useGetOrg } from "services/orgs/hooks";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/reducer";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { DelegaterValues } from "../types";
import { CustomDataError } from "services/api/types";

export default function useGrantRole(address: string) {
  const { showModal } = useModalContext();
  const dispatch = useDispatch();
  const org = useGetOrg(address);
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  const getContract = useTokenContract();
  const tokenContract = getContract(address);

  async function grantRole(metadata: DelegaterValues) {
    try {
      if (!tokenContract) return;

      if (org?.delegates?.includes(metadata.delegate)) return;
      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Confirm transaction..." });

      const tx = await tokenContract.grantRole(
        DELEGATE_ROLE,
        metadata.delegate
      );

      showModal(TransactionPrompt, {});
      dispatch(addDelegate({ org: address, delegate: metadata.delegate }));
      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: "Adding delegate...",
      });

      await tx.wait();

      dispatch(setFormLoading(false));
      updateTx({ step: Step.success, txHash: tx.hash, message: "" });
    } catch (err: unknown) {
      const e = err as CustomDataError;
      dispatch(setFormLoading(false));
      dispatch(removeDelegate({ org: address, delegate: metadata.delegate }));
      updateTx({
        step: Step.error,
        message: "An error occured while adding delegate",
      });
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }
  }
  return { grantRole, isLoading: form_loading };
}
