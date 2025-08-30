"use client"
import Image from "next/image";
import styles from "../styles/perfil.module.css";

import { useEffect, useState } from "react";
import { deleteAccount, getUser } from "@/app/api/api";
import getCookie from "@/app/utils/cookies";
import IUsuario from "@/app/interfaces/IUsuario";
import { errorMonitor } from "events";
import Link from "next/link";

export default function Usuario() {
  const [user, setUser] = useState<IUsuario | null >(null);
  const [error, setError] = useState<Error | null> (null);
  const [isLoaded, setIsLoaded] = useState <boolean> (false);
  const [token, setToken] = useState<string>("");
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [redirectionMessage, setRedirectionMessage] = useState<string>("");
  const [counter, setCounter] = useState(4);
  
   useEffect(()=>{
    const cookie = getCookie()
    setToken(cookie.token);
   },[]);  

  useEffect(()=>{
    if (!token) return; 
    //Isso está rodando antes de token ter sido atribuido. O que fazer?
    getUser(token).then((json)=>{
      setUser(json.data);
      setIsLoaded(true);
      
    }, (error) => {
      setError(error);
      setIsLoaded(true);
    });
  }, [token])


  function deleteAccountClickHandler(){
    const isDeletionConfirmed = confirm("Você tem certeza que deseja excluir permanentemente sua conta? Essa ação não pode ser desfeita");
    // alert(isDeletionConfirmed ? "Bora excluir" : "Desistiu");
    if (isDeletionConfirmed){
      console.log("token: ", token); // Ja confirmei que o token existe aqui
      deleteAccount(token).then((response)=>{

        if (response.status == 204){
          
          setIsDeleted(true);
        }
      
    }, (error) => {
      setError(error);
      setIsLoaded(true);
    });
    }
  }

  useEffect(() => {
    if (!isDeleted) return; // só roda se a conta foi deletada

    const intervalId = setInterval(() => {
      setCounter(prev => {
        const next = prev - 1;

        setRedirectionMessage(
          `Sua conta foi excluída com sucesso. Você será redirecionado para a página de login em ${next} segundos.`
        );

        if (next === 0) {
          clearInterval(intervalId);
          window.location.href = "/login";
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isDeleted]); // 🔹 depende de isDeleted


  if (error) return <p>{error.message}</p>;
  if (!isLoaded) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1>Olá, {user?.username}!</h1>
      <p>Meus dados:</p>
      <p><b>Usuário:</b> {user?.username}</p>
      <p><b>E-mail:</b> {user?.email}</p>
      <p><Link href="/senha/alterar">Alterar senha</Link></p>
      <p><Link href="#" onClick={(e) => {e.preventDefault(); deleteAccountClickHandler()}}>Excluir conta</Link></p>
      <p>{redirectionMessage}</p>
  </div>
  );
}