import { useModalContext } from "components/Modal/Modal";
import { TxProps } from "components/Transactors/types";
import { useCallback } from "react";
import { Attestation, PendingAttestation } from "services/attestations/types";
import Issuer, { Props } from "../TokenRecipientEditor";
import Transactor from "../../Transactor";
import IssuerForm from "./IssuerForm";

export default function useIssuer(
  attestation: Attestation | PendingAttestation
) {
  const { showModal } = useModalContext();
  const showIssuer = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      Content: Issuer,
      contentProps: { attestation, Form: IssuerForm },
      inModal: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showIssuer;
}
