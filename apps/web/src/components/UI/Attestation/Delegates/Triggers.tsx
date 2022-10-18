import useDelegater from "components/Transactors/Delegater/useDelegater";
import { AiOutlinePlus } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { useIsAdmin } from "services/orgs/hooks";
import { Org, PendingOrg } from "services/orgs/types";
import Button from "../../Button/Index";
import { Cell } from "../../Table";

export function DelegateRevoker(props: {
  onRevoke: () => void;
  desoc: Org | PendingOrg;
  delegate: string;
  isLoading?: boolean;
}) {
  const hasAccess = useIsAdmin(props.desoc.address);

  return (
    <>
      {hasAccess && (
        <Cell className="p-0">
          {props.delegate !== props.desoc.admin && (
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
          )}
        </Cell>
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
