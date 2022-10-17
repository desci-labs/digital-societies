import AddressOrEns from "components/AddressOrEns/Index";
import AddressCopier from "components/Copier/AddressCopier";
import Copier from "components/Copier/Index";
import useDelegater from "components/Transactors/Delegater/useDelegater";
import useRemoveDelegate from "components/Transactors/Delegater/useRemoveDelegate";
import { getImageURL } from "helper";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { useGetOrg, useIsAdmin } from "services/orgs/hooks";
import Button from "../Button/Index";
import { CardContainer } from "../Index";
import { Cell, Row, Table, TBody, THead } from "../Table";

export function Delegates({ address }: { address: string }) {
  const org = useGetOrg(address);
  const { revoke, isLoading } = useRemoveDelegate(address);
  const showDelegate = useDelegater(address);

  const hasAccess = useIsAdmin(address);
  if (!org?.delegates || org.delegates.length === 0) return null;

  const getRows = () => {
    const rows = ["logo", "delegate"];
    return hasAccess ? rows.concat(["Revoke"]) : rows;
  };

  return (
    <CardContainer>
      <div className="flex justify-between items-center text-neutrals-gray-7 mb-2">
        <h1 className="heading-2">Delegates</h1>
        {hasAccess && (
          <Button
            onClick={showDelegate}
            className="flex items-center justify-evenly outline-none px-2 p-1 font-bold bg-primary-hover"
          >
            <AiOutlinePlus className="block" />{" "}
            <span className="block capitalize text-sm">new</span>{" "}
          </Button>
        )}
      </div>
      <Table>
        <THead rows={getRows()} />
        <TBody>
          {org.delegates.map((delegate, idx) => (
            <Row key={idx} className="border-none table-row">
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative bg-gradient rounded-full">
                  <Image
                    src={getImageURL(org?.metadata?.image ?? org.metadata.banner)}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={`${org?.metadata.name} image`}
                    className="rounded-full block"
                  />
                </div>
              </Cell>
              <Cell>
                <AddressCopier address={delegate} />
              </Cell>
              {hasAccess && (
                <Cell className="p-0">
                  {delegate !== org.admin && <Button
                    onClick={() => revoke(delegate)}
                    disabled={isLoading}
                    className={`bg-transparent bg-white bg-opacity-0`}
                  >
                    <RiCloseLine
                      className="hover:scale-150 duration-100"
                      color={isLoading ? "#8793A6" : "#f15156"}
                    />
                  </Button>}
                </Cell>
              )}
            </Row>
          ))}
        </TBody>
      </Table>
    </CardContainer>
  );
}
