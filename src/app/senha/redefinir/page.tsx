"use client"
import styles from "../../styles/redefinir-senha.module.css";
import { passwordReset } from "../../api/api";
import React, { useRef, useState } from "react";


export default function RedefinirSenha() {
  

  const [message, setMessage] = useState<string | null>(null);
  const [isSucceeded, setIsSucceeded] = useState<boolean>(false);

  const input_email = useRef<HTMLInputElement>(null);

  function RequestPasswordResetHandlerClick() {
    const email: string = input_email.current?.value || "";
    setMessage("Processando. Aguarde...");

    passwordReset(email).then((json)=>{

      if (json.status === 200) {
        setMessage("Um link de redefinição de senha foi enviado para seu e-mail");
        setIsSucceeded(true);
      }
    }, () =>{
      setMessage("E-mail não encontrado");

    });
    
  }

  function limparCampos() {
    if (input_email.current) input_email.current.value = "";
    setMessage(null);
  }

  const className: string = isSucceeded ? styles.mensagem_sucesso : styles.mensagem_erro;


  return (
    <div className={styles.container}>
      <h1>Redefinir senha</h1>

      <div style={isSucceeded? { display: "none" } : {}}>
        <label>E-mail:</label>
        <input type="text" name="txt_email" ref={input_email} />

        <div>
          <button type="submit" onClick={(e) => { e.preventDefault(); RequestPasswordResetHandlerClick(); }}>Enviar</button>
          <button type="reset" onClick={(e) => { e.preventDefault(); limparCampos(); }}>Limpar</button>
        </div>
      </div>

      <div className={className}>{message}</div>
    </div>
  );
}
