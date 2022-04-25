import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Typography, useMediaQuery, Grid, Divider, ButtonBase } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faMedium, faDiscord } from '@fortawesome/free-brands-svg-icons'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import { drawerWidth } from 'store/constant';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const drawer = (
        <>
            <Box sx={{
                padding: '15px 2px 0',
                textAlign: 'center'
            }}>
                <LogoSection />
                <Grid sx={{width: '100px', height: '37px'}}>&nbsp;</Grid>
                <Typography sx={{ fontSize: '14px' }}>CURRENT ASTRO PRICE</Typography>
                <Typography sx={{ fontSize: '20px', marginTop: '8px' }}>$0</Typography>
                <Typography sx={{ fontSize: '14px' }}>MARKET CAP</Typography>
            </Box>

            <Divider sx={{ mt: 0.25, mb: 1.25 }} />

            <BrowserView>
                <MenuList />
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList />
                </Box>
            </MobileView>

            <Box sx={{
                padding: '15px 2px 0',
                textAlign: 'center'
            }}>
                <Grid sx={{display: 'flex', justifyContent: 'center', gap: 3}}>
                    <ButtonBase>
                        <FontAwesomeIcon icon={faTwitter} size={'2x'} />
                    </ButtonBase>
                    <ButtonBase>
                        <FontAwesomeIcon icon={faMedium} size={'2x'} />
                    </ButtonBase>
                    <ButtonBase>
                        <FontAwesomeIcon icon={faDiscord} size={'2x'} />
                    </ButtonBase>
                </Grid>
                <Typography sx={{ fontSize: '16px', marginTop: '32px' }}>Copyright © 2022</Typography>
                <Typography sx={{ fontSize: '20px' }}>100 DAYS Ventures, LLC</Typography>
                <Typography sx={{ fontSize: '14px', marginTop: '16px', marginBottom: '16px' }}>All Rights Reserved.</Typography>
            </Box>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    const perfectScrollbar = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            console.log(perfectScrollbar)
            if (perfectScrollbar.current !== null)
            perfectScrollbar.current.updateScroll();

        }, 1000);
    }, [perfectScrollbar]);

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                <PerfectScrollbar
                    ref={perfectScrollbar}
                    component="div"
                    style={{
                        height: '100vh',
                        paddingLeft: '10%',
                        paddingRight: '10%'
                    }}
                >
                    {drawer}
                </PerfectScrollbar>
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
