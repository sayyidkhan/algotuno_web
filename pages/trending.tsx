import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import styles from '../styles/Home.module.css'

export default function Home() {
  // use the useSession to get the user information
  // const { data: session } = useSession();
  // console.log("session", session);
  // const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Trending</title>
      </Head>

      <Layout>
        <main className={styles.main}>
          {/* {session ? <button onClick={() => signOut()}> Log Out</button> : <button onClick={() => router.push("/api/auth/signin")}>Sign In</button>} */}
        <h2>Under Construction</h2> 

        </main>

      </Layout>
    </div>
  )
}
