"use client"
import Image from "next/image";
import styles from "../../styles/perfil_artigos.module.css";

import { useEffect, useState } from "react";
import getCookie from "@/app/utils/cookies";
import { getUser } from "@/app/api/api";
import IUsuario from "@/app/interfaces/IUsuario";

export default function Perfil() {
  const [user, setUser] = useState<IUsuario | null >(null);
  const [error, setError] = useState<Error | null> (null);
  const [isLoaded, setIsLoaded] = useState <boolean> (false);
  

  useEffect(()=>{
    const cookie = getCookie();
    const token = cookie.token;

    if (!token){
      setError(new Error("Token não encontrado"));
      setIsLoaded(true);
      return;
    }

    getUser(cookie.token).then((json)=>{
      setUser(json.data);
      setIsLoaded(true);
      
    }, (error) => {
      setError(error);
      setIsLoaded(true);
    });
  }, [])

  if (error) return <p>Erro: {error.message}</p>;
  if (!isLoaded) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1>Olá, {user?.username}!</h1>
      <p>Aqui estão seus <b>artigos</b></p>

        <ul>
          {/* artigos item */}
          <li>
            <div className={styles.artigo_titulo}>
              <a href="#">12/12/2025 12:12 - A Revolução da Inteligência Artificial: Como o Futuro Está Sendo Moldado Hoje</a>
            </div>
            
            <div className={styles.acoes}>
              <a href="#" title="editar">📝</a> &nbsp;
              <a href="#" title="excluir">❌</a>
            </div>
          </li>
          
          {/* artigos item */}
          <li>
            <div className={styles.artigo_titulo}>
              <a href="#">12/12/2025 12:12 - A Revolução da Inteligência Artificial: Como o Futuro Está Sendo Moldado Hoje</a>
            </div>
            
            <div className={styles.acoes}>
              <a href="#" title="editar">📝</a> &nbsp;
              <a href="#" title="excluir">❌</a>
            </div>
          </li>
          {/* artigos item */}
          <li>
            <div className={styles.artigo_titulo}>
              <a href="#">12/12/2025 12:12 - A Revolução da Inteligência Artificial: Como o Futuro Está Sendo Moldado Hoje</a>
            </div>
            
            <div className={styles.acoes}>
              <a href="#" title="editar">📝</a> &nbsp;
              <a href="#" title="excluir">❌</a>
            </div>
          </li>
          {/* artigos item */}
          <li>
            <div className={styles.artigo_titulo}>
              <a href="#">12/12/2025 12:12 - A Revolução da Inteligência Artificial: Como o Futuro Está Sendo Moldado Hoje</a>
            </div>
            
            <div className={styles.acoes}>
              <a href="#" title="editar">📝</a> &nbsp;
              <a href="#" title="excluir">❌</a>
            </div>
          </li>
          
         
        </ul>
    </div>
  );
}