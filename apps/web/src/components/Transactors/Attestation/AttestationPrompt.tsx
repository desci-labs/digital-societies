import ErrorPop from "components/TransactionStatus/Error";
import Processing from "components/TransactionStatus/Processing";
import Submit from "components/TransactionStatus/Submit";
import Success from "components/TransactionStatus/Success";
import Button from "components/UI/Button/Index";
import { useMemo } from "react";
import { Org, PendingOrg } from "services/orgs/types";
import { useGetTxStage } from "services/transaction/hooks";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import CredentialLauncher from ".";
import { LaunchMode } from "../types";
import AttestationForm from "./Form";

function Preview() {
  const { updateTx } = useTxUpdator();
  return (
    <div className="p-4 h-72">
      <Button
        type="button"
        onClick={() => updateTx({ step: Step.form })}
        className="app-text border border-neutrals-gray-6 hover:bg-tint-primary-dark hover:border-tint-primary-dark hover:text-white "
      >
        {"<<"} Back to form{" "}
      </Button>

    </div>
  );
}

export type Props = { org: Org | PendingOrg; mode: LaunchMode };

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
