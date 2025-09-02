"use client"

import styles from "../styles/authors.module.css";
import { useEffect, useState } from "react";
import { getAuthors} from "@/app/api/api";
import Link from "next/link";



export function AuthorItem({username}: IAuthor){
    return (
            <li>
              <div className={styles.artigo_titulo}>
                  <Link href={`/autores/${username}`}>{username}</Link>
              </div>
            </li>
    );
}

export default function Autores() {
    const [error, setError] = useState<Error | null> (null);
    const [isLoaded, setIsLoaded] = useState <boolean> (false);
    const [authorsList, setAuthorsList] = useState<IAuthor[]>([]);


    useEffect(()=>{
        
        getAuthors().then((response)=>{
            const normalized: IAuthor[] = response.data.map((author: any) => ({
              id: String(author.author__id), 
              username: author.author__username,
            }));
            setAuthorsList(normalized); 
            setIsLoaded(true);
            
        }, (error)=>{
            setError(error)
        });

    },[]);



  
    if (error) return <p>Erro: {error.message}</p>;
    if (!isLoaded) return <p>Carregando...</p>;
  
    console.log(authorsList);
    const list = authorsList.map((author: IAuthor) => (
            <AuthorItem key={author.id} {...author}/>
    ));

  
  return (
    <div className={styles.container}>
      
      <h1>Lista de autores do site</h1>
      <ul>
        {list}
      </ul>
    </div>
  );
}