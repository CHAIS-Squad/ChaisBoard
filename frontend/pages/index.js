'use client';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTheme } from '@/contexts/theme';
const MultiLayerCanvas = dynamic(
  () => import('../components/MultiLayerCanvas'),
  {
    ssr: false,
  }
);
import CodeEditor from '@/components/CodeEditor';
import App from '@/components/App';

export default function Home() {
  const { theme } = useTheme();

  return (
    <div>
      <Head>
        <title>ChaisBoard Whiteboard App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        data-bs-theme={theme}
      >
        <App />
      </main>
    </div>
  );
}
