"use client"
import styles from "../styles/login.module.css";
import { doLogin } from "../api/api";
import React, { useRef, useState } from "react";
import IUsuario from "../interfaces/IUsuario";
import Link from "next/link";


export default function Login() {
  
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSucceeded, setIsSucceeded] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const input_usuario = useRef<HTMLInputElement>(null);
  const input_senha = useRef<HTMLInputElement>(null);

  function loginUsuarioHandlerClick() {
    const usuario: IUsuario = {
      username: input_usuario.current?.value || "",
      password: input_senha.current?.value || "",
    };

    console.log("usuário: ", usuario.username);
    console.log("senha: ", usuario.password);

    doLogin(usuario).then((json)=>{

      if (json.status === 200) {
        document.cookie = "token=" + json.data.access;
        document.cookie = "username=" + usuario.username;
        window.location.href = `/perfil`;
      }
    }, (error) =>{

      setIsLoaded(true);
      setError(error.message || "Erro desconhecido");
      setIsSucceeded(false);

      if(error.status == 401){
        setMessage("Acesso negado. Usuário e/ou senha inválidos");
      }

      if(error.status == 400){
        setMessage("Preencha todos os campos");
      }

    });
      
  }

  function limparCampos() {
    if (input_usuario.current) input_usuario.current.value = "";
    if (input_senha.current) input_senha.current.value = "";
    setError(null);
    setIsSucceeded(false);
    setMessage(null);
  }

  let className = "";
  if (error) className = styles.mensagem_erro;
  if (isSucceeded) className = styles.mensagem_sucesso;
  
  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold">Login</h1>

      <label>Usuário:</label>
      <input type="text" name="txt_usuario" ref={input_usuario} />

      <label>Senha:</label>
      <input type="password" name="txt_senha" ref={input_senha} />
      <div className={styles.esqueci_a_senha} style={{padding:0}}><Link href="/senha/redefinir">Esqueci a senha</Link></div>

      <div>
        <button 
        type="submit" 
        onClick={(e) => { e.preventDefault(); loginUsuarioHandlerClick(); }}
        className="bg-yellow-400 border rounded-lg hover:bg-yellow-500 shadow">Enviar</button>
        <button 
        type="reset" 
        onClick={(e) => { e.preventDefault(); limparCampos(); }}
        className="border rounded-lg hover:bg-stone-200 shadow">Limpar</button>
      </div>

      {message && <div className={className}>{message}</div>}
    </div>
  );
}
