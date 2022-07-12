import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";

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
import AlertComponent from "../../alert/alert_message";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import axios_api from "../../../config/axios_api";
import { isTemplateHead } from "typescript";

interface SuperUserInterface {
    username: string;
    date_created: string;
    date_granted_access: string;
}


// const originalRows: SuperUserInterface[] = [
//     {username: "Varrick", date_created: "10-jun-2022", date_granted_access: "20-june-2022"},
//     {username: "Sayyid", date_created: "10-jun-2022", date_granted_access: "20-june-2022"},
//     {username: "Kian Guan", date_created: "10-jun-2022", date_granted_access: "20-june-2022"},
//     {username: "Hari", date_created: "10-jun-2022", date_granted_access: "20-june-2022"},
// ];

const SearchBar = ({setSearchQuery}) => (
    <form>
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                    /* @ts-ignore */
                    setSearchQuery(e.target.value);
                }}
                label="search for username"
                variant="outlined"
                placeholder="Search..."
                size="small"
                fullWidth
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon style={{fill: "blue"}}/>
            </IconButton>
        </div>
    </form>
);

const AddUserBar = ({setSearchQuery}) => (
    <form>
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                    /* @ts-ignore */
                    setSearchQuery(e.target.value);
                }}
                label="upgrade username status"
                variant="outlined"
                placeholder="Search..."
                size="small"
                fullWidth
            />
            <IconButton type="submit" aria-label="search">
                <AddCircleOutlineRoundedIcon style={{fill: "blue"}}/>
            </IconButton>
        </div>
    </form>
);


export default function SuperUserTable() {
    const [searched, setSearched] = useState<string>("");
    const [rows,setRows] = useState([]);
    const [users,setUsers] = useState([]);
    const [loading,setLoading]= useState<boolean>();
    const [display, setDisplay] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(null);
    const [message, setMessage] = useState("");

    const fetchUsers = async () => {
        setLoading(true);
        const  {data} = await axios_api.get('/api/user/get_all_user');
        setUsers(data.result);
          setLoading(false);
          
      };

    useEffect(() => {
    fetchUsers();
    }, []); 
    
    const requestSearch = (searchedVal: string) => {
        const filteredRows = users.filter((row) => {
            return row.username.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div>
            <AlertComponent display={true} status={true} message={"enter message here"}/>
            <br/>
            <div>
                <Paper>
                    <Box pt={2.5} pl={2.5} pb={2.5} pr={2.5}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <SearchBar setSearchQuery={val => requestSearch(val)} />
                            </Grid>
                            
                        </Grid>
                    </Box>
                    <TableContainer>
                    {loading ? (
                    <LinearProgress style={{ backgroundColor: "black" }} />
                     ) : (
                        <Table style={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="right">SuperUser ID</TableCell>
                                    <TableCell align="right">Date Created</TableCell>
                                    <TableCell align="right">Granted Access Date</TableCell>
                                    <TableCell align="right">Operations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) =>{
                                    if ("superuserID" in user){
                                        return(
                                            <TableRow key={user.username}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {user.username}
                                            </TableCell>
                                            
                                            <TableCell align="right">{user.superuserID}</TableCell>
                                            <TableCell align="right">date_created</TableCell>
                                            <TableCell align="right">date_granted_access</TableCell>
                                            <TableCell align="right">
                                                <Button variant="text" color="error">Revoke Access</Button>
                                            </TableCell>
                                        </TableRow>
                                        )
                                    }

                                    
                                }
                                )}
                            </TableBody>
                        </Table>
                     )}
                    </TableContainer>
                </Paper>
                <br/>
            </div>
        </div>
    );
}

