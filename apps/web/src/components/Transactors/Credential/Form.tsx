import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FileDropzone from "components/FileDropzone";
import { Form, Input, InputRow, Textarea } from "components/Form/Index";
import { useGetOrg } from "services/orgs/hooks";
import { LauncherFormValues, MetadataValues } from "../types";
import ImagePreview from "components/UI/ImagePreview";
import useCredentialForm from "./useCredentialForm";
import { useGetTxStage } from "services/transaction/hooks";
import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";

export default function CredentialForm() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useFormContext<LauncherFormValues>();
  const router = useRouter();
  const { address, id } = router.query;
  const { hideModal } = useModalContext();
  const org = useGetOrg(address as string);
  const { launch, isLoading } = useCredentialForm(
    org?.address!,
    parseInt(id as string)
  );
  const stage = useGetTxStage();
  const image = watch("banner");
  const logo = watch("badge");
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
      description={isUpdateMode ? "update credential" : "Add new credential"}
      className="form"
    >
      <InputRow htmlFor="issuer" label="Issuer:">
        <Input id="issuer" disabled {...register("issuer")} />
      </InputRow>
      <InputRow htmlFor="name" label="Name:">
        <Input
          id="name"
          placeholder="Organisation name (e.g Ethereum foundation)"
          {...register("name")}
        />
      </InputRow>
      <InputRow htmlFor="symbol" label="symbol:">
        <Input
          id="symbol"
          placeholder="Organisation symbol (e.g ETF)"
          {...register("symbol")}
        />
      </InputRow>
      <InputRow htmlFor="description" label="Description:">
        <Textarea
          id="description"
          {...register("description")}
        />
      </InputRow>
      <InputRow htmlFor="external_link" label="External link">
        <ErrorMessage
          errors={errors}
          name="external_link"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <Input
          id="external_link"
          placeholder="website or social media url"
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
        <ImagePreview image={image} />
        <FileDropzone<MetadataValues>
          name="banner"
          className="h-10"
          disabled={isLoading}
          hasError={!!errors.banner}
        />
      </InputRow>
      <InputRow htmlFor="badge" label="badge">
        <ErrorMessage
          errors={errors}
          name="badge"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <ImagePreview
          image={logo}
          className="rounded-full"
          wrapperClassName="w-20 h-20"
        />
        <FileDropzone<MetadataValues>
          name="badge"
          className="h-10"
          disabled={isLoading}
          hasError={!!errors.badge}
        />
      </InputRow>
      <Button
        disabled={canDisable || !isValid}
        className="mt-4 w-full disabled:bg-regent-gray bg-tint-primary-dark"
      >
        {isLoading
          ? stage.message || "submitting..."
          : isUpdateMode
          ? "update credential"
          : "Create Credential"}
      </Button>
    </Form>
  );
}
