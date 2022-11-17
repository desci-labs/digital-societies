import { useDispatch } from "react-redux";
import { useGetter } from "store/accessors";
import {
  addRecipient,
  setRecipients,
  toggleDeleteExistingRecipient,
  undoAddRecipient,
} from "./reducer";
import { AttestationTokenRecipient } from "./types";

export const useGetSelectedTokens = () => {
  const recipients = useGetter((state) => state.admin.tokenRecipients);
  return recipients;
};

export const useSetTokenRecipients = () => {
  const dispatch = useDispatch();
  return (args: AttestationTokenRecipient[]) => dispatch(setRecipients(args));
};

export const useResetTokenRecipients = () => {
  const dispatch = useDispatch();
  return () => dispatch(setRecipients([]));
};

export const useAddTokenRecipient = () => {
  const dispatch = useDispatch();
  return (args: AttestationTokenRecipient) => dispatch(addRecipient(args));
};

export const useRemoveTokenRecipient = () => {
  const dispatch = useDispatch();
  return (args: string) => dispatch(undoAddRecipient(args));
};

export const useToggleDeleteRecipient = () => {
  const dispatch = useDispatch();
  return (args: string) => dispatch(toggleDeleteExistingRecipient(args));
};
