// pages/index.tsx
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import * as React from "react"
import loadable from '@loadable/component'
import Head from 'next/head'
import {BASE_URL} from "../lib/db_prod_checker";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Spinner } from 'theme-ui'

const DataTable = loadable(() => import('../components/Table'));

export const getServerSideProps = async () => {
  console.log(BASE_URL);
  const res = await fetch(BASE_URL + '/api/stock/get_all_stocks');
  const stocks = await res.json();
  return {
      props: {stocks, length: stocks.result.length}
  };
};

export default function Page (props){
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      
      <div className={styles.main}>

        <h1>Stock Prices by Market Cap 
          <p className={styles.myh}>
            <WarningAmberIcon sx={{ fontSize: 10 }}/> Pricing data updated on daily basis. Currency in USD.
          </p>
        </h1>
          
        {/* improve loading speed of landing page */}
        <DataTable data={props} fallback={<Spinner/>}/>

        
        

        <a href='/stockpage'>Stockpage Example</a>
        <a href='/testpage'>Test Page</a>
      </div>
    </Layout>
  )
}


