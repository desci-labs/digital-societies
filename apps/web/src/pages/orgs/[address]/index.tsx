import { ActionButtonLink, ActionButtons } from "components/ActionButtons/Index";
import Loader from "components/Loader";
import { ExternalLink } from "components/UI/Index";
import {
  Credential,
  useGetCredentials,
} from "context/Credential/CredentialContext";
import { useGetOrg } from "context/Factory/FactoryContext";
import { resolveIpfsURL, shortenText } from "helper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function ViewOrgs() {
  const router = useRouter();
  const { address } = router.query;
  const org = useGetOrg(address as string);

  if (!org) return <Loader className="h-screen" />;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center">
      <div className="w-full h-104 relative group">
        <ActionButtons>
          <ActionButtonLink title="Create Credential" href={`${address}/create-credential`}></ActionButtonLink>
          <ActionButtonLink title="Edit Metadata" href={`edit/${address}`}></ActionButtonLink>
        </ActionButtons>
        <div className="w-full h-full relative">
          <Image
            src={resolveIpfsURL(org.metadata.image)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={org.metadata.name}
          />
        </div>
      </div>
      <div className="container mx-auto">
        <span className="text-3xl block font-bold mb-2 text-left">
          {org.metadata.name} ({org.metadata.symbol})
        </span>
        <span className="text-lg block mb-2 text-left">
          {org.metadata.description}
        </span>
      </div>
      <CredentialGridView address={org.address} />
    </div>
  );
}

function CredentialGridView({ address }: { address: string }) {
  const { isLoading, data } = useGetCredentials();
  const credentials = data[address];

  if (isLoading) return <Loader />;

  if (!credentials || credentials.length === 0) return null;

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 content-start gap-y-10 place-items-center mt-10">
      {credentials.length &&
        credentials.map((credential, idx) => (
          <CredentialCard key={idx} credential={credential} />
        ))}
    </div>
  );
}

export function CredentialCard({ credential }: { credential: Credential }) {
  const org = useGetOrg(credential.address);
  const metadata = useMemo(() => credential?.metadata ?? org?.metadata, [credential, org]);

  return (
    <div className="min-w-80 w-80 h-96 rounded-lg shadow-md cursor-pointer transition-shadow duration-200 hover:shadow-xl overflow-hidden">
      <div className="w-80 h-48 relative rounded-lg">
        <Image
          src={resolveIpfsURL(metadata?.image)}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={`${metadata.name} image`}
          className="rounded-lg rounded-bl-none rounded-br-none"
        />
      </div>
      <div className="p-2">
        <Link href={`/credentials/${credential.id}?address=${credential.address}`}>
          <a href={`/credentials/${credential.id}?address=${credential.address}`} className="text-xl block font-bold mb-1 truncate">
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
