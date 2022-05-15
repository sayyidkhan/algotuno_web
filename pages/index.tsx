import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
<<<<<<< HEAD
import ColumnGroupingTable from './table'
export default function Page () {
  return (
    <Layout>
      <Head>
      <title>Home</title>
      </Head>
      
      <div className={styles.main}>
      <h1 >NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
      </p>
      <a href='/stockpage'>Stockpage Example</a>
      <a href='/testpage'>Test Page</a>

      
      </div>
    </Layout>
  )
=======
import BasicTable from "../components/sample/MUISampleTable";

export default function Page() {
    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>

            <div className={styles.main}>
                <h1>NextAuth.js Example</h1>
                <p>
                    This is an example site to demonstrate how to use <a
                    href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
                </p>
                <a href='/stockpage'>Stockpage Example</a>
                <a href='/testpage'>Test Page</a>

                <BasicTable/>
            </div>
        </Layout>
    )
>>>>>>> dev
}