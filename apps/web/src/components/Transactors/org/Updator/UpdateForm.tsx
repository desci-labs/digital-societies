import FileDropzone from "components/FileDropzone";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Form, Input, InputRow, Textarea } from "components/Form/Index";
import { MetadataValues } from "../../types";
import ImagePreview from "components/UI/ImagePreview";
import useUpdate from "./useUpdate";
import { useRouter } from "next/router";
import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";

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

  const image = watch('banner');
  const badge = watch('image');
  
  const canDisable = useMemo(() => !isDirty || isSubmitting || isLoading, [isDirty, isSubmitting, isLoading])

  useEffect(() => {
    if (!address) {
      hideModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [address])


  return (
    <Form onSubmit={handleSubmit(run)} title="Update Organisation" className="form">
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
      <InputRow htmlFor="symbol" label="Symbol">
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
        <Textarea
          id="description"
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
        <ImagePreview image={image} className="rounded-xl" wrapperClassName="h-32" />
        <FileDropzone<MetadataValues>
          name="banner"
          className="h-10"
          disabled={isLoading}
          hasError={!!errors.banner}
        />
      </InputRow>
      <InputRow
        htmlFor="image"
        label="Logo"
      >
        <ErrorMessage errors={errors} name="image" as="span" className="text-xs text-left text-red-400 font-semibold m-0" />
        <ImagePreview image={badge} className="rounded-full" wrapperClassName="w-16 h-16" />
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
        { isLoading ? "submitting..." : "Update Organisation"}
      </Button>
    </Form>
  );
}
