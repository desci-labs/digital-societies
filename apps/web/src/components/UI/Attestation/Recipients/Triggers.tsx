import useIssuer from "components/Transactors/Issuer/useIssuer";
import Button from "components/UI/Button/Index";
import { AiOutlinePlus } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { Attestation, PendingAttestation } from "services/attestations/types";

export function Updater(props: { attestation: Attestation | PendingAttestation }) {
  const showIssuer = useIssuer(props.attestation);

  return (
    <>
      <Button
        onClick={showIssuer}
        className="flex items-center justify-evenly outline-none px-2 p-1 font-bold bg-primary-hover"
      >
        <AiOutlinePlus className="block" />{" "}
        <span className="block capitalize text-sm">Issue</span>{" "}
      </Button>
    </>
  );
}


export function RevokeButton(props: {
  onRevoke: () => void;
  isLoading?: boolean;
}) {

  return (
    <>
      <Button
        onClick={props.onRevoke}
        disabled={props.isLoading}
        className={`bg-transparent bg-white bg-opacity-0`}
      >
        <RiCloseLine
          className="hover:scale-150 duration-100"
          color={props.isLoading ? "#8793A6" : "#f15156"}
        />
      </Button>
    </>
  );
}
