import { useModalContext } from "components/Modal/Modal";
import { useCallback } from "react";
import Transactor from "../Transactor";
import { Org, PendingOrg } from "services/orgs/types";
import { LaunchMode, TxProps } from "../types";
import AttestationPrompt, { Props } from "./AttestationPrompt";

export default function useCredenter(
  org?: Org | PendingOrg,
  mode: LaunchMode = "create"
) {
  const { showModal } = useModalContext();

  const showLauncher = useCallback(() => {
    if (!org) return;
    showModal<TxProps<Props>>(Transactor, {
      Content: AttestationPrompt,
      contentProps: { org, mode },
      inModal: true,
    });
  }, [org, showModal, mode]);

  return showLauncher;
}
