import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";


function CodeEditor() {
  const [code, setCode] = useState("");

  return <ReactCodeMirror value={code} height="200px" theme={'dark'} onChange={setCode} />;
}

export default CodeEditor;
