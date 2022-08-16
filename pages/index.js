import Head from 'next/head';
import DuckHuntGame from '../modules/DuckHuntGame';

export default function Home() {
  return (
    <>
      <Head>
        <title>Duck hunt</title>
        <meta name="description" content="Duck hunt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DuckHuntGame />
    </>
  );
}
