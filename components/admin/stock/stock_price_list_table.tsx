import React, {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
    Box,
    Button, Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AlertComponent from "../../alert/alert_message";
import { BASE_URL } from "../../../config/db_prod_checker";

interface BasicUserInterface {
    stockID: number;
    tickerSymbol: string;
    companyName: string;
    earliest_stock_date: string;
    latest_stock_date: string;
}


const originalRows: BasicUserInterface[] = [
    {
        stockID : 1,
        tickerSymbol: "amcr",
        companyName: "amcor",
        earliest_stock_date: "1-jan-2017",
        latest_stock_date: "30-jun-2022"
    },
    {
        stockID : 2,
        tickerSymbol: "tsla",
        companyName: "tesla",
        earliest_stock_date: "1-jan-2017",
        latest_stock_date: "30-jun-2022"
    },
    {
        stockID : 3,
        tickerSymbol: "goog",
        companyName: "google",
        earliest_stock_date: "1-jan-2017",
        latest_stock_date: "30-jun-2022"
    },
];

const SearchBar = ({setSearchQuery}) => (
    <form>
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                    /* @ts-ignore */
                    setSearchQuery(e.target.value);
                }}
                label="search by ticker symbol"
                variant="outlined"
                placeholder="Search..."
                size="small"
                fullWidth
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon style={{fill: "blue"}}/>
            </IconButton>
        </div>
    </form>
);


export default function StockPriceListTable(props) {
    
    const mystocklist = props.stockList;
    console.log(mystocklist);
    const myUpdatedStocklist = myFunc(mystocklist);
    console.log(myUpdatedStocklist);
    const [rows, setRows] = useState<BasicUserInterface[]>(myUpdatedStocklist);
    const [searched, setSearched] = useState<string>("");
    const [tickersymbol, setTickerSymbol] = useState('');
    const [companyname, setCompanyName] = useState('');
    const [exchange, setExchangeName] = useState('');

    const [display, setDisplay] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(null);
    const [message, setMessage] = useState("");

    function myFunc(_stocks){
        return _stocks.map(e=>{
            
            const sid = e.stockID;
            const ts = e.tickerSymbol;
            const s_name = e.companyName;
            const earliest_date = e.earliest_stock_date;
            const latest_date = e.latest_stock_date;

            const obj:BasicUserInterface = {
                stockID: sid,
                tickerSymbol: ts,
                companyName: s_name,
                earliest_stock_date: earliest_date,
                latest_stock_date: latest_date
            };

            return obj
        })
    }

    async function deleteStock(ts) {
        //delete stock 
        try{
 
            const res = await fetch(`/api/stock/delete_stock`, {
                method:"POST",
                body:   JSON.stringify({ "ticker_symbol": ts }),
                        headers: {
                            'Content-Type' : 'application/json',
                            'authorization' : 'NEXT_PUBLIC_API_SECRET_KEY 9ddf045fa71e89c6d0d71302c0c5c97e'
                        }
            });

            const delete_stock_result = await res.json();
            const delete_stock_msg = delete_stock_result.message;
            console.log(delete_stock_msg)

            // 1. set the display to true to show the UI
            setDisplay(true);
            // 2. logic here
            const success = true;
            // 3. to show the update message
            if (success) {
                setStatus(true);
            }
            else {
                setStatus(false);
            }

            setMessage(delete_stock_msg);
            // 4. remove all the data
            setTimeout(() => {
                setStatus(null);
                setMessage("");
                setDisplay(false);
            }, 3000);
        } catch (Error) {
            console.log(Error)
        }
    }

    const addStock = async () => {
        
        try{ 
            const res = await fetch(`/api/stock/add_stock`, {
            method : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                "ticker_symbol" : tickersymbol,
                "company_name"  : companyname,
                "exchange"      : exchange
                })
            }).then(async res => {
                const data = await res.json();
                const message = data.message;
                console.log(message);

                // 1. set the display to true to show the UI
                setDisplay(true);
                // 2. logic here
                const success = true;
                // 3. to show the update message
                if (success) {
                    setStatus(true);
                }
                else {
                    setStatus(false);
                }

                setMessage(message);
                // 4. remove all the data
                setTimeout(() => {
                    setStatus(null);
                    setMessage("");
                    setDisplay(false);
                }, 3000);

            });

        } catch (error) {
            return error;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(tickersymbol, companyname, exchange);
        addStock();
    }

    const requestSearch = (searchedVal: string) => {
        const filteredRows = originalRows.filter((row) => {
            return row.tickerSymbol.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div>
            <AlertComponent display={display} status={status} message={message}/>
            <br/>
            <div>
                <Paper>
                    <Box pt={0.5} pl={2.5} pb={2.5} pr={2.5}>
                        <h5>Add new stock</h5>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <TextField
                                            id="ticker_symbol"
                                            className="text"
                                            onChange={e=>setTickerSymbol(e.target.value)}
                                            label="Ticker Symbol"
                                            variant="outlined"
                                            placeholder="Enter ticker symbol..."
                                            size="small"
                                            fullWidth
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <TextField
                                            id="company_name"
                                            className="text"
                                            onChange={e=>setCompanyName(e.target.value)}
                                            label="Company Name"
                                            variant="outlined"
                                            placeholder="Enter Company Name..."
                                            size="small"
                                            fullWidth
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <TextField
                                            id="exchange_name"
                                            className="text"
                                            onChange={e=>setExchangeName(e.target.value)}
                                            label="Exchange Name"
                                            variant="outlined"
                                            placeholder="Enter Exchange Name..."
                                            size="small"
                                            fullWidth
                                        />
                                        <IconButton type="submit" aria-label="submit">
                                            <AddCircleOutlineRoundedIcon style={{fill: "blue"}}/>
                                        </IconButton>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                        <h5>Search for stock(s)</h5>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <SearchBar setSearchQuery={val => requestSearch(val)}/>
                            </Grid>
                        </Grid>
                    </Box>
                    <TableContainer>
                        <Table style={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Ticker Symbol</TableCell>
                                    <TableCell align="right">Stock Name</TableCell>
                                    <TableCell align="right">Earliest Stock Date</TableCell>
                                    <TableCell align="right">Latest Stock Date</TableCell>
                                    <TableCell align="right">Operations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.tickerSymbol}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">{row.tickerSymbol}</TableCell>
                                        <TableCell align="right">{row.companyName}</TableCell>
                                        <TableCell align="right">{row.earliest_stock_date}</TableCell>
                                        <TableCell align="right">{row.latest_stock_date}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="text" color="error" onClick={() => deleteStock(row.tickerSymbol)}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
}
