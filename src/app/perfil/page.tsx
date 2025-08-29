"use client"
import Image from "next/image";
import styles from "../styles/perfil.module.css";

import { useEffect, useState } from "react";
import { getUser } from "@/app/api/api";
import getCookie from "@/app/utils/cookies";
import IUsuario from "@/app/interfaces/IUsuario";
import { errorMonitor } from "events";
import Link from "next/link";

export default function Usuario() {
  const [user, setUser] = useState<IUsuario | null >(null);
  const [error, setError] = useState<Error | null> (null);
  const [isLoaded, setIsLoaded] = useState <boolean> (false);
  
  

  useEffect(()=>{
    const cookie = getCookie()

    getUser(cookie.token).then((json)=>{
      setUser(json.data);
      setIsLoaded(true);
      
    }, (error) => {
      setError(error);
      setIsLoaded(true);
    });
  }, [])

  if (error) return <p>{error.message}</p>;
  if (!isLoaded) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1>Olá, {user?.username}!</h1>
      <p>Meus dados:</p>
      <p><b>Usuário:</b> {user?.username}</p>
      <p><b>E-mail:</b> {user?.email}</p>
      <p><Link href="/senha/alterar">Alterar senha</Link></p>
  </div>
  );
}