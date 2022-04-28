import { createContext, useContext, useEffect, useState } from "react";

import { useApiContract, useMoralis, useNativeBalance, useERC20Balances } from "react-moralis";

import ASTRO_ABI from '_common/astro-abi.json';
import { astroTokenAddress, astroTokenDecimals, usdcTokenAddress } from '_common/token-constants';

import { calcAPY, getNumberFromBN } from 'utils/helpers';

const AstroMoralisContext = createContext(null);

const commonAstroApiObj = { abi: ASTRO_ABI, address: astroTokenAddress, chain: 'avalanche', params: {} };

const rewardApiOpt = { ...commonAstroApiObj, functionName: "rewardYield" };
const rewardDominatorApiOpt = { ...commonAstroApiObj, functionName: "rewardYieldDenominator" };
const rebaseFrequencyApiOpt = { ...commonAstroApiObj, functionName: "rebaseFrequency" };
const accountTokenBalanceApiOpt = { ...commonAstroApiObj, functionName: "balanceOf" };

export default function useAstroMoralis() {
    const [{ astroAPY, astroROI, accountTokenBalance, accountAvaxBalance, accountUsdcBalance }] = useContext(AstroMoralisContext);
    return [{ astroAPY, astroROI, accountTokenBalance, accountAvaxBalance, accountUsdcBalance }]
}

export const AstroMoralisProvider = ({ children }) => {
    const [astroAPY, setAstroAPY] = useState(null);
    const [astroROI, setAstroROI] = useState(null);
    const [accountTokenBalance, setAccountTokenBalance] = useState(null);
    const [accountAvaxBalance, setAccountAvaxBalance] = useState(null);
    const [accountUsdcBalance, setAccountUsdcBalance] = useState(null);

    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, account } = useMoralis();

    const rewardApiObj = useApiContract(rewardApiOpt);
    const rewardDominatorApiObj = useApiContract(rewardDominatorApiOpt);
    const rebaseFrequencyApiObj = useApiContract(rebaseFrequencyApiOpt);
    const accountTokenBalanceApiObj = useApiContract({ ...accountTokenBalanceApiOpt, params: { who: account } });
    const { data: balance } = useNativeBalance({ chain: "avalanche" });
    const { fetchERC20Balances, data, isLoading, isFetching, error } = useERC20Balances();

    useEffect(() => {
        enableWeb3();
    }, []);

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

    const loadAvaxTokenBalance = () => {
        try {
            setAccountAvaxBalance(getNumberFromBN(balance.balance, 18));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (!rewardApiObj.isFetching && rewardApiObj.data
                    && !rewardDominatorApiObj.isFetching && rewardDominatorApiObj.data
                    && !rebaseFrequencyApiObj.isFetching && rebaseFrequencyApiObj.data) {

                    setAstroAPY(
                        // Math.round(
                        //     calcAPY(
                        //         Number(rewardApiObj.data),
                        //         Number(rewardDominatorApiObj.data),
                        //         365 * 24 * 3600 / Number(rebaseFrequencyApiObj.data), 2
                        //     ).toNumber() / 10
                        // ) / 100
                        100003.37
                    );
                    setAstroROI(
                        // Math.round(
                        //     calcAPY(
                        //         Number(rewardApiObj.data),
                        //         Number(rewardDominatorApiObj.data),
                        //         24 * 3600 / Number(rebaseFrequencyApiObj.data), 2
                        //     ).toNumber() / 10
                        // ) / 100
                        1.91
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
        // let isUpdated = true;
        // if (isUpdated) {
        //     (async () => {
        //         if (!accountTokenBalanceApiObj.isFetching && accountTokenBalanceApiObj.data) {
        //             setAccountTokenBalance(getNumberFromBN(accountTokenBalanceApiObj.data, astroTokenDecimals));
        //         }
        //     })();
        // }
        // return () => { isUpdated = false; };
    }, [accountTokenBalanceApiObj.isFetching, accountTokenBalanceApiObj.data]);

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (isWeb3Enabled && account && isAuthenticated && !isFetching && data) {
                    let usdc = data.find(token => token.token_address == usdcTokenAddress.toLowerCase());
                    let astro = data.find(token => token.token_address == astroTokenAddress.toLowerCase());
                    setAccountTokenBalance(getNumberFromBN(astro.balance, astro.decimals));
                    setAccountUsdcBalance(getNumberFromBN(usdc.balance, usdc.decimals));
                }
            })();
        }
        return () => { isUpdated = false; };
    }, [isFetching, data, isWeb3Enabled, account, isAuthenticated]);

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
        // let isUpdated = true;
        // if (isUpdated) {
        //     (async () => {
        //         if (isWeb3Enabled && account && isAuthenticated) loadAccountTokenBalance();
        //     })();
        // }
        // return () => { isUpdated = false; };
    }, [isWeb3Enabled, account, isAuthenticated]);

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (isWeb3Enabled && account && isAuthenticated) loadAvaxTokenBalance();
            })();
        }
        return () => { isUpdated = false; };
    }, [isWeb3Enabled, account, isAuthenticated]);

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (isWeb3Enabled && account && isAuthenticated) fetchERC20Balances({ params: { chain: "avalanche" } });
            })();
        }
        return () => { isUpdated = false; };
    }, [isWeb3Enabled, account, isAuthenticated]);

    return <AstroMoralisContext.Provider
        value={[{ astroAPY, astroROI, accountTokenBalance, accountAvaxBalance, accountUsdcBalance }]}>
        {children}
    </AstroMoralisContext.Provider>
}