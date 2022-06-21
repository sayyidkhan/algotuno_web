// pages/index.tsx
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import * as React from "react"
import loadable from '@loadable/component'
import Head from 'next/head'
import {BASE_URL} from "../config/db_prod_checker";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Watchlist from '../components/watchlist/watchlist'


const StocksList = loadable(() => import('../components/index/Table'));


export default function Page (props){
  console.log(props)
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.containers}>
            <div className={styles.container_left}> 
        
                <StocksList/>
            </div>
            <div className={styles.container_right}>
            <Watchlist/>     
            </div>
        
      </div>
    </Layout>
  )
}


