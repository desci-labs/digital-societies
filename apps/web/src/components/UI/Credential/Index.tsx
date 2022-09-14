import Loader from "components/Loader";
import useLaunchCredential from "components/Transactors/Credential/useLaunchCredential";
import { Metadata } from "components/Transactors/types";
import {
  Credential,
  useGetCredentials,
} from "context/Credential/CredentialContext";
import { useCanMutateOrg, useGetOrg } from "context/Factory/FactoryContext";
import { shortenText } from "helper";
import Link from "next/link";
import { useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ExternalLink, ImageBanner, RoundedLogo } from "../Index";

export function CredentialGridView({ address }: { address: string }) {
  const hasAccess = useCanMutateOrg(address);
  const org = useGetOrg(address);
  const { isLoading, credentials: data } = useGetCredentials();
  const credentials = data[address];
  const showCredenter = useLaunchCredential(org!);
  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto pb-5 pt-2 mt-10">
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
