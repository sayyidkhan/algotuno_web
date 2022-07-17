import * as React from 'react';
import { useEffect, useState } from 'react';
import axios_api from '../../config/axios_api';
import {
    Alert,
    Box,
    Button, Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    LinearProgress,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";

let userID = "cl5kx0w9y0004ysv692x34doo";


export default function DataGridDemo() {
    const [rows,setRows] = useState([]);  
    const [sub,setSub] = useState<string>();
    const [price,setPrice] = useState<number>();
    const [loading,setLoading]= useState<boolean>();
    const [userData,setUserData] = useState([]);  
    const fetchSubscription = async () => {
        setLoading(true);
        const  {data} = await axios_api.get('/api/user/get_all_user');
        

        data.result.map((e)=>{
            if(e.id == userID){
                
                const subscription = e.Subscription[0].Subscription_Plan.planName;
                const cost =  e.Subscription[0].Subscription_Plan.price;
                setPrice(cost);
                setSub(subscription.toString());
                setUserData(e);

            }
        })
        setLoading(false);
      };

      useEffect(() => {
        fetchSubscription();

      }, []);

      let probutton:boolean;
      let fullbutton:boolean;

      (sub == "Pro"? probutton=true:probutton=false);

      (sub == "Full"? fullbutton=true:fullbutton=false);

  return (
    <Paper>
    <Box sx={{ height: 200, width: '100%' }}>
     
      <TableContainer style={{maxHeight:400}}>
                    {loading ? (
                    <LinearProgress style={{ backgroundColor: "black" }} />
                     ) : (
                        <Table style={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Subscription</TableCell>
                                    <TableCell align="left">Cost</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                  
                                <TableRow >
                                
                                <TableCell component="th" scope="row">
                                    {/*@ts-ignore */}
                                    {userData.username}
                                </TableCell>
                                {/*@ts-ignore */}
                                <TableCell align="left">{userData.email}</TableCell>
                                <TableCell align="left">{sub}</TableCell>
                                <TableCell align="left">${price} per month</TableCell>
                                    </TableRow> 
                           
                            </TableBody>
                        </Table>
                     )}
                    </TableContainer>
      <Grid container spacing={4} style={{ padding:5}}>
        {/* Button Upgrade to Pro */}
        <Grid item xs={3}>
            <Button disabled={probutton} >Upgrade to Pro</Button>
        </Grid>
        {/* Button Upgrade to Full Access */}
        <Grid item xs={3}>
        <Button disabled={fullbutton}>Upgrade to Full Access</Button>
            {/* <AddUserBar setSearchQuery={val=>requestSearch(val)}  /> */}
        </Grid>
        </Grid>
    </Box>
    </Paper>
  );
}
