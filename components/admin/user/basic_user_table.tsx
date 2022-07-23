import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
    Box,
    Button, Grid,
    IconButton,
    Paper,
    Table,
    LinearProgress,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ClickAwayListener
} from "@mui/material";
import AlertComponent from "../../alert/alert_message";
import axios_api from "../../../config/axios_api";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
// interface BasicUserInterface {
//     username: string;
//     date_created: string;
//     subscription_type: string;
// }


// const originalRows: BasicUserInterface[] = [
//     {username: "Varrick", date_created: "10-jun-2022", subscription_type: "basic"},
//     {username: "Sayyid", date_created: "10-jun-2022", subscription_type: "premium"},
//     {username: "Kian Guan", date_created: "10-jun-2022", subscription_type: "basic"},
//     {username: "Hari", date_created: "10-jun-2022", subscription_type: "premium"},
// ];

// export async function  getServerSideProps(){
//     try{
//         const res= await fetch(BASE_URL+"/api/user/get_all_user",{
//             method:'GET',
//             headers:{

//                 'Content-Type':'application/json'
//             }
//         });
//         const getUsers = await res.json();

//         return{
//             props:{userList:getUsers},
//         }

//     }
//     catch(error)
//     {
//         return{ props:{errorCode:500, message: 'Failed to fetch DB data'}}
//     }
// }


const SearchBar = ({searched}) => (
    <form>
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <TextField
                id="search-bar"
                className="text"
                onChange={(e) => {
                    /* @ts-ignore */
                    searched(e.target.value);
                }}
                label="Search user"
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

const AddUserBar = ({searched}) => (
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
                label="upgrade username"
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


export default function BasicUserTable() {

    const [searched, setSearchQuery] = useState<string>("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingBar, setLoadingBar] = useState(true);
    const [display, setDisplay] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(null);
    const [message, setMessage] = useState("");
    const [open, setOpen] = React.useState(false);


    const fetchUsers = () => {
        setLoadingBar(true);
        axios_api.get('/api/user/get_all_user').then(res => {
            const myUpdatedUserList = res.data.result;
            setRows(myUpdatedUserList);
        }).finally(() => {
            setLoadingBar(false);
        });

        /*** dummy data for testing ***/
        // setRows([
        //     {username: "abc"},
        //     {username: "def"},
        //     {username: "hgi"},
        // ]);
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
        setSearchQuery("");
        await requestSearch(searched);
        fetchUsers();
    };

    const handleClickAway = () => {
        setOpen(false);

    };
    const deleteUser = async (username) => {

        const res = await fetch(`/api/user/delete_user`, {
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

    const upgradeUser = async (username) => {

        const res = await fetch(`/api/superuser/add_superuser`, {
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
            setStatus(null);
            setMessage("timed out");
            setDisplay(false);
        }, 1000);
    };

    // const deleteUser = async (username) => {
    //     // 1. set the display to true to show the UI
    //     console.log(username);
    //     setDisplay(true);
    //     const deleteu = { "username": `${username}` };
    //     const res = await axios_api.post('/api/user/delete_user', deleteu);

    //     const response = await res.json();
    //     console.log(response.message);
    //     // 2. logic here
    //     const success = true;
    //     // 3. to show the update message
    //     if (success) {
    //         setStatus(true);
    //         setMessage(`${response.message}`);

    //     }
    //     else {
    //         setStatus(false);
    //         setMessage("the operation is unsuccesful");
    //     }
    //     // 4. remove all the data
    //     setTimeout(() => {
    //         setStatus(null);
    //         setMessage("timed out");
    //         setDisplay(false);
    //     }, 3000);
    // };

    return (
        <div>
            <AlertComponent display={display} status={status} message={message}/>
            <br/>
            <div>
                <Paper>

                    <ClickAwayListener
                        mouseEvent="onMouseDown"
                        touchEvent="onTouchStart"
                        onClickAway={handleClickAway}
                    >
                        <Box pt={2.5} pl={2.5} pb={2.5} pr={2.5}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <SearchBar searched={val => requestSearch(val)}/>
                                </Grid>
                                <Grid item xs={3}>
                                    { /* todo: add function for add user */}
                                    {/* <AddUserBar setSearchQuery={val=>requestSearch(val)}  /> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </ClickAwayListener>


                    <TableContainer style={{maxHeight: 400}}>
                        {loadingBar ? (
                                <LinearProgress style={{backgroundColor: "black"}}/>
                            ) :
                            (
                                rows !== undefined && rows.length > 0 ?
                                    <Table style={{minWidth: 650}} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No.</TableCell>
                                                <TableCell>Username</TableCell>
                                                <TableCell align="right">Email</TableCell>
                                                <TableCell align="right">Upgrade to SuperUser</TableCell>
                                                <TableCell align="right">Operations</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((user, index) => (
                                                <TableRow key={user.username}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {user.username}
                                                    </TableCell>
                                                    <TableCell align="right">{user.email}</TableCell>
                                                    <TableCell align="right">
                                                        <Button
                                                            variant="text"
                                                            color="error"
                                                            onClick={() => upgradeUser(user.username)}>
                                                            Upgrade</Button>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Button
                                                            variant="text"
                                                            color="error"
                                                            onClick={() => deleteUser(user.username)}>
                                                            Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    :
                                    <div style={{margin: "5em"}}>
                                        <h3 style={{textAlign: "center"}}><b>No data to display</b></h3>
                                        {
                                            /*** add padding ***/
                                            Array.from(Array(5).keys()).map((index) => {
                                                return <br key={index}/>
                                            })
                                        }
                                    </div>
                            )}
                    </TableContainer>

                </Paper>
            </div>

        </div>
    );
}
