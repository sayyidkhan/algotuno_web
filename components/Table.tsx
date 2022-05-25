import * as React from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';

interface StockDate {
  stockID : number,
  tickerSymbol  : string,
  companyName : string,
  exchange : string
}

const columns: GridColDef[] = [
  { field: 'stockID', headerName: 'Stock ID', width: 90, description: 'Stock ID to uniquely identify the stock.'},
  { field: 'tickerSymbol', headerName: 'Ticker', width: 90, description:'Ticker symbol to uniqeuly identify the stock'},
  { field: 'companyName', headerName: 'Company', width: 180, description:'Name of the company'},
  { field: 'exchange', headerName: 'Exchange', width: 110, description:'Exchange where the stock is being traded'}
];

// ,
//   { field: '', headerName: 'Stock Price', width: 120, description:'Latest Stock Price (EOD)'},
//   { field: '', headerName: 'Market Cap', width: 120, description:'Latest Market Cap of the company'},
//   { field: '', headerName: '7D ', width: 120, description:'7 Day Price Change'},
//   { field: '', headerName: '14D ', width: 120, description:'14 Day Price Change'},
//   { field: '', headerName: '30D ', width: 120, description:'30 Day Price Change'}


export default function DataTable(props) {

  const sl = props.data.stocks.result;
  console.log(JSON.stringify(props));

  return (
    // <div style={{ height: 270, width: '70%' }}>
    <div style ={{display:'flex', width:'70%'}}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid 
          autoHeight
          getRowId={(rows)=>rows.stockID}
          rows={sl}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[3]}
          // checkboxSelection
          onCellClick={(params, event) => {
            document.location.href = '/trending'
          }}
        />
      </div>
    </div>
  );
}
