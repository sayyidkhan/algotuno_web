import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import {createTheme} from '@mui/material/styles';
import LayoutHeader from "../../../components/layout_header";
import {Grid, Tab, Tabs, TextField} from "@mui/material";
<<<<<<< .merge_file_a19412
import {TabContext, TabPanel} from "@mui/lab";
import StockPriceListTable from "../../../components/admin/stock/stock_price_list_table";
import MLPriceListTable from "../../../components/admin/stock/ml_price_list_table";


const theme = createTheme();

export default function Page() {
    function Copyright() {
        return (
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

=======
import {TabContext, TabList, TabPanel} from "@mui/lab";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];


const theme = createTheme();

export function AddressForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Add Stock
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="ticker_symbol"
                        name="ticker_symbol"
                        label="Ticker Symbol"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default function Page() {
>>>>>>> .merge_file_a40512
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function AddStockComponent() {
        return <Container>
            <Box sx={{mt: 12.5}}/>
            <CssBaseline/>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <AddressForm/>
                    <React.Fragment>
                        <React.Fragment>
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{mt: 3, ml: 1}}
                                >
                                    Add Stock
                                </Button>
                            </Box>
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </Container>
        </Container>;
    }

    return (
        <LayoutHeader>
            <Container maxWidth="xl">
                <Box style={{marginTop: "7.5em"}}/>
<<<<<<< .merge_file_a19412
=======


>>>>>>> .merge_file_a40512
                <Box sx={{width: '100%', bgcolor: '#cfe8fc', height: '80vh'}}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Stock Price List" style={styles.tab_styling} />
                        <Tab label="ML Price List" style={styles.tab_styling} />
                    </Tabs>
                    <TabContext value={value.toString()}>
                        <TabPanel value="0">
<<<<<<< .merge_file_a19412
                            <StockPriceListTable/>
=======
                            <AddStockComponent/>
>>>>>>> .merge_file_a40512
                        </TabPanel>
                        <TabPanel value="1">
<<<<<<< .merge_file_a19412
                            <MLPriceListTable />
=======
                            Item Two
>>>>>>> .merge_file_a40512
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