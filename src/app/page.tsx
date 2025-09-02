"use client"

import styles from "./styles/page.module.css";

import { useEffect, useState } from "react";
import getCookie from "@/app/utils/cookies";
import { deletePost, getPostList, getPostListByUser, getUser } from "@/app/api/api";
import IUsuario from "@/app/interfaces/IUsuario";
import Link from "next/link";
import datetimeFormat from "@/app/utils/datetimeFormat";


export function ArtigoItem(post: IPost){
    return (
            <li>
              <div className={styles.artigo_titulo}>
                  <Link href={`/post/${post.id}`}>{datetimeFormat(post.updated_at!)} - {post.title}</Link>
                  <p>{post.content}</p>
              </div>
            </li>
    );
}

export default function Home() {
    const [error, setError] = useState<Error | null> (null);
    const [isLoaded, setIsLoaded] = useState <boolean> (false);
    const [postList, setPostList] = useState<IPost[]>([]);


    useEffect(()=>{
        
        getPostList().then((response)=>{
            setPostList(response.data); 
            setIsLoaded(true);
            
        }, (error)=>{
            setError(error)
        });

    },[]);



  
    if (error) return <p>Erro: {error.message}</p>;
    if (!isLoaded) return <p>Carregando...</p>;
  
  
    const list = postList.map((x: IPost) => (
            <ArtigoItem key={x.id} {...x}/>
    ));

  
  return (
    <div className={styles.container}>
  
      <ul>
        {list}
      </ul>
    </div>
  );
}