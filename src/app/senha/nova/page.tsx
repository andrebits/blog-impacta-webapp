"use client"
import styles from "../../styles/redefinir-senha.module.css";
import { definirNovaSenha, passwordReset, tokenValidator } from "../../api/api";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";



export default function NovaSenha() {
  
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSucceeded, setIsSucceeded] = useState<boolean>(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);

  const input_nova_senha = useRef<HTMLInputElement>(null);
  const input_confirma_senha = useRef<HTMLInputElement>(null);

  const params = useSearchParams();
  const token = params.get("token");
  // console.log("token: ", token);

  // async function validaToken() {
  //   await tokenValidator(token!).then((response) =>{
  //     console.log("response: ", response)
  //     // if (response.status == 200) {

  //     //   setIsTokenValid(true) 
  //     // }
  //   }, (error) => {
  //     console.log("error: ", error)
  //   });
  // }

  // validaToken();

  // useEffect(()=>{

  //   if(isTokenValid){
  //     setMessage(null)
  //   } else{
  //     setMessage("Seu link expirou, solicite novamente.");
  //   }
  // }, [isTokenValid]);

  function novaSenhaHandlerClick() {
    const nova_senha: string = input_nova_senha.current?.value || "";
    const confirma_senha: string = input_confirma_senha.current?.value || "";

    if (nova_senha !== confirma_senha){
      setMessage("As senhas são diferentes")
      setIsSucceeded(false);
      return;
    }

    definirNovaSenha(nova_senha, token!).then((json)=>{

      if (json.status === 200) {
        setMessage("Sua senha foi redefinida com sucesso");
        setIsLoaded(true)
        setIsSucceeded(true);
      }
    }, (error) =>{
      console.log(error);
      setIsLoaded(true);
      setError(error.message || "Erro desconhecido");
      setMessage("Seu link expirou, solicite novamente.");

    });
      
  }

  function limparCampos() {
    if (input_nova_senha.current) input_nova_senha.current.value = "";
    if (input_confirma_senha.current) input_confirma_senha.current.value = "";
   
    setError(null);
    setMessage(null);
  }


  const className: string = isSucceeded ? styles.mensagem_sucesso : styles.mensagem_erro;
  // if (!isLoaded) return ("Aguarde, carregando...")

  return (
    <div className={styles.container}>
      <h1>Redefinir senha</h1>

      <div style={!isTokenValid? { display: "none" } : {}}>
        <label>Nova senha:</label>
        <input type="password" name="txt_nova_senha" ref={input_nova_senha} />
        <label>Confirme a senha:</label>
        <input type="password" name="txt_confirma_senha" ref={input_confirma_senha} />

        <div>
          <button type="submit" onClick={(e) => { e.preventDefault(); novaSenhaHandlerClick(); }}>Enviar</button>
          <button type="reset" onClick={(e) => { e.preventDefault(); limparCampos(); }}>Limpar</button>
        </div>
      </div>

      <div className={className}>{message}</div>
    </div>
  );
}
