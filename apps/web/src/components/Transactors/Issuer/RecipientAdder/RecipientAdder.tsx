import { Input } from "components/Form/Index";
import Button from "components/UI/Button/Index";
import { useFormContext } from "react-hook-form";
import { IssuerValues } from "../../types";
import useRecipientAdder from "./useRecipientAdder";

export default function RecipientAdder() {
  const { register } = useFormContext<IssuerValues>();
  const addRecipient = useRecipientAdder();
  
  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <Input {...register("address")} />
      <Button className="bg-states-success text-sm" onClick={addRecipient}>
        Add
      </Button>
    </div>
  )
}