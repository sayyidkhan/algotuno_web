import dynamic from 'next/dynamic';
import Head from 'next/head'
import Image from 'next/image'
import Layout from './layout';
//import styles from '../styles/Home.module.css';
import styles from '../styles/stockpage.module.css';
import * as React from "react"


const Plot = dynamic(() => import ('react-plotly.js'), {ssr: false});

export default class MyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'title': props.title, 'myfunctionalcomponent': props.myfunctionalcomponent};

    }

    render() {
        const title = this.state['title'];
        const Myfunctionalcomponent = this.state['myfunctionalcomponent'];
        return (
            <div>
                {/* <Myfunctionalcomponent title={'S&P 500'} detail={''}/> */}
                {/*
                // @ts-ignore */}
                <Plot
                    // @ts-ignore
                    data={[
                        {

                            x: ["14/5/2021",
                                "17/5/2021",
                                "18/5/2021",
                                "19/5/2021",
                                "20/5/2021"
                            ],
                            y: [126.25,
                                126.82,
                                126.55,
                                123.16,
                                125.23
                            ],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                            name: "actual",
                        },
                        {
                            y: [127.25,
                                128.82,
                                125.55,
                                126.16,
                                129.23
                            ],
                            x: ["14/5/2021",
                                "17/5/2021",
                                "18/5/2021",
                                "19/5/2021",
                                "20/5/2021"
                            ],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'green'},
                            name: "predicted",
                        },
                    ]}
                    layout={{width: 800, height: 600, title:"NASDAQ - AAPL - 7d"}}
                />


            </div>
        );
    }
}

const MyFunctionalComponent = (props) => {
    const detail = props.detail;

    return (
        <div>
            <h2>{props.title} : {props.detail}</h2>
        </div>
    )
};

