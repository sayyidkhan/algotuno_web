import Layout from "../components/layout"
import styles from '../styles/stockpage.module.css'
import MyChart from '../components/stockpage/pricechart'
import {BASE_URL} from "../lib/db_prod_checker";
import * as React from 'react';
import Error from 'next/error';
import {authorization_check} from '../config/auth_check'
import StickyHeadTable from "../components/stockpage/table";
import predictionData from "../components/stockpage/predictionData.json"
interface Data {
    year: number;
    month: string;
    min: number;
    max: number;
    close: number;
    total:number;
  }
  
  function createData(
    year: number,
    month: string,
    min: number,
    max: number,
    close: number,
    total:number,
  ): Data {
    //const density = population / size;
    return { year, month, min, max, close, total };
  }


const rows = [
    createData(2022, "Apr", 145, 178, 156, -10.34),
    createData(2022, "May", 146, 172, 157, -7.34)
    //createData()
  ];

  const postreq=(ticker)=>{
    return{
      "ticker_symbol" : 	ticker,
      "start_date"	:	"2021-05-05",
      "end_date"	:	"2022-05-27",
      "sort"		:	"asc"
    }
};
export async function getServerSideProps(context) {
  //const { tickerSymbol } = context.params; // 
  const ticker = context.query.tickerSymbol;
    try{
            const response = await fetch (BASE_URL + "/api/stock/get_hsp", {
                method:'POST',
                body:JSON.stringify(postreq(ticker)),
                headers:{
                    'authorization':'NEXT_PUBLIC_API_SECRET_KEY 9ddf045fa71e89c6d0d71302c0c5c97e',
                    'Content-Type':'application/json'
                }
            });
            const content  = await response.json();
            
        return {
            props : {stockList:content, count:content.results.length,ticker: ticker },
        }
    }catch (error)
    {
        return{ props:{errorCode:500, message: 'Failed to fetch DB data'}}
    }
    
};

const StockPage = ({errorCode,message, stockList,ticker}) => {
    
  
    if(errorCode){
       return <Error statusCode= {errorCode} title={message}/>
    };

    return(
        
    <Layout>
        <div className={styles.chartarea}>
            <h1>Stock Analysis</h1>
            
            <MyChart
            //@ts-ignore
              xyDataList = {stockList}
              pDataList = {predictionData}
              tickerName = {ticker}
            />
        
         {/* <StickyHeadTable rows={rows}/>  */}
        </div>
    </Layout>
    )
}

export default StockPage


