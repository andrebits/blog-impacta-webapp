'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => string;
  setContent: (content: string) => void;
};

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  // Estado para armazenar o conteúdo
  const [contentState, setContentState] = useState<string>('');

  useEffect(() => {
    
    if (editorRef.current && !quillRef.current) { 
      
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            // [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
          ],
        },
        placeholder: 'Escreva alguma coisa...',
      });
      

      // Sincroniza conteúdo com state
      quillRef.current.on('text-change', () => {
        setContentState(quillRef.current!.root.innerHTML);
      });
    }
    

    return () => {
      // quillRef.current = null; // Cleanup to avoid memory leaks
    };
  }, []);

  // Expor métodos para o componente pai
  useImperativeHandle(ref, () => ({
    getContent: () => {
      return contentState;
    },
    setContent: (content: string) => {
      if (quillRef.current) {
        quillRef.current.root.innerHTML = content;
        setContentState(content);
      }
    },
  }));

  return <div ref={editorRef} style={{ height: '300px' }} />;
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
