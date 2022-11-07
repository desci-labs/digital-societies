import { useModalContext } from "components/Modal/Modal";
import Transactor from "components/Transactors/Transactor";
import { useCallback } from "react";
import MetadataUpdater from ".";
import { Props } from ".";
import { TxProps } from "../types";
import AssociatedDataForm from "./AssociatedDataForm";

export default function useMetaDetails(address: string, org: string) {
  const { showModal } = useModalContext();

  const openModal = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      Content: MetadataUpdater,
      contentProps: { address, org, Form: AssociatedDataForm },
      inModal: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return openModal;
}
