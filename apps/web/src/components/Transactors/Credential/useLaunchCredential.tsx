import { useModalContext } from "components/Modal/Modal";
import { useCallback } from "react";
import Transactor, { TxProps } from "../Transactor";
import Launcher, { Props } from "./index";
import CredentialForm from "./Form";
import { Org, PendingOrg } from "services/orgs/types";
import { LaunchMode } from "../types";

export default function useLaunchCredential(org: Org | PendingOrg, mode: LaunchMode = "create") {
  const { showModal } = useModalContext();

  const showLauncher = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      Content: Launcher,
      contentProps: { org, mode, Form: CredentialForm },
      inModal: true,
    });
  }, [org, showModal, mode]);

  return showLauncher;
}
