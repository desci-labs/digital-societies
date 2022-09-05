import FileDropzone from "components/FileDropzone";
import { forwardRef, HTMLProps, PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { MetadataValues } from "./types";
import { ErrorMessage } from "@hookform/error-message";

export default function LaunchForm() {
  const {
    register,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<MetadataValues>();

  return (
    <div className="container mx-auto flex flex-col gap-5">
      <h1 className="text-3xl font-bold mt-5 text-center">Launch Demo</h1>
      <div className="mx-auto flex justify-center w-400">
        <form className="w-full">
          <InputRow
            htmlFor="issuer"
            label="Issuer:"
          >
            <Input id="issuer" value="descilabs.eth" disabled />
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
              disabled={isSubmitting}
              hasError={!!errors.image}
            />
          </InputRow>
          <Button
            disabled={isSubmitting || !isValid}
            className="mt-4 w-full bg-black disabled:bg-regent-gray"
          >
            Deploy
          </Button>
        </form>
      </div>
    </div>
  );
}

type InputRowProps = PropsWithChildren<{ htmlFor: string; label?: string; className?: string }>;

function InputRow(props: InputRowProps) {
  return (
    <label
      className={`block flex flex-col gap-2 items-start mt-5 ${
        props.className ?? ""
      }`}
      htmlFor={props.htmlFor}
    >
      {props.label && <LabelText text={props.label} />}
      {props.children}
    </label>
  );
}

function Button(props: HTMLProps<HTMLButtonElement>) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`tracking-wide text-lg text-white rounded-lg w-32 py-1.5 px-4 enabled:bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient ${
        props.className ?? props.className
      } `}
    >
      {props.children}
    </button>
  );
}

const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className="py-1.5 px-4 w-full rounded-xl border-2 focus:border-cornflower-blue my-1 outline-none"
        {...props}
      />
    );
  }
);

function LabelText({ text }: { text: string }) {
  return <span className="text-lg cursor-pointer font-semibold">{text}</span>;
}
