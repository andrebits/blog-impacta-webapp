"use client"
import styles from "../styles/cadastro.module.css";
import { cadastrarUsuario } from "../api/api";
import React, { useRef, useState } from "react";
import IUsuario from "../interfaces/IUsuario";


export default function Cadastro() {
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSucceeded, setIsSucceeded] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const input_usuario = useRef<HTMLInputElement>(null);
  const input_email = useRef<HTMLInputElement>(null);
  const input_senha = useRef<HTMLInputElement>(null);

  async function cadastrarUsuarioHandlerClick() {
    const usuario: IUsuario = {
      username: input_usuario.current?.value || "",
      email: input_email.current?.value || "",
      password: input_senha.current?.value || "",
    };


    setIsLoaded(false);
    await cadastrarUsuario(usuario).then((json)=>{
      if (json.status === 201) {
        setMessage("Usuário cadastrado com sucesso! Vá para o login.");
        setIsLoaded(true);
        setIsSucceeded(true);
        setError(null);
      }
    }, (error) =>{
      if(error.status != 201){
        setIsLoaded(true);
        setError(error.message || "Erro desconhecido");
        setIsSucceeded(false);
        setMessage("Usuário já existe");

        if (usuario.username.trim() === "" ||
          usuario.email!.trim() === "" ||
          usuario.password.trim() === "") {
            setMessage("Preencha todos os campos");
          }
      }
    });
      
  }

  function limparCampos() {
    if (input_usuario.current) input_usuario.current.value = "";
    if (input_email.current) input_email.current.value = "";
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
      <h1>Cadastro</h1>

      <label>Usuário:</label>
      <input type="text" name="txt_usuario" ref={input_usuario} />

      <label>E-mail:</label>
      <input type="text" name="txt_email" ref={input_email} />

      <label>Senha:</label>
      <input type="password" name="txt_senha" ref={input_senha} />

      <div>
        <button type="submit" onClick={(e) => { e.preventDefault(); cadastrarUsuarioHandlerClick(); }}>Cadastrar</button>
        <button type="reset" onClick={(e) => { e.preventDefault(); limparCampos(); }}>Limpar</button>
      </div>

      {message && <div className={className}>{message}</div>}
    </div>
  );
}

       