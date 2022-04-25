import { createContext, useContext, useEffect, useState } from "react";

import { astroTokenAddress } from '_common/addresss';
import ASTRO_ABI from '_common/astro-abi.json';

const Moralis = null;

const MoralisContext = createContext(null);

export default function useMoralis() {
    const [{ test }] = useContext(MoralisContext);
    return [{ test }]
}

export const MoralisProvider = ({ children }) => {

    const test = async () => {
        console.log("aaa");
    }

    const connect = async () => {
        Moralis.Web3.enableWeb3().then(async () => {
            const chainIdHex = await Moralis.switchNetwork("0xA869");
        });    
    }

    const getDecimals = async () => {
        const web3 = await Moralis.enableWeb3();
        const options = {
            contractAddress: astroTokenAddress,
            functionName: "decimals",
            abi: ASTRO_ABI,
            params: {
            },
        };
        const receipt = await Moralis.executeFunction(options);
        console.log(receipt)    
    }

    useEffect(() => {
        (async () => {
            await test();
        })();
    }, []);

    return <MoralisContext.Provider
        value={[{ test }]}>
        {children}
    </MoralisContext.Provider>
}