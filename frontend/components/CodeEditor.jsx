// react
import { useState } from "react";
// codemirror
import ReactCodeMirror from "@uiw/react-codemirror";
import { langNames, loadLanguage } from "@uiw/codemirror-extensions-langs";

function CodeEditor() {
  const [language, setLanguage] = useState("python");
  const [indent, setIndent] = useState(2);
  const [autoComplete, setAutoComplete] = useState(true);

  return (
    <div className="flex flex-col">
      <EditorHeader
        setLanguage={setLanguage}
        setIndent={setIndent}
        setAutoComplete={setAutoComplete}
      />

      <EditorDocument
        language={language}
        indent={indent}
        autoComplete={autoComplete}
      />
    </div>
  );
}

function EditorHeader({ setLanguage, setIndent, setAutoComplete }) {
  function updateLanguage(event) {
    setLanguage(event.target.value);
  }

  function updateIndent(event) {
    setIndent(parseInt(event.target.value));
  }

  function toggleAutoComplete(event) {
    setAutoComplete(event.target.checked);
  }

  return (
    <div className="flex">
      <label htmlFor="language">Language</label>
      <select
        name="language"
        id="language"
        defaultValue={"python"}
        onChange={updateLanguage}
      >
        {langNames.map((lang) => {
          return (
            <option key={lang} value={lang}>
              {lang}
            </option>
          );
        })}
      </select>

      <label htmlFor="tabSize">Indent</label>
      <select
        name="tabSize"
        id="tabSize"
        defaultValue={"2"}
        onChange={updateIndent}
      >
        <option value="2">2 Spaces</option>
        <option value="4">4 Spaces</option>
      </select>

      <label htmlFor="autoComplete">Completion</label>
      <input
        type="checkbox"
        name="autoComplete"
        id="autoComplete"
        defaultChecked
        onChange={toggleAutoComplete}
      />
    </div>
  );
}

function EditorDocument({ language, indent, autoComplete }) {
  const [code, setCode] = useState("");

  return (
    <div className="">
      <ReactCodeMirror
        value={code}
        height="300px"
        theme={"dark"}
        extensions={[loadLanguage(language)]}
        basicSetup={{ tabSize: indent, autocompletion: autoComplete }}
        onChange={setCode}
      />
    </div>
  );
}

export default CodeEditor;
