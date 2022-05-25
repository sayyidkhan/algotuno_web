import Layout from "../components/layout"
import styles from '../styles/stockpage.module.css'
import MyChart from '../components/stockpagecomponents'
import MyFunctionalComponent from '../components/stockpagecomponents'
//import StickyHeadTable from './table'
import {BASE_URL} from "../lib/db_prod_checker";
import * as React from 'react'
import Error from 'next/error'

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


const postreq ={
    "ticker_symbol" : 	"AAPL",
	"start_date"	:	"2021-01-01",
	"end_date"	:	"2021-05-01",
	"sort"		:	"desc"
};



export const getServerSideProps = async ()=>{
    try{
            const response = await fetch (BASE_URL + "/api/stock/get_hsp", {
                method:'POST',
                body:JSON.stringify(postreq),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const stockData = await response.json();
        return {
            props : {stockList:stockData.results[0], count:stockData.results.length}
          
        }
    }catch (error)
    {
        return{ props:{errorCode:500,message: 'Failed to fetch DB data'}}
    }
    
};


const StockPage = ({errorCode,message, stockList, count}) => {
   
    if(errorCode){
       return <Error statusCode= {errorCode} title={message}/>
    }
    
    return(
        
    <Layout>
        <div className={styles.chartarea}>
            <h1>Stock Analysis</h1>
            
            <MyChart
                //@ts-ignore
                myfunctionalcomponent={MyFunctionalComponent}
            />
        
            <div>
                <h2>There are {count} days of data for AAPL for the period "start_date"	:	"2021-01-01",
	            "end_date"	:	"2021-05-01"</h2>
                <h2>test data from db {stockList.DateString}</h2>
            </div>   
        
        
         {/* <StickyHeadTable rows={rows}/>  */}
        

        </div>
    </Layout>
    )
}

export default StockPage


