import { useModalContext } from "components/Modal/Modal";
import { useCallback } from "react";
import Transactor, { TxProps } from "../Transactor";
import Launcher, { Props } from "./index";
import CredentialForm from "./Form";
import { Org, PendingOrg } from "services/orgs/types";

export default function useLaunchCredential(org: Org | PendingOrg) {
  const { showModal } = useModalContext();

  const showLauncher = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, { Content: Launcher, contentProps: { org, Form: CredentialForm }, inModal: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showLauncher
}