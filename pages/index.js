import Head from 'next/head';
import Image from 'next/image';
import { DuckHuntGame } from '../modules/DuckHuntGame/DuckHuntGame';

export default function Home() {
  return (
    <>
      <Head>
        <title>Duck hunt</title>
        <meta name="description" content="Duck hunt demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DuckHuntGame />
    </>
  );
}
