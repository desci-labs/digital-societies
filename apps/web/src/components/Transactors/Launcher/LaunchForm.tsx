import FileDropzone from "components/FileDropzone";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import useLaunch from "./useLaunch";
import { GradientButton, Form, Input, InputRow } from "components/Form/Index";
import { MetadataValues } from "../types";
import ImagePreview from "components/UI/ImagePreview";

export default function LaunchForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<MetadataValues>();
  const { launch, isLoading, isSuccess } = useLaunch();

  const image = watch('banner');
  const badge = watch('badge');
  const canDisable = useMemo(() => isSubmitting || isLoading, [isSubmitting, isLoading])
  console.log('disable ', isSubmitting, isLoading)
  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);


  return (
    <Form onSubmit={handleSubmit(launch)} title="Launch Organisation" className="mb-10 bg-white">
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
          {...register("description")} />
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
        <ImagePreview image={badge} className="rounded-full" wrapperClassName="w-20 h-20" />
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
        Deploy organisation
      </GradientButton>
    </Form>
  );
}
