import { useModalContext } from "components/Modal/Modal";
import { Credential } from "context/Credential/CredentialContext";
import { useCallback } from "react";
import Delegater from ".";
import Issuer, { Props } from ".";
import Transactor, { TxProps } from "../Transactor";
import DelegaterForm from "./DelegaterForm";

export default function useDelegater(org: string) {
  const { showModal } = useModalContext();

  const showIssuer = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, { Content: Delegater, contentProps: { org, Form: DelegaterForm }, inModal: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org]);

  return showIssuer;
}