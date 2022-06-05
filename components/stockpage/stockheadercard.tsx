import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


export default function StockCard(props) {
    //console.log(props.pricedata);
    const tickerName = props.tickerName;
    const lastprice = parseFloat(props.lastprice).toFixed(2);
    const exchange = props.exchange;
    const lastupdateddate = props.lastupdated;
    
  return (
    <Box sx={{ width: '30%', maxWidth: 300, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 1, mx: 2 }}>
        <Grid container alignItems="left">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              {tickerName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              ${lastprice}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="subtitle2">
          {exchange}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant="subtitle2">
          Delayed Data.<br/> Last updated on {lastupdateddate}.
        </Typography>    
      </Box>
    </Box>
  );
}
