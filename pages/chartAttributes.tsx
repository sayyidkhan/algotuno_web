// //charting 
// import React, { useRef } from 'react';
// import ReactDOM from 'react-dom';
// import {IgrFinancialChart} from 'igniteui-react-charts'
// //import {StockIndexData} from '../components/stockIndexData'
// import { IgrFinancialChartModule } from 'igniteui-react-charts';
// import dynamic from 'next/dynamic';
// //import '../components/chartPage'
// //import '../pages/stockPage'
// //const IgrFinancialChart = dynamic(() => import("igniteui-react-charts"), { ssr: false });

// IgrFinancialChartModule.register();

// export default class FinancialChartStockIndexChart extends React.Component<any, any> {
    

//     public data: any[];
    
//     constructor(props: any) {
//         super(props);
//         this.data = StockIndexData.getData();
//     }

//     public render(): JSX.Element {
//         return (
        
//         <div className="container sample" >
//             <div className="container" >
//                  <IgrFinancialChart
//                     width="100%"
//                     height="100%"
//                     isToolbarVisible={false}
//                     chartType="Line"
//                     chartTitle="SP 500"
//                     titleAlignment="Left"
//                     titleLeftMargin="25"
//                     titleTopMargin="10"
//                     titleBottomMargin="10"
//                     subtitle="CME - CME Delayed Price, Currency in USD"
//                     subtitleAlignment="Left"
//                     subtitleLeftMargin="25"
//                     subtitleTopMargin="5"
//                     subtitleBottomMargin="10"
//                     yAxisLabelLocation="OutsideLeft"
//                     yAxisMode="Numeric"
//                     yAxisTitle="Financial Prices"
//                     yAxisTitleLeftMargin="10"
//                     yAxisTitleRightMargin="5"
//                     yAxisLabelLeftMargin="0"
//                     zoomSliderType="None"
//                     dataSource={this.data}/>
//             </div>
//         </div>
//         );
//     }
// }

