import { useModalContext } from "components/Modal/Modal";
import Transactor from "components/Transactors/Transactor";
import { TxProps } from "components/Transactors/types";
import { useCallback } from "react";
import Launcher, { Props } from "../Launcher";
import LaunchForm from "./LaunchForm";

export default function useLauncher() {
  const { showModal } = useModalContext();

  const showLauncher = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      Content: Launcher,
      contentProps: { Form: LaunchForm },
      inModal: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showLauncher;
}
