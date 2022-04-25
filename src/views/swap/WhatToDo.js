import * as React from 'react';

import {
    Grid,
    Typography,
    Button,
    TextField,
    Slider
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

export default function WhatToDo() {

    return (
        <MainCard title="WHAT TO DO">
            <Grid container sx={{ rowGap: '15px' }}>
                <Grid item container xs={12} md={12} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    rowGap: '15px'
                }}>
                    <Grid xs={12} sm={12} sx={{ padding: '0px 12px' }}>
                        <SubCard item container >
                            <Typography sx={{
                                fontSize: '14px',
                                lineHeight: '35px',
                                fontWeight: '600'
                            }}>Steps to Financial Freedom with ASTRO</Typography>
                            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{
                                    fontFamily: 'CenturyGothicB',
                                    fontSize: '22px',
                                    lineHeight: '35px',
                                    marginRight: '6px',
                                    whiteSpace: 'nowrap',
                                    fontWeight: '700'
                                }}>Step 1:</Typography>
                                <Typography sx={{
                                    fontSize: '16px',
                                }}>Buy ASTRO</Typography>
                            </Grid>
                            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{
                                    fontFamily: 'CenturyGothicB',
                                    fontSize: '22px',
                                    lineHeight: '35px',
                                    marginRight: '6px',
                                    whiteSpace: 'nowrap',
                                    fontWeight: '700'
                                }}>Step 2:</Typography>
                                <Typography sx={{
                                    fontSize: '16px',
                                }}>Simply hold your ASTRO for 100 Days and watch it auto-compound</Typography>
                            </Grid>
                            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{
                                    fontFamily: 'CenturyGothicB',
                                    fontSize: '22px',
                                    lineHeight: '35px',
                                    marginRight: '6px',
                                    whiteSpace: 'nowrap',
                                    fontWeight: '700'
                                }}>Step 3:</Typography>
                                <Typography sx={{
                                    fontSize: '16px',
                                }}>After 100 days, begin claiming 1% of your ASTRO each day</Typography>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid xs={12} sm={12} sx={{ padding: '0px 12px' }}>
                        <Typography sx={{
                            fontSize: '18px',
                            fontFamily: 'CenturyGothic',
                            fontWeight: '700',
                            marginTop: '0.5rem',
                            marginBottom: '0.25rem'
                        }}>CALCULATOR</Typography>
                        <Typography sx={{
                            fontSize: '14px',
                            color: '#bcc3cf'
                        }}>Estimate your returns based on today's performance</Typography>
                    </Grid>
                    <Grid xs={12} sm={12} sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        rowGap: '15px'
                    }}>
                        <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
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
                        <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
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
                        <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
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
                        <Grid xs={12} sm={6} sx={{ padding: '0px 12px' }}>
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
                    <Grid xs={12} sm={12} sx={{ padding: '0px 12px' }}>
                        <Typography sx={{
                            fontSize: '14px',
                            fontFamily: 'Poppins',
                        }}>159 days</Typography>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={30}

                        />
                    </Grid>
                    <Grid xs={12} sm={12} sx={{ padding: '0px 16px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
