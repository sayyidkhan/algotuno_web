import React, {useEffect} from 'react'
import {getProviders, getSession, getCsrfToken} from 'next-auth/react'
import Router from 'next/router'
import {toast} from 'react-toastify'


import Credentials from '../../components/auth/Credentials'
import {Avatar, Box, Container, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const Login = ({providers, session, csrfToken}) => {
    // re-direct to this route if successful
    useEffect(() => {
        if (session) {
            Router.push('/main');
        }
    }, [session]);

    // re-direct to this route if not successful
    useEffect(() => {
        if (Router.query.error) {
            toast.error(Router.query.error);
            Router.push('/account/signin');
        }
    }, [])

    if (session) return null;
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography component="h1" variant="h5">Sign in</Typography>

                <p className="text-center">Login with NextAuth</p>

                <Credentials providers={providers} csrfToken={csrfToken}/>
            </Box>
        </Container>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            providers: await getProviders(),
            session: await getSession(context),
            csrfToken: await getCsrfToken(context)
        }
    }
}

export default Login
