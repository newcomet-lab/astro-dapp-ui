import * as React from 'react';

import {
    Grid
} from '@mui/material';

import CommunityPerformance from './CommunityPerformance';
import YourActivity from './YourActivity';

export default function Dashboard() {

    return (
        <Grid sx={{ padding: '0px 20px' }}>
            <CommunityPerformance />
            <YourActivity />
        </Grid>
    );
}
