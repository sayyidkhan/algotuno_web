import dynamic from 'next/dynamic';
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout';

import styles from '../styles/stockpage.module.css';
import React from "react"
import ReactDOM from 'react-dom';
import { IgrFinancialChart } from 'igniteui-react-charts'
import {StockIndexData} from '../components/StockIndexData'
import { IgrFinancialChartModule } from 'igniteui-react-charts';

//import {createRoot} from 'react-dom/client';

//const root = document.getElementById('root');




IgrFinancialChartModule.register();
 //IgrFinancialChart =dynamic(()=> import ('igniteui-react-charts.js'),{ssr:false});

class FinancialChartStockIndexChart extends React.Component{
    

    data: any[];
    
    constructor(props: any) {
        super(props);
        this.data = StockIndexData.getData();
        
    }

    public render(): JSX.Element {
        return (
            <IgrFinancialChart
                width="100%"
                height="100%"
                isToolbarVisible={false}
                chartType="Candle"
                chartTitle="SP 500"
                titleAlignment="Left"
                titleLeftMargin="25"
                titleTopMargin="10"
                titleBottomMargin="10"
                subtitle="CME - CME Delayed Price, Currency in USD"
                subtitleAlignment="Left"
                subtitleLeftMargin="25"
                subtitleTopMargin="5"
                subtitleBottomMargin="10"
                yAxisLabelLocation="OutsideLeft"
                yAxisMode="Numeric"
                yAxisTitle="Financial Prices"
                yAxisTitleLeftMargin="10"
                yAxisTitleRightMargin="5"
                yAxisLabelLeftMargin="0"
                zoomSliderType="None"
                dataSource={this.data}
            />
        );
    }
}

//createRoot(rootElement).render(<App />);


// const TestPage = ()=> (
//     <Layout>
//         <div className={styles.chartarea}>
//             <h1>Stock Analysis</h1>
//             {/* <FinancialChartStockIndexChart
//                 // @ts-ignore
//                 //title = {'S&P 500'}
//                 //myfunctionalcomponent = {MyFunctionalComponent}
            
//             /> */}
            
//         </div>
        
//     </Layout>
// )

// export default TestPage






















// class MyChart extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {'title': props.title, 'myfunctionalcomponent': props.myfunctionalcomponent};

//     }
//     render(){
//         const title = this.state['title'];
//         const Myfunctionalcomponent = this.state['myfunctionalcomponent'];    
//         return(
//             <div>
//                 <Myfunctionalcomponent title={'S&P 500'} detail={''}/>
//                 <Plot
//                     // @ts-ignore
//                     data={[
//                         {
//                             x: [1, 2, 3, 4],
//                             y: [2, 3, 4, 5],
//                             type: 'scatter',
//                             mode: 'lines+markers',
//                             marker: {color: 'red'},
//                             name: "actual",
//                         },
//                         {
//                             x: [1, 2, 3, 4],
//                             y: [1.5, 3, 4.5, 6],
//                             type: 'scatter',
//                             mode: 'lines+markers',
//                             marker: {color: 'blue'},
//                             name: "predicted",
//                         },
//                     ]}
//                     layout={{width: 500, height: 400, title: 'Test Chart'}}
//                 />
//             </div>
//         );
//     }
// }
// const MyFunctionalComponent = (props) => {
//     const detail = props.detail;
//     return (
//         <div>
//             <h1>{props.title} : {props.detail}</h1>
//         </div>
//     );
// };

// const StockPage = ()=> (
//     <Layout>
//         <div className={styles.chartarea}>
//             <h1>Stock Analysis</h1>
//             <MyChart
//                 // @ts-ignore
//                 title = {'S&P 500'}
//                 myfunctionalcomponent = {MyFunctionalComponent}

//             />
            
//         </div>
        
//     </Layout>
// )

// export default StockPage