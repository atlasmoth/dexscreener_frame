"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./utils/canvas");
const pairs = [
    {
        chainId: "bsc",
        dexId: "pancakeswap",
        url: "https://dexscreener.com/bsc/0xd0e226f674bbf064f54ab47f42473ff80db98cba",
        pairAddress: "0xD0e226f674bBf064f54aB47F42473fF80DB98CBA",
        labels: ["v3"],
        baseToken: {
            address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            name: "Ethereum Token",
            symbol: "ETH",
        },
        quoteToken: {
            address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            name: "Wrapped BNB",
            symbol: "WBNB",
        },
        priceNative: "7.6729",
        priceUsd: "2304.60",
        txns: {
            m5: {
                buys: 2,
                sells: 0,
            },
            h1: {
                buys: 28,
                sells: 21,
            },
            h6: {
                buys: 222,
                sells: 194,
            },
            h24: {
                buys: 802,
                sells: 801,
            },
        },
        volume: {
            h24: 2505185.18,
            h6: 672906.99,
            h1: 42483.41,
            m5: 258.58,
        },
        priceChange: {
            m5: -0.01,
            h1: 0.15,
            h6: 0.05,
            h24: 0.19,
        },
        liquidity: {
            usd: 2857879.81,
            base: 582.7779,
            quote: 5043.4033,
        },
        fdv: 1394255555,
        pairCreatedAt: 1680536288000,
    },
    {
        chainId: "bsc",
        dexId: "pancakeswap",
        url: "https://dexscreener.com/bsc/0x539e0ebfffd39e54a0f7e5f8fec40ade7933a664",
        pairAddress: "0x539e0EBfffd39e54A0f7E5F8FEc40ade7933A664",
        labels: ["v3"],
        baseToken: {
            address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            name: "Ethereum Token",
            symbol: "ETH",
        },
        quoteToken: {
            address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
            name: "USD Coin",
            symbol: "USDC",
        },
        priceNative: "2302.7517",
        priceUsd: "2302.75",
        txns: {
            m5: {
                buys: 1,
                sells: 0,
            },
            h1: {
                buys: 17,
                sells: 6,
            },
            h6: {
                buys: 134,
                sells: 117,
            },
            h24: {
                buys: 423,
                sells: 433,
            },
        },
        volume: {
            h24: 1546393.16,
            h6: 397530.03,
            h1: 46029.88,
            m5: 254.77,
        },
        priceChange: {
            m5: 0,
            h1: 0.11,
            h6: 0.02,
            h24: 0.19,
        },
        liquidity: {
            usd: 1580596.91,
            base: 288.6844,
            quote: 915828,
        },
        fdv: 1393136396,
        pairCreatedAt: 1680356039000,
    },
    {
        chainId: "bsc",
        dexId: "pancakeswap",
        url: "https://dexscreener.com/bsc/0x531febfeb9a61d948c384acfbe6dcc51057aea7e",
        pairAddress: "0x531FEbfeb9a61D948c384ACFBe6dCc51057AEa7e",
        labels: ["v2"],
        baseToken: {
            address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            name: "Ethereum Token",
            symbol: "ETH",
        },
        quoteToken: {
            address: "0x55d398326f99059fF775485246999027B3197955",
            name: "Tether USD",
            symbol: "USDT",
        },
        priceNative: "2303.2331",
        priceUsd: "2303.23",
        txns: {
            m5: {
                buys: 1,
                sells: 0,
            },
            h1: {
                buys: 5,
                sells: 10,
            },
            h6: {
                buys: 76,
                sells: 41,
            },
            h24: {
                buys: 323,
                sells: 328,
            },
        },
        volume: {
            h24: 187945.03,
            h6: 21628.54,
            h1: 1737.87,
            m5: 5.66,
        },
        priceChange: {
            m5: 0,
            h1: 0.07,
            h6: -0.04,
            h24: 0.21,
        },
        liquidity: {
            usd: 1425183.63,
            base: 309.3876,
            quote: 712591,
        },
        fdv: 1393427627,
        pairCreatedAt: 1619277331000,
    },
    {
        chainId: "bsc",
        dexId: "biswap",
        url: "https://dexscreener.com/bsc/0x63b30de1a998e9e64fd58a21f68d323b9bcd8f85",
        pairAddress: "0x63b30de1A998e9E64FD58A21F68D323B9BcD8F85",
        baseToken: {
            address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            name: "Ethereum Token",
            symbol: "ETH",
        },
        quoteToken: {
            address: "0x55d398326f99059fF775485246999027B3197955",
            name: "Tether USD",
            symbol: "USDT",
        },
        priceNative: "2300.6931",
        priceUsd: "2300.69",
        txns: {
            m5: {
                buys: 0,
                sells: 0,
            },
            h1: {
                buys: 4,
                sells: 1,
            },
            h6: {
                buys: 27,
                sells: 19,
            },
            h24: {
                buys: 73,
                sells: 55,
            },
        },
        volume: {
            h24: 492671.41,
            h6: 464442.55,
            h1: 445370.89,
            m5: 0,
        },
        priceChange: {
            m5: 0,
            h1: -0.07,
            h6: -0.21,
            h24: 0.1,
        },
        liquidity: {
            usd: 4824877.36,
            base: 1048.5703,
            quote: 2412438,
        },
        fdv: 1391890974,
        pairCreatedAt: 1621793962000,
    },
    {
        chainId: "bsc",
        dexId: "uniswap",
        url: "https://dexscreener.com/bsc/0x0f338ec12d3f7c3d77a4b9fcc1f95f3fb6ad0ea6",
        pairAddress: "0x0f338Ec12d3f7C3D77A4B9fcC1f95F3FB6AD0EA6",
        baseToken: {
            address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            name: "Ethereum Token",
            symbol: "ETH",
        },
        quoteToken: {
            address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            name: "Wrapped BNB",
            symbol: "WBNB",
        },
        priceNative: "7.6731",
        priceUsd: "2305.60",
        txns: {
            m5: {
                buys: 1,
                sells: 0,
            },
            h1: {
                buys: 26,
                sells: 16,
            },
            h6: {
                buys: 221,
                sells: 255,
            },
            h24: {
                buys: 779,
                sells: 925,
            },
        },
        volume: {
            h24: 1490966.81,
            h6: 325876.86,
            h1: 21128.32,
            m5: 300.47,
        },
        priceChange: {
            m5: 0,
            h1: 0.07,
            h6: 0.22,
            h24: 0.33,
        },
        liquidity: {
            usd: 2047756.27,
            base: 274.862,
            quote: 4705.965,
        },
        fdv: 1394865429,
        pairCreatedAt: 1678911207000,
    },
    {
        chainId: "bsc",
        dexId: "thena",
        url: "https://dexscreener.com/bsc/0x1123e75b71019962cd4d21b0f3018a6412edb63c",
        pairAddress: "0x1123E75b71019962CD4d21b0F3018a6412eDb63C",
        baseToken: {
            address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            name: "Ethereum Token",
            symbol: "ETH",
        },
        quoteToken: {
            address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            name: "Wrapped BNB",
            symbol: "WBNB",
        },
        priceNative: "7.6734",
        priceUsd: "2305.68",
        txns: {
            m5: {
                buys: 0,
                sells: 1,
            },
            h1: {
                buys: 8,
                sells: 2,
            },
            h6: {
                buys: 64,
                sells: 40,
            },
            h24: {
                buys: 273,
                sells: 201,
            },
        },
        volume: {
            h24: 2203577.93,
            h6: 468531.78,
            h1: 32506.47,
            m5: 214.02,
        },
        priceChange: {
            m5: 0.01,
            h1: 0.08,
            h6: 0.24,
            h24: 0.35,
        },
        liquidity: {
            usd: 3976511.47,
            base: 1084.4954,
            quote: 4912.2602,
        },
        fdv: 1394909579,
    },
    {
        chainId: "bsc",
        dexId: "uniswap",
        url: "https://dexscreener.com/bsc/0xb125aa15ad943d96e813e4a06d0c34716f897e26",
        pairAddress: "0xb125aa15Ad943D96e813E4A06d0c34716F897e26",
        baseToken: {
            address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            name: "Ethereum Token",
            symbol: "ETH",
        },
        quoteToken: {
            address: "0x55d398326f99059fF775485246999027B3197955",
            name: "Tether USD",
            symbol: "USDT",
        },
        priceNative: "2303.4860",
        priceUsd: "2303.48",
        txns: {
            m5: {
                buys: 4,
                sells: 0,
            },
            h1: {
                buys: 36,
                sells: 18,
            },
            h6: {
                buys: 267,
                sells: 249,
            },
            h24: {
                buys: 887,
                sells: 937,
            },
        },
        volume: {
            h24: 2471856.76,
            h6: 576905.3,
            h1: 65784.11,
            m5: 920.25,
        },
        priceChange: {
            m5: 0.06,
            h1: 0.06,
            h6: 0.01,
            h24: 0.17,
        },
        liquidity: {
            usd: 132649,
            base: 37.7909,
            quote: 45597,
        },
        fdv: 1393580654,
        pairCreatedAt: 1705727210000,
    },
    {
        chainId: "bsc",
        dexId: "pancakeswap",
        url: "https://dexscreener.com/bsc/0xbe141893e4c6ad9272e8c04bab7e6a10604501a5",
        pairAddress: "0xBe141893E4c6AD9272e8C04BAB7E6a10604501a5",
        labels: ["v3"],
        baseToken: {
            address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            name: "Ethereum Token",
            symbol: "ETH",
        },
        quoteToken: {
            address: "0x55d398326f99059fF775485246999027B3197955",
            name: "Tether USD",
            symbol: "USDT",
        },
        priceNative: "2303.6838",
        priceUsd: "2303.68",
        txns: {
            m5: {
                buys: 0,
                sells: 0,
            },
            h1: {
                buys: 21,
                sells: 13,
            },
            h6: {
                buys: 148,
                sells: 126,
            },
            h24: {
                buys: 470,
                sells: 404,
            },
        },
        volume: {
            h24: 1153879.27,
            h6: 512038.15,
            h1: 26439.58,
            m5: 0,
        },
        priceChange: {
            m5: 0,
            h1: 0.12,
            h6: 0.01,
            h24: 0.23,
        },
        liquidity: {
            usd: 661864.63,
            base: 191.5554,
            quote: 220581,
        },
        fdv: 1393700283,
        pairCreatedAt: 1681214432000,
    },
];
(0, canvas_1.initLogo)()
    .then(() => {
    (0, canvas_1.printMenuItems)(pairs)
        .then(console.log)
        .catch(console.log);
})
    .catch(console.log);
// ()(
//   ctx,
//   80,
//   `2GCC/MARCO  •  ${new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(0.1675)}  •   ${new Intl.NumberFormat().format(0.167)}MACRO`,
//   "BSC EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
//   689459687.06,
//   -2.61,
//   1.77,
//   1.77,
//   848369.16,
//   1675692013
// ).catch(console.log);
//# sourceMappingURL=app.js.map