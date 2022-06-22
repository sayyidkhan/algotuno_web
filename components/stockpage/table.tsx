 import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: '1d' | '7d' | '30d' ;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: '1d', label: '1 Day', minWidth: 50 },
  { id: '7d', label: '7 Day', minWidth: 50 },
  {
    id: '30d',
    label: '30 Day',
    minWidth: 50
  },

];

const StickyHeadTable=(props)=> {
  const modelID  = props.pData.results[0].MLModelID;
  const data = props.pData.results;
  const onedayprediction = parseFloat(data[0].Price).toFixed(2);
  const sevendayprediction = parseFloat(data[1].Price).toFixed(2);
  const thirtydayprediction = parseFloat(data[2].Price).toFixed(2);
  
  const onedaydate = data[0].DateString;
  const sevendaydate = data[1].DateString;
  const thirtydaydate = data[2].DateString;

 console.log(thirtydaydate);
  let model=""

  if(modelID==1)
  {
    model = "A";
  }
  else 
  {
    model = "B";
  }

  return (
    <Paper sx={{ width: '500px', overflow: 'hidden',backgroundColor:'#DFDFDF' }}>
      <div className=''>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell align="center" colSpan={6} style={{ backgroundColor:'#9E9E9E' }}>
                  Model {model} 
            </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,
                    backgroundColor:'#9E9E9E' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {onedaydate}
              </TableCell>
              <TableCell>
                {sevendaydate}
              </TableCell>
              <TableCell>
                {thirtydaydate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {onedayprediction}
              </TableCell>
              <TableCell>
                {sevendayprediction}
              </TableCell>
              <TableCell>
                {thirtydayprediction}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
     
      </div>
    </Paper>
  );
}
export default StickyHeadTable

// const StickyHeadTable =()=> {
// return(
//   <div>
    
//   </div>
// )
// }
//export default StickyHeadTable