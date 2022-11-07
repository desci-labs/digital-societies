import { useDispatch } from "react-redux";
import { useIsAdminOrDelegate } from "services/orgs/hooks";
import {
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { AssociatedDataInsert, AssociatedDataUpdate } from "services/api/types";
import {
  defaultErrorMsg,
  useSaveMetadataMutation,
} from "services/api/associatedMetadata";
import { useState } from "react";
import { useModalContext } from "components/Modal/Modal";
import Success from "components/ModalViews/Success";

export default function useHandleUpdate(org: string) {
  const dispatch = useDispatch();
  const canUpdate = useIsAdminOrDelegate(org);
  const [saveMetadata, { isLoading }] = useSaveMetadataMutation();
  const [error, setError] = useState("");
  const { showModal } = useModalContext();

  async function save(data: AssociatedDataUpdate) {
    try {
      if (!canUpdate) throw Error("Not enough permission!!!");
      const body: AssociatedDataInsert = data;
      dispatch(setFormLoading(true));
      const response = await saveMetadata(body);
      dispatch(setFormLoading(false));
      if ("error" in response) {
        const err = (response.error as Error).message;
        setError(err ?? defaultErrorMsg);
      } else {
        showModal(Success, { message: "Saved successfully 🎉" });
      }
    } catch (error: unknown) {
      dispatch(setFormError("We encountered an error saving the metadata"));
      dispatch(setFormLoading(false));
    }
  }
  return { save, isLoading, error };
}
