import React, {useMemo} from "react"
import {useTable} from "react-table"
import {Types} from '../components/types'

type Props ={
    data: Types[];
};
//if its static use this one , if its variable =>useMemo
const columns = [
    Header:"Id",
    accessor:"Id"
];

function Table(props:Props){
    //catching the data. Purpose is to only have 1 instance
    const data = useMemo(()=> props.data, [props.data]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns,data});

    return 
        // <table>
        //     <thead>
        //         {headerGroups.map((headerGroup)=>(
        //             <tr
        //         ))}
        //     </thead>
        // </table>
    
}