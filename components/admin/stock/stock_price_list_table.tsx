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

interface BasicUserInterface {
    ticker_symbol: string;
    stock_name: string;
    earliest_stock_date: string;
    latest_stock_date: string;
}


const originalRows: BasicUserInterface[] = [
    {
        ticker_symbol: "amcr",
        stock_name: "amcor",
        earliest_stock_date: "1-jan-2017",
        latest_stock_date: "30-jun-2022"
    },
    {
        ticker_symbol: "tsla",
        stock_name: "tesla",
        earliest_stock_date: "1-jan-2017",
        latest_stock_date: "30-jun-2022"
    },
    {
        ticker_symbol: "goog",
        stock_name: "google",
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

const AddStockBar = ({setSearchQuery}) => (
    <form>
        <Grid container spacing={2}>
            {/* copy each grid to add more fields */}
            <Grid item xs={2}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <TextField
                        id="search-bar"
                        className="text"
                        onInput={(e) => {
                        }}
                        label="add new ticker symbol"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        fullWidth
                    />
                </div>
            </Grid>
            {/* copy each grid to add more fields */}
            <Grid item xs={2}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <TextField
                        id="search-bar"
                        className="text"
                        onInput={(e) => {
                        }}
                        label="add new ticker symbol"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        fullWidth
                    />
                </div>
            </Grid>
            {/* copy each grid to add more fields */}
            <Grid item xs={2}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <TextField
                        id="search-bar"
                        className="text"
                        onInput={(e) => {
                        }}
                        label="specify market type"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        fullWidth
                    />
                    <IconButton type="submit" aria-label="search">
                        <AddCircleOutlineRoundedIcon style={{fill: "blue"}}/>
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    </form>
);


export default function StockPriceListTable() {
    const [rows, setRows] = useState<BasicUserInterface[]>(originalRows);
    const [searched, setSearched] = useState<string>("");
    // const classes = useStyles();

    const requestSearch = (searchedVal: string) => {
        const filteredRows = originalRows.filter((row) => {
            return row.ticker_symbol.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div>
            <AlertComponent display={true} status={true} message={"enter message here"}/>
            <br/>
            <div>
                <Paper>
                    <Box pt={0.5} pl={2.5} pb={2.5} pr={2.5}>
                        <h5>Add new Stock</h5>
                        <AddStockBar setSearchQuery={() => {
                        }}/>
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
                                    <TableRow key={row.ticker_symbol}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.ticker_symbol}
                                        </TableCell>
                                        <TableCell align="right">{row.stock_name}</TableCell>
                                        <TableCell align="right">{row.earliest_stock_date}</TableCell>
                                        <TableCell align="right">{row.latest_stock_date}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="text" color="error">Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <br/>
                <a
                    target="_blank"
                    href="https://smartdevpreneur.com/the-easiest-way-to-implement-material-ui-table-search/"
                >
                    Learn how to add search and filter to Material-UI Table here.
                </a>
            </div>
        </div>
    );
}