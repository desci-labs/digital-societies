import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DelegaterValues } from "../types";
import { delegaterSchema } from "../schema";
import { FC } from "react";

export type Props = JSX.IntrinsicAttributes & { org: string; Form: FC };

export default function Delegater({ org, Form }: Props) {
  if (!org) throw Error("org data is required");

  const methods = useForm<DelegaterValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      org,
      delegate: "",
    },
    resolver: yupResolver(delegaterSchema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
