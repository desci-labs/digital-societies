import { ActionButtonLink, ActionButtons } from "components/ActionButtons/Index";
import Loader from "components/Loader";
import { Cell, Row, Table, TBody, THead } from "components/UI/Table";
import {
  useGetCredential, useGetCredentialTokens,
} from "context/Credential/CredentialContext";
import maskAddress, { resolveIpfsURL } from "helper";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEnsName } from "wagmi";

export default function CredentialDetails() {
  const router = useRouter();
  const { id, address } = router.query;

  const credential = useGetCredential(address as string, parseInt(id as string));

  if (!credential) return <Loader className="h-screen" />;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center">
      <div className="w-full h-104 relative group">
        <ActionButtons>
          <ActionButtonLink title="Issue Credential" href={`${id}/mint?address=${credential.address}`}></ActionButtonLink>
          <ActionButtonLink title="Edit Credential" href={`${id}/edit?address=${credential.address}`}></ActionButtonLink>
        </ActionButtons>
        <div className="w-full h-full relative">
          <Image
            src={resolveIpfsURL(credential.metadata.image)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={credential.metadata.name}
          />
        </div>
      </div>
      <div className="container mx-auto">
        <span className="text-3xl block font-bold mb-2 text-left">
          {credential.metadata.name} ({credential.metadata.symbol})
        </span>
        <span className="text-lg block mb-2 text-left">
          {credential.metadata.description}
        </span>
      </div>
      <TokenTableView id={credential.id} address={credential.address} />
    </div>
  );
}

function TokenTableView({ address, id }: { id: number, address: string }) {
  const tokens = useGetCredentialTokens(address, id);
  const credential = useGetCredential(address, id);
  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="container mx-auto py-10 mt-10">
      <Table>
        <THead rows={['', 'TokenId', 'receipient', 'issuer', 'date Issued']} />
        <TBody>
          {tokens.map((token, idx) => (
            <Row key={idx}>
              <Cell className="flex justify-start p-2">
                <div className="w-10 h-10 relative">
                  <Image
                    src={resolveIpfsURL(credential?.metadata?.image ?? '')} //TODO: add a fall back image as placeholder
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={`${credential?.metadata.name} image`}
                    className="rounded-full block"
                  />
                </div>
              </Cell>
              <Cell>{token.tokenId}</Cell>
              <Cell><AddressOrEns address={token.owner} /></Cell>
              <Cell><AddressOrEns address={token.issuer} /></Cell>
              <Cell>{new Date(token.dateIssued).toDateString()}</Cell>
              {/* <Cell>Revoke</Cell> */}
            </Row>
          ))}
        </TBody>
      </Table>
    </div>
  );
}

function AddressOrEns(props: { address: string }) {
  const { data, isLoading } = useEnsName({ address: props.address, chainId: 1 });
  return <>{data ?? maskAddress(props.address)}</>;
}
