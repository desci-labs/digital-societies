import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import Icon from "components/Icons/Icons";
import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";
import Popup from "components/UI/Popup/Index";
import { useFactoryContract } from "hooks/useContract";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useInsertSocietyMutation,
  useUpdateSocietyMutation,
} from "services/api/admin";
import { useGetOrgSetting } from "services/api/hooks";
import { ApiResponse } from "services/api/types";
import { useGetOrg } from "services/orgs/hooks";
import { setOrg } from "services/orgs/reducer";
import { Org, PendingOrg } from "services/orgs/types";
// import { setFormLoading } from "services/transaction/reducer";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";

function useVerification(address: string) {
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const contract = useFactoryContract();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const org = useGetOrg(address);

  const verify = async () => {
    if (!org || !contract) return;
    try {
      setIsSubmitting(true);
      updateTx({ step: Step.submit, message: "Confirm transaction..." });
      const tx = await contract.verify(address);
      const update = { ...org, verified: true };
      dispatch(setOrg(update));
      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: `Verifying ${org.metadata.name}`,
      });
      await tx?.wait();
      setIsSubmitting(false);
      updateTx({ step: Step.success, txHash: tx.hash, message: "" });
    } catch (err: unknown) {
      // const e = err as CustomDataError;
      updateTx({
        step: Step.error,
        message: "An error occured verifying society",
      });
      dispatch(setOrg(org));
      setIsSubmitting(false);
    }
  };
  const refute = async () => {
    if (!org || !contract) return;
    try {
      setIsSubmitting(true);
      updateTx({ step: Step.submit, message: "Confirm transaction..." });
      const tx = await contract.refute(address);
      const update = { ...org, verified: false };
      dispatch(setOrg(update));
      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: `Refuting verification for ${org.metadata.name}`,
      });
      await tx?.wait();
      setIsSubmitting(false);
      updateTx({ step: Step.success, txHash: tx.hash, message: "" });
    } catch (err: unknown) {
      // const e = err as CustomDataError;
      updateTx({
        step: Step.error,
        message: "An error occured refuting verification",
      });
      dispatch(setOrg(org));
      setIsSubmitting(false);
    }
  };

  return { verify, refute, isSubmitting };
}

export function ToggleVerification(props: { society: Org | PendingOrg }) {
  const { isSubmitting, verify, refute } = useVerification(
    props.society.address
  );
  return (
    <Button
      disabled={isSubmitting}
      onClick={() => (props.society.verified ? refute() : verify())}
      className={`bg-transparent app-text bg-white bg-opacity-0 px-0 py-0 w-10 outline-0 hover:text-primary disabled:text-neutrals-gray-4 disabled:hover:text-neutrals-gray-4`}
    >
      {props.society.verified ? "Refute" : "Verify"}
    </Button>
  );
}

export function ToggleVisibility(props: { address: string }) {
  const { data: society, isLoading } = useGetOrgSetting(props.address);
  const [insertSociety, { isLoading: isInserting }] =
    useInsertSocietyMutation();
  const [updateSociety] = useUpdateSocietyMutation();
  const { showModal } = useModalContext();

  const trigger = async () => {
    let res;
    try {
      if (!society) {
        res = await insertSociety({
          address: props.address,
          disabled: true,
        }).unwrap();
      } else {
        res = await updateSociety({
          id: society.id,
          disabled: !society.disabled,
        }).unwrap();
      }

      if (res && res.status === "error") {
        showModal(Popup, {
          message:
            res.message ??
            "An unknown error occured, check your network connectivity and try again!",
        });
      }
    } catch (e) {
      const error = e as unknown as FetchBaseQueryError;
      showModal(Popup, {
        message:
          (error.data as ApiResponse)?.["message"] ??
          "An unknown error occured, check your network connectivity and try again!",
      });
    }
  };

  return (
    <Button
      onClick={trigger}
      disabled={isLoading || isInserting}
      className={`bg-transparent bg-white bg-opacity-0 px-0 py-0 w-10 outline-0`}
    >
      {society?.disabled ? (
        <Icon
          type="EyeSlash"
          size={18}
          tabIndex={0}
          focusable
          className="outline-none app-text hover:text-white focus:text-white dark:hover:text-tint-primary dark:focus:text-tint-primary"
        />
      ) : (
        <Icon
          type="Eye"
          size={18}
          tabIndex={0}
          focusable
          className="outline-none app-text hover:text-white focus:text-white dark:hover:text-tint-primary dark:focus:text-tint-primary"
        />
      )}
    </Button>
  );
}
