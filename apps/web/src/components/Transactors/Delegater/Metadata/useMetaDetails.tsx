import { useModalContext } from "components/Modal/Modal";
import Transactor, { TxProps } from "components/Transactors/Transactor";
import { useCallback } from "react";
import Delegater from ".";
import { Props } from ".";
import MetadataUpdateForm from "./MetadataUpdateForm";

export default function useMetaDetails(address: string) {
  const { showModal } = useModalContext();

  const showIssuer = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      Content: Delegater,
      contentProps: { address, Form: MetadataUpdateForm },
      inModal: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return showIssuer;
}
