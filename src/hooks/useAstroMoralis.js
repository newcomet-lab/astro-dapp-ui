import { createContext, useContext, useEffect, useState } from "react";

import { useApiContract, useMoralis } from "react-moralis";

import ASTRO_ABI from '_common/astro-abi.json';
import { astroTokenAddress, astroTokenDecimals } from '_common/token-constants';

import { calcAPY, getNumberFromBN } from 'utils/helpers';

const AstroMoralisContext = createContext(null);

const commonAstroApiObj = { abi: ASTRO_ABI, address: astroTokenAddress, chain: 'avalanche', params: {} };

const rewardApiOpt = { ...commonAstroApiObj, functionName: "rewardYield" };
const rewardDominatorApiOpt = { ...commonAstroApiObj, functionName: "rewardYieldDenominator" };
const rebaseFrequencyApiOpt = { ...commonAstroApiObj, functionName: "rebaseFrequency" };
const accountTokenBalanceApiOpt = { ...commonAstroApiObj, functionName: "balanceOf" };

export default function useAstroMoralis() {
    const [{ astroAPY, astroROI, accountTokenBalance }] = useContext(AstroMoralisContext);
    return [{ astroAPY, astroROI, accountTokenBalance }]
}

export const AstroMoralisProvider = ({ children }) => {
    const [astroAPY, setAstroAPY] = useState(null);
    const [astroROI, setAstroROI] = useState(null);
    const [accountTokenBalance, setAccountTokenBalance] = useState(null);

    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, account } = useMoralis();

    const rewardApiObj = useApiContract(rewardApiOpt);
    const rewardDominatorApiObj = useApiContract(rewardDominatorApiOpt);
    const rebaseFrequencyApiObj = useApiContract(rebaseFrequencyApiOpt);
    const accountTokenBalanceApiObj = useApiContract({...accountTokenBalanceApiOpt, params: { who: account }});


    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            enableWeb3({ provider: connectorId });
    }, [isAuthenticated, isWeb3Enabled]);

    const loadAPYAndROI = () => {
        try {
            rewardApiObj.runContractFunction();
            rewardDominatorApiObj.runContractFunction();
            rebaseFrequencyApiObj.runContractFunction();
        } catch (e) {
            console.log(e);
        }
    }

    const loadAccountTokenBalance = () => {
        try {
            accountTokenBalanceApiObj.runContractFunction();
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (!rewardApiObj.isFetching && rewardApiObj.data
                    && !rewardDominatorApiObj.isFetching && rewardDominatorApiObj.data
                    && !rebaseFrequencyApiObj.isFetching && rebaseFrequencyApiObj.data) {

                    setAstroAPY(
                        Math.round(
                            calcAPY(
                                Number(rewardApiObj.data),
                                Number(rewardDominatorApiObj.data),
                                365 * 24 * 3600 / Number(rebaseFrequencyApiObj.data), 2
                            ).toNumber() / 10
                        ) / 100
                    );
                    setAstroROI(
                        Math.round(
                            calcAPY(
                                Number(rewardApiObj.data),
                                Number(rewardDominatorApiObj.data),
                                24 * 3600 / Number(rebaseFrequencyApiObj.data), 2
                            ).toNumber() / 10
                        ) / 100
                    );
                }
            })();
        }
        return () => { isUpdated = false; };
    }, [
        rewardApiObj.data, rewardApiObj.isFetching,
        rewardDominatorApiObj.data, rewardDominatorApiObj.isFetching,
        rebaseFrequencyApiObj.data, rebaseFrequencyApiObj.isFetching,
    ]);

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (!accountTokenBalanceApiObj.isFetching && accountTokenBalanceApiObj.data) {
                    setAccountTokenBalance(getNumberFromBN(accountTokenBalanceApiObj.data, astroTokenDecimals));
                }
            })();
        }
        return () => { isUpdated = false; };
    }, [ accountTokenBalanceApiObj.isFetching, accountTokenBalanceApiObj.data ]);

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (isWeb3Enabled) loadAPYAndROI();
            })();
        }
        return () => { isUpdated = false; };
    }, [isWeb3Enabled]);

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (isWeb3Enabled && account) loadAccountTokenBalance();
            })();
        }
        return () => { isUpdated = false; };
    }, [isWeb3Enabled, account]);

    return <AstroMoralisContext.Provider
        value={[{ astroAPY, astroROI, accountTokenBalance }]}>
        {children}
    </AstroMoralisContext.Provider>
}