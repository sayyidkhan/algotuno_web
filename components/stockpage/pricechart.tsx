import dynamic from 'next/dynamic';
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout';
//import styles from '../styles/Home.module.css';
import styles from '../styles/stockpage.module.css';
import React,{Component} from "react"

const layouts = {autosize: false, width: 800, height: 600, title:"NASDAQ - AAPL - 7d"}

const Plot = dynamic(() => import ('react-plotly.js'), {ssr: false});

function MyChart(props) {
    const stockList=  props.xyDataList.results;
     const dateList = stockList.map(e=>e.DateString);
    const closePrice = stockList.map(e=>parseFloat(parseFloat(e.Close).toFixed(2)));
    console.log(closePrice);
    const trace1 = {
        //x:xdata,
        x: dateList,
         y: closePrice,
         type: 'scatter',
         mode: 'lines+markers',
         marker: {color: 'red'},
         name: "actual",
       };
        //const title = this.state['title'];
        //const Myfunctionalcomponent = this.state['myfunctionalcomponent'];
        return (
            <div>
                {/* <Myfunctionalcomponent title={'S&P 500'} detail={''}/> */}
                {/*// @ts-ignore*/} 
                <Plot 
                    
                    // @ts-ignore
                    data={[trace1]}
                    // @ts-ignore
                    layout={layouts}
                    // @ts-ignore
                    //frames={this.state.frames}
                />
                
            </div>    
        );
}

const MyFunctionalComponent = (props) => {
    const detail = props.detail;

    return (
        <div>
            <h2>{props.title} : {props.detail}</h2>
        </div>
    )
};

export default  MyChart



