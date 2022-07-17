import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
    Box,
    Button, Grid,
    IconButton,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AlertComponent from "../alert/alert_message";
import axios_api from "../../config/axios_api";
import { NamedTupleMember } from "typescript";

type Order = 'asc' | 'desc';
interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

interface BasicUserInterface {
    stockID: number;
    tickerSymbol: string;
    companyName: string;
    exchange:string;
}

const SearchBar = ({ setSearchQuery }) => (
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
                <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
        </div>
    </form>
);

export default function StockPriceListTable() {
    
    const [loading, setLoading] = useState<boolean>();
    const [rows, setRows] = useState<BasicUserInterface[]>();
    const [searched, setSearched] = useState<string>("");

    const [tickersymbol, setTickerSymbol] = useState('');
    const [companyname, setCompanyName] = useState('');
    const [exchange, setExchangeName] = useState('');

    const [display, setDisplay] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(null);
    const [message, setMessage] = useState("");

    const [selected, setSelected] = React.useState([]);
    
    const fetchStocks = async () => {
        setLoading(true);
        try{
            const  {data} = await axios_api.get('/api/stock/get_all_stocks');
            setRows(data.result);
            setLoading(false);
        }
        catch(error)
        {
            console.log(error)    
        }
      };
    

    useEffect(() => {
        fetchStocks();
        setSelected([]);
    }, []);

    async function updateUserWatchList(ts) {
        //delete stock 
        try {

            const res = await fetch(`/api/stock/delete_stock`, {
                method: "POST",
                body: JSON.stringify({ "ticker_symbol": ts }),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'NEXT_PUBLIC_API_SECRET_KEY 9ddf045fa71e89c6d0d71302c0c5c97e'
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
    

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(tickersymbol, companyname, exchange);
    }

    const requestSearch = (searchedVal: string) => {
        const filteredRows = rows.filter((row) => {
            return row.tickerSymbol.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };


    const isSelected = (stockID: string) => selected.indexOf(stockID) !== -1;


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n.stockID.toString());
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      };


      const handleClick = (event: React.MouseEvent<unknown>, tickerSymbol: string, stockID:number) => {
         const selectedIndex = selected.indexOf(stockID.toString());
        let newSelected:  string[] = [];
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, stockID.toString());
          
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
          
        } else if (selectedIndex > 0) {
        
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
        
        setSelected(newSelected);
      };
    
     const updateUserStockList=()=>{
        console.log(selected)

     }
    return (
        <div>
            <AlertComponent display={display} status={status} message={message} />
            <br />
            <div>
                <Paper>
                    <Box pt={0.5} pl={2.5} pb={2.5} pr={2.5}>
                        { /*** if no items to display do not display the search bar ***/}
                        {
                                rows !== undefined && rows.length > 0 ?
                            <div>
                                <h5>Search for stock(s)</h5>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <SearchBar setSearchQuery={val => requestSearch(val)} />
                                    </Grid>
                                    <Grid item xs={2}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        Add to Watchlist
                                        <IconButton type="submit" aria-label="submit">
                                            <AddCircleOutlineRoundedIcon style={{ fill: "blue" }} onClick={()=>updateUserStockList()} />
                                        </IconButton>
                                    </div>
                                </Grid>
                                </Grid>
                            </div>:
                            <br/>
                        }   
                    </Box>
                    { /*** if no items to display do not display the table ***/}
                    {loading ? (
                    <LinearProgress style={{ backgroundColor: "black" }} />
                     ) : (
                        rows !== undefined && rows.length > 0 ?
                        <TableContainer style={{ maxHeight: 400 }}>
                            <Table style={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                    <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                                        // checked={rowCount > 0 && numSelected === rowCount}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                        'aria-label': 'select all desserts',
                                        }}
                                    />
                                    </TableCell>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Ticker Symbol</TableCell>
                                        <TableCell>StockID</TableCell>
                                        <TableCell align="right">Exchange</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => {
                                        const isItemSelected = isSelected((row.stockID).toString());
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return(
                                        <TableRow 
                                        hover
                                        onClick={(event) => handleClick(event, row.tickerSymbol, row.stockID)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.tickerSymbol}
                                        selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                            <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                            />
                                        </TableCell>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">{row.tickerSymbol}</TableCell>
                                            <TableCell component="th" scope="row">{row.stockID}</TableCell>
                                            <TableCell align="right">{row.exchange}</TableCell>
                                            <TableCell align="right">
                                
                                            </TableCell>
                                        </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer> :
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
                </Paper>
                <br />
            </div>
        </div>
    );
}

