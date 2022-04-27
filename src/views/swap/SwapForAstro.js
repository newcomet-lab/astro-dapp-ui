import * as React from 'react';

import {
    Grid,
    Typography,
    ButtonBase,
    Button,
    FormControl,
    Select,
    MenuItem,
    Modal,
    TextField
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

import { IconArrowsUpDown, IconSettings } from '@tabler/icons';

import metamaskIcon from 'assets/images/astro/metamask.png';
import avaxIcon from 'assets/images/astro/avax.png';
import usdcIcon from 'assets/images/astro/usdc.png';
import astroIcon from 'assets/images/astro/astro-icon.png';

export default function SwapForAstro() {
    const [flagExchange, setFlagExchange] = React.useState(true);
    const [flagSwapButton, setFlagSwapButton] = React.useState(true);
    const [selectedToken, setSelectedToken] = React.useState(0);
    const [isOpenSlippage, setOpenSlippage] = React.useState(false);

    const handleSelectToken = (event) => {
        setSelectedToken(event.target.value)
    }

    const handleOpenSlippageSetting = () => {
        setOpenSlippage(true);
    }

    const handleCloseSlippageSetting = () => {
        setOpenSlippage(false);
    }

    return (
        <MainCard title="">
            <Grid container sx={{ rowGap: '12px' }}>
                <Grid item container xs={12} md={12} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    rowGap: '12px'
                }}>
                    <Grid container item xs={12} sm={12} sx={{ padding: '0px 12px' }}>
                        <SubCard>
                            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Grid>
                                    <Typography sx={{
                                        fontFamily: 'CenturyGothic',
                                        fontSize: '24px',
                                        lineHeight: '35px',
                                        fontWeight: '700',
                                        letterSpacing: '1px'
                                    }}>SWAP FOR ASTRO</Typography>
                                    {flagExchange ?
                                        <Typography sx={{
                                            fontSize: '14px',
                                            fontWeight: '400'
                                        }}>Sell <b>ASTRO</b> below</Typography> :
                                        <Typography sx={{
                                            fontSize: '14px',
                                            fontWeight: '400'
                                        }}>Buy ASTRO below using <b>AVAX</b> or <b>USDC</b></Typography>}
                                </Grid>
                                <ButtonBase variant="contained" sx={{ cursor: 'pointer' }}
                                    onClick={handleOpenSlippageSetting}>
                                    <IconSettings size='30px' color='rgb(255, 184, 77)' />
                                </ButtonBase>
                                <Modal
                                    open={isOpenSlippage}
                                    onClose={handleCloseSlippageSetting}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Grid sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '400px',
                                        backgroundColor: 'rgb(39, 28, 99)',
                                        borderRadius: '20px',
                                        boxshadow: 'rgb(0 0 0 / 20%) 0px 11px 15px -7px, rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px',
                                        padding: '32px 24px',
                                    }}>
                                        <Typography sx={{
                                            margin: '0px',
                                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                            fontWeight: '500',
                                            fontSize: '1.25rem',
                                            lineHeight: '1.6',
                                            letterSpacing: '0.0075em',
                                        }}>Settings</Typography>
                                        <Grid sx={{ mt: '1rem', display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{
                                                marginBottom: '1rem',
                                                fontFamily: 'Poppins',
                                                fontSize: '16px',
                                                color: '#bcc3cf'
                                            }}>Slippage tolerance</Typography>
                                            <Grid sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                gap: '0.5rem'
                                            }}>
                                                <TextField
                                                    defaultValue={'0.0'}
                                                    tx={{
                                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                            alignItems: 'center',
                                                            backgroundColor: 'red',
                                                            border: '1px solid #5947ff',
                                                            borderRadius: '8px',
                                                            display: 'flex',
                                                            height: '40px',
                                                            padding: '0px 20px',
                                                            width: '100%',
                                                        },
                                                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                            background: 'transparent',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'transparent'
                                                        },
                                                        '& .MuiFormLabel-root.MuiInputLabel-root': {
                                                            color: 'red',
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
                                                            <Typography sx={{
                                                                fontFamily: 'Poppins',
                                                                fontSize: '20px',
                                                            }}>%</Typography>
                                                        ),
                                                    }}
                                                />

                                                <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <ButtonBase
                                                        sx={{
                                                            cursor: 'pointer',
                                                            height: '32px',
                                                            borderRadius: '16px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            paddingLeft: '12px',
                                                            paddingRight: '12px',
                                                            whiteSpace: 'nowrap',
                                                            fontFamily: 'Poppins',
                                                            fontSize: '18px',
                                                            background: '#523bff'
                                                        }}>0.1%</ButtonBase>
                                                    <ButtonBase
                                                        sx={{
                                                            cursor: 'pointer',
                                                            height: '32px',
                                                            borderRadius: '16px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            paddingLeft: '12px',
                                                            paddingRight: '12px',
                                                            whiteSpace: 'nowrap',
                                                            fontFamily: 'Poppins',
                                                            fontSize: '18px'
                                                        }}>0.5%</ButtonBase>
                                                    <ButtonBase
                                                        sx={{
                                                            cursor: 'pointer',
                                                            height: '32px',
                                                            borderRadius: '16px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            paddingLeft: '12px',
                                                            paddingRight: '12px',
                                                            whiteSpace: 'nowrap',
                                                            fontFamily: 'Poppins',
                                                            fontSize: '18px'
                                                        }}>1.0%</ButtonBase>
                                                    <ButtonBase
                                                        sx={{
                                                            cursor: 'pointer',
                                                            height: '32px',
                                                            borderRadius: '16px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            paddingLeft: '12px',
                                                            paddingRight: '12px',
                                                            whiteSpace: 'nowrap',
                                                            fontFamily: 'Poppins',
                                                            fontSize: '18px'
                                                        }}>AUTO</ButtonBase>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Modal>
                            </Grid>
                            <Grid sx={{
                                display: 'flex',
                                backgroundColor: 'rgba(21, 27, 52, 0.3)',
                                border: '1px solid rgb(89, 71, 255)',
                                borderRadius: '20px',
                                flexDirection: 'column',
                                textAlign: 'left',
                                padding: '10px 16px 10px',
                                marginTop: '1rem',
                                gap: '10px'
                            }}>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{
                                        fontFamily: 'Poppins',
                                        fontSize: '18px',
                                        fontWeight: '400',
                                    }}>From</Typography>
                                    <Typography sx={{
                                        fontFamily: 'Poppins',
                                        fontSize: '18px',
                                        fontWeight: '400',
                                        cursor: 'pointer'
                                    }}>Balance: 0</Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{
                                        fontFamily: 'Poppins',
                                        fontSize: '18px',
                                        fontWeight: '400',
                                    }}>0</Typography>
                                    <FormControl>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            value={selectedToken}
                                            onChange={handleSelectToken}
                                        >
                                            <MenuItem value={0} sx={{ backgroundColor: 'black', borderRadius: '5px' }}>
                                                <Grid sx={{ display: 'flex' }}>
                                                    <img src={avaxIcon} style={{ width: '30px', height: '30px' }} />
                                                    <Typography sx={{
                                                        fontFamily: 'Poppins',
                                                        fontSize: '18px',
                                                        fontWeight: '400',
                                                        cursor: 'pointer',
                                                        marginLeft: '8px'
                                                    }}>AVAX</Typography>
                                                </Grid>
                                            </MenuItem>
                                            <MenuItem value={1} sx={{ backgroundColor: 'black', borderRadius: '5px' }}>
                                                <Grid sx={{ display: 'flex' }}>
                                                    <img src={usdcIcon} style={{ width: '30px', height: '30px' }} />
                                                    <Typography sx={{
                                                        fontFamily: 'Poppins',
                                                        fontSize: '18px',
                                                        fontWeight: '400',
                                                        cursor: 'pointer',
                                                        marginLeft: '8px'
                                                    }}>USDC</Typography>
                                                </Grid>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                margin: 'auto',
                                marginTop: '1rem',
                                borderRadius: '20px',
                                background: 'rgb(255, 184, 77)'
                            }}>
                                <IconArrowsUpDown size='24px' color='rgba(0, 0, 0, 0.54)' />
                            </Grid>
                            <Grid sx={{
                                display: 'flex',
                                backgroundColor: 'rgba(21, 27, 52, 0.3)',
                                border: '1px solid rgb(89, 71, 255)',
                                borderRadius: '20px',
                                flexDirection: 'column',
                                textAlign: 'left',
                                padding: '10px 16px 10px',
                                marginTop: '1rem',
                                gap: '10px'
                            }}>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{
                                        fontFamily: 'Poppins',
                                        fontSize: '18px',
                                        fontWeight: '400',
                                    }}>To</Typography>
                                    <Typography sx={{
                                        fontFamily: 'Poppins',
                                        fontSize: '18px',
                                        fontWeight: '400',
                                        cursor: 'pointer'
                                    }}>Balance: 0</Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{
                                        fontFamily: 'Poppins',
                                        fontSize: '18px',
                                        fontWeight: '400',
                                    }}>0</Typography>
                                    <Typography sx={{
                                        fontFamily: 'Poppins',
                                        fontSize: '18px',
                                        fontWeight: '400',
                                        cursor: 'pointer'
                                    }}>AVAX</Typography>
                                </Grid>
                            </Grid>
                            <Grid sx={{ marginTop: '1rem' }}>
                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        marginBottom: '5px'
                                    }}>SWAP FOR ASTRO</Typography>
                                    <Typography sx={{
                                        fontSize: '16px',
                                        fontFamily: 'Poppins'
                                    }}>0 AVAX per ASTRO</Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        marginBottom: '5px'
                                    }}>Slippage Tolerance</Typography>
                                    <Typography sx={{
                                        fontSize: '16px',
                                        fontFamily: 'Poppins'
                                    }}>1%</Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        marginBottom: '5px'
                                    }}>Buy Tax (15%)</Typography>
                                    <Typography sx={{
                                        fontSize: '16px',
                                        fontFamily: 'Poppins'
                                    }}>0</Typography>
                                </Grid>
                            </Grid>
                            <Grid sx={{ marginTop: '1rem' }}>
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
                                }}>Enter an amount</Button>
                            </Grid>
                            <Grid sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '1rem',
                            }}>
                                <img src={metamaskIcon} style={{ width: '30px', height: '30px' }} />
                                <Typography sx={{
                                    fontSize: '14px',
                                    fontFamily: 'Poppins',
                                    marginLeft: '1rem'
                                }}> Add ASTRO token to MetaMask</Typography>
                            </Grid>
                        </SubCard>

                    </Grid>
                    <Grid container item xs={12} sm={12} sx={{ padding: '0px 12px' }}>
                        <SubCard>
                            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{
                                    fontSize: '14px',
                                    marginBottom: '5px'
                                }}>Maximum sold</Typography>
                                <Typography sx={{
                                    fontSize: '14px',
                                    fontFamily: 'Poppins'
                                }}>0 AVAX</Typography>
                            </Grid>
                            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{
                                    fontSize: '14px',
                                    marginBottom: '5px'
                                }}>Price Impact</Typography>
                                <Typography sx={{
                                    fontSize: '14px',
                                    color: '#4ed047',
                                    fontFamily: 'Poppins'
                                }}>{'< 0.01%'}</Typography>
                            </Grid>
                            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{
                                    fontSize: '14px',
                                    marginBottom: '5px'
                                }}>Liquidity Provider Fee</Typography>
                                <Typography sx={{
                                    fontSize: '14px',
                                    fontFamily: 'Poppins'
                                }}>0 AVAX</Typography>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid >
        </MainCard >
    );
}
