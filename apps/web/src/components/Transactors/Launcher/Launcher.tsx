import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LaunchForm from "./LaunchForm";
import { useAccount } from "wagmi";
import { MetadataValues } from "../types";
import { metadataSchema } from "../schema";

export default function Launcher() {
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
      <LaunchForm />
    </FormProvider>
  );
}
