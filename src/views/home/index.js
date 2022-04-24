import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, useMediaQuery, Typography, Button } from '@mui/material';

// project imports
import { styled } from '@mui/material/styles';
import logo from 'assets/images/logo-dark.svg';

const AuthWrapper1 = styled('div')(({ theme }) => ({
    minHeight: '100vh'
}));

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    
   
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                                <Link to="#">
                                    <img src={logo} alt="Berry" width={matchDownSM ? '90' : '120'} />
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography
                                                gutterBottom
                                                variant={matchDownSM ? 'h2' : 'h1'}
                                                sx={{ mb: 5 }}
                                            >
                                                Welcome
                                            </Typography>
                                            <Button>Connect Wallet</Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
