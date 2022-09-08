import Loader from "components/Loader";
import {
  Credential,
  useGetCredential,
  useGetCredentials,
} from "context/Credential/CredentialContext";
import { useGetOrg } from "context/Factory/FactoryContext";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ViewOrgs() {
  const router = useRouter();
  const { address } = router.query;
  const org = useGetOrg(address as string);

  if (!org) return <Loader className="h-screen" />;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center">
      <div className="w-full h-300 relative group">
        <ActionButtons address={org.address} />
        <div className="w-full h-300 relative">
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

function ActionButtons({ address }: { address: string }) {
  return (
    <div className="absolute top-0 right-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 h-300 w-full z-10 p-5 flex gap-5 items-start justify-end">
      <div>
        <Link href={`${address}/create-type`}>
          <a
            href={`${address}/create-type`}
            className="text-md border border-cornflower-blue hover:text-white text-cornflower-blue mt-16 text-center rounded-3xl px-3 py-1.5"
          >
            Add new type
          </a>
        </Link>
      </div>
      <div>
        <Link href={`edit/${address}`}>
          <a
            href={`edit/${address}`}
            className="text-md border border-cornflower-blue hover:text-white text-cornflower-blue mt-16 text-center rounded-3xl px-3 py-1.5"
          >
            Edit
          </a>
        </Link>
      </div>
    </div>
  );
}

function CredentialGridView({ address }: { address: string }) {
  const { isLoading } = useGetCredentials();
  const credentials = useGetCredential(address);

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

  return (
    <div className="min-w-80 w-80 rounded-lg shadow-lg cursor-pointer transition-shadow duration-200 hover:shadow-xl overflow-hidden">
      <div className="w-80 h-200 relative rounded-lg">
        <Image
          src={resolveIpfsURL(credential.metadata.image)}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={`${credential.metadata.name} image`}
          className="rounded-lg rounded-bl-none rounded-br-none"
        />
      </div>
      <div className="p-2">
        <span className="text-xl block font-bold mb-2">
          {credential.metadata.name}
        </span>
        <span className="text-md block truncate">
          {credential.metadata.description}
        </span>
        {credential.metadata.external_link && (
          <div className="flex justify-center">
            <a
              href={credential.metadata.external_link}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-md border border-cornflower-blue hover:text-cornflower-blue mt-16 text-center rounded-3xl px-3 py-1.5"
            >
              Visit website
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
