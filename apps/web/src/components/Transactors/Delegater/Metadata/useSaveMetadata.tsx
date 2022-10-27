import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { DELEGATE_ROLE } from "constants/roles";
import { useTokenContract } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { addDelegate, removeDelegate } from "services/orgs/orgSlice";
import { useGetOrg } from "services/orgs/hooks";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { MetadataUpdaterValues } from "components/Transactors/types";

export default function useSaveMetadata(address: string) {
  const { showModal } = useModalContext();
  const dispatch = useDispatch();
  const org = useGetOrg(address);
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  

  async function grantRole(metadata: MetadataUpdaterValues) {
    try {
      
    } catch (e: any) {
     
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }

  }
  return { grantRole, isLoading: form_loading };
}
