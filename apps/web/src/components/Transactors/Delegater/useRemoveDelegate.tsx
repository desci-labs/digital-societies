import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { DELEGATE_ROLE } from "constants/roles";
import { maskAddress } from "helper";
import { useTokenContract } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { CustomDataError } from "services/api/types";
import { addDelegate, removeDelegate } from "services/orgs/orgSlice";
import { useGetTxState } from "services/transaction/hooks";
import { setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";

export default function useRemoveDelegate(address: string) {
  const { showModal } = useModalContext();
  const { updateTx } = useTxUpdator();
  const getContract = useTokenContract();
  const tokenContract = getContract(address);
  const dispatch = useDispatch();
  const { form_loading } = useGetTxState();

  async function revoke(delegate: string) {
    if (!tokenContract) return;
    try {
      dispatch(setFormLoading(true));
      showModal(TransactionPrompt, {});
      updateTx({ step: Step.submit, message: "Confirming transaction..." });
      const tx = await tokenContract.revokeRole(DELEGATE_ROLE, delegate);

      dispatch(removeDelegate({ org: address, delegate: delegate }));
      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: "Revoking role...",
      });
      await tx.wait();
      updateTx({
        step: Step.success,
        txHash: tx.hash,
        message: `Role revoked for ${maskAddress(delegate.toLowerCase())}`,
      });
      dispatch(setFormLoading(false));
    } catch (err: unknown) {
      const e = err as CustomDataError;
      console.log("Error ", e?.data?.message, e?.message);
      dispatch(setFormLoading(false));
      dispatch(addDelegate({ org: address, delegate: delegate }));
      updateTx({
        step: Step.error,
        message: `Error revoking role for ${maskAddress(
          delegate.toLowerCase()
        )}`,
      });
    }
  }
  return { revoke, isLoading: form_loading };
}
