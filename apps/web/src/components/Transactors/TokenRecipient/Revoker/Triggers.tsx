import Icon from "components/Icons/Icons";
import useIssuer from "components/Transactors/TokenRecipient/Issuer/useIssuer";
import Button from "components/UI/Button/Index";
import {
  useAddTokenRecipient,
  useGetSelectedTokens,
  useRemoveTokenRecipient,
  useResetTokenRecipients,
} from "services/admin/hooks";
import {
  Attestation,
  AttestationToken,
  PendingAttestation,
} from "services/attestations/types";
import useRevokeToken from "./useRevokeToken";

export function Updater(props: {
  attestation: Attestation | PendingAttestation;
}) {
  const showIssuer = useIssuer(props.attestation);
  return (
    <>
      <Button
        onClick={showIssuer}
        className="flex items-center justify-evenly outline-none px-2 p-1 font-bold bg-primary-hover"
      >
        <Icon type="Plus" className="block" />
        <span className="block capitalize text-sm">Add</span>{" "}
      </Button>
    </>
  );
}

export function RevokerAction() {
  const { revoke, isLoading } = useRevokeToken();

  return (
    <>
      <Button
        onClick={revoke}
        disabled={isLoading}
        className={`flex items-center justify-evenly outline-none px-2 p-1 font-bold bg-states-error disabled:bg-neutrals-gray-4`}
      >
        <span className="block capitalize text-sm">Revoke</span>{" "}
      </Button>
    </>
  );
}

export function ClearSelection() {
  const reset = useResetTokenRecipients();

  return (
    <>
      <Button
        onClick={reset}
        className="flex items-center justify-evenly outline-none px-2 p-1 font-bold bg-primary-hover"
      >
        <span className="block capitalize text-sm">Clear</span>{" "}
      </Button>
    </>
  );
}

export function SelectRecipient(props: {
  isLoading?: boolean;
  token: AttestationToken;
}) {
  const remove = useRemoveTokenRecipient();
  const select = useAddTokenRecipient();
  const recipients = useGetSelectedTokens();
  const tokenRecipient = recipients.find(
    (r) => r.address === props.token.owner
  );

  const onActionClick = () => {
    if (tokenRecipient) {
      remove(tokenRecipient.address);
    } else {
      select({
        address: props.token.owner,
        tokenId: props.token.tokenId,
        is_added: false,
        is_deleted: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onActionClick}
        disabled={props.isLoading}
        className={`bg-transparent bg-white bg-opacity-0`}
      >
        {tokenRecipient && tokenRecipient.is_deleted ? (
          <Icon
            type="Undo"
            size={18}
            className="hover:scale-150 duration-100"
            color={props.isLoading ? "#8793A6" : "#ffffff"}
          />
        ) : (
          <Icon
            type="Close"
            size={18}
            className={`hover:scale-150 duration-100 text-state-error`}
            color={props.isLoading ? "#8793A6" : ""}
          />
        )}
      </Button>
    </>
  );
}
