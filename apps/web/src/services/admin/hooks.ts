import { useDispatch } from "react-redux";
import { useGetter } from "store/accessors"
import { addRecipient, setRecipients, toggleDeleteExistingRecipient, undoAddRecipient } from "./tokenUpdator";
import { AttestationTokenRecipient } from "./types";

export const useGetTokenRecipients = () => {
  const recipients = useGetter(state => state.admin.tokenRecipients);
  return recipients;
}

export const useSetTokenRecipients = () => {
  const dispatch = useDispatch();
  return (args: AttestationTokenRecipient[]) => dispatch(setRecipients(args));
}

export const useAddTokenRecipients = () => {
  const dispatch = useDispatch();
  return (args: string) => dispatch(addRecipient(args));
}

export const useRemoveTokenRecipient = () => {
  const dispatch = useDispatch();
  return (args: string) => dispatch(undoAddRecipient(args));
}

export const useToggleDeleteRecipient = () => {
  const dispatch = useDispatch();
  return (args: string) => dispatch(toggleDeleteExistingRecipient(args));
}