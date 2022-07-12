import React, {useEffect, useState} from "react";
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
    TextField, Typography
} from "@mui/material";

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AlertComponent from "../../alert/alert_message";


interface BasicUserInterface {
    settingID: string;
    configName: string;
    configValue: string;
}

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
                label="settingID"
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

const dummy_list = [
    {settingID: "1", configName: "config name", value: "1"},
    {settingID: "2", configName: "config name", value: "2"},
    {settingID: "3", configName: "config name", value: "3"},
    {settingID: "4", configName: "config name", value: "4"},
    {settingID: "5", configName: "config name", value: "5"},
    {settingID: "6", configName: "config name", value: "6"},
];

export default function SettingsTable() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<BasicUserInterface[]>([]);
    const [searched, setSearched] = useState<string>("");

    const [configName, setConfigName] = useState('');
    const [configValue, setConfigValue] = useState('');

    const [display, setDisplay] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(null);
    const [message, setMessage] = useState("");


    useEffect(() => {
        if (loading) {
            getListFromDB();
            setLoading(false);
        }
    }, [rows]);

    function getListFromDB() {
        get_all_setting_api().then(res => {
            // todo: replace dummy_list, back to response
            console.log(res);
            const myUpdatedSettingsList = myFunc(res);
            setRows(myUpdatedSettingsList);
        });
    }

    function myFunc(settings) {
        return settings.map(e => {
            const obj: BasicUserInterface = {
                settingID: e.settingID,
                configName: e.configName,
                configValue: e.value
            };

            return obj
        })
    }

    async function deleteSetting(sid) {
        try {
            const res = await fetch(`/api/settings/delete_setting`, {
                method: "POST",
                body: JSON.stringify({"setting_id": sid}),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'NEXT_PUBLIC_API_SECRET_KEY 9ddf045fa71e89c6d0d71302c0c5c97e'
                }
            });

            const delete_stock_result = await res.json();
            const delete_stock_msg = delete_stock_result.message;
            console.log(delete_stock_msg)

            // 1. set the display to true to show the UI
            setDisplay(true);
            // 2. logic here
            const success = true;
            // 3. to show the update message
            if (success) {
                setStatus(true);
            } else {
                setStatus(false);
            }

            setMessage(delete_stock_msg);
            // 4. remove all the data
            setTimeout(() => {
                setStatus(null);
                setMessage("");
                setDisplay(false);
            }, 3000);
            // 5. refresh table
            getListFromDB();
            setLoading(true);
        } catch (Error) {
            console.log(Error)
        }
    }

    const addSetting = async () => {
        try {
            await fetch(`/api/settings/add_setting`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "config_name": configName,
                    "config_value": configValue
                })
            }).then(async res => {
                const data = await res.json();
                const message = data.message;
                console.log(message);

                // 1. set the display to true to show the UI
                setDisplay(true);
                // 2. logic here
                const success = true;
                // 3. to show the update message
                if (success) {
                    setStatus(true);
                } else {
                    setStatus(false);
                }

                setMessage(message);
                // 4. remove all the data
                setTimeout(() => {
                    setStatus(null);
                    setMessage("");
                    setDisplay(false);
                }, 3000);
            }).finally(() => {
                // refresh table
                getListFromDB();
                setLoading(true);
            });

        } catch (error) {
            return error;
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(configName, configValue);
        await addSetting();
    };

    const requestSearch = (searchedVal: string) => {
        const filteredRows = rows.filter((row) => {
            return row.settingID.toString().includes(searchedVal);
        });
        setRows(filteredRows);
        if (searchedVal === "") {
            setLoading(true);
        }
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div>
            <AlertComponent display={display} status={status} message={message}/>
            <br/>
            <div>
                <Paper>
                    <Box pt={0.5} pl={2.5} pb={2.5} pr={2.5}>
                        <h5>Add new setting</h5>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <TextField
                                            id="configName"
                                            className="text"
                                            onChange={e => setConfigName(e.target.value)}
                                            label="Config Name"
                                            variant="outlined"
                                            placeholder="Enter Config Name..."
                                            size="small"
                                            fullWidth
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <TextField
                                            id="configValue"
                                            className="text"
                                            onChange={e => setConfigValue(e.target.value)}
                                            label="Config Value"
                                            variant="outlined"
                                            placeholder="Enter Config Value..."
                                            size="small"
                                            fullWidth
                                        />
                                        <IconButton type="submit" aria-label="submit">
                                            <AddCircleOutlineRoundedIcon style={{fill: "blue"}}/>
                                        </IconButton>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                        { /*** if no items to display do not display the search bar ***/}
                        {
                            rows !== undefined && rows.length > 0 ?
                                <div>
                                    <h5>Search for setting(s)</h5>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <SearchBar setSearchQuery={val => requestSearch(val)}/>
                                        </Grid>
                                    </Grid>
                                </div> :
                                <br/>
                        }
                    </Box>
                    { /*** if no items to display do not display the table ***/}
                    {
                        rows !== undefined && rows.length > 0 ?
                            <TableContainer style={{ maxHeight: 400 }}>
                                <Table style={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>Setting ID</TableCell>
                                            <TableCell align="right">Config Name</TableCell>
                                            <TableCell align="right">Config Value</TableCell>
                                            <TableCell align="right">Operations</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow key={row.settingID}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell component="th" scope="row">{row.settingID}</TableCell>
                                                <TableCell align="right">{row.configName}</TableCell>
                                                <TableCell align="right">{row.configValue}</TableCell>
                                                <TableCell align="right">
                                                    <Button variant="text" color="error"
                                                            onClick={() => deleteSetting(row.settingID)}>Remove</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> :
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
                <br/>
            </div>
        </div>
    );
}

async function get_all_setting_api() {
    return fetch('/api/settings/get_all_setting').then(res => {
        if (res.status === 200) {
            return res.json()
                .then(inner_res => inner_res.result)
                .catch(err => {
                    console.log(err);
                    return [];
                })
        } else {
            return [];
        }
    }).catch(err => {
        console.log(err);
        return [];
    });
}
