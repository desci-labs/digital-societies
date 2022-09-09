import { ActionButtonLink, ActionButtons } from "components/ActionButtons/Index";
import Loader from "components/Loader";
import {
  useGetCredential,
} from "context/Credential/CredentialContext";
import { resolveIpfsURL } from "helper";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CredentialDetails() {
  const router = useRouter();
  const { id, address } = router.query;

  const credential = useGetCredential(address as string, parseInt(id as string));

  if (!credential) return <Loader className="h-screen" />;

  return (
    <div className="w-full grid grid-cols-1 content-start gap-y-5 place-items-center">
      <div className="w-full h-300 relative group">
        <ActionButtons>
          <ActionButtonLink title="Issue Credential" href={`${id}/mint?address=${credential.address}`}></ActionButtonLink>
          <ActionButtonLink title="Edit Metadata" href={`${id}/edit?address=${credential.address}`}></ActionButtonLink>
        </ActionButtons>
        <div className="w-full h-300 relative">
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
    </div>
  );
}
