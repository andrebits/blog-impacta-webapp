import Link from "next/link";
import styles from "../styles/header.module.css";
import DoLoginOrLogout from "./DoLoginOrLogout";

export default function HeaderAreaPublica({ username, token }: IPropsHeader) {
  return (
    <header className={styles.header}>
      <DoLoginOrLogout token={token} username={username} />
      <h1>Blog Impacta 2025</h1>
      <ul className={styles.menu_superior}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {/* <li>
          <Link href="#">Artigos</Link>
        </li> */}
        <li>
          <Link href="/autores">Autores</Link>
        </li>
        <li>
          <Link href="#">Categorias</Link>
        </li>
      </ul>
    </header>
  );
}
