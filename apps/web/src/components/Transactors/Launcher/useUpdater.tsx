import { useModalContext } from "components/Modal/Modal";
import Transactor, { TxProps } from "components/Transactors/Transactor";
import Popup from "components/UI/Popup/Index";
import { useCallback } from "react";
import { Org, PendingOrg } from "services/orgs/types";
import Launcher, { Props } from "./Launcher";
import UpdateForm from "./UpdateForm";

export default function useUpdater(org: Org | PendingOrg) {
  const { showModal } = useModalContext();

  const showLauncher = useCallback(() => {
    if (!org || !org.metadata) {
      return showModal(Popup, {
        message:
          "Metadata not found, wait for your metadata to be pinned to IPFS before you continue!!!",
      });
    }
    showModal<TxProps<Props>>(Transactor, {
      Content: Launcher,
      contentProps: { Form: UpdateForm, metadata: org.metadata },
      inModal: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showLauncher;
}
