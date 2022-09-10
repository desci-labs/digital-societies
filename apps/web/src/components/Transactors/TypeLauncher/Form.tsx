import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FileDropzone from "components/FileDropzone";
import { Button, Input, InputRow } from "components/Form/Index";
import { useGetOrg } from "context/Factory/FactoryContext";
import { FileObject } from "components/FileDropzone/types";
import { resolveIpfsURL } from "helper";
import useCreateType from "./useCreateType";
import { MetadataValues } from "../types";

export default function LaunchForm() {
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
  const { launch, isLoading, isSuccess } = useCreateType(org?.address!);
  const imageVal = watch('image');
  
  const canDisable = useMemo(() => isSubmitting || isLoading || isSuccess, [isSubmitting, isLoading, isSuccess])

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);


  return (
    <div className="container mx-auto flex flex-col gap-5 border border-black py-8 max-w-500">
      <h1 className="text-3xl font-bold mt-5 text-center">{org?.metadata.name}</h1>
      <span className="text-lg text-center font-semibold">Add a new credential type</span>
      <div className="mx-auto flex justify-center w-120">
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
            htmlFor="image"
            label="Image"
          >
            <ErrorMessage errors={errors} name="image" as="span" className="text-xs text-left text-red-400 font-semibold m-0" />
            <ImagePreview image={imageVal} />
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

function ImagePreview({ image }: { image: FileObject }) {
  const url = image.ipfsHash ? resolveIpfsURL(image.ipfsHash) : image.file ? window.URL.createObjectURL(image.file) : "";
  
  useEffect(() => {
    return () => {
      if (url.includes(window.location.origin)) {
        window.URL.revokeObjectURL(url)
      }
    }
  }, [url]);
  
  if (!url) return null;

  return (
    <div className="w-full h-100 relative">
      <Image
        alt="preview"
        src={url}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
}