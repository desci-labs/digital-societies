/* eslint-disable @next/next/no-img-element */
import Icon from "components/Icons/Icons";
import { AttestationFormValues } from "components/Transactors/types";
import { getImageURL } from "helper";
import useRouterAddress from "hooks/useRouterAddress";
import { useFormContext } from "react-hook-form";
import { useGetOrg } from "services/orgs/hooks";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import Button from "../Button/Index";

export default function Preview() {
  const orgAddress = useRouterAddress();
  const org = useGetOrg(orgAddress);
  const { updateTx } = useTxUpdator();
  const {
    getValues,
  } = useFormContext<AttestationFormValues>();
    const name = getValues("name");
  const image = getValues("image");
  const description = getValues("description") || "Add a description to view it here!";

  return (
    <div className="p-4">
      <Button
        type="button"
        onClick={() => updateTx({ step: Step.form })}
        className="app-text mb-5 border border-neutrals-gray-6 hover:bg-tint-primary-dark hover:border-tint-primary-dark hover:text-white "
      >
        {"<<"} Back to form{" "}
      </Button>
      <div className="badge-details-container bg-white h-80 w-180">
        <div className="header flex items-center justify-between w-full mb-2 px-4 pt-2">
          <span className="block text-black text-2xl font-bold">{org?.metadata.name} / {name}</span>
          <Icon type="Close" size={30} className="text-neutrals-gray-2" />
        </div>
        <div className="content p-5">
          <div className="badge-details-content">
            <div className="badge-image">
              <img src={getImageURL(image) as string} alt="" />
            </div>
            <span className="desc">{description}</span>
          </div>
          <div className="links">
            <a
              className="link"
              href="##"
              target="_blank"
              rel="noopener"
            >
              View SBT holders
            </a>
            <a
              className="link"
              href="##"
              target="_blank"
              rel="noopener"
            >
              View SBT specification
            </a>
            <a
              className="link"
              href="##"
              target="_blank"
              rel="noopener"
            >
              Etherscan transaction
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}