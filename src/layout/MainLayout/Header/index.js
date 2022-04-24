import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Grid, Box, ButtonBase, Button, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useNavigate } from "react-router-dom";

import LogoSection from '../LogoSection';

import { IconMenu2 } from '@tabler/icons';

import METAMAST_IMAGE from 'assets/images/astro/metamask.png';
import WALLET_IMAGE from 'assets/images/astro/wallet.png';

const Header = ({ handleLeftDrawerToggle, leftDrawerOpened }) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <>

            {matchDownMd && !leftDrawerOpened && 
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: 'transparent',
                            color: '#fff',
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.5rem" />
                    </Avatar>
                </ButtonBase>
            }

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{
                padding: '0 48px',
                gap: '16px',
                display: 'flex',
                gap: '16px'
            }}>
                <Grid sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    marginTop: '8px',
                    height: '54px'
                }}>
                    <img alt='metamask' width={30} src={METAMAST_IMAGE} />
                    <Typography>Add ASTRO token to MetaMask</Typography>
                </Grid>
                <Grid sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '62px',
                    padding: '10px 30px',
                    background: '#1e243e',
                    borderRadius: '8px',
                    alignItems: 'center'
                }}>
                    <Grid sx={{ display: 'flex' }}>
                        <img alt='wallet' width={24} src={WALLET_IMAGE} />
                        <Typography sx={{
                            marginLeft: '8px',
                            fontSize: '16px'
                        }}>0xc2...7558</Typography>
                    </Grid>
                    <Typography>Disconnect</Typography>
                </Grid>
            </Box>
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func,
    leftDrawerOpened: PropTypes.bool
};

export default Header;
