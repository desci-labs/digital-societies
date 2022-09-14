import {
  ActionButtonLink,
  ActionButtons,
} from "components/ActionButtons/Index";
import { Button } from "components/Form/Index";
import Loader from "components/Loader";
import useRevokeCredential from "components/Transactors/Issuer/useRevokeCredential";
import { Cell, Row, Table, TBody, THead } from "components/UI/Table";
import {
  useGetCredential,
  useGetCredentialTokens,
} from "context/Credential/CredentialContext";
import { useCanMutateOrg, useGetOrg } from "context/Factory/FactoryContext";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import { useRouter } from "next/router";
import { RiCloseLine } from "react-icons/ri";
import AddressOrEns from "components/AddressOrEns/Index";
import useIssuer from "components/Transactors/Issuer/useIssuer";
import { AiOutlinePlus } from "react-icons/ai";
import { useMemo } from "react";

export default function CredentialDetails() {
  const router = useRouter();
  const { id, address } = router.query;
  const credential = useGetCredential(
    address as string,
    parseInt(id as string)
  );  
  const hasAccess = useCanMutateOrg(credential?.address!);
  const org = useGetOrg(credential?.address ?? '');
  const metadata = useMemo(
    () => credential?.metadata ?? org?.metadata,
    [credential, org]
  );

  if (!credential) return <Loader className="h-screen" />;
  if (!metadata) return null;
  
  console.log('credential ', credential);
  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center">
      <div className="w-full h-104 relative group">
        {/* {hasAccess && (
          <ActionButtons>
            <ActionButtonLink
              title="Edit Credential"
              href={`${id}/edit?address=${credential.address}`}
            ></ActionButtonLink>
          </ActionButtons>
        )} */}
        <div className="w-full h-full relative">
          <Image
            src={resolveIpfsURL(metadata.image)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={metadata.name}
          />
        </div>
      </div>
      <div className="container mx-auto">
        <span className="text-3xl block font-bold mb-2 text-left">
          {metadata.name} ({metadata.symbol})
        </span>
        <span className="text-lg block mb-2 text-left">
          {metadata.description}
        </span>
      </div>
      <TokenTableView id={credential.id} address={credential.address} />
    </div>
  );
}

function TokenTableView({ address, id }: { id: number; address: string }) {
  const tokens = useGetCredentialTokens(address, id);
  const credential = useGetCredential(address, id);
  const showIssuer = useIssuer(credential!);
  const { revoke, isLoading } = useRevokeCredential(credential?.address!);
  const hasAccess = useCanMutateOrg(credential?.address ?? "");
  
  const getRows = () => {
    const rows = ["", "TokenId", "receipient", "issuer", "date Issued"];
    return hasAccess ? rows.concat(["Revoke"]) : rows;
  };

  return (
    <div className="container mx-auto pb-5 pt-2 mt-10 shadow-2xl">
      {hasAccess && <div className="flex justify-end px-5">
        <button onClick={showIssuer} className="flex items-center justify-evenly outline-none border rounded-3xl w-12 px-2 p-1 border-curious-blue">
          <span className="block capitalize text-sm">new</span> <AiOutlinePlus className="block" />{" "}
        </button>
      </div>}
      <Table>
        <THead rows={getRows()} />
        <TBody>
          {tokens && tokens.map((token, idx) => (
            <Row key={idx}>
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative">
                  <Image
                    src={resolveIpfsURL(credential?.metadata?.image ?? "")} //TODO: add a fall back image as placeholder
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={`${credential?.metadata.name} image`}
                    className="rounded-full block"
                  />
                </div>
              </Cell>
              <Cell>{token.tokenId}</Cell>
              <Cell>
                <AddressOrEns address={token.owner} />
              </Cell>
              <Cell>
                <AddressOrEns address={token.issuer} />
              </Cell>
              <Cell>{new Date(token.dateIssued).toDateString()}</Cell>
              {hasAccess && (
                <Cell className="p-0">
                  <Button
                    onClick={() => revoke(token.tokenId)}
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
    </div>
  );
}
