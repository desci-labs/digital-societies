import { AttestationTokenRecipient } from "services/admin/types";
import {
  useRemoveTokenRecipient,
  useToggleDeleteRecipient,
} from "services/admin/hooks";
import AddressCopier from "components/Copier/AddressCopier";
import { FormEvent } from "react";
import Icon from "components/Icons/Icons";

export default function RecipientItem(props: {
  recipient: AttestationTokenRecipient;
}) {
  const undoAddRecipient = useRemoveTokenRecipient();
  const toggleDeleteRecipient = useToggleDeleteRecipient();

  const onActionClick = (e: FormEvent) => {
    e.preventDefault();
    if (props.recipient.is_added) {
      undoAddRecipient(props.recipient.address);
    } else {
      toggleDeleteRecipient(props.recipient.address);
    }
  };
  return (
    <li
      className={`flex gap-1 items-center justify-between p-2 w-full bg-opacity-20 ${
        props.recipient.is_added ? "bg-states-success" : ""
      } ${props.recipient.is_deleted ? "bg-states-error" : ""}`}
    >
      <div className="flex gap-2">
        <Icon type="Ethereum" />
        <span
          className={`text-sm ${props.recipient.is_deleted && "line-through"}`}
        >
          <AddressCopier address={props.recipient.address} shorten={false} />
        </span>
      </div>
      <button onClick={onActionClick}>
        {props.recipient.is_added || props.recipient.is_deleted ? (
          <Icon type="Undo" size={18} />
        ) : (
            <Icon type="Close" size={18} />
        )}
      </button>
    </li>
  );
}
