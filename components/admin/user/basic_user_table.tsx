import React, {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
    Box,
    Button, Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import AlertComponent from "../../alert/alert_message";

interface BasicUserInterface {
    username: string;
    date_created: string;
    subscription_type: string;
}


const originalRows: BasicUserInterface[] = [
    {username: "Varrick", date_created: "10-jun-2022", subscription_type: "basic"},
    {username: "Sayyid", date_created: "10-jun-2022", subscription_type: "premium"},
    {username: "Kian Guan", date_created: "10-jun-2022", subscription_type: "basic"},
    {username: "Hari", date_created: "10-jun-2022", subscription_type: "premium"},
];

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




export default function BasicUserTable() {
    const [rows, setRows] = useState<BasicUserInterface[]>(originalRows);
    const [searched, setSearched] = useState<string>("");
    // const classes = useStyles();

    const requestSearch = (searchedVal: string) => {
        const filteredRows = originalRows.filter((row) => {
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
            <AlertComponent display={true} status={true} message={"enter message here"} />
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
                        <Table style={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="right">Date Created</TableCell>
                                    <TableCell align="right">Subscription Type</TableCell>
                                    <TableCell align="right">Operations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.username}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.username}
                                        </TableCell>
                                        <TableCell align="right">{row.date_created}</TableCell>
                                        <TableCell align="right">{row.subscription_type}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="text" color="error">Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <br/>
                <a
                    target="_blank"
                    href="https://smartdevpreneur.com/the-easiest-way-to-implement-material-ui-table-search/"
                >
                    Learn how to add search and filter to Material-UI Table here.
                </a>
            </div>
        </div>
    );
}
