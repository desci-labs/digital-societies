import { IssuerValues } from "components/Transactors/types";
import { useFormContext } from "react-hook-form";
import {
  useAddTokenRecipient,
  useGetSelectedTokens,
} from "services/admin/hooks";
import { useGetAttestationTokens } from "services/attestations/hooks";

export default function useRecipientAdder() {
  const recipientAdder = useAddTokenRecipient();
  const recipients = useGetSelectedTokens();
  const {
    getValues,
    setError,
    formState: { isValid },
    resetField,
  } = useFormContext<IssuerValues>();
  const existingRecipients = useGetAttestationTokens(
    getValues("org"),
    getValues("attestation")
  );

  async function addRecipient() {
    if (!isValid)
      return setError("address", { message: "Invalid address format" });
    const newRecipient = getValues("address");
    if (!newRecipient) return;

    const existing =
      recipients.find((recipient) => recipient.address === newRecipient) ||
      existingRecipients.find((r) => r.owner === newRecipient);
    if (existing) return setError("address", { message: "Duplicate address" });

    recipientAdder({
      address: newRecipient,
      is_added: true,
      is_deleted: false,
    });
    resetField("address");
  }

  return addRecipient;
}
