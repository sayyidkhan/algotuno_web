import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import styles from '../styles/Home.module.css'
import {
  MarketOverview,
  TechnicalAnalysis
} from "react-ts-tradingview-widgets";
import TradingViewWidget, { Themes } from "react-tradingview-widget";


export default function Home() {
  // use the useSession to get the user information
  // const { data: session } = useSession();
  // console.log("session", session);
  // const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Charts</title>
      </Head>

      <Layout>
        <main className={styles.main}>
          {/* {session ? <button onClick={() => signOut()}> Log Out</button> : <button onClick={() => router.push("/api/auth/signin")}>Sign In</button>} */}
        <h2>Real Time Analysis </h2> 
        <div style={{ height: 500,width:1000 }}>
        <TradingViewWidget
          symbol="NASDAQ:AAPL"
          theme={Themes.LIGHT}
          locale="en"
          autosize
        />
      </div>

      {/* <TechnicalAnalysis symbol={"NASDAQ:AAPL"} dark locale="en" /> */}
      <div>
        <h2>Market Overview</h2>
      </div>
      <MarketOverview locale="en" />

        </main>

      </Layout>
    </div>
  )
}

