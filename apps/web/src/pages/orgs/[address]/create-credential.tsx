import Loader from 'components/Loader';
import Credenter from 'components/Transactors/Credential';
import CredentialForm from 'components/Transactors/Credential/Form';
import { useGetOrg } from 'context/Factory/FactoryContext';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

const CreateType: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const {isConnected} = useAccount()
  const org = useGetOrg(address as string);
  

  if (!org) return <Loader />;

  return (
    <div className="py-0 px-10">
      <Head>
        <title>{org?.metadata.name} | Create new type</title>
        <meta
          name="description"
          content={org?.metadata.description}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isConnected && org && <Credenter Form={CredentialForm} org={org}  />}
    </div>
  );
};

export default CreateType;
