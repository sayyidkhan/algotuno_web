import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import {BASE_URL} from '../../../config/db_prod_checker';
import LayoutHeader from "../../../components/layout_header";
import {Grid, Tab, Tabs, TextField} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import SettingsTable from "../../../components/admin/settings/settings_table";

export default function Page() {
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        setActiveStep(activeStep + 1);
        console.log('button pressed');
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <LayoutHeader>
            <Container maxWidth="xl">
                <Box style={{marginTop: "7.5em"}}/>

                <Box sx={{width: '100%', bgcolor: '#cfe8fc', height: '80vh'}}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Settings List" style={styles.tab_styling}/>
                    </Tabs>

                    <TabContext value={value.toString()}>
                        <TabPanel value="0">
                            <SettingsTable />
                        </TabPanel>
                    </TabContext>
                </Box>

                <Box style={{marginBottom: "7.5em"}}/>
            </Container>
        </LayoutHeader>
    );
}


const styles = {
    tab_styling: {
        fontSize: "16px",
    }
};