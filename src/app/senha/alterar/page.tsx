"use client"
import styles from "../../styles/redefinir-senha.module.css";
import { alterarSenha} from "../../api/api";
import React, { useRef, useState } from "react";
import getCookie from "@/app/utils/cookies";

export default function AlterarSenha() {
  
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSucceeded, setIsSucceeded] = useState<boolean>(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);

    
  const input_senha_atual = useRef<HTMLInputElement>(null);
  const input_nova_senha = useRef<HTMLInputElement>(null);
  const input_confirma_senha = useRef<HTMLInputElement>(null);


  function AlterarSenhaHandlerClick() {

    const senha_atual: string = input_senha_atual.current?.value || "";
    const nova_senha: string = input_nova_senha.current?.value || "";
    const confirma_senha: string = input_confirma_senha.current?.value || "";

    if (nova_senha !== confirma_senha){
      setMessage("As senhas são diferentes")
      setIsSucceeded(false);
      return;
    }
    
    const cookie = getCookie()
    

    alterarSenha(senha_atual, nova_senha, cookie.token).then((json)=>{

      if (json.status === 200) {
        setMessage("Sua senha foi redefinida com sucesso");
        setIsLoaded(true)
        setIsSucceeded(true);

        setTimeout(() => {
          window.location.href="/perfil";
        }, 2000);
      }
    }, (error) =>{
      console.log(error);
      setIsSucceeded(false);
      setIsLoaded(true);
      setError(error.message || "Erro desconhecido");
      if (error.status === 401){
        setMessage("Senha atual incorreta")
        
      }else{
        setMessage("Preencha todos os campos");
      }
      
    });
  }

  function limparCampos() {
    if (input_nova_senha.current) input_nova_senha.current.value = "";
    if (input_confirma_senha.current) input_confirma_senha.current.value = "";
    if (input_senha_atual.current) input_senha_atual.current.value = "";
   
    setError(null);
    setMessage(null);
  }


  const className: string = isSucceeded ? styles.mensagem_sucesso : styles.mensagem_erro;
  // if (!isLoaded) return ("Aguarde, carregando...")

  return (
    <div className={styles.container}>
      <h1>Redefinir senha</h1>

      <div style={!isTokenValid? { display: "none" } : {}}>
        <label>Senha atual:</label>
        <input type="password" name="txt_senha_atual" ref={input_senha_atual} />
        <label>Nova senha:</label>
        <input type="password" name="txt_nova_senha" ref={input_nova_senha} />
        <label>Confirme a senha:</label>
        <input type="password" name="txt_confirma_senha" ref={input_confirma_senha} />

        <div>
          <button type="submit" onClick={(e) => { e.preventDefault(); AlterarSenhaHandlerClick(); }}>Enviar</button>
          <button type="reset" onClick={(e) => { e.preventDefault(); limparCampos(); }}>Limpar</button>
        </div>
      </div>

      <div className={className}>{message}</div>
    </div>
  );
}
