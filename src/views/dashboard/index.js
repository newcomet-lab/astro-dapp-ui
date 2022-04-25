import * as React from 'react';

import {
    Grid,
    Typography,
    Button
} from '@mui/material';

// project imports
import CommunityPerformance from './CommunityPerformance';
import YourActivity from './YourActivity';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Dashboard() {

    return (
        <Grid sx={{ padding: '0px 20px' }}>
            <CommunityPerformance />
            <YourActivity />
        </Grid>

    );
}
