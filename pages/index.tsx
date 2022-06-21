// pages/index.tsx
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import * as React from "react"
import loadable from '@loadable/component'
import Head from 'next/head'
import {BASE_URL} from "../config/db_prod_checker";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Spinner } from 'theme-ui'
import Watchlist from '../components/watchlist/watchlist'

const DataTable = loadable(() => import('../components/index/Table'));
const StocksList = loadable(() => import('../components/index/Table'));


// export const getServerSideProps = async () => {
// try{
//   const res = await fetch(BASE_URL + '/api/stock/get_ml_prices?input=%7B%0A%09%22ticker_symbol%22%20%3A%20%22AAPL%22%2C%0A%09%22model_type%22%09%3A%20%221%22%0A%7D');
//   const modelA = await res.json();
//   return {
//       props: {modelA}
//   }
// }
//   catch (error)
//   {  
//     return{ props:{errorCode:500,message: 'Failed to fetch DB data'}}
//   }

// };

export default function Page (props){
  console.log(props)
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.containers}>
            <div className={styles.container_left}> 
              {/* improve loading speed of landing page */}
                {/* <DataTable data={props} fallback={<Spinner/>}/>  */}
                <StocksList/>
            </div>
            <div className={styles.container_right}>
            <Watchlist/>     
            </div>
        
      </div>
    </Layout>
  )
}


