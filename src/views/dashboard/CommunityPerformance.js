import * as React from 'react';

import {
    Grid,
    Typography,
    Button,
    Skeleton,
    CircularProgress,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

import { useApiContract } from "react-moralis";
import ASTRO_ABI from '_common/astro-abi.json';
import { astroTokenAddress } from '_common/address';
import { formatFloatFixed } from 'utils/helpers';

import BN from 'bn.js';

const commonAstroApiObj = {
    abi: ASTRO_ABI,
    address: astroTokenAddress,
    chain: 'avalanche',
    params: {}
};

const rewardApiOpt = { ...commonAstroApiObj, functionName: "rewardYield" };
const rewardDominatorApiOpt = { ...commonAstroApiObj, functionName: "rewardYieldDenominator" };
const rebaseFrequencyApiOpt = { ...commonAstroApiObj, functionName: "rebaseFrequency" };

const calcAPY = (b1, b2, b3, dec) => {
    if (!b1) return null;
    if (!b2) b2 = 10000000000;
    if (!b3) b3 = 48;
    if (!dec) dec = 2;

    const b4 = new BN(b2 + b1);
    const b5 = new BN(b2);
    const b6 = new BN(b3);

    return b4.pow(b6).mul(new BN(Math.pow(10, dec + 3))).div(b5.pow(b6)).sub(new BN(Math.pow(10, dec + 3)));
}

export default function CommunityPerformance() {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const rewardApiObj = useApiContract(rewardApiOpt);
    const rewardDominatorApi = useApiContract(rewardDominatorApiOpt);
    const rebaseFrequencyApi = useApiContract(rebaseFrequencyApiOpt);

    return (
        <MainCard title="COMMUNITY PERFORMANCE">
            <Grid container sx={{ rowGap: '15px' }}>
                <Grid item container xs={12} md={6} sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    rowGap: '15px'
                }}>
                    <Grid item xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard>
                            <Grid sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Typography sx={{
                                    fontSize: '16px',
                                    lineHeight: '35px'
                                }}>ASTRO Price</Typography>
                                <Typography sx={{
                                    alignSelf: 'center',
                                    backgroundColor: 'rgba(0,0,0,.1)',
                                    border: '1px solid #595959',
                                    borderRadius: '15px',
                                    padding: '1px 10px',
                                    color: '#eb5d65',
                                    fontSize: '12px',
                                    textAlign: 'center'
                                }}>-100.00%</Typography>
                            </Grid>
                            <Typography sx={{
                                color: '#4ed047',
                                fontFamily: 'CenturyGothic',
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
                    <Grid item xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard>
                            <Typography sx={{
                                fontSize: '16px',
                                lineHeight: '35px'
                            }}>Market Cap</Typography>
                            <Typography sx={{
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
                    <Grid item xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard>
                            <Typography sx={{
                                fontSize: '16px',
                                lineHeight: '35px'
                            }}>APY</Typography>
                            <Typography sx={{
                                fontFamily: 'CenturyGothic',
                                fontSize: '32px',
                                lineHeight: '35px',
                                overflow: 'hidden',
                                textAlign: 'left',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                marginBottom: '5px'
                            }}>{
                                    rewardApiObj && rewardApiObj.data && rewardDominatorApi && rewardDominatorApi.data && rebaseFrequencyApi && rebaseFrequencyApi.data ?
                                        formatFloatFixed(
                                            Math.round(
                                                calcAPY(
                                                    Number(rewardApiObj.data),
                                                    Number(rewardDominatorApi.data),
                                                    365 * 24 * 3600 / Number(rebaseFrequencyApi.data), 2
                                                ).toNumber() / 10
                                            ) / 100
                                            , 2
                                        ) + '%' : <Skeleton variant="rectangular" width={'100%'} height={35} />
                                }</Typography>
                            <Typography sx={{
                                color: 'hsla(0,0%,100%,.8)',
                                fontFamily: 'Poppins',
                                fontSize: '16px',
                                margin: 0,
                                textAlign: 'left',
                            }}>Daily % Rate (DPR): {
                                    rewardApiObj && rewardApiObj.data && rewardDominatorApi && rewardDominatorApi.data && rebaseFrequencyApi && rebaseFrequencyApi.data ?
                                        formatFloatFixed(
                                            Math.round(
                                                calcAPY(
                                                    Number(rewardApiObj.data),
                                                    Number(rewardDominatorApi.data),
                                                    24 * 3600 / Number(rebaseFrequencyApi.data), 2
                                                ).toNumber() / 10
                                            ) / 100
                                            , 2
                                        ) + '%' : <Skeleton variant="rectangular" width={'100%'} height={24} />
                                }</Typography>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: '0px 12px' }}>
                        <SubCard>
                            <Typography sx={{
                                fontSize: '16px',
                                lineHeight: '35px'
                            }}>Total Holders</Typography>
                            <Typography sx={{
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
                        <SubCard>
                            <Grid item container xs={12} sm={12} sx={{ height: !matchDownSM ? '100%' : 'auto' }}>
                                <Grid item xs={12} sm={3} sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Grid>
                                        <CircularProgress
                                            variant="determinate"
                                            sx={{ color: '#feb74c' }}
                                            value={100}
                                            size={!matchDownSM ? '110px': '300px'}
                                            thickness={4.5} />
                                    </Grid>
                                    <Grid sx={{
                                        position: 'absolute',
                                        zIndex: '1',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Typography sx={{
                                            fontSize: '12px',
                                            marginBottom: '5px',
                                            textAlign: 'center',
                                        }}>TIME UNTIL<br></br>NEXT REBASE</Typography>
                                        <Typography sx={{
                                            fontSize: '20px',
                                        }}>00:00</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} sm={9} sx={{
                                    height: '100%',
                                    padding: '0px 12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography sx={{
                                        textAlign: 'center',
                                        fontSize: '16px',
                                        marginBottom: '5px'
                                    }}>NEXT REBASE AMOUNT</Typography>
                                    <Typography sx={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginBottom: '5px'
                                    }}>$0</Typography>
                                    <Typography sx={{
                                        fontSize: '12',
                                        marginBottom: '5px',
                                        color: '#bcc3cf'
                                    }}>0 ASTRO</Typography>
                                    <Button variant="contained" sx={{
                                        cursor: 'pointer',
                                        flexDirection: 'column',
                                        padding: '14px 20px',
                                        width: 'calc(100% - 50px)',
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
                                    <Typography sx={{
                                        fontSize: '14px',
                                        marginBottom: '5px',
                                        textAlign: 'center'
                                    }}>If you choose to take your weekly claim, click below for 1% to maximize your growth.</Typography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid >
        </MainCard >
    );
}
