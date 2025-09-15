import Link from "next/link";
import styles from "../styles/header.module.css";
import DoLoginOrLogout from "./DoLoginOrLogout";

export default function HeaderAreaPrivada({ username, token }: IPropsHeader) {
  return (
    <header className={styles.header}>
      <DoLoginOrLogout token={token} username={username} />
      <h1  className="text-3xl font-bold">Blog Impacta 2025</h1>
      <ul className={styles.menu_superior}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={`/perfil/artigos`}>Meus artigos</Link>
        </li>
        <li>
          <Link href={`/perfil/comentarios`}>Meus comentários</Link>
        </li>
      </ul>
    </header>
  );
}
