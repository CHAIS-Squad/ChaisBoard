// react
import { useState } from "react";
// codemirror
import ReactCodeMirror from "@uiw/react-codemirror";
import { langNames, loadLanguage } from "@uiw/codemirror-extensions-langs";

function CodeEditor() {
  const [language, setLanguage] = useState("python");
  const [indent, setIndent] = useState(2);
  const [autoComplete, setAutoComplete] = useState(true);
  const [editorDocuments, setEditorDocuments] = useState(["document-0"]);
  const [activeEditorDocument, setActiveEditorDocument] =
    useState("document-0");

  return (
    <div className="flex flex-col">
      <EditorHeader
        setLanguage={setLanguage}
        setIndent={setIndent}
        setAutoComplete={setAutoComplete}
      />

      {editorDocuments.map((editor) => {
        return (
          <EditorDocument
            key={editor}
            id={editor}
            activeEditor={activeEditorDocument}
            language={language}
            indent={indent}
            autoComplete={autoComplete}
          />
        );
      })}

      <EditorFooter
        editorDocuments={editorDocuments}
        setEditorDocuments={setEditorDocuments}
        activeEditorDocument={activeEditorDocument}
        setActiveEditorDocument={setActiveEditorDocument}
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

function EditorDocument({ id, activeEditor, language, indent, autoComplete }) {
  const [code, setCode] = useState("");
  const visibility = id === activeEditor ? "block" : "hidden";

  return (
    <div className={`${visibility}`}>
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

function EditorFooter({
  editorDocuments,
  setEditorDocuments,
  activeEditorDocument,
  setActiveEditorDocument,
}) {
  function createEditorDocument() {
    const editorId = `document-${editorDocuments.length}`;
    setEditorDocuments([...editorDocuments, editorId]);
    setActiveEditorDocument(editorId)
  }

  function toggleActiveEditorDocument(event) {
    setActiveEditorDocument(event.target.id);
  }

  function deleteEditorDocument(event) {
    const editorId = event.target.id;
    const updatedEditorDocuments = editorDocuments.filter(
      (document) => document !== editorId
    );
    setEditorDocuments(updatedEditorDocuments);
    if (editorId === activeEditorDocument) {
      setActiveEditorDocument("document-0");
    }
  }

  return (
    <div className="flex gap-2">
      <ul className="flex">
        {editorDocuments.map((editorDocument) => {
          return (
            <li
              key={editorDocument}
              id={editorDocument}
              className={`flex gap-1 px-2 ${
                editorDocument === activeEditorDocument
                  ? "font-semibold"
                  : "font-normal"
              }`}
            >
              <span
                id={editorDocument}
                onClick={toggleActiveEditorDocument}
                className="cursor-pointer"
              >
                {editorDocument}
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm7.75 9.75a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0 0 1.5h4.5Z"
                    clipRule="evenodd"
                    id={editorDocument}
                    onClick={deleteEditorDocument}
                    className="cursor-pointer"
                  />
                </svg>
              </span>
            </li>
          );
        })}
      </ul>
      <button onClick={createEditorDocument} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5ZM10 8a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 10 8Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default CodeEditor;
