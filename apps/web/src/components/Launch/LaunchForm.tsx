import FileDropzone from "components/FileDropzone";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { MetadataValues } from "./types";
import { ErrorMessage } from "@hookform/error-message";
import useLaunch from "./useLaunch";
import { Button, Input, InputRow } from "components/Form/Index";

export default function LaunchForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<MetadataValues>();
  const { launch, isLoading, isSuccess } = useLaunch();

  const canDisable = useMemo(() => isSubmitting || isLoading, [isSubmitting, isLoading])

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess]);


  return (
    <div className="container mx-auto flex flex-col gap-5 border border-black py-8 max-w-500">
      <h1 className="text-3xl font-bold mt-5 text-center">Launch Organisation</h1>
      <div className="mx-auto flex justify-center w-400">
        <form className="w-full" onSubmit={handleSubmit(launch)}>
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
            <Input
              id="description"
              placeholder="About org"
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
            htmlFor="image"
            label="Image"
          >
            <ErrorMessage errors={errors} name="image" as="span" className="text-xs text-left text-red-400 font-semibold m-0" />
            <FileDropzone<MetadataValues>
              name="image"
              className="h-10"
              disabled={canDisable}
              hasError={!!errors.image}
            />
          </InputRow>
          <Button
            disabled={canDisable || !isValid}
            className="mt-4 w-full bg-black disabled:bg-regent-gray"
          >
            Deploy
          </Button>
        </form>
      </div>
    </div>
  );
}
