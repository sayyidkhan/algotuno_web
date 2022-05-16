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
  id: 'year' | 'month' | 'min' | 'max' | 'close'|'total';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'year', label: 'Year', minWidth: 50 },
  { id: 'month', label: 'Month', minWidth: 50 },
  {
    id: 'min',
    label: 'Min',
    minWidth: 25,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'max',
    label: 'Max',
    minWidth: 25,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'close',
    label: 'Close',
    minWidth: 25,
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 25,
    format: (value: number) => value.toFixed(2)+"%",
  },
];

interface Data {
  year: number;
  month: string;
  min: number;
  max: number;
  close: number;
  total:number;
}

function createData(
  year: number,
  month: string,
  min: number,
  max: number,
  close: number,
  total:number,
): Data {
  //const density = population / size;
  return { year, month, min, max, close, total };
}

const rows = [
  createData(2022, "Apr", 147, 178,156, -10.34),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '40%', overflow: 'hidden',backgroundColor:'grey', }}>
      {/* add the div to split the table later */}
      <div className=''>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell align="center" colSpan={6}>
                Apple Stock forecast by month
            </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
    </Paper>
  );
}




// import React, {useMemo} from "react"
// import {useTable} from 'react-table'

// import {Types} from '../components/types'

// type Props ={
//     data: Types[];
// };

// //if its static use this one , if its variable =>useMemo
// const columns = [
    
//     {
//         Header:"Ticker",
//         accessor:"tickerSymbol",
//     },
//     {
//         Header:"Exchange",
//         accessor: "exchange",
//     },
//     {
//         Header:"CompanyName",
//         accessor: "companyName",
//     },
  
// ];

// function Table(props:Props){
//     //catching the data. Purpose is to only have 1 instance
//     const data = useMemo(()=> props.data, [props.data]);
    
//     const tableInstance = useTable({ columns , data })
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//     } = tableInstance

//     return (
//         <table >
//         <thead>
//             {headerGroups.map((headerGroup)=>(
//                 // Apply the header row props
//                 <tr{...headerGroup.getHeaderGroupProps()}>
//                 // Loop over the headers in each row
//                 {headerGroup.headers.map((column)=>(
//                     // Apply the header cell props
//                     <th{...column.getHeaderProps()}scope = "col">
//                     // Render the header
//                     {column.render("Header")}
//                     </th>
//                 ))}
//                 </tr>
//             ))}
//         </thead>   
//         {/* Apply the table body props */} 
//         <tbody {...getTableBodyProps()}>
//             {rows.map((row)=>{
//                 prepareRow(row);
//                 return(
//                     <tr {...row.getRowProps()}>
//                         // Loop over the rows cells
//                         {row.cells.map(cell=>{
//                             // Apply the cell props
//                             return (
//                                 <td{...cell.getCellProps()}>
//                                 {cell.render("Cell")}
//                                 </td>
//                                 )
//                             })}
//                           </tr>
//                         )
//                       })}
//         </tbody>
//     </table>     
//     )  
// }

// export default Table

