import useDashboard from 'hooks/useDashboard';
import type { NextPage } from 'next';
import Head from 'next/head';

const Dashboard: NextPage = () => {
  const { org } = useDashboard();

  return (
    <div className="py-0 px-10">
      <Head>
        <title>Desoc | {org?.metadata.acronym}</title>
        <meta
          name="description"
          content={org?.metadata.name}
        />
      </Head>
      {/* <DesocList /> */}
    </div>
  );
};

export default Dashboard;
