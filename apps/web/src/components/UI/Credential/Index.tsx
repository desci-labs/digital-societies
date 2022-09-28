import AddressOrEns from "components/AddressOrEns/Index";
import Loader from "components/Loader";
import useCredenter from "components/Transactors/Credential/useCredenter";
import useDelegater from "components/Transactors/Delegater/useDelegater";
import useRemoveDelegate from "components/Transactors/Delegater/useRemoveDelegate";
import useIssuer from "components/Transactors/Issuer/useIssuer";
import useRevokeToken from "components/Transactors/Issuer/useRevokeToken";
import { Metadata, MetadataValues } from "components/Transactors/types";
import {
  useGetCredential,
  useGetCredentialState,
  useGetCredentialTokens,
} from "services/credentials/hooks";
import {
  useIsAdminOrDelegate,
  useGetOrg,
  useIsAdmin,
  useIsDelegate,
} from "services/orgs/hooks";
import { getImageURL, shortenText } from "helper";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import {
  CardContainer,
  ExternalLink,
  ImageBanner,
  RoundedLogo,
} from "../Index";
import { Cell, Row, Table, TBody, THead } from "../Table";
import { useRouter } from "next/router";
import Button from "../Button/Index";

export function CredentialGridView({ address }: { address: string }) {
  const hasAccess = useIsAdminOrDelegate(address);
  const org = useGetOrg(address);
  const { isLoading, credentials: data } = useGetCredentialState();
  const credentials = data[address];
  const showCredenter = useCredenter(org!);
  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto pt-2 mt-10 px-2 lg:px-0">
      <div className="flex w-full justify-between">
        <h1 className="text-left text-2xl text-neutrals-gray-7 font-semibold">Credentials</h1>
        {hasAccess && (
          <Button
            onClick={showCredenter}
            className="flex items-center justify-evenly font-bold outline-none px-2 p-1 bg-primary-hover"
          >
            <AiOutlinePlus color="black" className="block" />{" "}
            <span className="block capitalize text-sm text-dark">new</span>{" "}
          </Button>
        )}
      </div>
      {credentials && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-y-10 md:place-items-start mt-5 mb-10">
          {credentials.map((credential, idx) => (
            <MetadataCard
              key={idx}
              metadata={credential.metadata}
              link={`/credentials/${credential.id}?address=${credential.address}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MetadataCard({
  metadata,
  link,
}: {
  link: string;
  metadata: Metadata | MetadataValues;
}) {
  const router = useRouter();

  if (!metadata) return null;

  return (
    <a
      tabIndex={0}
      onClick={() => router.push(link)}
      className="bg-transparent text-white min-w-80 w-80 pb-4 shadow-md cursor-pointer transition-shadow duration-200 hover:shadow-xl overflow-hidden border border-neutrals-gray-3 focus:outline-white"
    >
      <div className="w-80 h-32 relative">
        <ImageBanner src={getImageURL(metadata?.banner ?? "")} />
        <RoundedLogo
          src={getImageURL(metadata?.badge ?? "")}
          className="w-12 h-12 left-3 -bottom-5"
        />
      </div>
      <div className="px-2 mt-6 flex flex-col justify-between gap-1 h-32">
        <div>
          <span className="text-md block font-bold mb-1 truncate">
            {metadata.name}
          </span>
          <span className="text-[13px] text-neutrals-gray-4 block">
            {shortenText(metadata.description)}
          </span>
        </div>
          {metadata.external_link && (
            <div className="flex justify-center">
              <ExternalLink href={metadata.external_link} />
            </div>
          )}
      </div>
    </a>
  );
}

export function Delegates({ address }: { address: string }) {
  const org = useGetOrg(address);
  const { revoke, isLoading } = useRemoveDelegate(address);
  const showDelegate = useDelegater(address);

  const hasAccess = useIsAdmin(address);
  if (!org?.delegates || org.delegates.length === 0) return null;

  const getRows = () => {
    const rows = ["", "delegate"];
    return hasAccess ? rows.concat(["Revoke"]) : rows;
  };

  return (
    <CardContainer>
      <div className="flex justify-between items-center text-neutrals-gray-7">
        <h1 className="text-2xl font-semibold">Delegates</h1>
        {hasAccess && (
          <Button
            onClick={showDelegate}
            className="flex items-center justify-evenly outline-none px-2 p-1 font-bold bg-primary-hover "
          >
            <AiOutlinePlus className="block" />{" "}
            <span className="block capitalize text-sm">new</span>{" "}
          </Button>
        )}
      </div>
      <Table>
        <THead rows={getRows()} className="text-neutrals-gray-5" />
        <TBody>
          {org.delegates.map((delegate, idx) => (
            <Row key={idx} className="border-none">
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative">
                  <Image
                    src={getImageURL(org?.metadata?.badge ?? "")}
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
      <div className="flex justify-between items-center mb-5 text-neutrals-gray-7">
        <h1 className="ext-left text-2xl text-neutrals-gray-7 font-semibold">Revocation History</h1>
      </div>
      <Table>
        <THead rows={getRows()} />
        <TBody className="">
          {org.revocations.map((revoked, idx) => (
            <Row key={idx} className="border-none">
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative">
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

export function TokenTableView({
  address,
  id,
}: {
  id: number;
  address: string;
}) {
  const tokens = useGetCredentialTokens(address, id);
  const credential = useGetCredential(address, id);
  const showIssuer = useIssuer(credential!);
  const { revoke, isLoading } = useRevokeToken(credential?.address!);
  const hasAccess = useIsDelegate(credential?.address ?? "");

  const getRows = () => {
    const rows = ["", "TokenId", "receipient", "issuer", "date Issued"];
    return hasAccess ? rows.concat(["Revoke"]) : rows;
  };

  return (
    <CardContainer>
      {hasAccess && (
        <div className="flex justify-between items-center mb-5 text-neutrals-gray-7">
          <h1 className="ext-left text-2xl text-neutrals-gray-7 font-semibold">Recipients</h1>
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
              <Row key={idx}>
                <Cell className="p-2 h-full">
                  <div className="w-10 h-10 relative">
                    <Image
                      src={getImageURL(
                        credential?.metadata?.badge ??
                        credential?.metadata?.banner ??
                        ""
                      )} //TODO: add a fall back image as placeholder
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
