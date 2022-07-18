import Layout from "../components/layout"
import styles from '../styles/stockpage.module.css'
import MyChart from '../components/stockpage/pricechart'
import {BASE_URL} from "../config/db_prod_checker";
import * as React from 'react';
import Error from 'next/error';
import Watchlist from '../components/watchlist/watchlist'
import StockCard from '../components/stockpage/stockheadercard'
import StickyHeadTable from "../components/stockpage/table";


  const postreq=(ticker)=>{
    return{
      "ticker_symbol" : 	ticker
    }
};
const postreqmodelA=(ticker)=>{
  return{
    "ticker_symbol" : 	ticker,
    "model_type"	: "1"
  }
};
const postreqmodelB=(ticker)=>{
  return{
    "ticker_symbol" : 	ticker,
    "model_type"	: "2"
  }
};
export async function getServerSideProps(context) {
  //const { tickerSymbol } = context.params; // 
  const ticker = context.query.tickerSymbol;
  const exchange = context.query.exchange;

    try{
            const response = await fetch (BASE_URL + "/api/stock/get_hsp", {
                method:'POST',
                body:JSON.stringify(postreq(ticker)),
                headers:{
                    'authorization':'NEXT_PUBLIC_API_SECRET_KEY 9ddf045fa71e89c6d0d71302c0c5c97e',
                    'Content-Type':'application/json'
                }
            });
            
            const predictionres  = await fetch(BASE_URL + "/api/stock/get_ml_prices", {
              method:'POST',
                body:JSON.stringify(postreqmodelA(ticker)),
                headers:{
                  'Content-Type':'application/json'
                }
            });

            const predictionresB  = await fetch(BASE_URL + "/api/stock/get_ml_prices", {
              method:'POST',
                body:JSON.stringify(postreqmodelB(ticker)),
                headers:{
                  'Content-Type':'application/json'
                }
            });
            const content  = await response.json();
            const predictionDataA = await predictionres.json();
            const predictionDataB = await predictionresB.json();
            
        return {
            props : {stockList:content, count:content.results.length,ticker: ticker,exchange:exchange,predictionDataA:predictionDataA,predictionDataB:predictionDataB },
        }
    }catch (error)
    {
        return{ props:{errorCode:500, message: 'Failed to fetch DB data'}}
    }
    
};


const StockPage = ({errorCode,message, stockList,ticker,exchange,count,predictionDataA,predictionDataB}) => {
    
  
    if(errorCode){
       return <Error statusCode= {errorCode} title={message}/>
    };

    return(
        
    <Layout>
    <div className={styles.chartarea}>
      <div className={styles.container}>
       <h2>Price Forecast </h2>
            <StockCard 
            tickerName = {ticker}
            lastprice = {stockList.results[count-1].Close}
            exchange = {exchange}
            lastupdated = {stockList.results[count-1].DateString}
            />
        
            <div className={styles.container_left}>
              <MyChart
              //@ts-ignore
                xyDataList = {stockList}
                pDataListA = {predictionDataA}
                pDataListB = {predictionDataB}
                tickerName = {ticker}
              />
            </div> 
            
            
            <div className={styles.container_right}>
              {/* <Watchlist/> */}
            </div> 
        </div>
        </div>
      <div className={styles.tablegrid}>
            <div className={styles.table1}>
              <StickyHeadTable pData={predictionDataA} />
            </div>
            <div className={styles.table2}>
              <StickyHeadTable pData={predictionDataB} />
            </div>
            </div>
            
    </Layout>
    )
}

export default StockPage


