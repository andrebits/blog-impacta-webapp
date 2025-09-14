"use client"

import styles from "../../styles/perfil_artigos.module.css";

import { useEffect, useState } from "react";
import getCookie from "@/app/utils/cookies";
import { deletePost, getAuthorById, getPostListByUser, getPostsByAuthor, getUser } from "@/app/api/api";
import IUsuario from "@/app/interfaces/IUsuario";
import Link from "next/link";
import datetimeFormat from "@/app/utils/datetimeFormat";
import { useParams } from "next/navigation";


export function ArtigoItem({ id, title, updated_at }: IPost){
    return (
            <li>
              <div className={styles.artigo_titulo}>
                  <Link href={`/artigo/${id}`}>{datetimeFormat(updated_at!)} - {title}</Link>
              </div>
            </li>
    );
}

export default function AuthorDetail() {
    const [author, setAuthor] = useState<IUsuario | null >(null);
    const [error, setError] = useState<Error | null> (null);
    const [isLoaded, setIsLoaded] = useState <boolean> (false);
    const [postList, setPostList] = useState<IPost[]>([]);

    const params = useParams();
    const authorUsername = params.username;

    useEffect(()=>{
      
        if (!authorUsername) return; 
        getPostsByAuthor(authorUsername.toString()).then((response)=>{
            setPostList(response.data); 
            setIsLoaded(true);
            
        }, (error)=>{
          setIsLoaded(true);
          if(error.response.status == 500) setError(Error(`${authorUsername} não escreveu nenhum artigo`))
        });

    },[authorUsername]);

    
    if (!isLoaded) return <p>Carregando...</p>;
  
    let list;
    if (postList) {
        list = postList.map((x: IPost) => (
          <ArtigoItem key={x.id} {...x}/>
    ));
    } 
  
  return (
    <div className={styles.container}>
      {!error ? <h1>Artigos de <span>{authorUsername}</span></h1> : <p>{error.message}</p>}
      <ul>
        {list}
      </ul>
    </div>
  );
}