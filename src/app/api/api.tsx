import IUsuario from "../interfaces/IUsuario";
import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function cadastrarUsuario(usuario: IUsuario) {
    
    return axios.post(`${BASE_API_URL}/user/registration/`, {
        username: usuario.username, 
        email: usuario.email, 
        password: usuario.password})
}

export async function doLogin(usuario: IUsuario) {
    
    return axios.post(`${BASE_API_URL}/token/`, {
        username: usuario.username, 
        password: usuario.password})
}

export async function getUser(token: string) {
    
    return await axios.get(`${BASE_API_URL}/user/`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function passwordReset(email: string) {
    
    return await axios.post(`${BASE_API_URL}/password_reset/`,  {
        email: email
    })
}

export async function definirNovaSenha(senha: string, token: string) {
    
    return await axios.post(`${BASE_API_URL}/password_reset/confirm/`,  {
        password: senha,
        token: token,
    })
}

export async function tokenValidator(token: string) {
    
    return await axios.post(`${BASE_API_URL}/password_reset/validate_token/`,  {
        token: token
    })
}

export async function alterarSenha(
  senhaAtual: string,
  novaSenha: string,
  token: string
) {
  return await axios.put(
    `${BASE_API_URL}/user/change_password`, 
    {
      old_password: senhaAtual,   
      new_password: novaSenha,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export async function deleteAccount(
  token: string
) {
  return await axios.delete(
    `${BASE_API_URL}/user/delete`, 
    
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );
}