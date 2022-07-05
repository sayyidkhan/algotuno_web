import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import {BASE_URL} from '../../../config/db_prod_checker';
import {createTheme} from '@mui/material/styles';
import LayoutHeader from "../../../components/layout_header";
import {Grid, Tab, Tabs, TextField} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import StockPriceListTable from "../../../components/admin/stock/stock_price_list_table";
import MlPriceListTable from "../../../components/admin/stock/ml_price_list_table";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export function StockForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Add Stock
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="ticker_symbol"
                        name="ticker_symbol"
                        label="Ticker Symbol"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        id="company_name"
                        name="company_name"
                        label="Company Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        id="exchange_name"
                        name="exchange_name"
                        label="Stock Exchange"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default function Page({ stocks }) {
    console.log(stocks);

    const [activeStep, setActiveStep] = React.useState<number>(0);
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        setActiveStep(activeStep + 1);
        console.log('button pressed');
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <LayoutHeader>
            <Container maxWidth="xl">
                <Box style={{marginTop: "7.5em"}}/>

                <Box sx={{width: '100%', bgcolor: '#cfe8fc', height: '80vh'}}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Stock Price List" style={styles.tab_styling} />
                        <Tab label="ML Price List" style={styles.tab_styling} />
                    </Tabs>

                    <TabContext value={value.toString()}>
                        {/* navigation 1 */}
                        <TabPanel value="0">
                            <StockPriceListTable stockList={stocks} />
                        </TabPanel>
                        {/* navigation 1 */}
                        <TabPanel value="1">
                            <MlPriceListTable />
                        </TabPanel>
                    </TabContext>
                </Box>

                <Box style={{marginBottom: "7.5em"}}/>
            </Container>
        </LayoutHeader>
    );
}


export async function getStaticProps() {
    const res = await fetch(BASE_URL + '/api/stock/get_all_stocks');
    const result = await res.json();
    const stocks = result.result;

    // Promise.all(get_hsp_ranges(stocks)).then((values)=>{
    //     console.log(values);
        
    // })

    // stocks.forEach(async element => {
    //     const get_hsp_range = await fetch(BASE_URL + `/api/stock/get_hsp_range`,
    //     {
    //         method: "POST",
    //         body:   JSON.stringify({ "ticker_symbol": element.tickerSymbol }),
    //         headers: {
    //             'Content-Type' : 'application/json',
    //             'authorization' : 'NEXT_PUBLIC_API_SECRET_KEY 9ddf045fa71e89c6d0d71302c0c5c97e'
    //         }
    //     });

    //     const hsp_results = await get_hsp_range.json();
    //     const hsp_range = hsp_results.results;

    //     element['earliest_stock_date'] = hsp_range[0];
    //     element['latest_stock_date'] = hsp_range[1];
    // });

    return {props:{stocks}};
}

// https://nextjs.org/docs/basic-features/data-fetching/get-static-props

function get_hsp_ranges(ticker_symbols : any[]) {
    return ticker_symbols.map(async (e)=>{

        const res = await fetch(BASE_URL + `/api/stock/get_hsp_range`,
        {
            method: "POST",
            body:   JSON.stringify({ "ticker_symbol": e.tickerSymbol }),
            headers: {
                'Content-Type' : 'application/json',
                'authorization' : 'NEXT_PUBLIC_API_SECRET_KEY 9ddf045fa71e89c6d0d71302c0c5c97e'
            }
        });
        
        return res.json();
    })
} 

const styles = {
    tab_styling: {
        fontSize: "16px",
    }
};