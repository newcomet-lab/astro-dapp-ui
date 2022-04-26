import * as React from 'react';

import {
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import YourAccountActivity from './YourAccountActivity';
import RebaseClaimActivity from './RebaseClaimActivity';

export default function Account() {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Grid container sx={{ padding: '0px 20px', justifyContent: 'space-between' }}>
            <Grid item xs={12} md={6} sx={{ paddingRight: !matchDownMd ? '2%' : '0%', height: '100%' }}>
                <YourAccountActivity />
            </Grid>
            <Grid item xs={12} md={6} sx={{ paddingLeft: !matchDownMd ? '2%' : '0%', height: '100%' }}>
                <RebaseClaimActivity />
            </Grid>
        </Grid>

    );
}
