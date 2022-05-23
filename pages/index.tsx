// pages/index.tsx
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import * as React from "react"
import Head from 'next/head'
import db_url from '../lib/db_prod_checker';

import DataTable from '../components/Table';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const getServerSideProps = async () => {

  const res = await fetch(db_url+'/api/stock/get_all_stocks');
  const stocks = await res.json();
  return {
    props : { stocks, length:stocks.result.length}
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
          
          
        <DataTable data={props}/>

        <a href='/stockpage'>Stockpage Example</a>
        <a href='/testpage'>Test Page</a>
      </div>
    </Layout>
  )
}


