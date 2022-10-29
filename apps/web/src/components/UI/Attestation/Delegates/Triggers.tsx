import useMetaDetails from "components/Transactors/AssociatedData/useMetaDetails";
import useDelegater from "components/Transactors/Delegater/useDelegater";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { useAccountMetadata } from "services/api/hooks";
import { useIsAdmin } from "services/orgs/hooks";
import Button from "../../Button/Index";

export function DelegateRevoker(props: {
  onRevoke: () => void;
  delegate: string;
  isLoading?: boolean;
}) {

  return (
    <Button
      onClick={props.onRevoke}
      disabled={props.isLoading}
      className={`bg-transparent bg-white bg-opacity-0 pl-0`}
    >
      <RiCloseLine
        className="hover:scale-150 duration-100"
        color={props.isLoading ? "#8793A6" : "#f15156"}
      />
    </Button>
  );
}
export function AssociatedDataEditor(props: {
  address: string;
  org: string;
  disabled?: boolean;
}) {
  const trigger = useMetaDetails(props.address, props.org);
  const { isLoading } = useAccountMetadata(props.org, props.address);

  if (isLoading) return null;

  return (
    <Button
      onClick={trigger}
      disabled={props.disabled}
      className={`bg-transparent bg-white bg-opacity-0 pl-0`}
    >
      <FiEdit2
        className="hover:scale-150 duration-100"
        color={props.disabled ? "#8793A6" : "#ffffff"}
      />
    </Button>
  );
}

export function DelegateUpdators(props: { address: string }) {
  const showDelegate = useDelegater(props.address);
  const hasAccess = useIsAdmin(props.address);

  return (
    <>
      {hasAccess && (
        <Button
          onClick={showDelegate}
          className="flex items-center justify-evenly outline-none px-2 p-1 font-bold bg-primary-hover"
        >
          <AiOutlinePlus className="block" />{" "}
          <span className="block capitalize text-sm">new</span>{" "}
        </Button>
      )}
    </>
  );
}

export function DelegateUpdater(props: { address: string }) {
  const showDelegate = useDelegater(props.address);
  const hasAccess = useIsAdmin(props.address);

  return (
    <>
      {hasAccess && (
        <Button
          onClick={showDelegate}
          className="flex items-center justify-evenly outline-none px-2 p-1 font-bold bg-primary-hover"
        >
          <AiOutlinePlus className="block" />{" "}
          <span className="block capitalize text-sm">new</span>{" "}
        </Button>
      )}
    </>
  );
}
