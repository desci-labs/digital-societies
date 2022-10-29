import { useDispatch } from "react-redux";
import {  useIsAdminOrDelegate } from "services/orgs/hooks";
import { setFormError, setFormLoading } from "services/transaction/transactionSlice";
import { AssociatedDataValues } from "components/Transactors/types";
import { AssociatedDataInsert } from "services/api/types";
import { useSaveMetadataMutation } from "services/api/associatedMetadata";

export default function useHandleUpdate(org: string) {
  const dispatch = useDispatch();
  const canUpdate = useIsAdminOrDelegate(org);
  const [saveMetadata, { isLoading, isSuccess }] = useSaveMetadataMutation();

  async function save(data: AssociatedDataValues) {
    try {
      if (!canUpdate) throw Error("Not enough permission!!!");
      const { owner, ...metadata } = data;
      const body: AssociatedDataInsert = { metadata, owner, org };
      dispatch(setFormLoading(true))
      // const response = await fetch("/api/saveAssociatedMeta", { method: "post", body: JSON.stringify(body) })
      const response = await saveMetadata(body);
      console.log('response', response);
      dispatch(setFormLoading(false))
    } catch (e: any) {
      console.log('e', e);
      dispatch(setFormLoading(false));
      dispatch(setFormError(e?.data?.message ?? e?.message));
    }
  }

  return { save };
}
