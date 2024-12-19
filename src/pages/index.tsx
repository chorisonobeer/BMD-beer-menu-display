import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { BeerMenu } from '../components/BeerMenu/BeerMenu';  // パスを修正
import { useBeerData } from '../hooks/useBeerData';

const Home: NextPage = () => {
  const { beers, loading, error } = useBeerData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Beer Menu Display</title>
        <meta name="description" content="Real-time beer menu display" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BeerMenu beers={beers} />
      </main>
    </>
  );
};

export default Home;