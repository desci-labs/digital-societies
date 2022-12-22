import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FileDropzone from "components/FileDropzone";
import {
  Form,
  Input,
  InputGrid,
  InputRow,
  RadioInput,
  SelectInput,
} from "components/Form/Index";
import { useGetOrg, useIsAdmin } from "services/orgs/hooks";
import { AttestationFormValues, MetadataValues } from "../types";
import ImagePreview from "components/UI/ImagePreview";
import useAttestationForm from "./useAttestationForm";
import { useGetTxStage } from "services/transaction/hooks";
import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";
import { attestationTypes } from "../constants";
import { useSetFormView } from "context/useFormView";
import RichTextEditor from "components/RichTextEditor/RichTextEditor";
import Icon from "components/Icons/Icons";
import { Alert, Tooltip } from "flowbite-react";

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
    address as string,
    id as string
  );
  const stage = useGetTxStage();
  const logo = watch("image");
  const mode = watch("mode");
  const attestationType = watch("attestationType");
  const isUpdateMode = mode === "update";
  const { setView } = useSetFormView();
  const isAdmin = useIsAdmin(address as string);

  const canDisable = useMemo(() => !isDirty || isLoading, [isDirty, isLoading]);
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
      <div className="flex justify-end items-center w-full">
        <Button
          type="button"
          onClick={() => setView("preview")}
          className="app-text border border-neutrals-gray-6 hover:bg-tint-primary-dark hover:border-tint-primary-dark hover:text-white "
        >
          Preview {">>"}{" "}
        </Button>
      </div>
      <InputRow
        label="attestationType"
        labelText="Attestation type"
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
      <InputRow label="name" labelText="Name">
        <Input
          id="name"
          placeholder="Organisation name (e.g Ethereum foundation)"
          {...register("name")}
        />
      </InputRow>
      <InputRow label="description" labelText="Description">
        <RichTextEditor {...register("properties.description")} />
      </InputRow>
      <InputRow label="external_link" labelText={`Link to ${attestationType}`}>
        <ErrorMessage
          errors={errors}
          name="external_link"
          as="span"
          className="text-xs text-left text-red-400 font-semibold m-0"
        />
        <Input
          id="external_link"
          placeholder={`Link to ${attestationType}`}
          {...register("external_link")}
        />
      </InputRow>
      <InputRow labelText="SBT badge image">
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
      {mode === "create" && isAdmin && <AttestationPermission />}
      <Button
        disabled={canDisable || !isValid}
        type="submit"
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

const AttestationPermission = () => {
  const { watch, register } = useFormContext<AttestationFormValues>();
  const isDelegate = watch("isDelegateRole");

  return (
    <InputRow
      labelText="Select Attestation Permission"
      className="text-sm mb-5"
    >
      {isDelegate === "true" && <DelegateWarning />}
      <InputGrid className="mt-0">
        <RadioInput
          value="false"
          id="isDelegateRole-false"
          title="Regular"
          subTitle="Holders have no admin privileges"
          Icon={<Icon type="CheckCircle" size={30} />}
          {...register("isDelegateRole")}
        />
        <div className="delegate-tooltip">
          <Tooltip
            content="The recipients of this attestation can mint or revoke SBTs"
            trigger="hover"
            style="auto"
          >
            <RadioInput
              value="true"
              id="isDelegateRole-true"
              title="Admin"
              subTitle="holders get admin privileges"
              {...register("isDelegateRole")}
              Icon={<Icon type="Admin" size={30} />}
            />
          </Tooltip>
        </div>
      </InputGrid>
    </InputRow>
  );
};

const DelegateWarning = () => (
  <Alert color="warning">
    <div className="flex items-center justify-between gap-5">
      <Icon type="Warning" size={60} className="font-bold w-32" />
      <span className="block">
        You are about to delegate certain admin rights. the owner of this SBT
        will be granted permission to mint, revoke, edit, and define SBTs types
        of behalf of the organisation.{" "}
        <a href="#" target="_blank" rel="noopener" className="underline">
          Learn more
        </a>
      </span>
    </div>
  </Alert>
);
