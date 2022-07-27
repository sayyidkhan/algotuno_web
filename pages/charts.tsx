import Head from 'next/head'
import Layout from '../components/layout';
import styles from '../styles/Home.module.css'
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { MarketOverview } from "react-ts-tradingview-widgets";




export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Charts</title>
      </Head>

      <Layout>
        <div className={styles.main}>
          {/* {session ? <button onClick={() => signOut()}> Log Out</button> : <button onClick={() => router.push("/api/auth/signin")}>Sign In</button>} */}
        <h2>Real Time Analysis </h2> 
        <div style={{ height: "35rem",width:"90%",padding:30 }}>
        <AdvancedRealTimeChart autosize></AdvancedRealTimeChart>
      </div>
      <div>
        <h2>Market Overview</h2>
      </div>
      <MarketOverview  height={600} width={500} showFloatingTooltip></MarketOverview>
        </div>

      </Layout>
    </div>
  )
}
