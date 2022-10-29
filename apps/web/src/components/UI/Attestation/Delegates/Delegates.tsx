import AddressCopier from "components/Copier/AddressCopier";
import useRemoveDelegate from "components/Transactors/Delegater/useRemoveDelegate";
import { getImageURL } from "helper";
import { useGetOrg, useIsAdmin } from "services/orgs/hooks";
import { CardContainer } from "../../Index";
import MetaLogo from "../../MetaLogo";
import { Cell, Row, Table, TBody, THead } from "../../Table";
import { AssociatedDataEditor, DelegateRevoker, DelegateUpdators } from "./Triggers";

export function Delegates({
  address,
  showUpdater,
}: {
  address: string;
  showUpdater?: boolean;
}) {
  const org = useGetOrg(address);
  const { revoke, isLoading } = useRemoveDelegate(address);
  const hasAccess = useIsAdmin(address);
  if (!org?.delegates || org.delegates.length === 0) return null;

  const getRows = () => {
    const rows = ["logo", "delegate"];
    return hasAccess ? rows.concat(["Actions"]) : rows;
  };

  return (
    <CardContainer>
      <div className="flex justify-between items-center text-neutrals-gray-7 mb-2">
        <h1 className="heading-2">Delegates</h1>
        {showUpdater && <DelegateUpdators address={org.address} />}
      </div>
      <Table>
        <THead rows={getRows()} />
        <TBody>
          {org.delegates.map((delegate, idx) => (
            <Row key={idx} className="border-none table-row">
              <Cell className="flex justify-start p-2">
                <MetaLogo
                  src={getImageURL(org?.metadata?.image ?? org.metadata.banner)}
                  alt={`${org?.metadata.name} image`}
                />
              </Cell>
              <Cell>
                <AddressCopier address={delegate} />
              </Cell>
              <Cell className="p-0">
                {hasAccess && delegate !== org.admin && (
                  <div className="flex gap-1 items-center justify-start">
                    <AssociatedDataEditor org={org.address} address={delegate} disabled={isLoading} />
                    <DelegateRevoker
                      delegate={delegate}
                      onRevoke={() => revoke(delegate)}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </Cell>
            </Row>
          ))}
        </TBody>
      </Table>
    </CardContainer>
  );
}
