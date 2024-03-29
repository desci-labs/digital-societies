import FileDropzone from "components/FileDropzone";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Form, Input, InputRow } from "components/Form/Index";
import { MetadataValues } from "../../types";
import ImagePreview from "components/UI/ImagePreview";
import useUpdate from "./useUpdate";
import { useRouter } from "next/router";
import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";
import RichTextEditor from "components/RichTextEditor/RichTextEditor";

export default function UpdateForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting, isValid, errors },
  } = useFormContext<MetadataValues>();
  const router = useRouter();
  const { address } = router.query;
  const { hideModal } = useModalContext();
  const { run, isLoading } = useUpdate(address as string);

  const image = watch("banner");
  const badge = watch("image");

  const canDisable = useMemo(
    () => !isDirty || isSubmitting || isLoading,
    [isDirty, isSubmitting, isLoading]
  );

  useEffect(() => {
    if (!address) {
      hideModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Form
      onSubmit={handleSubmit(run)}
      title="Update Organisation"
      className="form"
    >
      <InputRow label="name" labelText="Name:">
        <Input
          id="name"
          placeholder="Organisation name (e.g Ethereum foundation)"
          {...register("name")}
        />
      </InputRow>
      <InputRow label="symbol" labelText="Symbol">
        <Input
          id="symbol"
          placeholder="Organisation symbol (e.g ETF)"
          {...register("symbol")}
        />
      </InputRow>
      <InputRow label="description" labelText="Description">
        <RichTextEditor {...register("properties.description")} />
      </InputRow>
      <InputRow label="external_link" labelText="External link">
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
      <InputRow labelText="Banner">
        <ErrorMessage
          errors={errors}
          name="banner"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <ImagePreview
          image={image}
          className="rounded-xl"
          wrapperClassName="h-32"
        />
        <FileDropzone<MetadataValues>
          name="banner"
          className="h-10"
          disabled={isLoading}
          hasError={!!errors.banner}
        />
      </InputRow>
      <InputRow labelText="Logo">
        <ErrorMessage
          errors={errors}
          name="image"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <ImagePreview
          image={badge}
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
        className="mt-4 w-full bg-tint-primary-dark disabled:bg-regent-gray"
      >
        {isLoading ? "submitting..." : "Update Organisation"}
      </Button>
    </Form>
  );
}
