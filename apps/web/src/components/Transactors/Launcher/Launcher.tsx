import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccount } from "wagmi";
import { MetadataValues } from "../types";
import { metadataSchema } from "../schema";
import { FC } from "react";

export type Props = { Form: FC }

export default function Launcher(props: Props) {
  const { address } = useAccount();

  const methods = useForm<MetadataValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: "Ethereum foundation",
      issuer: address,
      symbol: 'ETF',
      description: "2022 Merge Contributor",
      image: {},
      logo: {},
      external_link: "https://ethereum.org",
    },
    resolver: yupResolver(metadataSchema),
  });

  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
