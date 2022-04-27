import { createContext, useContext, useEffect, useState } from "react";

import { useApiContract } from "react-moralis";

import ASTRO_ABI from '_common/astro-abi.json';
import { astroTokenAddress } from '_common/address';

import { calcAPY, formatFloatFixed } from 'utils/helpers';

const AstroMoralisContext = createContext(null);

const commonAstroApiObj = { abi: ASTRO_ABI, address: astroTokenAddress, chain: 'avalanche', params: {} };
const rewardApiOpt = { ...commonAstroApiObj, functionName: "rewardYield" };
const rewardDominatorApiOpt = { ...commonAstroApiObj, functionName: "rewardYieldDenominator" };
const rebaseFrequencyApiOpt = { ...commonAstroApiObj, functionName: "rebaseFrequency" };

const AstroApiWithWalletObj = { abi: ASTRO_ABI, address: astroTokenAddress, chain: 'avalanche', params: {address:'0x7aBECf139C1e98D1019b33369333259844D61718'} };
const userBalanceApiOpt = { ...AstroApiWithWalletObj, functionName: "balanceOf" };

export default function useAstroMoralis() {
    const [{ astroAPY, astroROI, userBalance }] = useContext(AstroMoralisContext);
    return [{ astroAPY, astroROI, userBalance }]
}

export const AstroMoralisProvider = ({ children }) => {
    const [astroAPY, setAstroAPY] = useState(null);
    const [astroROI, setAstroROI] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const rewardApiObj = useApiContract(rewardApiOpt);
    const rewardDominatorApiObj = useApiContract(rewardDominatorApiOpt);
    const rebaseFrequencyApiObj = useApiContract(rebaseFrequencyApiOpt);
    const userBalanceApiObj = useApiContract(userBalanceApiOpt);

    const loadAPYAndROI = async () => {
        try {
            await rewardApiObj.runContractFunction();
            await rewardDominatorApiObj.runContractFunction();
            await rebaseFrequencyApiObj.runContractFunction();
            await rewardApiObj.runContractFunction();   // cuz of some issue
        } catch (e) {
            console.log(e);
        }
    }

    const getUserBalance = async () => {
        try {
            await userBalanceApiObj.runContractFunction();
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
            (async () => {
                if (!userBalanceApiOpt.isFetching && userBalanceApiOpt.data) {
                    setUserBalance(
                        formatFloatFixed(userBalanceApiObj.data, 2)
                    );
                }
            })();
        }
        return () => { isUpdated = false; };
    }, [
        rewardApiObj.data, rewardApiObj.isFetching,
        rewardDominatorApiObj.data, rewardDominatorApiObj.isFetching,
        rebaseFrequencyApiObj.data, rebaseFrequencyApiObj.isFetching,
        userBalanceApiOpt.data, userBalanceApiOpt.isFetching,
    ]);

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (rewardApiObj && rewardDominatorApiObj && rebaseFrequencyApiObj) {
                    await loadAPYAndROI();
                }
            })();
            (async () => {
                if (userBalanceApiObj) {
                    await getUserBalance();
                }
            })();
        }
        return () => { isUpdated = false; };
    }, []);

    return <AstroMoralisContext.Provider
        value={[{ astroAPY, astroROI, userBalance }]}>
        {children}
    </AstroMoralisContext.Provider>
}