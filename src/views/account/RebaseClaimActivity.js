import * as React from 'react';

import {
    Grid,
    Typography,
    Button,
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IconPlus, IconMinus } from '@tabler/icons';

import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

import astroIcon from 'assets/images/astro/astro-icon.png';

export default function RebaseClaimActivity() {
    const [expanded, setExpanded] = React.useState('accordian');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


    return (
        <MainCard title="REBASE & CLAIM ACTIVITY">
            <Grid container sx={{ rowGap: '15px' }}>
                <Grid item container xs={12} md={12} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    rowGap: '15px'
                }}>
                    <Grid item xs={12} sm={5} sx={{ padding: '0px 12px' }}>
                        <Grid sx={{
                            height: '100%',
                            justifyContent: 'center'
                        }}>
                            <SubCard>
                                <Grid sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}>
                                    <Grid sx={{
                                        padding: '0px 12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textAlign: 'center'
                                    }}>
                                        <Typography sx={{
                                            fontSize: '12px',
                                            marginBottom: '5px'
                                        }}>TIME UNTIL<br></br>NEXT REBASE</Typography>
                                        <Typography sx={{
                                            fontSize: '20px',
                                            marginBottom: '5px'
                                        }}>00:00</Typography>
                                    </Grid>
                                    <Grid sx={{
                                        padding: '0px 12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textAlign: 'center'
                                    }}>
                                        <Typography sx={{
                                            fontSize: '12px',
                                            marginBottom: '5px'
                                        }}>NEXT REBASE AMOUNT</Typography>
                                        <Typography sx={{
                                            fontSize: '24px',
                                            marginBottom: '5px'
                                        }}>$0</Typography>
                                        <Typography sx={{
                                            fontSize: '12',
                                            marginBottom: '5px',
                                            color: '#bcc3cf'
                                        }}>0 ASTRO</Typography>
                                    </Grid>
                                    <Grid sx={{
                                        padding: '0px 12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textAlign: 'center'
                                    }}>
                                        <Typography sx={{
                                            fontSize: '14px',
                                            marginBottom: '5px',
                                            textAlign: 'center',
                                            cursor: 'pointer'
                                        }}>ASTRO is auto-compounding</Typography>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={7} sx={{ padding: '0px 12px' }}>
                        <Typography sx={{
                            fontSize: '18px',
                            fontFamily: 'CenturyGothic',
                            fontWeight: '700',
                            marginTop: '0.5rem',
                            marginBottom: '0.25rem'
                        }}>Your Daily Claim Quote:</Typography>
                        <Typography sx={{
                            fontSize: '14px',
                            color: '#bcc3cf'
                        }}>If you choose to take your weekly claim, click below for 1% to maximize your growth. If you'd like to take more earnings, swap here.</Typography>
                        <Grid sx={{
                            margin: '1rem 0px',
                            width: '100%',
                            borderRadius: '10px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            justifyContent: 'space-between',
                            backgroundColor: '#151b34',
                            border: '1px solid #5947ff',
                            padding: '10px 15px',
                        }}>
                            <Grid sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <img src={astroIcon} style={{ width: '30px', height: '30px' }} />
                                <Typography sx={{
                                    margin: '1px',
                                    fontSize: '16px',
                                    fontWeight: '400'
                                }}>CLAIM ASTRO</Typography>
                            </Grid>
                            <Typography sx={{
                                margin: '1px',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: 'rgb(255, 184, 77)'
                            }}>0</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '15px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Your Earnings/Daily: 1.91%</Typography>
                            <Typography sx={{
                                fontSize: '15px',
                                fontFamily: 'Poppins',
                                color: '#fff'
                            }}>0 ($0)</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '15px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Recommended Claim: 1%</Typography>
                            <Typography sx={{
                                fontSize: '15px',
                                fontFamily: 'Poppins',
                                color: '#fff'
                            }}>0 ($0)</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '15px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Claim Tax: 0%</Typography>
                            <Typography sx={{
                                fontSize: '15px',
                                fontFamily: 'Poppins',
                                color: '#fff'
                            }}>0 ($0)</Typography>
                        </Grid>
                        <hr style={{
                            height: '1px',
                            background: '#ddd',
                            margin: '0.5rem 0px',
                        }} />
                        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Grid>
                                <Typography sx={{
                                    fontSize: '15px',
                                    fontFamily: 'Poppins',
                                    fontWeight: '400',
                                }}>Estimated Amount</Typography>
                                <Typography sx={{
                                    fontSize: '15px',
                                    fontFamily: 'Poppins',
                                    fontWeight: '400',
                                }}>You'll Receive in $USDC</Typography>
                            </Grid>
                            <Typography sx={{
                                fontSize: '26px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                                color: '#4ed047'
                            }}>$0</Typography>
                        </Grid>
                        <Button variant="contained" sx={{
                            cursor: 'pointer',
                            flexDirection: 'column',
                            padding: '14px 20px',
                            width: '100%',
                            marginTop: '10px',
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
                        }}>Weekly Claim (1%)</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        rowGap: '15px',
                        margin: '0px 1rem',
                        background: 'rgb(21, 27, 52)',
                        border: '1px solid rgb(89, 71, 255)',
                        borderRadius: '0.25rem'
                    }}>
                        <Accordion expanded={expanded === 'accordian'} onChange={handleChange('accordian')} defaultExpanded>
                            <AccordionSummary
                                expandIcon={expanded === 'accordian' ? <IconMinus size='20px' color='#FFF' /> : <IconPlus size='20px' color='#FFF' />}
                                aria-controls="accordiana-content"
                                id="accordiana-header"
                            >
                                <Typography sx={{
                                    fontFamily: 'Poppins',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}>Tax / Reflections Guide</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ padding: '0px 16px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Current ASTRO Price</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>$ 0 USD</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Next Reward Amount</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                color: '#ffb84d'
                            }}>0 ASTRO</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Next Reward Amount USDC</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>$ 0 USD</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Next Reward Yield</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>0.03944 %</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>ROI (30-Day Rate)</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>76.44 %</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>ROI (30-Day Rate) USD</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>$ 0 USD</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </MainCard >
    );
}
