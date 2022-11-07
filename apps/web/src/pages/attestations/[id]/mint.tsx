import Loader from "components/Loader";
import Issuer from "components/Transactors/TokenRecipient";
import IssuerForm from "components/Transactors/TokenRecipient/Issuer/IssuerForm";
import { useGetAttestation } from "services/attestations/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const CreateType: NextPage = () => {
  const router = useRouter();
  const { address, id } = router.query;

  const { isConnected } = useAccount();
  const attestation = useGetAttestation(
    address as string,
    parseInt(id as string)
  );

  if (!attestation) return <Loader />;

  return (
    <div className="py-0 px-10">
      <Head>
        <title>Issue attestation | {attestation?.metadata.name}</title>
        <meta name="description" content={attestation?.metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isConnected && attestation && (
        <Issuer Form={IssuerForm} attestation={attestation} />
      )}
    </div>
  );
};

export default CreateType;
