import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"


export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const buttonSize = { "height" : "4em" , "width" : "8em" };

  return (
    <header>
      <div className={styles.navbar}>
        <span className={styles.logo}>algotuno.io</span>
        <nav>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/charts">
                <a>Charts</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about">
                <a>About Us</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
