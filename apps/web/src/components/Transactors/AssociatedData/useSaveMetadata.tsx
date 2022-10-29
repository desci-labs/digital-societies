import { useDispatch } from "react-redux";
import {  useIsAdminOrDelegate } from "services/orgs/hooks";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { AssociatedDataValues } from "components/Transactors/types";
import { AssociatedDataInsert } from "services/database/Index";

export default function useSaveMetadata(org: string) {
  const dispatch = useDispatch();
  const canUpdate = useIsAdminOrDelegate(org);

  async function save(data: AssociatedDataValues) {
    try {
      if (!canUpdate) throw Error("Not enough permission!!!");
      const { owner, ...metadata } = data;
      const body: AssociatedDataInsert = { metadata, owner, org };
      dispatch(setFormLoading(true))
      const response = await fetch("/api/saveAssociatedMeta", { method: "post", body: JSON.stringify(body) })
      console.log('response', await response.json());
      dispatch(setFormLoading(false))
    } catch (e: any) {
      console.log('e');
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }
  }

  return { save };
}
