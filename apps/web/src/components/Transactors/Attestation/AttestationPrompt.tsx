import { useMemo } from "react";
import Preview from "components/UI/Attestation/Preview";
import { Org, PendingOrg } from "services/orgs/types";
import CredentialLauncher from ".";
import { LaunchMode } from "../types";
import AttestationForm from "./Form";
import { useGetFormView } from "context/useFormView";

export type Props = JSX.IntrinsicAttributes & {
  org: Org | PendingOrg;
  mode: LaunchMode;
};

export default function AttestationPrompt({ org, mode }: Props) {
  const formView = useGetFormView();
  const view = useMemo(() => {
    switch (formView) {
      case "form":
        return <AttestationForm />;
      case "preview":
        return <Preview />;
      default:
        throw new Error("Unexpected value");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formView]);

  return <CredentialLauncher org={org} Form={view} mode={mode} />;
}
