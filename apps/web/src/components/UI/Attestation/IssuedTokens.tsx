import AddressCopier from "components/Copier/AddressCopier";
import useIssuer from "components/Transactors/Issuer/useIssuer";
import useRevokeToken from "components/Transactors/Issuer/useRevokeToken";
import { getImageURL } from "helper";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { useGetAttestationTokens } from "services/attestations/hooks";
import { Attestation, PendingAttestation } from "services/attestations/types";
import { useIsDelegate } from "services/orgs/hooks";
import Button from "../Button/Index";
import { CardContainer } from "../Index";
import { Cell, Row, Table, TBody, THead } from "../Table";

export function IssuedTokens({
  attestation
}: {
  attestation: Attestation | PendingAttestation
}) {
  const tokens = useGetAttestationTokens(attestation.address, attestation.id);
  const showIssuer = useIssuer(attestation!);
  const { revoke, isLoading } = useRevokeToken(attestation?.address!);
  const hasAccess = useIsDelegate(attestation?.address ?? "");
  if (!attestation) return null;

  const getRows = () => {
    const rows = ["logo", "TokenId", "receipient", "issuer", "date Issued"];
    return hasAccess ? rows.concat(["Revoke"]) : rows;
  };

  return (
    <CardContainer>
      {hasAccess && (
        <div className="flex justify-between items-center mb-5 text-neutrals-gray-7">
          <h1 className="text-left heading-2">Recipients</h1>
          <Button
            onClick={showIssuer}
            className="flex items-center justify-evenly outline-none p-1 bg-primary-hover font-bold"
          >
            <AiOutlinePlus className="block" />
            <span className="block capitalize text-sm">Issue</span>{" "}
          </Button>
        </div>
      )}
      <Table>
        <THead rows={getRows()} />
        <TBody>
          {tokens &&
            tokens.map((token, idx) => (
              <Row key={idx} className="border-none table-row">
                <Cell className="p-2 h-full">
                  <div className="w-10 h-10 relative bg-gradient rounded-full">
                    <Image
                      src={getImageURL(
                        attestation?.metadata?.image ??
                        attestation?.metadata?.banner
                      )}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt={`${attestation?.metadata.name} image`}
                      className="rounded-full block"
                    />
                  </div>
                </Cell>
                <Cell>{token.tokenId}</Cell>
                <Cell>
                  <AddressCopier address={token.owner} />
                </Cell>
                <Cell>
                  <AddressCopier address={token.issuer} />
                </Cell>
                <Cell>{new Date(token.dateIssued).toDateString()}</Cell>
                {hasAccess && (
                  <Cell className="p-0">
                    <Button
                      onClick={() => revoke(token)}
                      disabled={isLoading}
                      className={`bg-transparent bg-white bg-opacity-0`}
                    >
                      <RiCloseLine
                        className="hover:scale-150 duration-100"
                        color={isLoading ? "#8793A6" : "#f15156"}
                      />
                    </Button>
                  </Cell>
                )}
              </Row>
            ))}
        </TBody>
      </Table>
    </CardContainer>
  );
}
