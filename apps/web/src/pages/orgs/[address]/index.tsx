import { useRouter } from "next/router";
import Loader from "components/Loader";
import { useGetOrg } from "services/orgs/hooks";
import { CredentialGridView, Delegates, RevocationHistory } from "components/UI/Credential/Index";
import { ImageBanner, RoundedLogo } from "components/UI/Index";
import { getImageURL } from "helper";

export default function OrganisationDetails() {
  const router = useRouter();
  const { address } = router.query;
  const org = useGetOrg(address as string);
  console.log('org', org)
  if (!org) return <Loader className="h-screen" />;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center mb-10">
      <div className="w-full h-88 relative group">
        <ImageBanner src={getImageURL(org.metadata.image)} alt={org.metadata.name} />
        <RoundedLogo src={getImageURL(org.metadata.logo)} alt={org.metadata.name} />
      </div>
      <div className="container mx-auto mt-10">
        <span className="text-3xl block font-bold mb-2 text-left">
          {org.metadata.name} ({org.metadata.symbol})
        </span>
        <span className="text-lg block mb-2 text-left text-regent-gray">
          {org.metadata.description}
        </span>
      </div>
      <CredentialGridView address={org.address} />
      <Delegates address={org.address} />
      <RevocationHistory address={org.address} />
    </div>
  );
}

