import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FileDropzone from "components/FileDropzone";
import { Form, Input, InputRow, SelectInput, Textarea } from "components/Form/Index";
import { useGetOrg } from "services/orgs/hooks";
import { AttestationFormValues, MetadataValues } from "../types";
import ImagePreview from "components/UI/ImagePreview";
import useAttestationForm from "./useAttestationForm";
import { useGetTxStage } from "services/transaction/hooks";
import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";
import { attestationTypes } from "../constants";

export default function AttestationForm() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useFormContext<AttestationFormValues>();
  const router = useRouter();
  const { address, id } = router.query;
  const { hideModal } = useModalContext();
  const org = useGetOrg(address as string);
  const { launch, isLoading } = useAttestationForm(
    org?.address!,
    parseInt(id as string)
  );
  const stage = useGetTxStage();
  const banner = watch("banner");
  const logo = watch("image");
  const mode = watch("mode");
  const isUpdateMode = mode === "update";

  const canDisable = useMemo(
    () => !isDirty || isLoading,
    [isDirty, isLoading]
  );

  useEffect(() => {
    if (isUpdateMode && !id) {
      hideModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isUpdateMode]);

  
  return (
    <Form
      onSubmit={handleSubmit(launch)}
      title={org?.metadata.name}
      description={isUpdateMode ? "update attestation" : "Add new attestation"}
      className="form"
    >
      <InputRow htmlFor="issuer" label="Issuer:">
        <Input id="issuer" disabled {...register("issuer")} />
      </InputRow>
      <InputRow
        htmlFor="attestationType"
        label="Attestation type"
        className="text-sm"
      >
        <SelectInput
          options={attestationTypes as unknown as string[]}
          getOptionLabel={(data) => data}
          getOptionValue={(data) => data}
          {...register("attestationType")}
          className="mb-0 outline-none"
        />
      </InputRow>
      <InputRow htmlFor="name" label="Name:">
        <Input
          id="name"
          placeholder="Organisation name (e.g Ethereum foundation)"
          {...register("name")}
        />
      </InputRow>
      <InputRow htmlFor="acronym" label="acronym:">
        <Input
          id="acronym"
          placeholder="Acronym"
          {...register("acronym")}
        />
      </InputRow>
      <InputRow htmlFor="description" label="Description:">
        <Textarea
          id="description"
          {...register("description")}
        />
      </InputRow>
      <InputRow htmlFor="external_link" label="Link to role specification">
        <ErrorMessage
          errors={errors}
          name="external_link"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <Input
          id="external_link"
          placeholder="Link to role specification"
          {...register("external_link")}
        />
      </InputRow>
      <InputRow htmlFor="banner" label="Banner">
        <ErrorMessage
          errors={errors}
          name="banner"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <ImagePreview image={banner} className="rounded-xl" wrapperClassName="h-32" />
        <FileDropzone<MetadataValues>
          name="banner"
          className="h-10"
          disabled={isLoading}
          hasError={!!errors.banner}
        />
      </InputRow>
      <InputRow htmlFor="image" label="SBT badge image">
        <ErrorMessage
          errors={errors}
          name="image"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <ImagePreview
          image={logo}
          className="rounded-full"
          wrapperClassName="w-16 h-16"
        />
        <FileDropzone<MetadataValues>
          name="image"
          className="h-10"
          disabled={isLoading}
          hasError={!!errors.image}
        />
      </InputRow>
      <Button
        disabled={canDisable || !isValid}
        className="mt-4 w-full disabled:bg-regent-gray bg-tint-primary-dark"
      >
        {isLoading
          ? stage.message || "submitting..."
          : isUpdateMode
          ? "update attestation"
          : "Create attestation"}
      </Button>
    </Form>
  );
}
