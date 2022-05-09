import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

export default function Page () {
  return (
    <Layout>
      <Head>
        
      </Head>
      <div className={styles.main}>
      <h1 >NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
      </p>
      </div>
    </Layout>
  )
}