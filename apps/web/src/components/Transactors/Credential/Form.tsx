import { useRouter }  from "next/router";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FileDropzone from "components/FileDropzone";
import { Form, GradientButton, Input, InputRow } from "components/Form/Index";
import { useGetOrg } from "services/orgs/hooks";
import { MetadataValues } from "../types";
import ImagePreview from "components/UI/ImagePreview";
import useCreateCredential from "./useCreateCredential";
import { useGetTxStage } from "services/transaction/hooks";

export default function CredentialForm() {
  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<MetadataValues>();
  const router = useRouter();
  const { address } = router.query;
  const org = useGetOrg(address as string);
  const { launch, isLoading, isSuccess } = useCreateCredential(org?.address!);
  const stage = useGetTxStage();
  const image = watch('banner');
  const logo = watch('badge');

  const canDisable = useMemo(() => isSubmitting || isLoading || isSuccess, [isSubmitting, isLoading, isSuccess])

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);


  return (
    <Form onSubmit={handleSubmit(launch)} title={org?.metadata.name} description="Add new credential">
      <InputRow
        htmlFor="issuer"
        label="Issuer:"
      >
        <Input id="issuer" disabled {...register('issuer')} />
      </InputRow>
      <InputRow
        htmlFor="name"
        label="Name:"
      >
        <Input
          id="name"
          placeholder="Organisation name (e.g Ethereum foundation)"
          {...register("name")}
        />
      </InputRow>
      <InputRow
        htmlFor="symbol"
        label="symbol:"
      >
        <Input
          id="symbol"
          placeholder="Organisation symbol (e.g ETF)"
          {...register("symbol")}
        />
      </InputRow>
      <InputRow
        htmlFor="description"
        label="Description:"
      >
        <textarea
          id="description"
          className="w-full border p-2 rounded-xl"
          {...register("description")}
        />
      </InputRow>
      <InputRow
        htmlFor="external_link"
        label="External link"
      >
        <ErrorMessage errors={errors} name="external_link" as="span" className="text-xs text-left text-red-400 font-semibold m-0" />
        <Input
          id="external_link"
          placeholder="website or social media url"
          {...register("external_link")}
        />
      </InputRow>
      <InputRow
        htmlFor="banner"
        label="Banner"
      >
        <ErrorMessage errors={errors} name="banner" as="span" className="text-xs text-left text-red-400 font-semibold m-0" />
        <ImagePreview image={image} />
        <FileDropzone<MetadataValues>
          name="banner"
          className="h-10"
          disabled={canDisable}
          hasError={!!errors.banner}
        />
      </InputRow>
      <InputRow
        htmlFor="badge"
        label="badge"
      >
        <ErrorMessage errors={errors} name="badge" as="span" className="text-xs text-left text-red-400 font-semibold m-0" />
        <ImagePreview image={logo} className="rounded-full" wrapperClassName="w-20 h-20" />
        <FileDropzone<MetadataValues>
          name="badge"
          className="h-10"
          disabled={canDisable}
          hasError={!!errors.badge}
        />
      </InputRow>
      <GradientButton
        disabled={canDisable || !isValid}
        className="mt-4 w-full bg-black disabled:bg-regent-gray"
      >
        {isLoading ? stage.message || "submitting..." : "Create Credential"}
      </GradientButton>
    </Form>
  );
}
