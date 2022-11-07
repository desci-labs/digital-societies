import ErrorPop from "components/TransactionStatus/Error";
import Processing from "components/TransactionStatus/Processing";
import Submit from "components/TransactionStatus/Submit";
import Success from "components/TransactionStatus/Success";
import Preview from "components/UI/Attestation/Preview";
import { useMemo } from "react";
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
      case Step.preview:
        return <Preview />;
      case Step.success:
        return <Success {...stage} />;
      case Step.broadcast:
        return <Processing {...stage} />;
      case Step.submit:
        return <Submit {...stage} />;
      case Step.error:
        return <ErrorPop {...stage} />;
      default:
        throw new Error("Invalid prompt");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return <CredentialLauncher org={org} Form={view} mode={mode} />;
}
