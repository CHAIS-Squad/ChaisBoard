'use client';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const MultiLayerCanvas = dynamic(() => import('../components/MultiLayerCanvas'), {
  ssr: false,
});
import CodeEditor from "@/components/CodeEditor";

export default function Home() {
  return (
    <div>
      <Head>
        <title>ChaisBoard Whiteboard App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MultiLayerCanvas />
        <CodeEditor />
        </main>
    </div>
  );
}

