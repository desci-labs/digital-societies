import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import Icon from "components/Icons/Icons";
import { useModalContext } from "components/Modal/Modal";
import Button from "components/UI/Button/Index";
import Popup from "components/UI/Popup/Index";
import {
  useInsertSocietyMutation,
  useUpdateSocietyMutation,
} from "services/api/admin";
import { useGetOrgSetting } from "services/api/hooks";
import { ApiResponse } from "services/api/types";

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
