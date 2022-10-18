import DesocList from 'components/UI/Desoc/DesocList/DesocList';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="py-0 px-10">
      <DesocList />
    </div>
  );
};

export default Home;
