import { useModalContext } from "components/Modal/Modal";
import { useCallback } from "react";
import { Credential, PendingCredential } from "services/credentials/types";
import Issuer, { Props } from ".";
import Transactor, { TxProps } from "../Transactor";
import IssuerForm from "./IssuerForm";

export default function useIssuer(credential: Credential | PendingCredential) {
  const { showModal } = useModalContext();

  const showIssuer = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, { Content: Issuer, contentProps: { credential, Form: IssuerForm }, inModal: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showIssuer;
}