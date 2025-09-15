"use client"
import styles from "../../styles/post.module.css";
import { getPostById } from "../../api/api";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useParams } from "next/navigation";
import datetimeFormat from "@/app/utils/datetimeFormat";


export default function Post() {
  
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isSucceeded, setIsSucceeded] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [post, setPost] = useState<IPost | null>(null);

    const params = useParams();
    const id = params.id;

    useEffect(()=>{
        if(!id) return;
        getPostById(id.toString()).then((response)=>{
            setPost(response.data);
            setIsLoaded(true);
           
        }, (error) =>{

            setIsLoaded(true);
            setError(error);
            setIsSucceeded(false);

        });
        
    }, [id]);


  
  if (error) return error.message;
  if (!isLoaded) return "Carregando...";
  
  return (
    <div className={styles.container}>
        <h1  className="text-2xl font-bold">{post?.title}</h1>
        <p className={styles.author}>Por <span>{post?.author} - </span>Atualizado em {datetimeFormat(post?.updated_at!)}</p><br/>
        <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
    </div>
  );
}
