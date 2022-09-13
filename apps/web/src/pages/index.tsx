import ListOrgs from 'components/Views/ListOrgs';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="py-0 px-10">
      <Head>
        <title>Credential Manager App</title>
        <meta
          name="description"
          content="Credential manager app by Desci Labs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListOrgs />
    </div>
  );
};

export default Home;
