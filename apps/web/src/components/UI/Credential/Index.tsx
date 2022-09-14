import Loader from "components/Loader";
import { Credential, useGetCredentials } from "context/Credential/CredentialContext";
import { useGetOrg } from "context/Factory/FactoryContext";
import { resolveIpfsURL, shortenText } from "helper";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ExternalLink } from "../Index";

export function CredentialGridView({ address }: { address: string }) {
  const { isLoading, credentials: data } = useGetCredentials();
  const credentials = data[address];

  if (isLoading) return <Loader />;

  if (!credentials || credentials.length === 0) return null;

  return (
    <div className="container mx-auto pb-5 pt-2 mt-10">
      <h1 className="text-left text-2xl text-dark font-bold">Credentials</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 content-start gap-y-10 place-items-start mt-5 mb-10">
        {credentials.length &&
          credentials.map((credential, idx) => (
            <CredentialCard key={idx} credential={credential} />
          ))}
      </div>
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
        <Link
          href={`/credentials/${credential.id}?address=${credential.address}`}
        >
          <a
            href={`/credentials/${credential.id}?address=${credential.address}`}
            className="text-xl block font-bold mb-1 truncate"
          >
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