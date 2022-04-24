import * as React from 'react';

import {
    Grid,
    Typography,
    Button
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function VestingDetail() {
 
    return (
        <MainCard title="Vesting Detail">
            <Grid container rowSpacing={2}>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={12}>
                            <Typography variant="h4" gutterBottom component="div">
                                Allocation amount: 10,000
                            </Typography>
                            <Typography variant="h4" gutterBottom component="div">
                                Strike price: 0.10
                            </Typography>
                            <Typography variant="h4" gutterBottom component="div">
                                Vesting start: 01/01/2022 (MM/DD/YYYY)
                            </Typography>
                            <Typography variant="h4" gutterBottom component="div">
                                Vesting end: 12/31/2025
                            </Typography>
                            <Typography variant="h4" gutterBottom component="div">
                                Cliff date: 01/01/2023
                            </Typography>
                            <Typography variant="h4" gutterBottom component="div">
                                Amount vested at cliff: 2,500
                            </Typography>
                            <Typography variant="h4" gutterBottom component="div">
                                Monthly vesting (Starting 01/01/2023): 208.33
                            </Typography>
                            <Typography variant="h4" gutterBottom component="div">
                                Currently vested: 2,708.33 ($1354.17)
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={12}>
                            <Button variant="contained">Withdraw</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}
