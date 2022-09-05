import { FormProvider, useForm } from "react-hook-form";
import { metadataSchema, MetadataValues } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import LaunchForm from "./LaunchForm";

export default function Launcher() {
  const methods = useForm<MetadataValues>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: "Ethereum foundation",
      description: "2022 Merge Contributor",
      image: "",
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
