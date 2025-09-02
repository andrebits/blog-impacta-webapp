"use client"
import styles from "../../../../styles/PostCreate.module.css";
import { ReactElement, useEffect, useRef, useState } from "react";
import getCookie from "@/app/utils/cookies";
import ReactEditor from "@/app/components/TextEditor2";
import { createPost, getPostById, updatePost } from "@/app/api/api";
import Link from "next/link";
import { IReactEditorHandle } from "@/app/interfaces/IReactEditorHandle";
import { useParams } from "next/navigation";

export default function UpdatePost() {
	const [error, setError] = useState<Error | null> (null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [isSucceded, setIsSucceded] = useState <boolean> (false);
	const [token, setToken] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [linkNewPost, setLinkNewPost] = useState<ReactElement | null>(null);
	const [post, setPost] = useState<IPost | null>(null);

	const input_title = useRef<HTMLInputElement>({} as HTMLInputElement);
	const input_content = useRef<IReactEditorHandle>({} as IReactEditorHandle);

	const params = useParams();
	const id = params.id;

	useEffect(()=>{
		const cookie = getCookie()
		setToken(cookie.token);
	},[]);  

	useEffect(()=>{
		if(!id) return;
		getPostById(id.toString()).then((response)=>{
			setPost(response.data);
			setIsLoaded(true);
			
		}, (error) =>{
			setIsLoaded(true);
			setError(error);

		});
	}, [id]);

	useEffect(()=>{
		if(post){
			input_title.current.value = post.title!;
			input_content.current.setContent(post.content!);
		}
	},[post]);


	function save(id: string){
		
		const post: IPost = {
			id: id.toString(),
			title: input_title.current?.value || "",
			content: input_content.current?.getContent() || "",
			};

		updatePost(token, post).then((response)=>{
			console.log("response:", response); 
			if(response.status == 201){
			setMessage("Seu artigo foi atualizado com sucesso. Para conferir ")
			setLinkNewPost(<Link href={`/post/${response.data.id}`}>Clique aqui</Link>);
			setIsSucceded(true);
			limparCampos();
			}
		},(error)=>{
			setError(error);
			console.log(error);
		});

	}

	

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
		<button type="submit" onClick={(e) => { e.preventDefault(); save(post!.id)}}>Salvar</button>
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