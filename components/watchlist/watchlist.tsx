import React, { useEffect, useState } from "react";
import styles from '../../styles/Home.module.css'

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

import CancelIcon from '@mui/icons-material/Cancel';
import { watchliststorage } from "../index/Table";

export default function Watchlist(){

console.log(watchliststorage)

    const [favorites, setFavorites] = useState(watchliststorage);

    
    if(watchliststorage.length !== favorites.length)
    {
        useEffect(() => {
            setFavorites(watchliststorage);
            }, []);
    }
    useEffect(() => {
      console.log(favorites);
    }, [favorites]);
  
    // function handleFavorite(ticker) {
    //   const newFavorites = favorites.map(item => {
    //     return  { ...item, favorite: !item.favorite }
    //   });
  
    //   setFavorites(newFavorites);
    // }
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          }  
        },
      });
   
    
    //handleFavorite(props.ticker)
    return(
        <div className= {styles.wishlist}>
        <ThemeProvider theme={darkTheme} >
        <Container style={{ textAlign: "center" }}>
            <Table>
                <TableHead style={{ backgroundColor: "#575757" }}>
                    <TableRow>
                        <TableCell align="center" colSpan={3} style={{  fontFamily: "Montserrat", fontSize:22,backgroundColor:"#bfbfbf" }}>
                            Watchlist
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        {["Ticker","Exchange","Delete"].map((head)=>(
                            <TableCell
                            style={{
                                color: "white",
                                fontWeight: "500",
                                fontSize:17,
                                fontFamily: "Montserrat",
                              }}
                            key ={head}
                            >
                                {head}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {favorites.map((row) => {
                return(
                    <TableRow  key={row.ticker}>
                        {/* ticker */}
                        <TableCell
                            component="th"
                            scope="row"
                            style={{
                                display: "flex",
                                gap: 15,
                                backgroundColor: "#8A8A8A",
                            }}
                        >
                            <div>
                                <span style={{ color: "white",fontSize: 12, }}>
                                    {row.ticker}
                                </span>
                            </div>
             
                        </TableCell>
                        {/* price */}
                        <TableCell style={{ backgroundColor: "#8A8A8A" }}>
                            <div>
                                <span style={{ color: "white" }}>
                                    {row.exchange}
                                </span>
                            </div>
                        </TableCell>
                        {/* remove button */}
                        <TableCell align="right" style={{ backgroundColor: "#8A8A8A" }}>
                            <div>
                                <span style={{ color: "white" }}>
                                    <CancelIcon sx={{ fontSize: "medium" }}/>
                                </span>
                            </div>
                        </TableCell>
                    </TableRow>
                 );
                })} 
                </TableBody>
            </Table>
        </Container>
        </ThemeProvider>
        </div>
    )
}
