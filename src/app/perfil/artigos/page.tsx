"use client"

import styles from "../../styles/perfil_artigos.module.css";

import { useEffect, useState } from "react";
import getCookie from "@/app/utils/cookies";
import { deletePost, getPostListByUser, getUser } from "@/app/api/api";
import IUsuario from "@/app/interfaces/IUsuario";
import Link from "next/link";
import datetimeFormat from "@/app/utils/datetimeFormat";

type ArtigoItemProps = IPost & {
  deleteClickHandler: (id: string) => void;
};

export function ArtigoItem({ id, title, updated_at, deleteClickHandler }: ArtigoItemProps){
    return (
            <li>
            <div className={styles.artigo_titulo}>
                <Link href={`/artigo/${id}`} target="blank">{datetimeFormat(updated_at!)} - {title}</Link>
            </div>
            
            <div className={styles.acoes}>
                <Link href={`/perfil/artigos/edit/${id}`} title="editar">📝</Link> &nbsp;
                <Link href="#" title="excluir" onClick={(e)=>{e.preventDefault(); deleteClickHandler(id)}}>❌</Link>
            </div>
            </li>
    );
}

export default function Perfil() {
    const [user, setUser] = useState<IUsuario | null >(null);
    const [error, setError] = useState<Error | null> (null);
    const [isLoaded, setIsLoaded] = useState <boolean> (false);
    const [token, setToken] = useState<string>("");
    const [postList, setPostList] = useState<IPost[]>([]);



    useEffect(()=>{
        const cookie = getCookie()
        setToken(cookie.token);
        },[]);  

    useEffect(()=>{
        if (!token) return; 

        getUser(token).then((json)=>{
            setUser(json.data);
                
            }, (error) => {
                setError(error);

            });
    }, [token])

    useEffect(()=>{
        if (!user) return; 
        getPostListByUser(token, user!.username!).then((response)=>{
            setPostList(response.data); 
            setIsLoaded(true);
            
        }, (error)=>{
            setError(error)
        });

    },[user]);

    function deletePostClickHandler(key: string){
        const post: IPost | undefined = postList?.find(x => x.id === key);
        const confirmed = confirm(`Você tem certeza que deseja excluir o artigo "${post!.title}"?`);
     
        if (!confirmed) return;
     
        deletePost(token, key).then((response)=>{
            if (response.status === 204) setPostList(prev => prev.filter(p => p.id !== key)) 
        
        }, (error) => {
            alert(`Erro ao excluir artigo: ${error.message}`);
            console.log("error: ", error);
        });
       
    }

  
    if (error) return <p>Erro: {error.message}</p>;
    if (!isLoaded) return <p>Carregando...</p>;
  
    let list;
    if (postList) {
        list = postList.map((x: IPost) => (
            <ArtigoItem key={x.id} {...x} deleteClickHandler={deletePostClickHandler}/>
    ));
    } else{
        list = <li>Você não escreveu nenhum artigo</li>
    }

  
  return (
    <div className={styles.container}>
      <h1>Olá, {user?.username}!</h1>
      <p className={styles.new_post}><Link href="/perfil/artigos/create">Novo artigo</Link></p>
      <p>Aqui estão seus <b>artigos</b></p>

      <ul>
        {list}
      </ul>
    </div>
  );
}