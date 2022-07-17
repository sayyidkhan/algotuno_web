import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"


export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const buttonSize = { "height" : "4em" , "width" : "8em" };

<<<<<<< .merge_file_a44340
    const signOutAndRedirect = async () => {
        await Router.push('/');
        await signOut();
    };

    return (
        <header>
            <div className={styles.navbar}>
                <span className={styles.logo}>algotuno.io</span>
                <nav>
                    <ul className={styles.navItems}>
                        <li className={styles.navItem}>
                            <Link href="/main">
                                <a>Dashboard</a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/charts">
                                <a>Markets</a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/pricing">
                                <a>Pricing</a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/about">
                                <a>About Us</a>
                            </Link>
                        </li>
                        {session ? (
                            <li className={styles.navItem}>
                                <a onClick={() => signOutAndRedirect()}><b>Log Out</b></a>
                            </li>
                        ) : <></>}
                    </ul>
                </nav>
            </div>
        </header>
    )
=======
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
>>>>>>> .merge_file_a50840
}
