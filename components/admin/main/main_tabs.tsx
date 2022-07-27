import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Paper, styled} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const adjustWidth =  { width : useMediaQuery('(min-width:1200px)') ? '85em' : '50em' };

    return (
        <Box
            sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "80vh"}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                <Tab label="Daily HSP" {...a11yProps(0)} />
                <Tab label="Tensorflow" {...a11yProps(1)} />
                <Tab label="Scikit Learn" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Item style={{height: '40vh' , ...adjustWidth}}>
                    <iframe
                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRZPs5Qf_vdFi5xjOmKtcMmDErtzZc1G3GH2rHfReUUgIjpU4GE4hmOfQg2jcfx5kzaF0p3ZFszI7Wy/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
                        width="100%"
                        allowTransparency={true}
                        style={{height: "100%"}}
                    >
                    </iframe>
                </Item>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Item style={{height: '40vh' , ...adjustWidth}}>
                    <iframe
                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRqDOvcVswph7rircBbMjHJlK_kjQp69XqCMH4dEyiykS8B_luH1VzWZ3yKpEB_i0iunow9-IgHtwPa/pubhtml?widget=true&amp;headers=false"
                        width="100%"
                        allowTransparency={true}
                        style={{height: "100%"}}
                    >
                    </iframe>
                </Item>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Item style={{height: '40vh' , ...adjustWidth}}>
                    <iframe
                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRpbhqgjZ_v3GpB2wenlnqXeBKGaOXDKCrAUJNFebiTIMY1ioM1dXPS1o9Nuiqeikur_i-bt05TLV_0/pubhtml?widget=true&amp;headers=false"
                        width="100%"
                        allowTransparency={true}
                        style={{height: "100%"}}
                    >
                    </iframe>
                </Item>
            </TabPanel>
        </Box>
    );
}

