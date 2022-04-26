import * as React from 'react';

import {
    Grid,
    Typography,
    Button,
    TextField,
    Slider
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

import astroIcon from 'assets/images/astro/astro-icon.png';

export default function RebaseClaimActivity() {

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
                            padding: '0px 12px',
                            height: '100%',
                            justifyContent: 'center'
                        }}>
                            <SubCard>

                                <Grid sx={{
                                    height: '100%',
                                    padding: '0px 12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
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
                                    height: '100%',
                                    padding: '0px 12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography sx={{
                                        fontSize: '16px',
                                        marginBottom: '5px'
                                    }}>NEXT REBASE AMOUNT</Typography>
                                    <Typography sx={{
                                        fontSize: '20px',
                                        marginBottom: '5px'
                                    }}>$0</Typography>
                                    <Typography sx={{
                                        fontSize: '12',
                                        marginBottom: '5px',
                                        color: '#bcc3cf'
                                    }}>0 ASTRO</Typography>
                                </Grid>
                                <Grid sx={{
                                    height: '100%',
                                    padding: '0px 12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        marginBottom: '5px',
                                        textAlign: 'center'
                                    }}>ASTRO is auto-compounding</Typography>
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
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        rowGap: '15px'
                    }}>
                        <Grid item xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                            <Typography sx={{
                                fontFamily: 'Poppins',
                                fontSize: '16px',
                                fontWeight: '400',
                                textAlign: 'left',
                                width: '100%',
                            }}>Astro Amount</Typography>
                            <TextField
                                defaultValue={'0'}
                                tx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        alignItems: 'center',
                                        backgroundColor: '#151b34',
                                        border: '1px solid #5947ff',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        height: '40px',
                                        padding: '25px 20px',
                                        width: '100%',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                        background: 'transparent',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    },
                                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                                        color: 'transparent',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent',
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Button sx={{
                                            cursor: 'pointer',
                                            color: '#fff',
                                            fontSize: '16px',
                                            fontFamily: 'Poppins',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: 'gray'
                                            }
                                        }}>MAX</Button>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                            <Typography sx={{
                                fontFamily: 'Poppins',
                                fontSize: '16px',
                                fontWeight: '400',
                                textAlign: 'left',
                                width: '100%',
                            }}>APY (%)</Typography>
                            <TextField
                                defaultValue={'0'}
                                tx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        alignItems: 'center',
                                        backgroundColor: '#151b34',
                                        border: '1px solid #5947ff',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        height: '40px',
                                        padding: '25px 20px',
                                        width: '100%',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                        background: 'transparent',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    },
                                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                                        color: 'transparent',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent',
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Button sx={{
                                            cursor: 'pointer',
                                            color: '#fff',
                                            fontSize: '16px',
                                            fontFamily: 'Poppins',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: 'gray'
                                            }
                                        }}>Current</Button>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                            <Typography sx={{
                                fontFamily: 'Poppins',
                                fontSize: '16px',
                                fontWeight: '400',
                                textAlign: 'left',
                                width: '100%',
                            }}>ASTRO Price at purchase ($)</Typography>
                            <TextField
                                defaultValue={'0'}
                                tx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        alignItems: 'center',
                                        backgroundColor: '#151b34',
                                        border: '1px solid #5947ff',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        height: '40px',
                                        padding: '25px 20px',
                                        width: '100%',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                        background: 'transparent',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    },
                                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                                        color: 'transparent',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent',
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Button sx={{
                                            cursor: 'pointer',
                                            color: '#fff',
                                            fontSize: '16px',
                                            fontFamily: 'Poppins',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: 'gray'
                                            }
                                        }}>Current</Button>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                            <Typography sx={{
                                fontFamily: 'Poppins',
                                fontSize: '16px',
                                fontWeight: '400',
                                textAlign: 'left',
                                width: '100%',
                            }}>Future ASTRO Price ($)</Typography>
                            <TextField
                                defaultValue={'0'}
                                tx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        alignItems: 'center',
                                        backgroundColor: '#151b34',
                                        border: '1px solid #5947ff',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        height: '40px',
                                        padding: '25px 20px',
                                        width: '100%',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                        background: 'transparent',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    },
                                    '& .MuiFormLabel-root.MuiInputLabel-root': {
                                        color: 'transparent',
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent'
                                    },
                                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent',
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Button sx={{
                                            cursor: 'pointer',
                                            color: '#fff',
                                            fontSize: '16px',
                                            fontFamily: 'Poppins',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: 'gray'
                                            }
                                        }}>Current</Button>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ padding: '0px 16px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Your initial investment</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>$0</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Current wealth</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>$0</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>ASTRO rewards estimation</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>$0</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Potential return</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>$0</Typography>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                                fontWeight: '400',
                            }}>Potential number of ASTRO Journeys</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                fontFamily: 'Poppins',
                            }}>$0</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </MainCard >
    );
}
