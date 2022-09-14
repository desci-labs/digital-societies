import Loader from 'components/Loader';
import Issuer from 'components/Transactors/Issuer';
import IssuerForm from 'components/Transactors/Issuer/IssuerForm';
import { useGetCredential } from 'context/Credential/CredentialContext';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

const CreateType: NextPage = () => {
  const router = useRouter();
  const { address, id } = router.query;

  const { isConnected } = useAccount()
  const credential = useGetCredential(address as string, parseInt(id as string));

  if (!credential) return <Loader />;

  return (
    <div className="py-0 px-10">
      <Head>
        <title>Issue Credential | {credential?.metadata.name}</title>
        <meta
          name="description"
          content={credential?.metadata.description}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isConnected && credential && <Issuer Form={IssuerForm} credential={credential} />}
    </div>
  );
};

export default CreateType;
