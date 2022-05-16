import Layout from "../components/layout"
import styles from '../styles/stockpage.module.css'
import MyChart from '../components/stockpagecomponents'
import MyFunctionalComponent from '../components/stockpagecomponents'
import StickyHeadTable from './table'
import * as React from 'react'

export const getServerSideProps = async ()=>{
    const response = await fetch ("http://localhost:3000/api/stock/get_all_stocks");
    const stocks = await response.json();
    return {
        props : {stockList:stocks.result}
    }
};

const StockPage = ({stockList}) => (
    <Layout>
        <div className={styles.chartarea}>
            <h1>Stock Analysis</h1>
            <MyChart
                //@ts-ignore
                myfunctionalcomponent={MyFunctionalComponent}
            />
        

        <div className='stock-price-table'>
        <StickyHeadTable />
        </div>

        </div>
    </Layout>
)

export default StockPage