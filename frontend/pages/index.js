'use client';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const MultiLayerCanvas = dynamic(() => import('../components/MultiLayerCanvas'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Whiteboard App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MultiLayerCanvas />
      </main>
    </div>
  );
}

