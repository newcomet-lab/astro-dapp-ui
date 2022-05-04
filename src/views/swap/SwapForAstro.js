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
import { ethers } from "ethers";
import useAstroMoralis from 'hooks/useAstroMoralis';
import { registerToken } from 'utils/networks';

import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

import { IconArrowsUpDown, IconSettings } from '@tabler/icons';
import {
    astroTokenAddress,
    usdcTokenAddress,
    astroTokenDecimals,
    usdcTokenDecimals
} from '_common/token-constants';

import avaxIcon from 'assets/images/astro/avax.png';
import usdcIcon from 'assets/images/astro/usdc.png';
import astroIcon from 'assets/images/astro/astro-icon.png';
import { numberWithCommas } from 'utils/helpers';

import {
    ChainId,
    Token,
    WAVAX as WAVAX_ALL,
    Fetcher,
    Trade,
    Route,
    TokenAmount,
    TradeType,
    Percent,
    Router,
    ROUTER_ADDRESS as ROUTER_ADDRESS_ALL
} from '@traderjoe-xyz/sdk';
import ROUTER_ABI from '@traderjoe-xyz/core/abi/JoeRouter02'

const { BigNumber } = ethers;
const { parseUnits, formatUnits } = ethers.utils;

const chainId = ChainId.AVALANCHE;
const ROUTER_ADDRESS = ROUTER_ADDRESS_ALL[chainId];

const ASTRO = new Token(ChainId.AVALANCHE, astroTokenAddress, astroTokenDecimals, "ASTRO", "Astro Token");
const WAVAX = new Token(ChainId.AVALANCHE, WAVAX_ALL[chainId].address, WAVAX_ALL[chainId].decimals, "AVAX", WAVAX_ALL[chainId].name);
const USDC = new Token(ChainId.AVALANCHE, usdcTokenAddress, usdcTokenDecimals, "USDC", "USDC Token");

const TOKEN_ICONS = {
    [ASTRO.symbol] : astroIcon,
    [WAVAX.symbol] : avaxIcon,
    [USDC.symbol] : usdcIcon,
}

const regexFloat = /^\d+(\.\d{0,9})?$|^$/;

