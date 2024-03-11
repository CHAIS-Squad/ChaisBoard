import Head from 'next/head';
import Whiteboard from '../components/Whiteboard'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Whiteboard App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Whiteboard />
      </main>
    </div>
  );
}

