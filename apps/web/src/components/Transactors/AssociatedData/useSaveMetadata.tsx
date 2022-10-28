import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useDispatch } from "react-redux";
import { useGetOrg } from "services/orgs/hooks";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { AssociatedDataValues } from "components/Transactors/types";

export default function useSaveMetadata(address: string) {
  const { showModal } = useModalContext();
  const dispatch = useDispatch();
  const org = useGetOrg(address);
  const { form_loading } = useGetTxState();
  

  async function save(metadata: AssociatedDataValues) {
    try {
      
    } catch (e: any) {
     
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }

  }
  return { save, isLoading: form_loading };
}
