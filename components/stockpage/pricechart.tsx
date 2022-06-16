import dynamic from 'next/dynamic';
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout';
//import styles from '../styles/Home.module.css';
import styles from '../styles/stockpage.module.css';
import React,{Component} from "react"



const Plot = dynamic(() => import ('react-plotly.js'), {ssr: false});

function MyChart(props) {
    
    const stockList=  props.xyDataList.results;
    const dateList = stockList.map(e=>e.Date);
    const closePrice = stockList.map(e=>parseFloat(parseFloat(e.Close).toFixed(2)));

    const ticker = props.tickerName;

    const pData=  props.pDataList.results;
    const dateList2 = pData.map(e=>e.Date);
    const closePrice2 = pData.map(e=>parseFloat(parseFloat(e.Close).toFixed(2)));

    //trace 1 is the stock data
    const trace1 = {

        x: dateList,
        y: closePrice,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'blue'},
        name: "actual",

       };

    //trace 2 will be prediction data
    const trace2 = {
        x: dateList2,
        y: closePrice2,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'orange'},
        name: "predicted",
       };   

    var selectorOptions = {
        buttons: [{
            step: 'day',
            stepmode: 'backward',
            count: 7,
            label: '7d'
        },{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        }, {
            step: 'all',
        }],
    };

       //properties of the chart component
    const layouts = {   autosize: true, width: 800, height: 600, 
                        yaxis:{title:'Price',fixedrange: true}, 
                        xaxis:{title:'Date', range:['2021-05-05','2022-06-01'], rangeselector: selectorOptions,},
                        //dragmode:"pan"
                    }
    return (
            <div>
                {/* <Myfunctionalcomponent title={'S&P 500'} detail={''}/> */}
                {/*// @ts-ignore*/} 
                <Plot 
                    
                    // @ts-ignore
                    data={[trace1,trace2]}
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



