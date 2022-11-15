import { useMemo } from "react";
import Preview from "components/UI/Attestation/Preview";
import { Org, PendingOrg } from "services/orgs/types";
import { useGetTxStage } from "services/transaction/hooks";
import { Step } from "services/transaction/types";
import CredentialLauncher from ".";
import { LaunchMode } from "../types";
import AttestationForm from "./Form";

export type Props = JSX.IntrinsicAttributes & {
  org: Org | PendingOrg;
  mode: LaunchMode;
};

export default function AttestationPrompt({ org, mode }: Props) {
  const stage = useGetTxStage();

  const view = useMemo(() => {
    switch (stage.step) {
      case Step.form:
        return <AttestationForm />;
      // case Step.preview :
      //   return <Preview />;
      default:
        return <AttestationForm />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return <CredentialLauncher org={org} Form={view} mode={mode} />;
}
