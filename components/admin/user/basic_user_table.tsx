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
    TextField
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
    
    //const [rows, setRows] = useState<BasicUserInterface[]>(originalRows);
    const [searched, setSearched] = useState<string>("");
    const [users,setUsers] = useState([]);
    const [loading,setLoading]= useState<boolean>();
    const [display, setDisplay] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(null);
    const [message, setMessage] = useState("");
    // const classes = useStyles();

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
        setUsers(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };


    const deleteUser = () => {
        // 1. set the display to true to show the UI
        setDisplay(true);
        // 2. logic here
        const success = true;
        // 3. to show the update message
        if (success) {
            setStatus(true);
            setMessage("the operation is successful");
        }
        else {
            setStatus(false);
            setMessage("the operation is unsuccesful");
        }
        // 4. remove all the data
        setTimeout(() => {
            setStatus(null);
            setMessage("timed out");
            setDisplay(false);
        }, 3000);
    };

    return (
        <div>
            
            <AlertComponent display={display} status={status} message={message} />
            <br/>
            <div>
                <Paper>
                    <Box pt={2.5} pl={2.5} pb={2.5} pr={2.5}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <SearchBar setSearchQuery={val => requestSearch(val)} />
                            </Grid>
                            <Grid item xs={3}>
                                { /* todo: add function for add user */}
                                <AddUserBar setSearchQuery={() => {}} />
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
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Date Created</TableCell>
                                    <TableCell align="right">Subscription Type</TableCell>
                                    <TableCell align="right">Operations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={user.username}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.username}
                                        </TableCell>
                                        <TableCell align="right">{user.email}</TableCell>

                                        <TableCell align="right">
                                            date created
                                        </TableCell>
                                        <TableCell align="right">
                                            subscription 
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button 
                                            variant="text"
                                             color="error"
                                             onClick={()=>deleteUser()}>
                                                Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        )}
                    </TableContainer>
                    
                </Paper>  
            </div>
          
        </div>
    );
}
