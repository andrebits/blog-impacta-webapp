"use client"
import styles from "../../../styles/PostCreate.module.css";
import { ReactElement, useEffect, useRef, useState } from "react";
import getCookie from "@/app/utils/cookies";
import ReactEditor from "@/app/components/TextEditor2";
import { createPost } from "@/app/api/api";
import Link from "next/link";
import { IReactEditorHandle } from "@/app/interfaces/IReactEditorHandle";

export default function CreatePost() {
  const [error, setError] = useState<Error | null> (null);
  const [isSucceded, setIsSucceded] = useState <boolean> (false);
  const [token, setToken] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [linkNewPost, setLinkNewPost] = useState<ReactElement | null>(null);

  const input_title = useRef<HTMLInputElement>({} as HTMLInputElement);
  const input_content = useRef<IReactEditorHandle>({} as IReactEditorHandle);

  function save(){
    const post: ICreatePost = {
        title: input_title.current?.value || "",
        content: input_content.current?.getContent() || "",
      };

    createPost(token, post).then((response)=>{
      console.log("response:", response); 
      if(response.status == 201){
        setMessage("Seu artigo foi publicado com sucesso. Para conferir ")
        setLinkNewPost(<Link href={`/post/${response.data.id}`}>Clique aqui</Link>);
        setIsSucceded(true);
        limparCampos();
        console.log(response);
      }
    },(error)=>{
      setError(error);
      console.log(error);
    });
  }

  useEffect(()=>{
  const cookie = getCookie()
  setToken(cookie.token);
  },[]);  

  function limparCampos() {
    if (input_title.current) input_title.current.value = "";
    if (input_content.current) input_content.current.setContent("");
  }

  return (
    <div className={styles.container}>
      <div className={styles.containter_title}>
        <label>Título: </label><br/>
        <input type="text" id="txt_title" ref={input_title} />
      </div>
      <div className={styles.containter_editor}>
        <label>Texto:</label><br/>
       <ReactEditor ref={input_content} />
      </div>
      <div className={styles.containter_buttons}>
        <button type="submit" onClick={(e) => { e.preventDefault(); save()}}>Publicar</button>
        <button type="reset" onClick={(e) => { 
          e.preventDefault(); 
          limparCampos();
          setMessage("");
          setLinkNewPost(null);
          }}>Limpar</button>
      </div>
      <div className={styles.message}>{isSucceded ? message: error?.message}{isSucceded ?  linkNewPost : ""}</div>

  </div>
  );
}