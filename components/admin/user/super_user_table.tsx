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


// interface SuperUserInterface {
//     username: string;
//     date_created: string;
//     date_granted_access: string;
// }


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
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingBar, setLoadingBar] = useState(true);
    const [display, setDisplay] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(null);
    const [message, setMessage] = useState("");

    const fetchUsers = () => {
        axios_api.get('/api/user/get_all_user').then(res => {
            const myUpdatedUserList = res.data.result;
            setRows(myUpdatedUserList);
        }).finally(() => {
            setLoadingBar(false);
        });
    };

    useEffect(() => {
        if (loading) {
            fetchUsers();
            setLoading(false);
        }
    }, [rows]);


    const requestSearch = async (searchedVal: string) => {
        if (searchedVal.trim().length === 0) {
            await fetchUsers();
        } else {
            const filteredRows = rows.filter((row) => {
                return row.username.toLowerCase().includes(searchedVal.toLowerCase());
            });
            // only if results greater than 0, then continue the search, otherwise do not update the list
            if (filteredRows.length > 0) {
                setRows(filteredRows);
            } else {
                setRows([]);
            }
        }
    };

    const cancelSearch = async () => {
        setSearched("");
        await requestSearch(searched);
    };

    const revokeSuperUserAccess = async (username) => {

        const res = await fetch(`/api/superuser/delete_superuser`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username
            })
        })
            .then(async res => {
                const data = await res.json();
                const message = data.message;
                return message;
            })
            .then(message => {
                setDisplay(true);
                setMessage(message);
                setStatus(true);
                //sto(true);
                //setIsLoading(false);
            })
        setTimeout(() => {
            fetchUsers();
            setStatus(null);
            setMessage("timed out");
            setDisplay(false);
        }, 1000);
    };

    return (
        <div>
            <AlertComponent display={display} status={true} message={message}/>
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
                    <TableContainer style={{maxHeight:400}}>
                    {loadingBar ? (
                    <LinearProgress style={{ backgroundColor: "black" }} />
                     ) : (
                        <Table style={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell align="left">SuperUser ID</TableCell>
                                    <TableCell align="right">Operations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((user, index) =>{
                                    if (user.Superuser.length >0){
                                        return(
                                            <TableRow key={user.username}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {user.username}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {user.email}
                                            </TableCell>
                                            <TableCell align="left">{user.Superuser[0].superuserID}</TableCell>

                                            <TableCell align="right">
                                                <Button variant="text" color="error" onClick={()=>revokeSuperUserAccess(user.username)}>Revoke Access</Button>
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

