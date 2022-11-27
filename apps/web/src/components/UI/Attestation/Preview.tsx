/* eslint-disable @next/next/no-img-element */
import { ExternalLinkSquare } from "assets/svg";
import Icon from "components/Icons/Icons";
import { AttestationFormValues } from "components/Transactors/types";
import { useSetFormView } from "context/useFormView";
import { getImageURL } from "helper";
import useRouterAddress from "hooks/useRouterAddress";
import { useFormContext } from "react-hook-form";
import { useGetOrg } from "services/orgs/hooks";
import Button from "../Button/Index";

export default function Preview() {
  const orgAddress = useRouterAddress();
  const org = useGetOrg(orgAddress);
  const { getValues } = useFormContext<AttestationFormValues>();
  const name = getValues("name");
  const image = getValues("image");
  const attestationType = getValues("attestationType");
  const description =
    getValues("description") || "Add a description to view it here!";
  const { setView } = useSetFormView();

  return (
    <div className="p-4">
      <Button
        type="button"
        onClick={() => setView("form")}
        className="app-text mb-5 border border-neutrals-gray-6 hover:bg-tint-primary-dark hover:border-tint-primary-dark hover:text-white "
      >
        {"<<"} Back{" "}
      </Button>
      <div className="badge-details-container bg-white h-80 w-180 pb-3">
        <div className="header flex items-center justify-between w-full mb-2 px-4 py-2">
          <span className="block text-black text-2xl font-bold">
            {org?.metadata.name}
          </span>
          <Icon type="Close" size={30} className="text-neutrals-gray-2" />
        </div>
        <div className="content px-5 pt-2">
          <div className="badge-details-content">
            <div className="badge-image">
              <img src={getImageURL(image) as string} alt="" />
            </div>
            <div>
              <span className="block text-black text-2xl font-bold">
                {name}
              </span>
              <span className="badge-type app-text">
                <b>{attestationType}</b>
              </span>
              <span className="desc">{description}</span>
            </div>
          </div>
          <div className="links">
            <a className="link" href="##" target="_blank" rel="noopener">
              View holders
              <ExternalLinkSquare />
            </a>
            <a className="link" href="##" target="_blank" rel="noopener">
              More info
              <ExternalLinkSquare />
            </a>
            <a className="link" href="##" target="_blank" rel="noopener">
              Txn
              <ExternalLinkSquare />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
