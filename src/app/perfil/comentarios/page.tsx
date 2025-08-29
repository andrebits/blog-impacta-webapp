"use client"
import Image from "next/image";
import styles from "../../styles/perfil_comentarios.module.css";
import { useEffect, useState } from "react";
import IUsuario from "@/app/interfaces/IUsuario";
import getCookie from "@/app/utils/cookies";
import { getUser } from "@/app/api/api";



export default function PerfilComentarios() {
  
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
      <p>Aqui estão seus <b>comentários</b>:</p>
        <ul>
          {/* artigos item */}
          <li>
            <div className={styles.artigo_titulo}>
              <a href="#">A Revolução da Inteligência Artificial: Como o Futuro Está Sendo Moldado Hoje</a>
              <p><a href="#">12/12/2025 12:12 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</a></p>
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