export default function SwapForAstro() {
    const [{ accountTokenBalance, accountAvaxBalance, accountUsdcBalance }] = useAstroMoralis();
    const [tokenBalanceList, setTokenBalanceList] = React.useState({
        [ASTRO.symbol]: 0,
        [WAVAX.symbol]: 0,
        [USDC.symbol]: 0,
    });

    React.useEffect(() => {
        if (accountTokenBalance && accountAvaxBalance && accountUsdcBalance) {
            setTokenBalanceList({
                [ASTRO.symbol]: accountTokenBalance,
                [WAVAX.symbol]: accountAvaxBalance,
                [USDC.symbol]: accountUsdcBalance
            });
        }
    }, [accountTokenBalance, accountAvaxBalance, accountUsdcBalance]);

    const [isOpenSlippageDialog, setIsOpenSlippageDialog] = React.useState(false);
    
    const [tokenPairs, setTokenPairs] = React.useState([]);
    const [tokenListFrom, setTokenListFrom] = React.useState([WAVAX, USDC]);
    const [tokenListTo, setTokenListTo] = React.useState([ASTRO]);
    const [idxTokenFrom, setIdxTokenFrom] = React.useState(0);
    const [idxTokenTo, setIdxTokenTo] = React.useState(0);
    const [tradeType, setTradeType] = React.useState(TradeType.EXACT_INPUT);
    const [amountFrom, setAmountFrom] = React.useState(0);
    const [amountTo, setAmountTo] = React.useState(0);
    const [slipable, setSlipable] = React.useState(0.1);
    const [slippedAmount, setSlippedAmount] = React.useState(0);
    const [priceImpact, setPriceImpact] = React.useState(0);

    const handleClickReplaceList = () => {
        if (tradeType === TradeType.EXACT_INPUT) {
            setAmountTo(amountFrom);
            setTradeType(TradeType.EXACT_OUTPUT);
        } else {
            setAmountFrom(amountTo);
            setTradeType(TradeType.EXACT_INPUT);
        }
        const tmp = tokenListFrom.slice();
        setTokenListFrom(tokenListTo);
        setTokenListTo(tmp);
        const tmp_ = parseInt(idxTokenFrom);
        setIdxTokenFrom(idxTokenTo);
        setIdxTokenTo(tmp_);
    }

    const loadSwappableAmount = () => {
        try {
            const _amountFrom = parseFloat(amountFrom);
            const _amountTo = parseFloat(amountTo);
    
            let pairs = [];

            const tokenFrom = tokenListFrom[idxTokenFrom];
            const tokenTo = tokenListTo[idxTokenTo];
            if (tokenFrom.symbol === WAVAX.symbol || tokenTo.symbol === WAVAX.symbol) {
                pairs = [tokenPairs[0]];
            } else if (tokenFrom.symbol === USDC.symbol) {
                pairs = [tokenPairs[1], tokenPairs[0]];
            } else if (tokenTo.symbol === USDC.symbol) {
                pairs = [tokenPairs[0], tokenPairs[1]];
            }

            const route = new Route(pairs, tokenFrom);
            const trade = tradeType === TradeType.EXACT_INPUT
                ?   new Trade(
                        route,
                        new TokenAmount(
                            tokenFrom,
                            parseUnits(_amountFrom.toString(), tokenFrom.decimals).toString()
                        ),
                        TradeType.EXACT_INPUT,
                        chainId
                    )
                :   new Trade(
                        route,
                        new TokenAmount(
                            tokenTo,
                            parseUnits(_amountTo.toString(), tokenTo.decimals).toString()
                        ),
                        TradeType.EXACT_OUTPUT,
                        chainId
                    );
            const newAmountRaw = tradeType === TradeType.EXACT_INPUT
                ?   trade.minimumAmountOut(new Percent('0')).raw
                :   trade.maximumAmountIn(new Percent('0')).raw;
            const newAmount = formatUnits(
                BigNumber.from(newAmountRaw.toString()),
                tradeType === TradeType.EXACT_INPUT ? tokenTo.decimals : tokenFrom.decimals
            );

            if (tradeType === TradeType.EXACT_INPUT) setAmountTo(newAmount);
            else setAmountFrom(newAmount);

            const slippageTolerance = String(parseInt(slipable * Math.pow(10, 4)));
            const slippedAmountRaw = tradeType === TradeType.EXACT_INPUT
                ?   trade.minimumAmountOut(new Percent(slippageTolerance, '10000')).raw
                :   trade.maximumAmountIn(new Percent(slippageTolerance, '10000')).raw;
            const _slippedAmount = formatUnits(
                BigNumber.from(slippedAmountRaw.toString()),
                tradeType === TradeType.EXACT_INPUT ? tokenTo.decimals : tokenFrom.decimals
            );

            setPriceImpact(trade.priceImpact.toFixed());
            setSlippedAmount(_slippedAmount);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSwap = async () => {
        try {
            const _amountFrom = parseFloat(amountFrom);
            const _amountTo = parseFloat(amountTo);

            let pairs = [];

            const tokenFrom = tokenListFrom[idxTokenFrom];
            const tokenTo = tokenListTo[idxTokenTo];
            if (tokenFrom.symbol === WAVAX.symbol || tokenTo.symbol === WAVAX.symbol) {
                pairs = [tokenPairs[0]];
            } else if (tokenFrom.symbol === USDC.symbol) {
                pairs = [tokenPairs[1], tokenPairs[0]];
            } else if (tokenTo.symbol === USDC.symbol) {
                pairs = [tokenPairs[0], tokenPairs[1]];
            }

            const route = new Route(pairs, tokenFrom);
            const trade = tradeType === TradeType.EXACT_INPUT
                ?   new Trade(
                        route,
                        new TokenAmount(
                            tokenFrom,
                            parseUnits(_amountFrom.toString(), tokenFrom.decimals).toString()
                        ),
                        TradeType.EXACT_INPUT,
                        chainId
                    )
                :   new Trade(
                        route,
                        new TokenAmount(
                            tokenTo,
                            parseUnits(_amountTo.toString(), tokenTo.decimals).toString()
                        ),
                        TradeType.EXACT_OUTPUT,
                        chainId
                    );
            const slippageTolerance = String(parseInt(slipable * 100));

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const accounts = await provider.send("eth_requestAccounts", []);
            const wallet = accounts[0];
            const ROUTER_CONTRACT = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);

            const swapParameters = Router.swapCallParameters(
                trade,
                {
                    allowedSlippage: new Percent(slippageTolerance, '10000'),
                    ttl: 1200,
                    recipient: wallet,
                    feeOnTransfer: false
                }
            );
            console.log(swapParameters)
            if (tokenFrom.symbol !== WAVAX.symbol && tokenTo.symbol !== WAVAX.symbol) {
                if (tradeType === TradeType.EXACT_INPUT) {
                    ROUTER_CONTRACT.swapExactTokensForTokens(
                        swapParameters.args[0],
                        swapParameters.args[1],
                        swapParameters.args[2],
                        swapParameters.args[3],
                        swapParameters.args[4],
                        { value: swapParameters.value }
                    );
                } else {
                    ROUTER_CONTRACT.swapTokensForExactTokens(
                        swapParameters.args[0],
                        swapParameters.args[1],
                        swapParameters.args[2],
                        swapParameters.args[3],
                        swapParameters.args[4],
                        { value: swapParameters.value }
                    );
                }
            } else {
                if (tokenFrom.symbol === WAVAX.symbol) {
                    if (tradeType === TradeType.EXACT_INPUT) {
                        ROUTER_CONTRACT.swapExactAVAXForTokens(
                            swapParameters.args[1],
                            swapParameters.args[2],
                            swapParameters.args[3],
                            swapParameters.args[4],
                            { value: swapParameters.args[0] }
                        );
                    } else {
                        ROUTER_CONTRACT.swapAVAXForExactTokens(
                            swapParameters.args[1],
                            swapParameters.args[2],
                            swapParameters.args[3],
                            swapParameters.args[4],
                            { value: swapParameters.args[0] }
                        );
                    }
                } else if (tokenTo.symbol === WAVAX.symbol) {
                    if (tradeType === TradeType.EXACT_INPUT) {
                        ROUTER_CONTRACT.swapExactTokensForAVAX(
                            swapParameters.args[1],
                            swapParameters.args[2],
                            swapParameters.args[3],
                            swapParameters.args[4],
                            { value: swapParameters.args[0] }
                        );
                    } else {
                        ROUTER_CONTRACT.swapTokensForExactAVAX(
                            swapParameters.args[1],
                            swapParameters.args[2],
                            swapParameters.args[3],
                            swapParameters.args[4],
                            { value: swapParameters.args[0] }
                        );
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleChangeAmount = (event, type) => {
        if (!regexFloat.test(event.target.value)) return;

        if (type === 0) {
            setAmountFrom(event.target.value);
            setTradeType(TradeType.EXACT_INPUT);
        } else {
            setAmountTo(event.target.value);
            setTradeType(TradeType.EXACT_OUTPUT);
        }
    }

    // type --- 0: from, 1: to
    const SelectTokenControl = type => {
        const value = type === 0 ? idxTokenFrom : idxTokenTo;
        const onChange = e => {
            if (type === 0) setIdxTokenFrom(e.target.value);
            if (type === 1) setIdxTokenTo(e.target.value);
        }
        const tokenList = type === 0 ? tokenListFrom : tokenListTo;
        return (
            <FormControl>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={onChange}
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
                    {tokenList.map((token, idx) => (
                        <MenuItem key={idx} value={idx} sx={{ borderRadius: '5px' }}>
                            <Grid sx={{ display: 'flex' }}>
                                <img src={TOKEN_ICONS[token.symbol]} style={{ width: '30px', height: '30px' }} />
                                <Typography sx={{
                                    fontFamily: 'Poppins',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    cursor: 'pointer',
                                    marginLeft: '8px'
                                }}>{token.symbol}</Typography>
                            </Grid>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

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
            onClick={() => {
                if (percent === 'AUTO') setSlipable(1.0);
                else setSlipable(percent);
            }}
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
            onClick={() => {
                setAmountFrom(
                    tokenBalanceList[tokenListFrom[idxTokenFrom].symbol] / 100 * percent
                );
            }}
        >{percent === 100 ? 'MAX' : `${percent}%`}</ButtonBase>
    }

    React.useEffect(() => {
        (async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const WAVAX_ASTRO = await Fetcher.fetchPairData(WAVAX, ASTRO, provider);
            const USDC_WAVAX = await Fetcher.fetchPairData(USDC, WAVAX, provider);

            setTokenPairs([WAVAX_ASTRO, USDC_WAVAX]);
        })();
    }, []);

    React.useEffect(() => {
        const _amountFrom = parseFloat(amountFrom);
        const _amountTo = parseFloat(amountTo);
        console.log(_amountFrom, amountFrom, "amountFrom")
        console.log(_amountTo, amountTo, "amountTo")
        if (tokenPairs.length > 0 && !isNaN(_amountFrom) && !isNaN(_amountTo)
            && ((tradeType === TradeType.EXACT_INPUT && _amountFrom !== 0) || (tradeType === TradeType.EXACT_OUTPUT && _amountTo !== 0))) {
            console.log("loadSwappableAmount")
            loadSwappableAmount();
        }
    }, [tokenPairs, amountFrom, amountTo, tradeType]);

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
                                    {tokenListFrom[idxTokenFrom].symbol === ASTRO.symbol ?
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
                                    onClick={() => {setIsOpenSlippageDialog(true)}}>
                                    <IconSettings size='30px' color='rgb(255, 184, 77)' />
                                </ButtonBase>
                                <Modal
                                    open={isOpenSlippageDialog}
                                    onClose={() => {setIsOpenSlippageDialog(false)}}
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
                                                    value={slipable}
                                                    onChange={event => {
                                                        if (!regexFloat.test(event.target.value)) return;
                                                        setSlipable(event.target.value);
                                                    }}
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
                                        ? numberWithCommas(parseFloat(tokenBalanceList[tokenListFrom[idxTokenFrom].symbol]).toFixed(3))
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
                                        value={amountFrom}
                                        onChange={event => handleChangeAmount(event, 0)} />
                                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                        {tokenListFrom[idxTokenFrom].symbol !== ASTRO.symbol
                                            ? AmountButton(100)
                                            : <>
                                                {AmountButton(20)}
                                                {AmountButton(50)}
                                            </>
                                        }
                                        {
                                            SelectTokenControl(0)
                                        }
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
                            }} onClick={handleClickReplaceList}>
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
                                        ? numberWithCommas(parseFloat(tokenBalanceList[tokenListTo[idxTokenTo].symbol]).toFixed(3))
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
                                        value={amountTo}
                                        onChange={event => handleChangeAmount(event, 1)} />
                                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                        {
                                            SelectTokenControl(1)
                                        }
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
                                    }}>
                                        {
                                            (!isNaN(parseFloat(amountFrom)) && !isNaN(parseFloat(amountTo)) && parseFloat(amountTo) !== 0
                                                ? (parseFloat(amountFrom) / parseFloat(amountTo)).toFixed(6)
                                                : 0).toString() +
                                            ` ${tokenListFrom[idxTokenFrom].symbol} per ${tokenListTo[idxTokenTo].symbol}`
                                        }
                                    </Typography>
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
                                    }}>{tokenListFrom[idxTokenFrom].symbol !== ASTRO.symbol ? 'Buy Tax (15%)' : 'Sell Tax (30%)'}</Typography>
                                    <Typography sx={{
                                        fontSize: '16px',
                                        fontFamily: 'Poppins'
                                    }}>{tokenListFrom[idxTokenFrom].symbol !== ASTRO.symbol
                                        ? amountTo * 0.15
                                        : amountFrom * 0.3}</Typography>
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
                                }}
                                    // disabled={amountFrom === 0 || amountFrom >= tokenBalanceList[tokenListFrom[idxTokenFrom].symbol]}
                                    onClick={handleSwap}
                                >
                                    {
                                        amountFrom === 0
                                            ? "Enter an amount"
                                            : amountFrom >= tokenBalanceList[tokenListFrom[idxTokenFrom].symbol]
                                                ? `Insufficient ${tokenListFrom[idxTokenFrom].symbol} balance`
                                                : "Swap"
                                    }
                                </Button>
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
                                <img src={astroIcon} style={{ width: '30px', height: '30px' }} />
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
                                }}>{tradeType === TradeType.EXACT_INPUT ? 'Minimum received' : 'Maximum sold'}</Typography>
                                <Typography sx={{
                                    fontSize: '14px',
                                    fontFamily: 'Poppins'
                                }}>{slippedAmount}
                                    {tradeType === TradeType.EXACT_INPUT
                                        ? ` ${tokenListTo[idxTokenTo].symbol}`
                                        : ` ${tokenListFrom[idxTokenFrom].symbol}`}
                                </Typography>
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
                                }}>{`< ${priceImpact}%`}</Typography>
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
