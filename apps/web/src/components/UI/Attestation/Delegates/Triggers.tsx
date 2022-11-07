import Icon from "components/Icons/Icons";
import useMetaDetails from "components/Transactors/AssociatedData/useMetaDetails";
import useDelegater from "components/Transactors/Delegater/useDelegater";
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
      className={`bg-transparent bg-white bg-opacity-0 px-0 py-0 w-10 outline-0`}
    >
      <Icon
        type="Close"
        tabIndex={0}
        focusable
        className="will-change-transform hover:-rotate-45 hover:text-tint-primary focus:text-tint-primary origin-cetner duration-200"
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
      className={`bg-transparent bg-white bg-opacity-0 px-0 py-0 w-10 outline-0`}
    >
      <Icon
        type="Eye"
        size={18}
        tabIndex={0}
        focusable
        className="app-text hover:text-white focus:text-white dark:hover:text-tint-primary dark:focus:text-tint-primary"
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
          <Icon type="Plus" className="block" />{" "}
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
          <Icon type="Plus" className="block" />{" "}
          <span className="block capitalize text-sm">new</span>{" "}
        </Button>
      )}
    </>
  );
}
