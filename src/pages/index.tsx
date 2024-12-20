import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { BeerMenu } from '../components/BeerMenu/BeerMenu';  // パスを修正
import { useBeerData } from '../hooks/useBeerData';

const Home: NextPage = () => {
  const { beers, loading, error } = useBeerData();
  console.log('Home component:', { beers, loading, error });  // 状態を確認

  if (loading) {
    console.log('Loading state active');
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    console.log('Error state active:', error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
        {error}
      </div>
    );
  }

  console.log('Rendering beers:', beers);  // レンダリングされるデータを確認
  return (
    <>
      <Head>
        <title>Beer Menu Display</title>
      </Head>
      <main className="min-h-screen bg-beer-bg">
  <BeerMenu beers={beers} />
</main>
    </>
  );
};

export default Home;