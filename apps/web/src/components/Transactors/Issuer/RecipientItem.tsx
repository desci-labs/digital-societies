import { AttestationTokenRecipient } from "services/admin/types";
import { CgUndo, CgClose } from "react-icons/cg";
import {
  useRemoveTokenRecipient,
  useToggleDeleteRecipient,
} from "services/admin/hooks";
import AddressCopier from "components/Copier/AddressCopier";
import { FaEthereum } from "react-icons/fa";

export default function RecipientItem(props: {
  recipient: AttestationTokenRecipient;
}) {
  const undoAddRecipient = useRemoveTokenRecipient();
  const toggleDeleteRecipient = useToggleDeleteRecipient();

  const onActionClick = () => {
    if (props.recipient.is_added) {
      undoAddRecipient(props.recipient.address);
    } else {
      toggleDeleteRecipient(props.recipient.address);
    }
  };
  return (
    <li
      className={`flex gap-1 items-center justify-between p-2 w-full bg-opacity-20 ${props.recipient.is_added ? "bg-states-success" : ""
        } ${props.recipient.is_deleted ? "bg-states-error" : ""}`}
    >
      <div className="flex gap-2">
        <FaEthereum />
        <span
          className={`text-sm ${props.recipient.is_deleted && "line-through"}`}
        >
          <AddressCopier address={props.recipient.address} shorten={false} />
        </span>
      </div>
      {/* <AddressCopier address={props.recipient.address} /> */}
      <button onClick={onActionClick}>
        {props.recipient.is_added || props.recipient.is_deleted ? (
          <CgUndo size={18} />
        ) : (
            <CgClose size={18} />
        )}
      </button>
    </li>
  );
}
