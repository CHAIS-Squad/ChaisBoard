import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, Collapse } from 'react-bootstrap';

const CodeEditor = dynamic(() => import('../components/CodeEditor'), {
  ssr: false,
});
const MultiLayerCanvas = dynamic(() => import('../components/MultiLayerCanvas'), {
    ssr: false,
  });

export default function App() {

  return (
    <div style={{ display: 'flex' }}>
      <main style={{ flex: 1 }}>
        <MultiLayerCanvas />
        <CodeEditor />
      </main>
    </div>
  );
}
