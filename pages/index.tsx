// pages/index.tsx
import prisma from '../lib/prisma';
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import * as React from "react"
import Head from 'next/head'

import DataTable from '../components/Table';

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/stock/get_all_stocks");
  const stocks = await res.json();
  return {
    props : { stocks, length:stocks.result.length},
    // props : {stocksList:stocks.result}
  };
};

export default function Page (props){
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
      <p>
        {/* {JSON.stringify(props.stocks.result)} */}
        {/* {JSON.stringify(props.stocks.result)} */}
      </p>
      <DataTable data={props}/>

      <a href='/stockpage'>Stockpage Example</a>
      <a href='/testpage'>Test Page</a>
      </div>
    </Layout>
  )
}


