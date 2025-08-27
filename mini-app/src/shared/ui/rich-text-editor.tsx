'use client';

import { useEffect, useState } from 'react';
import {ContentState, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';



interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}


export function RichTextEditor({
  value,
  onChange,
  placeholder = "Введите текст поста...",
}: RichTextEditorProps) {
  const [editorState, setEditorState] = useState(
      () => EditorState.createWithContent(ContentState.createFromText(value))
  );

  useEffect(() => {
    onChange(editorState.getCurrentContent().getPlainText());
  }, [editorState]);
 
  return (
    <div className='border border-gray-200 rounded-lg p-2 flex flex-col gap-2'>
      <Editor 
      editorState={editorState}
      onChange={(editorState) => setEditorState(editorState)}
      placeholder={placeholder}
    />
    </div>
    
  );
}
