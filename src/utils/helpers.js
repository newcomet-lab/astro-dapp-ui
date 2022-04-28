import BN from 'bn.js';

export const calcAPY = (b1, b2, b3, dec) => {
    if (!b1) return null;
    if (!b2) b2 = 10000000000;
    if (!b3) b3 = 48;
    if (!dec) dec = 2;

    return Math.pow(1 + b1 / b2, b3)

    // const b4 = new BN(b2 + b1);
    // const b5 = new BN(b2);
    // const b6 = new BN(b3);

    // return b4.pow(b6).mul(new BN(Math.pow(10, dec + 3))).div(b5.pow(b6)).sub(new BN(Math.pow(10, dec + 3)));
    
}

export function formatFloatFixed(val, dec) {
    if (!dec) dec = 2;
    if (Math.log10(val) > 4 && dec > 4) dec = 4;
    if (Math.log10(val) > 6 && dec > 2) dec = 2;
    const str = val.toFixed(dec).replace(/\.0+$/, '');
    const str1 = str.split(".")[0];
    const str2 = str.split(".")[1] ? "." + str.split(".")[1] : '';
    return str1.split("").reverse().reduce(function (acc, num, i, orig) { return num + (num !== "-" && i && !(i % 3) ? "," : "") + acc; }, "") + str2;
}

export function formatFloatFixedUnsigned(val, dec) {
    return val >= 0 ? formatFloatFixed(val, dec) : 0;
}


export function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const getNumberFromStrBN = (str_bn, dec) => {
    let val = 0;
    for (let i = 0; i < str_bn.length; i++) {
        if (str_bn.substr(str_bn.length - 1 - i, 1) !== '0') {
            val = parseInt(str_bn.substr(0, str_bn.length - i)) / Math.pow(10, dec - i);
            break;
        }
    }
    return val;
};
 
export const getNumberFromBN = (bn, d) => {
    const num1 = new BN(bn)
    const num2 = (new BN(10)).pow(new BN(d));
    const num3 = num1.mod(num2);
    const num4 = num1.sub(num3).div(num2);
    return num4.toNumber() + getNumberFromStrBN(num3.toString(), d);
}

export const getBNFromNumber = (num, d) => {
    const str = num.toString();
    if (str.indexOf(".") > -1) {
        const str1 = str.split(".")[0];
        const str2 = str.split(".")[1];
        return (new BN(10)).pow(new BN(d)).mul(new BN(str1))
            .add((new BN(10)).pow(new BN(d - str2.length)).mul(new BN(str2)));
    } else {
        return (new BN(10)).pow(new BN(d)).mul(new BN(num));
    }
}

export const formatNumberFromBN = (bn, d) => {
    const str = (getNumberFromBN(bn, d)).toString().replace(/\.0+$/, '');
    const str1 = str.split(".")[0];
    const str2 = str.split(".")[1] ? "." + str.split(".")[1] : '';
    return str1.split("").reverse().reduce(function(acc, num, i, orig) {return num + (num !== "-" && i && !(i % 3) ? "," : "") + acc;}, "") + str2;
}
