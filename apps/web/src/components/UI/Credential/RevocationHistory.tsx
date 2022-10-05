import AddressOrEns from "components/AddressOrEns/Index";
import { getImageURL } from "helper";
import Image from "next/image";
import { useGetOrg } from "services/orgs/hooks";
import { CardContainer } from "../Index";
import { Cell, Row, Table, TBody, THead } from "../Table";

export function RevocationHistory({ address }: { address: string }) {
  const org = useGetOrg(address);
  if (!org?.delegates || org.delegates.length === 0) return null;

  const getRows = () => {
    return ["badge", "TokenId", "recipient", "revoked by", "date revoked"];
  };

  return (
    <CardContainer>
      <div className="flex justify-between items-center mb-5 text-neutrals-gray-7 mb-2">
        <h1 className="heading-2">Revocation History</h1>
      </div>
      <Table>
        <THead className="text-primary" rows={getRows()} />
        <TBody>
          {org.revocations.map((revoked, idx) => (
            <Row key={idx} className="border-none table-row">
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative bg-gradient rounded-full">
                  <Image
                    src={getImageURL(org?.metadata?.badge)}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={`${org?.metadata.name} image`}
                    className="rounded-full block"
                  />
                </div>
              </Cell>
              <Cell>{revoked.tokenId}</Cell>
              <Cell>
                <AddressOrEns address={revoked.owner} />
              </Cell>
              <Cell>
                <AddressOrEns address={revoked.revokedBy} />
              </Cell>
              <Cell>{new Date(revoked.timestamp).toDateString()}</Cell>
            </Row>
          ))}
        </TBody>
      </Table>
    </CardContainer>
  );
}