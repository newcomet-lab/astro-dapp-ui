import * as React from 'react';

import {
    Grid,
    Typography,
    Button
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

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
                            <Typography sx={{
                                fontSize: '16px',
                                lineHeight: '35px'
                            }}>Your Earnings / Daily</Typography>
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
                                lineHeight: '35px'
                            }}>0 ASTRO</Typography>
                        </SubCard>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard item container >
                            <Typography sx={{
                                fontSize: '16px',
                                lineHeight: '35px'
                            }}>APY</Typography>
                            <Typography item sx={{
                                fontFamily: 'CenturyGothic',
                                fontSize: '32px',
                                lineHeight: '35px',
                                overflow: 'hidden',
                                textAlign: 'left',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
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
                            <Grid sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Typography sx={{
                                    fontSize: '16px',
                                    lineHeight: '35px'
                                }}>Total Earned</Typography>
                                <Typography item container sx={{
                                    alignSelf: 'center',
                                    backgroundColor: 'rgba(0,0,0,.1)',
                                    border: '1px solid #595959',
                                    borderRadius: '15px',
                                    padding: '1px 10px',
                                    color: '#4ed047',
                                    fontSize: '14px',
                                    textAlign: 'center'
                                }}>+0%</Typography>
                            </Grid>
                            <Typography item sx={{
                                color: '#4ed047',
                                fontFamily: 'CenturyGothic',
                                fontSize: '32px',
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
                                lineHeight: '35px'
                            }}>0 ASTRO</Typography>
                        </SubCard>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard item container >
                            <Typography sx={{
                                fontSize: '16px',
                                lineHeight: '35px'
                            }}>Your Balance</Typography>
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
                                lineHeight: '35px'
                            }}>0 ASTRO</Typography>
                        </SubCard>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <Button variant="contained" sx={{
                            cursor: 'pointer',
                            flexDirection: 'column',
                            padding: '14px 20px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'transparent',
                            border: '1.5px solid #7a1bff',
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            borderRadius: '6px',
                            '&:hover': {
                                background: 'transparent',
                                boxShadow: '1px 1px 10px 0 #fa34b2',
                                transition: 'all .3s ease'
                            }
                        }}>DEX Charts</Button>
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <Button variant="contained" sx={{
                            cursor: 'pointer',
                            flexDirection: 'column',
                            padding: '14px 20px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'linear-gradient(90deg,#7a1bff -3.88%,#5947ff)',
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            borderRadius: '6px',
                            '&:hover': {
                                boxShadow: '1px 1px 10px 0 #fa34b2',
                                transition: 'all .3s ease'
                            }
                        }}>Buy ASTRO</Button>
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
