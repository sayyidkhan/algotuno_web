import dynamic from 'next/dynamic';
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout';
//import styles from '../styles/Home.module.css';
import styles from '../styles/stockpage.module.css';
import * as React from "react"


const Plot =dynamic(()=> import ('react-plotly.js'),{ssr:false});

class MyChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {'title': props.title, 'myfunctionalcomponent': props.myfunctionalcomponent};

    }
    render(){
        const title = this.state['title'];
        const Myfunctionalcomponent = this.state['myfunctionalcomponent'];    
        return(
            <div>
                <Myfunctionalcomponent title={'S&P 500'} detail={''}/>
                <Plot
                    // @ts-ignore
                    data={[
                        {
                            x: [1, 2, 3, 4],
                            y: [2, 3, 4, 5],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                            name: "actual",
                        },
                        {
                            x: [1, 2, 3, 4],
                            y: [1.5, 3, 4.5, 6],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'blue'},
                            name: "predicted",
                        },
                    ]}
                    layout={{width: 500, height: 400, title: 'Test Chart'}}
                />
            </div>
        );
    }
}
const MyFunctionalComponent = (props) => {
    const detail = props.detail;
    return (
        <div>
            <h1>{props.title} : {props.detail}</h1>
        </div>
    );
};

const StockPage = ()=> (
    <Layout>
        <div className={styles.chartarea}>
            <h1>Stock Analysis</h1>
            <MyChart
                // @ts-ignore
                title = {'S&P 500'}
                myfunctionalcomponent = {MyFunctionalComponent}

            />
            
        </div>
        
    </Layout>
)

export default StockPage