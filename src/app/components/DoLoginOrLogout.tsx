import Link from "next/link";
import LogoutButton from "./logoutButton";

export default function DoLoginOrLogout({ token, username }: IPropsHeader) {

  if (token && username) {
    return (
      <p>
        <Link href={`/perfil`}>Painel Administrativo</Link> |{" "}
        <LogoutButton></LogoutButton>
      </p>
    );
  }

  return (
    <p>
      <Link href="/cadastro">Cadastre-se</Link> | <Link href="/login">Login</Link>
    </p>
  );
}