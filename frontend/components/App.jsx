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
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  const toggleCodeEditor = () => setShowCodeEditor(!showCodeEditor);

  return (
    <div style={{ display: 'flex' }}>
      <div className="sidebar">
        <Button onClick={toggleCodeEditor}>Add Code Editor</Button>
      </div>
      <main style={{ flex: 1 }}>
        <MultiLayerCanvas />
      </main>
      <div style={{ maxWidth: '300px', width: '100%' }}>
        <Collapse in={showCodeEditor}>
          <div>
            <CodeEditor />
          </div>
        </Collapse>
      </div>
    </div>
  );
}
