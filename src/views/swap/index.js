import * as React from 'react';

import {
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import SwapForAstro from './SwapForAstro';
import WhatToDo from './WhatToDo';

export default function Swap() {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Grid container sx={{ padding: '0px 20px', justifyContent: 'space-between' }}>
            {/* <Grid item xs={12} md={7} sx={{ paddingRight: !matchDownMd ? '5%' : '0%', height: '100%' }}>
                <WhatToDo />
            </Grid> */}
            <Grid item xs={12} md={5} sx={{ paddingRight: !matchDownMd ? '1%' : '0%', height: '100%' }}>
                <SwapForAstro />
            </Grid>
        </Grid>
    );
}
