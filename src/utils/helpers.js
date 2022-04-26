export function formatFloatFixed(val, dec) {
    if (!dec) dec = 2;
    if (Math.log10(val) > 4 && dec > 4) dec = 4;
    if (Math.log10(val) > 6 && dec > 2) dec = 2;
    const str = val.toFixed(dec).replace(/\.0+$/, '');
    const str1 = str.split(".")[0];
    const str2 = str.split(".")[1] ? "." + str.split(".")[1] : '';
    return str1.split("").reverse().reduce(function(acc, num, i, orig) {return num + (num !== "-" && i && !(i % 3) ? "," : "") + acc;}, "") + str2;
}

export function formatFloatFixedUnsigned(val, dec) {
    return val >= 0 ? formatFloatFixed(val, dec) : 0;
}
