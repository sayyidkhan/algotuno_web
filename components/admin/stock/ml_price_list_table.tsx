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


export default function MLPriceListTable() {
    const [loading, setLoading] = useState(true);
    const [loadingBar, setLoadingBar] = useState(true);
    const [rows, setRows] = useState<BasicUserInterface[]>();
    const [searched, setSearched] = useState<string>("");

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
            console.log(res);
            const myUpdatedStocksList = myFunc(res);
            setRows(myUpdatedStocksList);
        }).finally(() => {
            setLoadingBar(false);
        });
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

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div>
            <AlertComponent display={display} status={status} message={"enter message here"}/>
            <br/>
            <div>
                <Paper>

                    <div>
                        <Box pt={0.5} pl={2.5} pb={2.5} pr={2.5}>
                            <h5>Search for stock(s)</h5>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <SearchBar setSearchQuery={val => requestSearch(val)}/>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>

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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <TableRow key={row.tickerSymbol}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell component="th"
                                                               scope="row"> {row.tickerSymbol}</TableCell>
                                                    <TableCell align="right">{row.companyName}</TableCell>
                                                    <TableCell align="right">{row.earliest_stock_date}</TableCell>
                                                    <TableCell align="right">{row.latest_stock_date}</TableCell>
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
            </div>
        </div>
    );
}

async function get_all_stocks_api() {
    return fetch('/api/stock/get_all_stocks_with_ml_range').then(res => {

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