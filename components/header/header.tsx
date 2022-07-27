import Link from "next/link"
import {signOut, useSession} from "next-auth/react"
import styles from "./header.module.css"
import Router from "next/router";


export default function Header() {
    const {data: session, status} = useSession();
    const loading = status === "loading";
    const buttonSize = {"height": "4em", "width": "8em"};

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
                        {
                            session ?
                                <li className={styles.navItem}>
                                    <Link href="/main">
                                        <a>Dashboard</a>
                                    </Link>
                                </li> : <></>
                        }
                        {
                            session ?
                                <li className={styles.navItem}>
                                    <Link href="/charts">
                                        <a>Markets</a>
                                    </Link>
                                </li> : <></>
                        }
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
}