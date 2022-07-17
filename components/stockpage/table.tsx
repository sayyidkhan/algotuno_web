 import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { fontStyle } from '@mui/system';

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
  let model="";
  let modeldesc= "";

  if(modelID==1)
  {
    model = "A";
    modeldesc= "Long Short-Term Memory (LSTM)";
  }
  else 
  {
    model = "B";
    modeldesc= "Random Forests";
  }

  return (
    <Paper sx={{ width: '500px', overflow: 'hidden',backgroundColor:'#DFDFDF' }}>
        {
          data !== undefined && data.length > 0 ?
        
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell align="center" colSpan={6} style={{ backgroundColor:'#9E9E9E' }}>
                  
                  Model {model}
                  <div style={{ color:"white"} }>
                  {modeldesc}
                  </div>
                  
            
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
      </TableContainer>:
      <div style={{margin: "5em"}}>
      <h3 style={{textAlign: "center"}}><b>No data to display</b></h3>
      {
          /*** add padding ***/
          Array.from(Array(5).keys()).map((index) => {
              return <br key={index}/>
          })
      }
      </div>
    }
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