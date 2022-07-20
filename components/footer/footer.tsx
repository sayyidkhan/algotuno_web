import Link from "next/link"
import styles from "./footer.module.css"
import {useSession} from "next-auth/react";
import SuperUserAuth from "../auth/SuperUserAuth";

export default function Footer() {
    const {data: session, status} = useSession();


    return (
        <footer className={styles.footer}>
            <hr/>
            <ul className={styles.navItems}>

                <li className={styles.navItem}>
                    <a href="https://github.com/algotuno/algotuno_web3">GitHub</a>
                </li>
                {
                    session ?
                        <li className={styles.navItem}>
                            <Link href="/admin/main">
                                <a>Admin Portal</a>
                            </Link>
                        </li> : <></>
                }
                {
                    session ?
                        <li className={styles.navItem}>
                            <Link href="/account/user_settings">
                                <a>Settings</a>
                            </Link>
                        </li> : <></>
                }
                <li className={styles.navItem}>
                    <span>Algotuno® 2022. All Rights Reserved</span>
                </li>
            </ul>

        </footer>
    )
}
