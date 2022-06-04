import * as React from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import {BASE_URL} from '../../lib/db_prod_checker';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@mui/material"
import { useEffect, useState } from 'react';
import { GetAllStocks } from '../../pages/api/api';
import FavoriteIcon from '@mui/icons-material/Favorite';


export let watchliststorage=[];


// interface StockDate {
//   stockID : number,
//   tickerSymbol  : string,
//   companyName : string,
//   exchange : string
// }

// const columns: GridColDef[] = [
//   { field: 'stockID', headerName: 'Stock ID', width: 90, description: 'Stock ID to uniquely identify the stock.'},
//   { field: 'tickerSymbol', headerName: 'Ticker', width: 90, description:'Ticker symbol to uniqeuly identify the stock'},
//   { field: 'companyName', headerName: 'Company', width: 180, description:'Name of the company'},
//   { field: 'exchange', headerName: 'Exchange', width: 110, description:'Exchange where the stock is being traded'}
// ];

// ,
//   { field: '', headerName: 'Stock Price', width: 120, description:'Latest Stock Price (EOD)'},
//   { field: '', headerName: 'Market Cap', width: 120, description:'Latest Market Cap of the company'},
//   { field: '', headerName: '7D ', width: 120, description:'7 Day Price Change'},
//   { field: '', headerName: '14D ', width: 120, description:'14 Day Price Change'},
//   { field: '', headerName: '30D ', width: 120, description:'30 Day Price Change'}


// export function DataTable(props) {

//   const sl = props.data.stocks.result;
//   //console.log(JSON.stringify(props));

//   return (
//     // <div style={{ height: 270, width: '70%' }}>
//     <div style ={{ width:'90%'}}>
//       <div style={{ flexGrow: 1 }}>
//         <DataGrid 
//           autoHeight
//           getRowId={(rows)=>rows.stockID}
//           rows={sl}
//           columns={columns}
//           pageSize={3}
//           rowsPerPageOptions={[3]}
//           // checkboxSelection
//           onCellClick={(params) => {
//             //document.location.href = '/trending';
//             //console.log(params);
//             if(params.field === "tickerSymbol")
//             {
//               //document.location.href = '/trending';
//               //console.log(params.row.tickerSymbol);
//               //tickerName = `${params.row.tickerSymbol}`;
//               //console.log(tickerName);
              
//               const URL = `/stockpage?tickerSymbol=${params.row.tickerSymbol}`;
//               //<Link href={URL}></Link>;
              
//               document.location.href = URL;
//           //     //console.log(URL);
//             }
//           }}    
          
//         />
//       </div>
//     </div>
//   );
// }

export default function StocksList (props){
  const [stocks, setStocks] = useState([]);
  const [wishlist,setWishlist] = useState(watchliststorage);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  //const [page, setPage] = useState(1);

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });
  const classes = useStyles();
  //const history = useHistory();

  const fetchCoins = async () => {
    setLoading(true);
    const  {data} = await axios.get(GetAllStocks());
   
    console.log(data);
 
    setStocks(data.result);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      }  
    },
  });

  const handleSearch = () => {
    return stocks.filter(
      (stock) =>
      stock.companyName.toLowerCase().includes(search) ||
      stock.tickerSymbol.toLowerCase().includes(search)
    );
  };
  //add to wishlist
  const handleAddToWishlist=(stockTicker,stockExchange)=>{
    const check_wishlist = wishlist.findIndex((item) => item.ticker === stockTicker);
    
     //watchliststorage= this.state.watchliststorage.slice(0);
     //watchliststorage.push({ticker:stockTicker,exchange:stockExchange})
     if (check_wishlist !== -1) {
      setWishlist([
       ...wishlist
      ]);
    } else {
      wishlist.push({ticker:stockTicker,exchange:stockExchange});
      //setWishlist({ticker:stockTicker,exchange:stockExchange});
      
    }
    console.log(watchliststorage);
  }

  return(
    <ThemeProvider theme={darkTheme} >
      <Container style={{ textAlign: "left" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Stock Prices by Market Cap
          </Typography>

          <Typography
          variant='subtitle1'
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
          <WarningAmberIcon sx={{ fontSize: 15 }}/> Pricing data updated on daily basis. Currency in USD.
          </Typography>

          <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "black" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#575757" }}>
                <TableRow >
                  {["Ticker", "Price","Exchange", "24h Change", "Market Cap","Wishlist"].map((head) => (
                    <TableCell
                      style={{
                        color: "white",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Ticker" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* Data for table */}
              <TableBody >
                {handleSearch()
                  .slice()
                  .map((row) => {
                    //const profit = row.price_change_percentage_24h > 0;
                    return (
                      
                      <TableRow
                        className={classes.row}
                        key={row.tickerSymbol}
                      >
                        {/* ticker */}
                        <TableCell
                        onClick={() => document.location.href = `/stockpage?tickerSymbol=${row.tickerSymbol}&exchange=${row.exchange}`}
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                            backgroundColor: "#8A8A8A",
                            
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 17,
                              }}
                            >
                              {row.tickerSymbol}
                            </span>
                            <span style={{ color: "white",
                                          fontSize: 12, }}>
                              {row.companyName}
                            </span>
                          </div>
                        </TableCell>
                        {/* Price */}
                        <TableCell align="right" style={{ backgroundColor: "#8A8A8A" }} >
                          {/* {tickerSymbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))} */}
                          <div><span style={{ color: "white" }}>
                              {row.stockID}
                            </span></div>
                        </TableCell>
                        {/* Exchange */}
                        <TableCell align="right"style={{ backgroundColor: "#8A8A8A" }}>
                          {/* {tickerSymbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))} */}
                          <div><span style={{ color: "white" }}>
                              {row.exchange}
                            </span></div>
                        </TableCell>
                        {/* 24h change */}
                        <TableCell
                          align="right"
                          style={{
                            //color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                            backgroundColor: "#8A8A8A"
                          }}
                        >
                          {/* {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}% */}
                        </TableCell>
                        {/* marketcap */}
                        <TableCell align="right"style={{ backgroundColor: "#8A8A8A" }}>
                          {/* {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M */}
                        </TableCell>
                          {/* wishlist */}
                          <TableCell align="right"
                          style={{ backgroundColor: "#8A8A8A" }}
                          onClick={() =>handleAddToWishlist(row.tickerSymbol,row.exchange)}
                          >
                           {/* {symbol}{" "}
                           {numberWithCommas(
                             row.market_cap.toString().slice(0, -6)
                           )}
                           M */}
                          <FavoriteIcon sx={{ fontSize: "large" }}/>
                          
                         </TableCell>
                         </TableRow>
                    );
                  })}
              </TableBody>
              </Table>
          )}
        </TableContainer>     
          
      </Container>
    </ThemeProvider>
    
  )

}

