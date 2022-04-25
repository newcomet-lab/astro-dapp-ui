import * as React from 'react';

import {
    Grid,
    Typography,
    Button
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function YourActivity() {

    return (
        <MainCard title="YOUR ACTIVITY">
            <Grid container sx={{ rowGap: '15px' }}>
                <Grid item container xs={12} md={6} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    rowGap: '15px'
                }}>
                    <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard item container >
                            <Typography sx={{ fontSize: '16px' }}>Your Earnings / Daily</Typography>
                            <Typography item sx={{
                                color: '#4ed047',
                                fontFamily: 'CenturyGothicB',
                                fontSize: '40px',
                                lineHeight: '35px',
                                overflow: 'hidden',
                                textAlign: 'left',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>$0</Typography>
                            <Typography item sx={{
                                fontFamily: 'Poppins',
                                fontSize: '16px',
                                margin: 0,
                                textAlign: 'left',
                                lingHeight: '35px'
                            }}>0 ASTRO</Typography>
                        </SubCard>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard item container >
                            <Typography sx={{ fontSize: '16px' }}>Market Cap</Typography>
                            <Typography item container sx={{
                                fontFamily: 'CenturyGothicB',
                                fontSize: '32px',
                                lineHeight: '35px',
                                overflow: 'hidden',
                                textAlign: 'left',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                margin: '1rem 0px'
                            }}>$0</Typography>
                        </SubCard>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard item container >
                            <Typography sx={{ fontSize: '16px' }}>APY</Typography>
                            <Typography item container sx={{
                                fontFamily: 'CenturyGothic',
                                fontSize: '32px',
                                lineHeight: '35px',
                                overflow: 'hidden',
                                textAlign: 'left',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                marginBottom: '5px'
                            }}>100,003.37%</Typography>
                            <Typography item container sx={{
                                color: 'hsla(0,0%,100%,.8)',
                                fontFamily: 'Poppins',
                                fontSize: '16px',
                                margin: 0,
                                textAlign: 'left',
                            }}>Daily % Rate (DPR): ~</Typography>
                        </SubCard>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard item container >
                            <Typography sx={{ fontSize: '16px' }}>Total Holders</Typography>
                            <Typography item container sx={{
                                fontFamily: 'CenturyGothicB',
                                fontSize: '32px',
                                lineHeight: '35px',
                                overflow: 'hidden',
                                textAlign: 'left',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                margin: '1rem 0px'
                            }}>1,579</Typography>
                        </SubCard>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Grid sx={{
                        padding: '0px 12px',
                        height: '100%',
                        justifyContent: 'center'
                    }}>
                        <SubCard item container >

                        </SubCard>
                    </Grid>
                </Grid>
            </Grid >
        </MainCard >
    );
}
