'use client';

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export type RichTextEditorHandle = {
  getContent: () => string;
  setContent: (content: string) => void;
};

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [content, setContentState] = useState('');

  useEffect(() => {
    if (editorRef.current && toolbarRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarRef.current,
        },
        placeholder: 'Escreva alguma coisa...',
      });

      // sincroniza conteúdo com state
      quillRef.current.on('text-change', () => {
        setContentState(quillRef.current!.root.innerHTML);
      });
    }

    return () => {
      quillRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getContent: () => quillRef.current?.root.innerHTML || '',
    setContent: (newContent: string) => {
      if (quillRef.current) {
        quillRef.current.clipboard.dangerouslyPasteHTML(newContent);
        setContentState(newContent);
      }
    },
  }));

  return (
    <div>
      <div ref={toolbarRef}>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
        </span>
        <span className="ql-formats">
          <button className="ql-link" />
        </span>
        <span className="ql-formats">
          <button className="ql-clean" aria-label="limpar formatação" />
        </span>
      </div>
      <div ref={editorRef} style={{ height: '300px' }} />
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
