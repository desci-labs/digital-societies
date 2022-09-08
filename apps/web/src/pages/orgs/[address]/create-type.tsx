import Loader from 'components/Loader';
import Launcher from 'components/Transactors/Launcher/Launcher';
import TokenTypeTransactor from 'components/Transactors/TypeLauncher';
import { useGetOrg } from 'context/Factory/FactoryContext';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const CreateType: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
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
      {org && <TokenTypeTransactor org={org} />}
    </div>
  );
};

export default CreateType;
