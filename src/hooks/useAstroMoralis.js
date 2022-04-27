import { createContext, useContext, useEffect, useState } from "react";

import { useApiContract, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

import ASTRO_ABI from '_common/astro-abi.json';
import { astroTokenAddress } from '_common/address';

import { calcAPY } from 'utils/helpers';

const AstroMoralisContext = createContext(null);

const commonAstroApiObj = { abi: ASTRO_ABI, address: astroTokenAddress, chain: 'avalanche', params: {} };
const rewardApiOpt = { ...commonAstroApiObj, functionName: "rewardYield" };
const rewardDominatorApiOpt = { ...commonAstroApiObj, functionName: "rewardYieldDenominator" };
const rebaseFrequencyApiOpt = { ...commonAstroApiObj, functionName: "rebaseFrequency" };

export default function useAstroMoralis() {
    const [{ astroAPY, astroROI }] = useContext(AstroMoralisContext);
    return [{ astroAPY, astroROI }]
}

export const AstroMoralisProvider = ({ children }) => {
    const [astroAPY, setAstroAPY] = useState(null);
    const [astroROI, setAstroROI] = useState(null);

    const rewardApiObj = useApiContract(rewardApiOpt);
    const rewardDominatorApiObj = useApiContract(rewardDominatorApiOpt);
    const rebaseFrequencyApiObj = useApiContract(rebaseFrequencyApiOpt);

    const Web3Api = useMoralisWeb3Api();
    // const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    //     Web3Api.account.getTokenBalances, {chain: 'avalanche', address:astroTokenAddress}
    // );

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

    const fetchBalance = async () => {
        let balance = await Web3Api.account.getTokenBalances({
            chain: "avalanche",
        });

        console.log("data>>>>>>>>>>>>>>>>>>");
        console.log(balance);
    };

    useEffect(() => {
        fetchBalance();
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
    }, [rewardApiObj.data, rewardApiObj.isFetching,
    rewardDominatorApiObj.data, rewardDominatorApiObj.isFetching,
    rebaseFrequencyApiObj.data, rebaseFrequencyApiObj.isFetching]);

    useEffect(() => {
        let isUpdated = true;
        if (isUpdated) {
            (async () => {
                if (rewardApiObj && rewardDominatorApiObj && rebaseFrequencyApiObj) {
                    await loadAPYAndROI();
                }
            })();
        }
        return () => { isUpdated = false; };
    }, []);

    return <AstroMoralisContext.Provider
        value={[{ astroAPY, astroROI }]}>
        {children}
    </AstroMoralisContext.Provider>
}