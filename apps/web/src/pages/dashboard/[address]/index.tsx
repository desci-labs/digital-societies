import DesocDetails from 'components/UI/Desoc/DesocDetails';
import useDashboard from 'hooks/useDashboard';
import type { NextPage } from 'next';
import Head from 'next/head';

const Dashboard: NextPage = () => {
  const { org, hasAccess } = useDashboard();

  return (
    <div className="py-0 w-full">
      <Head>
        <title>Desoc | {org?.metadata.acronym}</title>
        <meta
          name="description"
          content={org?.metadata.name}
        />
      </Head>
      {!hasAccess && (
        <div className="flex justify-center items-center h-88">
          <h1 className='text-tint-primary capitalize font-bold text-xl'>You have no access to this Desoc!!!</h1>
        </div>
      )}
      {org && hasAccess && <DesocDetails desoc={org} showUpdaters={true}  />}
    </div>
  );
};

export default Dashboard;
