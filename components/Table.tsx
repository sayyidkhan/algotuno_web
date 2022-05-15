import * as React from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';

interface StockDate {
  stockID : number,
  tickerSymbol  : string,
  companyName : string,
  exchange : string
}

const columns: GridColDef[] = [
  { field: 'stockID', headerName: 'stockID', width: 70 },
  { field: 'tickerSymbol', headerName: 'ticker', width: 130 },
  { field: 'companyName', headerName: 'company', width: 130 },
  { field: 'exchange', headerName: 'Exchange', width: 130}
];


export default function DataTable(props) {

  const sl = props.data.stocks.result;
  console.log(JSON.stringify(props));

  return (
    <div style={{ height: 400, width: '80%' }}>
      <DataGrid
        getRowId={(rows)=>rows.stockID}
        rows={sl}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
        checkboxSelection
      />
    </div>
  );
}
