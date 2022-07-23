import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
    Box,
    Button, Grid,
    IconButton, LinearProgress,
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

interface BasicUserInterface {
    stockID: number;
    tickerSymbol: string;
    companyName: string;
    earliest_stock_date: string;
    latest_stock_date: string;
}

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
                label="Ticker Symbol"
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

export default function StockPriceListTable() {

    const [loading, setLoading] = useState(true);
    const [loadingBar, setLoadingBar] = useState(true);
    const [rows, setRows] = useState<BasicUserInterface[]>();
    const [searched, setSearched] = useState<string>("");

    const [tickersymbol, setTickerSymbol] = useState('');

    const [display, setDisplay] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (loading) {
            getListFromDB();
            setLoading(false);
        }
    }, [rows]);

    function getListFromDB() {
        get_all_stocks_api().then(res => {
            const myUpdatedStocksList = myFunc(res);
            setRows(myUpdatedStocksList);
        }).finally(() => {
            setLoadingBar(false);
        });

        /*** dummy data for testing ***/
        // setRows(myFunc([
        //     {'stockID': 1, 'tickerSymbol': 'APPL'},
        //     {'stockID': 2, 'tickerSymbol': 'AMZN'},
        //     {'stockID': 3, 'tickerSymbol': 'MSFT'},n
        // ]))
    }

    function myFunc(_stocks) {
        return _stocks.map(e => {

            const obj: BasicUserInterface = {
                stockID: e.stockID,
                tickerSymbol: e.tickerSymbol,
                companyName: e.companyName,
                earliest_stock_date: e.earliest_stock_date,
                latest_stock_date: e.latest_stock_date
            };

            return obj
        })
    }

    async function updatePrices(ts) {

        // get current date as epoch time
        let end = Math.floor(((new Date()).getTime()) / 1000);
        let start = Math.floor(end - 157680000); // subtract 5 years from current date


        try {
            const res = await fetch(`/api/stock/populate_hsp`, {
                method: "POST",
                body: JSON.stringify({
                    "ticker_symbol": ts,
                    "start_date": start,
                    "end_date": end
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(async res => {
                const data = await res.json();
                const message = data.message;

                // 1. set the display to true to show the UI
                setDisplay(true);
                // 2. logic here
                const success = true;
                // 3. to show the update message
                if (success) {
                    setStatus(true);
                } else {
                    setStatus(false);
                }

                setMessage(message);
                // 4. remove all the data
                setTimeout(() => {
                    setStatus(null);
                    setMessage("");
                    setDisplay(false);
                }, 3000);

                getListFromDB();
                setLoading(true);

            });
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteStock(ts) {
        //delete stock 
        try {
            const res = await fetch(`/api/stock/delete_stock`, {
                method: "POST",
                body: JSON.stringify({"ticker_symbol": ts}),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'NEXT_PUBLIC_API_SECRET_KEY 9ddf045fa71e89c6d0d71302c0c5c97e'
                }
            });

            const delete_stock_result = await res.json();
            const delete_stock_msg = delete_stock_result.message;

            // 1. set the display to true to show the UI
            setDisplay(true);
            // 2. logic here
            const success = true;
            // 3. to show the update message
            if (success) {
                setStatus(true);
            } else {
                setStatus(false);
            }

            setMessage(delete_stock_msg);
            // 4. remove all the data
            setTimeout(() => {
                setStatus(null);
                setMessage("");
                setDisplay(false);
            }, 3000);

            getListFromDB();
            setLoading(true);

        } catch (Error) {
            console.log(Error)
        }
    }

    const addStock = async () => {

        try {
            const res = await fetch(`/api/stock/add_stock`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "ticker_symbol": tickersymbol
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

                getListFromDB();
                setLoading(true);

            });

        } catch (error) {
            return error;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await addStock();
    }

    const requestSearch = async (searchedVal: string) => {
        if (searchedVal.trim().length === 0) {
            await getListFromDB();
        } else {
            const filteredRows = rows.filter((row) => {
                return row.tickerSymbol.toLowerCase().includes(searchedVal.toLowerCase());
            });
            // only if results greater than 0, then continue the search, otherwise do not update the list
            if (filteredRows.length > 0) {
                setRows(filteredRows);
            } else {
                setRows([]);
            }
        }
    };

    const cancelSearch = async () => {
        setSearched("");
        await requestSearch(searched);
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
                                            onChange={e => setTickerSymbol(e.target.value)}
                                            label="Ticker Symbol"
                                            variant="outlined"
                                            placeholder="Enter ticker symbol..."
                                            size="small"
                                            fullWidth
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton type="submit" aria-label="submit">
                                        <AddCircleOutlineRoundedIcon style={{fill: "blue"}}/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </form>

                        <div>
                            <h5>Search for stock(s)</h5>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <SearchBar
                                        setSearchQuery={val => requestSearch(val)}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Box>

                    <TableContainer style={{maxHeight: 335}}>
                        {loadingBar ? (
                                <LinearProgress style={{backgroundColor: "black"}}/>
                            ) :
                            (
                                rows !== undefined && rows.length > 0 ?
                                    <Table style={{minWidth: 650}} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No.</TableCell>
                                                <TableCell>Ticker Symbol</TableCell>
                                                <TableCell align="right">Stock Name</TableCell>
                                                <TableCell align="right">Earliest Stock Date</TableCell>
                                                <TableCell align="right">Latest Stock Date</TableCell>
                                                <TableCell align="right">Get Stock Price</TableCell>
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
                                                        <Button variant="text" color="error"
                                                                onClick={() => updatePrices(row.tickerSymbol)}>Get
                                                            Prices</Button>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Button variant="text" color="error"
                                                                onClick={() => deleteStock(row.tickerSymbol)}>Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    :
                                    <div style={{margin: "5em"}}>
                                        <h3 style={{textAlign: "center"}}><b>No data to display</b></h3>
                                        {
                                            /*** add padding ***/
                                            Array.from(Array(5).keys()).map((index) => {
                                                return <br key={index}/>
                                            })
                                        }
                                    </div>
                            )}
                    </TableContainer>
                </Paper>
                <br/>
            </div>
        </div>
    );
}

async function get_all_stocks_api() {
    return fetch('/api/stock/get_all_stocks_with_hsp').then(res => {

        if (res.status === 200) {
            return res.json()
                .then(inner_res => inner_res.result)
                .catch(err => {
                    console.log(err);
                    return [];
                })
        } else {
            return [];
        }
    }).catch(err => {
        console.log(err);
        return [];
    });
}