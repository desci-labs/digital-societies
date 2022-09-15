import AddressOrEns from "components/AddressOrEns/Index";
import { Button } from "components/Form/Index";
import Loader from "components/Loader";
import useLaunchCredential from "components/Transactors/Credential/useLaunchCredential";
import useDelegater from "components/Transactors/Delegater/useDelegater";
import useRemoveDelegate from "components/Transactors/Delegater/useRemoveDelegate";
import useIssuer from "components/Transactors/Issuer/useIssuer";
import useRevokeCredential from "components/Transactors/Issuer/useRevokeCredential";
import { Metadata } from "components/Transactors/types";
import {
  Credential,
  useGetCredential,
  useGetCredentials,
  useGetCredentialTokens,
} from "context/Credential/CredentialContext";
import { useCanMutateOrg, useGetOrg, useIsAdmin } from "services/orgs/hooks";
import { resolveIpfsURL, shortenText } from "helper";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { useAccount } from "wagmi";
import { CardContainer, ExternalLink, ImageBanner, RoundedLogo } from "../Index";
import { Cell, Row, Table, TBody, THead } from "../Table";

export function CredentialGridView({ address }: { address: string }) {
  const hasAccess = useCanMutateOrg(address);
  const org = useGetOrg(address);
  const { isLoading, credentials: data } = useGetCredentials();
  const credentials = data[address];
  const showCredenter = useLaunchCredential(org!);
  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto pt-2 mt-10">
      <div className="flex w-full justify-between">
        <h1 className="text-left text-2xl text-dark font-bold">Credentials</h1>
        {hasAccess && (
          <button
            onClick={showCredenter}
            className="flex items-center justify-evenly outline-none border rounded-3xl px-2 p-1 border-curious-blue"
          >
            <span className="block capitalize text-sm">Add Credential</span>{" "}
            <AiOutlinePlus className="block" />{" "}
          </button>
        )}
      </div>
      {credentials && (
        <div className="grid grid-cols-1 lg:grid-cols-3 content-start gap-y-10 place-items-start mt-5 mb-10">
          {credentials.map((credential, idx) => (
            <CredentialCard key={idx} credential={credential} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CredentialCard({ credential }: { credential: Credential }) {
  const org = useGetOrg(credential.address);
  const metadata = useMemo(
    () => credential?.metadata ?? org?.metadata,
    [credential, org]
  );

  return (
    <MetadataCard
      link={`/credentials/${credential.id}?address=${credential.address}`}
      metadata={metadata}
    />
  );
}

export function MetadataCard({
  metadata,
  link,
}: {
  link: string;
  metadata: Metadata;
}) {
  return (
    <div className="min-w-80 w-80 h-96 rounded-lg shadow-md cursor-pointer transition-shadow duration-200 hover:shadow-xl overflow-hidden">
      <div className="w-80 h-48 relative rounded-lg">
        <ImageBanner ipfsHash={metadata?.image ?? ""} />
        <RoundedLogo
          ipfsHash={metadata?.logo ?? ""}
          className="w-12 h-12 left-3 -bottom-5"
        />
      </div>
      <div className="p-2 mt-3">
        <Link href={link}>
          <a href={link} className="text-xl block font-bold mb-1 truncate">
            {metadata.name}
          </a>
        </Link>
        <div className="flex flex-col justify-between h-32 gap-1">
          <span className="text-sm block">
            {shortenText(metadata.description)}
          </span>
          {metadata.external_link && (
            <div className="flex justify-center">
              <ExternalLink href={metadata.external_link} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Delegates({ address }: { address: string }) {
  const org = useGetOrg(address);
  const { address: user } = useAccount();
  const { revoke, isLoading } = useRemoveDelegate(address);
  const showDelegate = useDelegater(address);

  const hasAccess = useIsAdmin(address, user ?? "");
  if (!org?.delegates || org.delegates.length === 0) return null;

  const getRows = () => {
    const rows = ["", "delegate"];
    return hasAccess ? rows.concat(["Revoke"]) : rows;
  };

  return (
    <CardContainer>
      <div className="flex justify-between items-center px-5">
        <h1 className="text-xl font-semibold">Delegates</h1>
        {hasAccess && (
          <button
            onClick={showDelegate}
            className="flex items-center justify-evenly outline-none border rounded-3xl px-2 p-1 border-curious-blue"
          >
            <span className="block capitalize text-sm">Add delegate</span>{" "}
            <AiOutlinePlus className="block" />{" "}
          </button>
        )}
      </div>
      <Table>
        <THead rows={getRows()} />
        <TBody className="">
          {org.delegates.map((delegate, idx) => (
            <Row key={idx} className="border-none">
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative">
                  <Image
                    src={resolveIpfsURL(org?.metadata?.logo ?? "")}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={`${org?.metadata.name} image`}
                    className="rounded-full block"
                  />
                </div>
              </Cell>
              <Cell>
                <AddressOrEns address={delegate} />
              </Cell>
              {hasAccess && delegate !== org.admin && (
                <Cell className="p-0">
                  <Button
                    onClick={() => revoke(delegate)}
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

export function RevocationHistory({ address }: { address: string }) {
  const org = useGetOrg(address);
  if (!org?.delegates || org.delegates.length === 0) return null;

  const getRows = () => {
    return ["", "TokenId", "recipient", "revoked by", "date revoked"];
  };

  return (
    <CardContainer>
      <div className="flex justify-between items-center px-5 mb-5">
        <h1 className="text-xl font-semibold">Revocation History</h1>
      </div>
      <Table>
        <THead rows={getRows()} />
        <TBody className="">
          {org.revocations.map((revoked, idx) => (
            <Row key={idx} className="border-none">
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative">
                  <Image
                    src={resolveIpfsURL(org?.metadata?.logo ?? "")}
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


export function TokenTableView({ address, id }: { id: number; address: string }) {
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
    <CardContainer>
      {hasAccess && (
        <div className="flex justify-between items-center px-5 mb-5">
          <h1 className="text-xl font-semibold">Recipients</h1>
          <button
            onClick={showIssuer}
            className="flex items-center justify-evenly outline-none border rounded-3xl px-2 p-1 border-curious-blue"
          >
            <span className="block capitalize text-sm">Issue credential</span>{" "}
            <AiOutlinePlus className="block" />{" "}
          </button>
        </div>
      )}
      <Table>
        <THead rows={getRows()} />
        <TBody>
          {tokens &&
            tokens.map((token, idx) => (
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
    </CardContainer>
  );
}