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
import useAstroMoralis from 'hooks/useAstroMoralis';
import { registerToken } from 'utils/networks';

import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

import { IconArrowsUpDown, IconSettings } from '@tabler/icons';
import {
    astroTokenAddress,
    joerouterAddress,
    wavaxTokenAddress,
    usdcTokenAddress,
    astroTokenDecimals,
    wavaxTokenDecimals,
    usdcTokenDecimals
} from '_common/token-constants';

import metamaskIcon from 'assets/images/astro/metamask.png';
import avaxIcon from 'assets/images/astro/avax.png';
import usdcIcon from 'assets/images/astro/usdc.png';
import astroIcon from 'assets/images/astro/astro-icon.png';
import { numberWithCommas } from 'utils/helpers';

import { useApiContract } from "react-moralis";

import JOEROUTER_ABI from '_common/joerouter-abi.json';

const swapBalanceOriginApiOpt = { abi: JOEROUTER_ABI, address: joerouterAddress, chain: 'avalanche' };
const regexFloat = /^\d+(\.\d{0,9})?$|^$/;

export default function SwapForAstro() {
    const [{ accountTokenBalance, accountAvaxBalance, accountUsdcBalance }] = useAstroMoralis();

    const [selectedToken, setSelectedToken] = React.useState(0); // 0: AVAX, 1: USDC
    const [selectedAstroToken, setSelectedAstroToken] = React.useState(0); // 0: ASTRO
    const [isOpenSlippage, setOpenSlippage] = React.useState(false);
    const [isAvaxToAstro, setAvaxToAstro] = React.useState(true);
    const [slipable, setSlipable] = React.useState(0.1);
    const [customSlipable, setCustomSlipable] = React.useState('');
    const [fromBalance, setFromBalance] = React.useState(0);
    const [toBalance, setToBalance] = React.useState(0);
    const [arrAddress, setArrAddress] = React.useState([wavaxTokenAddress, astroTokenAddress]);
    const [isChangeFromBalance, setChangeFromBalance] = React.useState(false);
    const [isChangeToBalance, setChangeToBalance] = React.useState(false);

    const getToSwapBalanceApiObj = useApiContract({ ...swapBalanceOriginApiOpt, functionName: 'getAmountsOut', params: { amountIn: `${fromBalance}`, path: arrAddress } });
    const getFromSwapBalanceApiObj = useApiContract({ ...swapBalanceOriginApiOpt, functionName: 'getAmountsIn', params: { amountOut: `${toBalance}`, path: arrAddress } });

    const handleSelectToken = (event) => {
        setSelectedToken(event.target.value)
    }

    const handleSelectAstroToken = (event) => {
        setSelectedAstroToken(event.target.value);
    }

    const handleOpenSlippageSetting = () => {
        setOpenSlippage(true);
    }

    const handleCloseSlippageSetting = () => {
        setOpenSlippage(false);
    }

    const handleAvaxToAstro = () => {
        setAvaxToAstro(!isAvaxToAstro);
    }

    const handleSlipPercent = (percent) => {
        percent === 'AUTO' ? setSlipable(1.0) : setSlipable(percent);
    }

    const handleCustomSlipPercent = (event) => {
        if (!regexFloat.test(event.target.value)) {
            return;
        } else {
            setCustomSlipable(event.target.value);
            setSlipable(event.target.value);
        }
    }

    const getDecimals = () => {
        let fromDecimals = 0;
        let toDecimals = 0;
        if (isAvaxToAstro) {
            fromDecimals = selectedToken == 0 ? wavaxTokenDecimals : usdcTokenDecimals;
            toDecimals = astroTokenDecimals;
        } else {
            fromDecimals = astroTokenDecimals;
            toDecimals = selectedToken == 0 ? wavaxTokenDecimals : usdcTokenDecimals;
        }
        return { fromDecimals, toDecimals };
    }

    const handleCustomBalance = (event, index) => {
        if (!regexFloat.test(event.target.value)) {
            return;
        } else {
            if (index === 0) {
                setFromBalance(event.target.value * Math.pow(10, getDecimals().fromDecimals));
                setChangeFromBalance(true);
            } else {
                setToBalance(event.target.value * Math.pow(10, getDecimals().fromDecimals));
                setChangeToBalance(true);
            }
        }
    }
    React.useEffect(() => {
        isAvaxToAstro
            ? selectedToken === 0
                ? setArrAddress([wavaxTokenAddress, astroTokenAddress])
                : setArrAddress([usdcTokenAddress, wavaxTokenAddress, astroTokenAddress])
            : selectedToken === 0
                ? setArrAddress([astroTokenAddress, wavaxTokenAddress])
                : setArrAddress([astroTokenAddress, wavaxTokenAddress, usdcTokenAddress])
    }, [isAvaxToAstro, selectedToken]);

    React.useEffect(() => {
        isChangeFromBalance && loadToSwapBalance();
    }, [fromBalance]);

    React.useEffect(() => {
        isChangeToBalance && loadFromSwapBalance();
    }, [toBalance]);

    const handleSelectCustomFromBalance = (percent) => {
        isAvaxToAstro
            ? selectedToken === 0
                ? setFromBalance(accountAvaxBalance / 100 * percent * Math.pow(10, getDecimals().fromDecimals))
                : setFromBalance(accountUsdcBalance / 100 * percent * Math.pow(10, getDecimals().fromDecimals))
            : setFromBalance(accountTokenBalance / 100 * percent * Math.pow(10, getDecimals().fromDecimals))
    }

    const loadToSwapBalance = () => {
        try {
            getToSwapBalanceApiObj.runContractFunction()
                .then(data => {
                    data === undefined ? setToBalance(0) : setToBalance(data[data.length - 1]);
                    setChangeFromBalance(false);
                    console.log(fromBalance);
                    console.log(arrAddress);
                    console.log(data);
                })
                .catch(e => console.log(e));
        } catch (e) {
            console.log(e);
        }
    }

    const loadFromSwapBalance = () => {
        try {
            getFromSwapBalanceApiObj.runContractFunction()
                .then(data => {
                    data === undefined ? setFromBalance(0) : setFromBalance(data[0]);
                    console.log(toBalance);
                    console.log(arrAddress);
                    console.log(data);
                    setChangeToBalance(false);
                })
                .catch(e => console.log(e));
        } catch (e) {
            console.log(e);
        }
    }

    const AvaxFormControl = <FormControl>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedToken}
            onChange={handleSelectToken}
            sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#686085',
                    borderRadius: '5px',
                    borderWidth: 1,
                    overflow: 'hidden'
                },
                '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                    overflow: 'hidden',
                    padding: '10px',
                    background: 'rgba(21, 27, 52, 0.3)',
                },

                background: 'linear-gradient(6.49deg, #271C2B -1.79%, #222546 88.58%)',
                height: '40px'
            }}
        >
            <MenuItem value={0} sx={{ borderRadius: '5px' }}>
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
            <MenuItem value={1} sx={{ borderRadius: '5px' }}>
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

    const AstroFormControl = <FormControl>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAstroToken}
            onChange={handleSelectAstroToken}
            sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#686085',
                    borderRadius: '5px',
                    borderWidth: 1,
                    overflow: 'hidden'
                },
                '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                    overflow: 'hidden',
                    padding: '4px',
                    background: 'rgba(21, 27, 52, 0.3)',
                },

                background: 'linear-gradient(6.49deg, #271C2B -1.79%, #222546 88.58%)',
                height: '40px'
            }}
        >
            <MenuItem value={0} sx={{ borderRadius: '5px' }}>
                <Grid sx={{ display: 'flex' }}>
                    <img src={astroIcon} style={{ width: '30px', height: '30px' }} />
                    <Typography sx={{
                        fontFamily: 'Poppins',
                        fontSize: '18px',
                        fontWeight: '400',
                        cursor: 'pointer',
                        marginLeft: '8px'
                    }}>ASTRO</Typography>
                </Grid>
            </MenuItem>
        </Select>
    </FormControl>

    const SplippageButton = (percent) => {
        return <ButtonBase
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
                background: percent === slipable ? '#523bff' : 'transparent'
            }}
            onClick={() => handleSlipPercent(percent)}
        >{percent === 'AUTO' ? 'AUTO' : `${percent}%`}</ButtonBase>
    }

    const AmountButton = (percent) => {
        return <ButtonBase variant="contained" sx={{
            cursor: 'pointer',
            marginRight: '6px',
            padding: '8px',
            borderRadius: '10px',
            color: 'rgb(255, 184, 77)',
            '&:hover': {
                background: 'rgb(76, 52, 134)',
            }
        }}
            onClick={() => handleSelectCustomFromBalance(percent)}
        >{percent === 100 ? 'MAX' : `${percent}%`}</ButtonBase>
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
                                    {isAvaxToAstro ?
                                        <Typography sx={{
                                            fontSize: '14px',
                                            fontWeight: '400'
                                        }}>Buy ASTRO below using <b>AVAX</b> or <b>USDC</b></Typography> :
                                        <Typography sx={{
                                            fontSize: '14px',
                                            fontWeight: '400'
                                        }}>Sell <b>ASTRO</b> below</Typography>}
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
                                                    placeholder='0.0'
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
                                                    value={customSlipable}
                                                    onChange={handleCustomSlipPercent}
                                                />

                                                <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {SplippageButton(0.1)}
                                                    {SplippageButton(0.5)}
                                                    {SplippageButton(1.0)}
                                                    {SplippageButton('AUTO')}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Modal>
                            </Grid>
                            <Grid sx={{
                                display: 'flex',
                                backgroundColor: '#10123e',
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
                                    }}>Balance:{accountAvaxBalance && accountUsdcBalance && accountTokenBalance
                                        ? isAvaxToAstro
                                            ? selectedToken === 0
                                                ? numberWithCommas(accountAvaxBalance.toFixed(3))
                                                : numberWithCommas(accountUsdcBalance.toFixed(3))
                                            : numberWithCommas(accountTokenBalance.toFixed(3))
                                        : 0}
                                    </Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <TextField
                                        sx={{
                                            width: '90%',
                                            background: 'transparent',
                                            outline: 'none',
                                            '& .MuiOutlinedInput-input.MuiInputBase-input': {
                                                background: '#10123e !important',
                                                padding: '0px 1px',
                                                fontSize: '22px',
                                                fontFamily: 'CenturyGothicB',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#10123e !important',
                                            }
                                        }}
                                        value={fromBalance / Math.pow(10, getDecimals().fromDecimals)}
                                        onChange={(e) => handleCustomBalance(e, 0)} />
                                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                        {isAvaxToAstro
                                            ? AmountButton(100)
                                            : <>
                                                {AmountButton(20)}
                                                {AmountButton(50)}
                                            </>
                                        }
                                        {isAvaxToAstro ? AvaxFormControl : AstroFormControl}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <ButtonBase sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                margin: 'auto',
                                marginTop: '1rem',
                                borderRadius: '20px',
                                background: 'rgb(255, 184, 77)',
                                cursor: 'pointer'
                            }} onClick={handleAvaxToAstro}>
                                <IconArrowsUpDown size='24px' color='rgba(0, 0, 0, 0.54)' />
                            </ButtonBase>
                            <Grid sx={{
                                display: 'flex',
                                backgroundColor: '#10123e',
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

                                    }}>Balance:{accountAvaxBalance && accountUsdcBalance && accountTokenBalance
                                        ? !isAvaxToAstro
                                            ? selectedToken === 0
                                                ? numberWithCommas(accountAvaxBalance.toFixed(3))
                                                : numberWithCommas(accountUsdcBalance.toFixed(3))
                                            : numberWithCommas(accountTokenBalance.toFixed(3))
                                        : 0}
                                    </Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <TextField
                                        sx={{
                                            width: '90%',
                                            background: 'transparent',
                                            outline: 'none',
                                            '& .MuiOutlinedInput-input.MuiInputBase-input': {
                                                background: '#10123e !important',
                                                padding: '0px 1px',
                                                fontSize: '22px',
                                                fontFamily: 'CenturyGothicB',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#10123e !important',
                                            }
                                        }}
                                        value={toBalance / Math.pow(10, getDecimals().toDecimals)}
                                        onChange={(e) => handleCustomBalance(e, 1)} />
                                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                        {!isAvaxToAstro ? AvaxFormControl : AstroFormControl}
                                    </Grid>
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
                                    }}>{slipable}%</Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        marginBottom: '5px'
                                    }}>{isAvaxToAstro ? 'Buy Tax (15%)' : 'Sell Tax (30%)'}</Typography>
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
                                cursor: 'pointer',
                            }}
                                onClick={() => registerToken(
                                    astroTokenAddress,
                                    'ASTRO',
                                    '18',
                                    astroIcon,
                                )}
                            >
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
