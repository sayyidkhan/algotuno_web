import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
const AboutPage = () => (
  <Layout>
    <Head>
      <title>About Us</title>
    </Head>
    <div className={styles.main}>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
    </div>
    
  </Layout>
)

export default AboutPage
