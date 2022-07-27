import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from '@mui/icons-material/Create';

import {
    Box,
    Button, Grid,
    IconButton, LinearProgress,
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
    settingID: string;
    settingName: string;
    settingValue: string;
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
                label="setting name"
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

export default function SettingsTable() {
    const [loading, setLoading] = useState(true);
    const [loadingBar, setLoadingBar] = useState(true);
    const [rows, setRows] = useState<BasicUserInterface[]>([]);
    const [searched, setSearched] = useState<string>("");

    const [settingName, setSettingName] = useState('');
    const [settingValue, setSettingValue] = useState('');

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
        }).finally(() => {
            setLoadingBar(false);
        });
    }

    function myFunc(settings) {
        return settings.map(e => {
            const obj: BasicUserInterface = {
                settingID: e.settingID,
                settingName: e.settingName,
                settingValue: e.settingValue
            };

            return obj
        })
    }

    async function deleteSetting(sid) {
        try {
            const res = await fetch(`/api/settings/delete_settings`, {
                method: "POST",
                body: JSON.stringify({"setting_id": sid}),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'NEXT_PUBLIC_API_SECRET_KEY 9ddf045fa71e89c6d0d71302c0c5c97e'
                }
            });

            const delete_setting_result = await res.json();
            const delete_setting_msg = delete_setting_result.message;
            console.log(delete_setting_msg)

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

            setMessage(delete_setting_msg);
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

    const upsertSetting = async () => {
        try {
            await fetch(`/api/settings/add_or_update_settings`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "setting_name": settingName,
                    "setting_value": settingValue
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
        console.log(settingName, settingValue);
        await upsertSetting();
    };

    const requestSearch = async (searchedVal: string) => {
        if (searchedVal.trim().length === 0) {
            await getListFromDB();
        } else {
            const filteredRows = rows.filter((row) => {
                return row.settingName.toLowerCase().includes(searchedVal.toLowerCase());
            });
            // only if results greater than 0, then continue the search, otherwise do not update the list
            if (filteredRows.length > 0) {
                setRows(filteredRows);
            } else {
                setRows([]);
            }
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
                        <h5>Add / Update settings</h5>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <TextField
                                            id="settingName"
                                            className="text"
                                            onChange={e => setSettingName(e.target.value)}
                                            label="Setting Name"
                                            variant="outlined"
                                            placeholder="Enter Setting Name..."
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
                                            id="settingValue"
                                            className="text"
                                            onChange={e => setSettingValue(e.target.value)}
                                            label="Setting Value"
                                            variant="outlined"
                                            placeholder="Enter Setting Value..."
                                            size="small"
                                            fullWidth
                                        />
                                        <IconButton type="submit" aria-label="submit">
                                            <CreateIcon style={{fill: "blue"}}/>
                                        </IconButton>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                        <div>
                            <h5>Search for setting(s)</h5>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <SearchBar setSearchQuery={val => requestSearch(val)}/>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>

                    <TableContainer style={{maxHeight: 335}}>
                        {loadingBar ? (
                                <LinearProgress style={{backgroundColor: "black"}}/>
                            ) :
                            (
                                rows !== undefined && rows.length > 0 ?
                                    <Table style={{minWidth: 650}} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No.</TableCell>
                                                <TableCell>Setting ID</TableCell>
                                                <TableCell align="right">Setting Name</TableCell>
                                                <TableCell align="right">Setting Value</TableCell>
                                                <TableCell align="right">Operations</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <TableRow key={row.settingID}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell component="th" scope="row">{row.settingID}</TableCell>
                                                    <TableCell align="right">{row.settingName}</TableCell>
                                                    <TableCell align="right">{row.settingValue}</TableCell>
                                                    <TableCell align="right">
                                                        <Button variant="text" color="error" onClick={() => deleteSetting(row.settingID)}>Delete</Button>
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
                <br/>
            </div>
        </div>
    );
}

async function get_all_setting_api() {
    return fetch('/api/settings/get_all_settings').then(res => {
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
