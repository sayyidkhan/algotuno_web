// pages/index.tsx
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import * as React from "react"
import loadable from '@loadable/component'
import Head from 'next/head'
import {BASE_URL} from "../config/db_prod_checker";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Watchlist from '../components/watchlist/watchlist'


<<<<<<< .merge_file_a42032
    return (
        <Layout>
            
            <Grid container component="main" sx={{height: '120vh', marginTop: '3em'}}>
                {/*<CssBaseline/>*/}
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Box sx={{mt: 1, ml: 3, mr: 3}}>
                            <Box sx={{ml: 3, mr: 3}}>
                                <h1
                                    style={{
                                        color: '#cc9900',
                                        opacity: '0.8',
                                        borderColor: 'black',
                                        fontSize: '3em',
                                        textShadow: '1em',
                                        textDecorationColor: 'black',
                                        
                                        // filter: 'drop-shadow(2px 2px 2.5px #000)',
                                    }}
                                    className={global_styles.landing_page_title}
                                >
                                    ALGOTUNO.IO
                                </h1>
                                <br/>
                                <h2>The <span style={{color: '#cc9900'}}>financial compass</span> you need to help
                                    you<br/> identify where the opportunities are
                                </h2>
                                <p>identifying the best stock to pick can be a monumental task in an uncertain world.
                                    With markets facing increased volatility & rising inflation, our AI models can help
                                    chart a course to help to navigate through the financial space to help you move
                                    between markets and stocks with ease.</p>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <Link href="/account/signin">
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{m: 2, height: '3em'}}
                                        >
                                            Get Started / Sign In
                                        </Button>
                                    </Link>
                                </Grid>
                                {/*<Box sx={{m: 1}}/>*/}
                                <Grid item xs={5}>
                                    <Link href="/about">
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            sx={{m: 2, height: '3em'}}
                                        >
                                            Learn More
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    {/*<Link href="#" variant="body2">*/}
                                    {/*Forgot password?*/}
                                    {/*</Link>*/}
                                </Grid>
                                <Grid item >
                                    <Link href="/account/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={6}
                    sx={{
                        backgroundImage: `url(${bg.src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[100],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                       
                    }}
                />
            </Grid>
                       
        </Layout>
    );
}
=======
const StocksList = loadable(() => import('../components/index/Table'));


export default function Page (props){
  console.log(props)
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.containers}>
            <div className={styles.container_left}> 
        
                <StocksList/>
            </div>
            <div className={styles.container_right}>
            <Watchlist/>     
            </div>
        
      </div>
    </Layout>
  )
}


>>>>>>> .merge_file_a20556
