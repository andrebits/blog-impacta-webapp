"use client"

import HeaderAreaPublica from "./headerAreaPublica";
import HeaderAreaPrivada from "./headerAreaPrivada";
import { useEffect, useState } from "react";
import getCookie from "../utils/cookies";
import { usePathname } from "next/navigation";

export default function Header() {
    const [username, setUsername] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const pathname = usePathname()
    
    
  useEffect(() => {
  
    const cookies = getCookie()
    setUsername(cookies.username ?? null);
    setToken(cookies.token ?? null);
    
  }, []);

  const isAreaRestrita = pathname.startsWith("/perfil");

  // se o usuário estiver acessando area restrita e o token existir, então o usuário está logado
  if (isAreaRestrita && (token !== null || token !== "" )) return <HeaderAreaPrivada token={token} username={username}/>;
  return <HeaderAreaPublica token={token} username={username} />;
}

