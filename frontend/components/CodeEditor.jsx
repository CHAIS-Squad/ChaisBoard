// react
import { useState } from 'react';
// codemirror
import ReactCodeMirror from '@uiw/react-codemirror';
import { langNames, loadLanguage } from '@uiw/codemirror-extensions-langs';

function CodeEditor({ toggleCodeEditor }) {
  const [language, setLanguage] = useState('python');
  const [indent, setIndent] = useState(2);
  const [autoComplete, setAutoComplete] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [editorDocuments, setEditorDocuments] = useState(['doc-0']);
  const [activeEditorDocument, setActiveEditorDocument] = useState('doc-0');

  return (
    <div className='flex flex-col gap-1 w-[25vw] p-1 bg-zinc-300 rounded-lg shadow-md'>
      <EditorHeader
        setLanguage={setLanguage}
        setIndent={setIndent}
        setAutoComplete={setAutoComplete}
        theme={theme}
        setTheme={setTheme}
        toggleCodeEditor={toggleCodeEditor}
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
            theme={theme}
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

function EditorHeader({
  setLanguage,
  setIndent,
  setAutoComplete,
  theme,
  setTheme,
  toggleCodeEditor,
}) {
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
    <div className='flex gap-2 justify-evenly'>
      <button onClick={toggleCodeEditor}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='w-4 h-4'
        >
          <path
            fillRule='evenodd'
            d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {/* <label htmlFor="language">Language</label> */}
      <select
        name='language'
        id='language'
        defaultValue={'python'}
        onChange={updateLanguage}
        className='flex-1 bg-zinc-50 rounded-lg text-sm'
      >
        {langNames.map((lang) => {
          return (
            <option key={lang} value={lang}>
              {lang}
            </option>
          );
        })}
      </select>

      {/* <label htmlFor="tabSize">Indent</label> */}
      <select
        name='tabSize'
        id='tabSize'
        defaultValue={'2'}
        onChange={updateIndent}
        className='flex-1 bg-zinc-50 rounded-lg text-sm'
      >
        <option value='2'>2 Spaces</option>
        <option value='4'>4 Spaces</option>
      </select>

      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4'
          >
            <path d='M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='w-4 h-4'
          >
            <path d='M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z' />
          </svg>
        )}
      </button>

      <div className='flex gap-1'>
        <label htmlFor='autoComplete' className='text-sm'>
          Completion
        </label>
        <input
          type='checkbox'
          name='autoComplete'
          id='autoComplete'
          defaultChecked
          onChange={toggleAutoComplete}
        />
      </div>
    </div>
  );
}

function EditorDocument({
  id,
  activeEditor,
  language,
  indent,
  autoComplete,
  theme,
}) {
  const [code, setCode] = useState('');
  const visibility = id === activeEditor ? 'block' : 'hidden';

  return (
    <div className={`${visibility}`}>
      <ReactCodeMirror
        value={code}
        height='40vh'
        theme={theme}
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
    const editorId = `doc-${editorDocuments.length}`;
    setEditorDocuments([...editorDocuments, editorId]);
    setActiveEditorDocument(editorId);
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
      setActiveEditorDocument('doc-0');
    }
  }

  return (
    <div className='flex gap-2 justify-between text-sm'>
      <ul className='flex gap-1 '>
        {editorDocuments.map((editorDocument) => {
          return (
            <li
              key={editorDocument}
              id={editorDocument}
              className={`flex gap-1 px-2 items-center  rounded-md ${
                editorDocument === activeEditorDocument
                  ? 'font-bold bg-zinc-400 shadow-md'
                  : 'font-normal bg-zinc-100 shadow-sm'
              }`}
            >
              <span
                id={editorDocument}
                onClick={toggleActiveEditorDocument}
                className='cursor-pointer'
              >
                {editorDocument}
              </span>
              {editorDocument !== 'doc-0' && (
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm7.75 9.75a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0 0 1.5h4.5Z'
                      clipRule='evenodd'
                      id={editorDocument}
                      onClick={deleteEditorDocument}
                      className='cursor-pointer'
                    />
                  </svg>
                </span>
              )}
            </li>
          );
        })}
        <li className='flex items-center px-2 bg-zinc-100 shadow-sm rounded-md'>
          <button onClick={createEditorDocument} className='cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5ZM10 8a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 10 8Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CodeEditor;
