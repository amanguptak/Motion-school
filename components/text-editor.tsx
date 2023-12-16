"use client"
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'
import "react-quill/dist/quill.snow.css";
interface TextEditorProps{
    onChange : (value:string) => void;
    value:string;
    placeHolder: string;
}

const TextEditor = ({onChange,value,placeHolder}:TextEditorProps) => {

    const ReactQuill = useMemo(()=> dynamic(()=> import('react-quill'),{ssr:false}),[])

  return (
    <div>
        <ReactQuill
        theme="snow"
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
      
        />
    </div>
  )
}

export default TextEditor