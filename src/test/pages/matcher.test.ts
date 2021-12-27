import React from 'react'
import currency from 'currency.js'
import {
  matchAcrossAccounts,
  parseEtrade,
  sum,
  TradingAccount,
} from '../../components/matcher'

const data = {
  "AAPL Sep 04 '20 $143.75 Call": { gain: -89.33 },
  "AAPL Sep 04 '20 $125 Put": { gain: 683.23 },
  "AAPL Jan 21 '22 $200 Put": { gain: 278.78 },
  "AMZN Sep 25 '20 $3200 Call": { gain: -140.03 },
  "AMZN Sep 25 '20 $2800 Put": { gain: -31.03 },
  "AMZN Oct 02 '20 $3350 Call": { gain: -630.51 },
  "AMZN Oct 09 '20 $3500 Call": { gain: -218.03 },
  "AMZN Oct 09 '20 $3505 Call": { gain: 29.47 },
  "AMZN Oct 16 '20 $3650 Call": { gain: -221.03 },
  "AMZN Oct 16 '20 $3700 Call": { gain: 121.97 },
  "AMZN Oct 16 '20 $3000 Put": { gain: 38.47 },
  "AMZN Oct 16 '20 $3250 Put": { gain: -811.03 },
  "AMZN Oct 23 '20 $3000 Put": { gain: -151.04 },
  "AMZN Oct 30 '20 $2800 Put": { gain: -510.51 },
  "GOOG Nov 06 '20 $1700 Call": { gain: 6118.83 },
  "GOOG Nov 06 '20 $1820 Call": { gain: 144.47 },
  "GOOG Nov 06 '20 $1650 Put": { gain: -5836.03 },
  "MSFT Jun 26 '20 $190 Put": { gain: -37.67 },
  "NFLX Oct 16 '20 $600 Call": { gain: -103.03 },
  "NFLX Oct 16 '20 $605 Call": { gain: 35.47 },
  "NFLX Oct 23 '20 $620 Call": { gain: -994.07 },
  "NFLX Oct 23 '20 $500 Put": { gain: 37.89 },
  "NFLX Oct 30 '20 $550 Call": { gain: -41.03 },
  "NFLX Nov 06 '20 $520 Call": { gain: -73.03 },
  "NFLX Nov 06 '20 $532.50 Call": { gain: 100.47 },
  "NFLX Nov 06 '20 $490 Put": { gain: 41.47 },
  "NFLX Nov 13 '20 $550 Call": { gain: -68.03 },
  "NFLX Nov 13 '20 $470 Put": { gain: -129.03 },
  "NFLX Jan 21 '22 $600 Put": { gain: 198.64 },
  "NIO Jan 21 '22 $30 Call": { gain: -1722.11 },
  "NIO Jan 21 '22 $55 Call": { gain: -122.13 },
  "NIO Jan 21 '22 $60 Call": { gain: -412.12 },
  "NIO Jan 21 '22 $80 Put": { gain: 28.87 },
  "NKLA Jan 21 '22 $10 Put": { gain: -61.03 },
  "PLTR Jan 21 '22 $25 Call": { gain: -4205.2 },
  "SQ Oct 09 '20 $195 Call": { gain: 60.47 },
  "SQ Oct 09 '20 $150 Put": { gain: 44.47 },
  "SQ Oct 09 '20 $170 Put": { gain: 41.47 },
  "SQ Oct 16 '20 $220 Call": { gain: -9.09 },
  "SQ Oct 16 '20 $167.50 Put": { gain: 32.93 },
  "SQ Oct 16 '20 $170 Put": { gain: -98.07 },
  "SQ Oct 16 '20 $180 Put": { gain: 6.97 },
  "SQ Oct 23 '20 $200 Call": { gain: -152.07 },
  "SQ Nov 06 '20 $130 Put": { gain: -165.16 },
  "SQ Dec 04 '20 $200 Put": { gain: 276.93 },
  "SQ Jan 21 '22 $200 Call": { gain: -9455.42 },
  "SQ Jan 21 '22 $280 Call": { gain: -727.17 },
  "SQ Jan 21 '22 $200 Put": { gain: 172.71 },
  "TSLA Aug 07 '20 $1575 Call": { gain: -1235.66 },
  "TSLA Aug 07 '20 $1400 Put": { gain: -1305.66 },
  "TSLA Aug 14 '20 $1550 Call": { gain: 7898.47 },
  "TSLA Aug 14 '20 $1300 Put": { gain: -550.66 },
  "TSLA Aug 14 '20 $1325 Put": { gain: -1031.33 },
  "TSLA Aug 21 '20 $1550 Call": { gain: 12418.14 },
  "TSLA Aug 21 '20 $1350 Put": { gain: -583.33 },
  "TSLA Aug 21 '20 $1950 Put": { gain: -1573.33 },
  "TSLA Aug 28 '20 $2500 Call": { gain: -1040.66 },
  "TSLA Aug 28 '20 $2000 Put": { gain: -6700.66 },
  "TSLA Sep 04 '20 $600 Call": { gain: -1100.66 },
  "TSLA Sep 04 '20 $400 Put": { gain: -810.66 },
  "TSLA Sep 04 '20 $430 Put": { gain: -1081.76 },
  "TSLA Sep 04 '20 $500 Put": { gain: 12396.94 },
  "TSLA Sep 11 '20 $500 Call": { gain: -600.51 },
  "TSLA Sep 11 '20 $500 Put": { gain: 4398.69 },
  "TSLA Sep 18 '20 $450 Call": { gain: -240.51 },
  "TSLA Sep 18 '20 $500 Put": { gain: -5456.19 },
  "TSLA Sep 25 '20 $420 Call": { gain: -92.07 },
  "TSLA Sep 25 '20 $550 Call": { gain: -900.14 },
  "TSLA Sep 25 '20 $350 Put": { gain: 128.97 },
  "TSLA Sep 25 '20 $370 Put": { gain: 603.43 },
  "TSLA Sep 25 '20 $450 Put": { gain: 543.87 },
  "TSLA Sep 25 '20 $500 Put": { gain: 2358.77 },
  "TSLA Sep 25 '20 $550 Put": { gain: 3403.65 },
  "TSLA Oct 02 '20 $475 Call": { gain: -150.51 },
  "TSLA Oct 02 '20 $500 Call": { gain: -110.51 },
  "TSLA Oct 02 '20 $370 Put": { gain: 549.47 },
  "TSLA Oct 02 '20 $450 Put": { gain: -2342.08 },
  "TSLA Oct 02 '20 $500 Put": { gain: -1511.2 },
  "TSLA Oct 02 '20 $540 Put": { gain: 38.7 },
  "TSLA Oct 02 '20 $560 Put": { gain: -4151.27 },
  "TSLA Oct 02 '20 $580 Put": { gain: 928.62 },
  "TSLA Oct 16 '20 $490 Call": { gain: -84.03 },
  "TSLA Oct 16 '20 $500 Call": { gain: -68.03 },
  "TSLA Oct 16 '20 $510 Call": { gain: 94.93 },
  "TSLA Oct 16 '20 $365 Put": { gain: 28.93 },
  "TSLA Oct 16 '20 $370 Put": { gain: -59.03 },
  "TSLA Oct 16 '20 $380 Put": { gain: -88.03 },
  "TSLA Oct 23 '20 $550 Call": { gain: -510.07 },
  "TSLA Oct 23 '20 $370 Put": { gain: -242.07 },
  "TSLA Oct 23 '20 $440 Put": { gain: 5475.64 },
  "TSLA Oct 30 '20 $500 Call": { gain: -104.14 },
  "TSLA Oct 30 '20 $450 Put": { gain: 10995.34 },
  "TSLA Nov 06 '20 $380 Put": { gain: 10.47 },
  "TSLA Nov 06 '20 $400 Put": { gain: 41.47 },
  "TSLA Nov 06 '20 $450 Put": { gain: -3971.08 },
  "TSLA Nov 13 '20 $500 Call": { gain: -44.03 },
  "TSLA Nov 13 '20 $505 Call": { gain: -44.03 },
  "TSLA Nov 13 '20 $510 Call": { gain: -42.03 },
  "TSLA Nov 13 '20 $380 Put": { gain: -125.03 },
  "TSLA Nov 13 '20 $500 Put": { gain: 2483.76 },
  "TSLA Nov 27 '20 $450 Call": { gain: 18741.34 },
  "TSLA Dec 04 '20 $600 Call": { gain: 5519.76 },
  "TSLA Dec 04 '20 $620 Call": { gain: -80.03 },
  "TSLA Dec 04 '20 $500 Put": { gain: 1293.84 },
  "TSLA Dec 04 '20 $550 Put": { gain: 646.42 },
  "TSLA Dec 04 '20 $580 Put": { gain: -2817.07 },
  "TSLA Dec 04 '20 $590 Put": { gain: -1222.07 },
  "TSLA Dec 11 '20 $700 Call": { gain: -1439.31 },
  "TSLA Dec 11 '20 $720 Call": { gain: 124.69 },
  "TSLA Dec 11 '20 $740 Call": { gain: -123.03 },
  "TSLA Dec 11 '20 $760 Call": { gain: -135.1 },
  "TSLA Dec 11 '20 $800 Call": { gain: 77.81 },
  "TSLA Dec 11 '20 $850 Call": { gain: -22.07 },
  "TSLA Dec 11 '20 $450 Put": { gain: 230.87 },
  "TSLA Dec 11 '20 $500 Put": { gain: 957.77 },
  "TSLA Dec 11 '20 $550 Put": { gain: -1467.1 },
  "TSLA Dec 11 '20 $560 Put": { gain: 305.67 },
  "TSLA Dec 11 '20 $572.50 Put": { gain: 309.4 },
  "TSLA Dec 11 '20 $590 Put": { gain: 131.88 },
  "TSLA Dec 11 '20 $600 Put": { gain: -9417.18 },
  "TSLA Dec 11 '20 $605 Put": { gain: -267.03 },
  "TSLA Dec 11 '20 $620 Put": { gain: 738.94 },
  "TSLA Dec 11 '20 $650 Put": { gain: 2577.76 },
  "TSLA Dec 18 '20 $700 Call": { gain: -2370.65 },
  "TSLA Dec 18 '20 $720 Call": { gain: 1968.61 },
  "TSLA Dec 18 '20 $800 Call": { gain: -878.07 },
  "TSLA Dec 18 '20 $810 Call": { gain: 189.93 },
  "TSLA Dec 18 '20 $500 Put": { gain: 1040.87 },
  "TSLA Dec 18 '20 $550 Put": { gain: 594.73 },
  "TSLA Dec 18 '20 $575 Put": { gain: 3543.67 },
  "TSLA Dec 18 '20 $600 Put": { gain: -5838.2 },
  "TSLA Dec 18 '20 $630 Put": { gain: -1036.05 },
  "TSLA Dec 18 '20 $640 Put": { gain: -4844.28 },
  "TSLA Dec 18 '20 $650 Put": { gain: -4446.06 },
  "TSLA Dec 18 '20 $660 Put": { gain: -5718.12 },
  "TSLA Dec 24 '20 $650 Put": { gain: -7570.07 },
  "TSLA Dec 24 '20 $685 Put": { gain: -1523.07 },
  "TSLA Dec 24 '20 $700 Put": { gain: -1102.24 },
  "TSLA Dec 24 '20 $710 Put": { gain: -2436.13 },
  "TSLA Dec 31 '20 $660 Put": { gain: -236.14 },
  "TSLA Jan 15 '21 $650 Call": { gain: -8194.55 },
  "TSLA Jan 21 '22 $400 Call": { gain: -6701.28 },
  "TSLA Jan 21 '22 $500 Call": { gain: -3311.29 },
  "TSLA Jan 21 '22 $600 Call": { gain: 943.81 },
  "TSLA Jan 21 '22 $750 Call": { gain: -571.35 },
  "TSLA Jan 21 '22 $400 Put": { gain: 4242.42 },
  "TSLA Jan 21 '22 $550 Put": { gain: -1976.43 },
  "TSLA Jan 21 '22 $700 Put": { gain: -751.44 },
  "TSLA Jun 17 '22 $600 Call": { gain: -7142.29 },
  "TSLA Jan 20 '23 $700 Call": { gain: -1701.45 },
  "VIXW Nov 04 '20 $55 Call": { gain: -41.66 },
  "ZM Jun 05 '20 $210 Call": { gain: -288.03 },
  "ZM Jun 05 '20 $220 Call": { gain: -606.66 },
  "ZM Jun 05 '20 $197.50 Put": { gain: -406.66 },
  "ZM Jun 05 '20 $210 Put": { gain: 428.62 },
  "ZM Jun 12 '20 $212.50 Call": { gain: 3436.52 },
  "ZM Sep 04 '20 $400 Call": { gain: -130.66 },
  "ZM Sep 04 '20 $500 Call": { gain: -340.66 },
  "ZM Sep 04 '20 $250 Put": { gain: -100.66 },
  "ZM Sep 04 '20 $480 Put": { gain: 6258.46 },
  "ZM Sep 11 '20 $300 Call": { gain: 3148.79 },
  "ZM Sep 11 '20 $300 Put": { gain: -60.51 },
  "ZM Sep 11 '20 $310 Put": { gain: -180.51 },
  "ZM Sep 18 '20 $300 Call": { gain: 5598.67 },
  "ZM Sep 18 '20 $450 Call": { gain: -60.51 },
  "ZM Sep 18 '20 $350 Put": { gain: -511.03 },
  "ZM Sep 25 '20 $300 Call": { gain: 2358.61 },
  "ZM Sep 25 '20 $500 Call": { gain: -141.03 },
  "ZM Sep 25 '20 $470 Put": { gain: -451.05 },
  "ZM Oct 02 '20 $550 Call": { gain: -380.51 },
  "ZM Oct 02 '20 $450 Put": { gain: -921.03 },
  "ZM Oct 09 '20 $530 Call": { gain: -302.08 },
  "ZM Oct 09 '20 $550 Call": { gain: -393.1 },
  "ZM Oct 09 '20 $555 Call": { gain: 127.4 },
  "ZM Oct 09 '20 $430 Put": { gain: 64.47 },
  "ZM Oct 09 '20 $447.50 Put": { gain: 322.93 },
  "ZM Oct 09 '20 $450 Put": { gain: -592.07 },
  "ZM Oct 16 '20 $550 Call": { gain: 2711.83 },
  "ZM Oct 16 '20 $600 Call": { gain: 107.9 },
  "ZM Oct 16 '20 $440 Put": { gain: 321.86 },
  "ZM Oct 16 '20 $450 Put": { gain: -1611.1 },
  "ZM Oct 23 '20 $610 Call": { gain: -202.57 },
  "ZM Oct 23 '20 $700 Call": { gain: -122.06 },
  "ZM Oct 23 '20 $500 Put": { gain: -212.07 },
  "ZM Oct 23 '20 $550 Put": { gain: 10076.65 },
  "ZM Oct 30 '20 $550 Call": { gain: -265.51 },
  "ZM Oct 30 '20 $600 Call": { gain: -184.14 },
  "ZM Oct 30 '20 $500 Put": { gain: 10376.65 },
  "ZM Oct 30 '20 $550 Put": { gain: -3063.32 },
  "ZM Nov 06 '20 $500 Call": { gain: -131.03 },
  "ZM Nov 06 '20 $520 Call": { gain: 69.47 },
  "ZM Nov 06 '20 $450 Put": { gain: 44.47 },
  "ZM Nov 06 '20 $500 Put": { gain: -3081.06 },
  "ZM Nov 13 '20 $500 Put": { gain: 8268.76 },
  "ZM Nov 20 '20 $450 Call": { gain: 14.81 },
  "ZM Nov 20 '20 $400 Put": { gain: -922.12 },
  "ZM Nov 20 '20 $420 Put": { gain: -581.04 },
  "ZM Dec 04 '20 $400 Put": { gain: -325.4 },
  "ZM Dec 11 '20 $450 Call": { gain: -31.03 },
  "ZM Dec 18 '20 $450 Call": { gain: -80.07 },
  "ZM Dec 24 '20 $450 Call": { gain: -172.07 },
  "ZM Jan 15 '21 $450 Call": { gain: -1031.21 },
  "ZM Jan 15 '21 $500 Call": { gain: -1502.4 },
  "ZM Jan 21 '22 $500 Call": { gain: -3362.49 },
  "ZM Jan 21 '22 $510 Call": { gain: 1835.16 },
  "ZM Jan 21 '22 $550 Call": { gain: 698.81 },
  "ZM Jan 21 '22 $350 Put": { gain: -642.36 },
  "ZM Jan 21 '22 $500 Put": { gain: -4252.67 },
}

const tsvData = `
12/31/2020\tBought To Open\tOPTN\tTSLA Jan 08 '21 $780 Call\t1\t-480.51\t4.8\t0.5\tTSLA Jan 08 '21 $780 Call
12/31/2020\tBought To Open\tOPTN\tTSLA Jan 08 '21 $700 Put\t1\t-2200.51\t22\t0.5\tTSLA Jan 08 '21 $700 Put
12/31/2020\tSold Short\tOPTN\tTSLA Jan 08 '21 $550 Put\t-1\t86.48\t0.87\t0.5\tTSLA Jan 08 '21 $550 Put
12/31/2020\tSold Short\tOPTN\tBIDU Jan 08 '21 $275 Call\t-1\t24.48\t0.25\t0.5\tBIDU Jan 08 '21 $275 Call
12/31/2020\tSold To Close\tOPTN\tTSLA Dec 31 '20 $660 Put\t-4\t5.92\t0.02\t2\tTSLA Dec 31 '20 $660 Put
12/31/2020\tSold Short\tOPTN\tTSLA Jan 08 '21 $850 Call\t-3\t313.44\t1.05\t1.5\tTSLA Jan 08 '21 $850 Call
12/30/2020\tBought To Open\tOPTN\tTSLA Dec 31 '20 $660 Put\t4\t-242.06\t0.6\t2\tTSLA Dec 31 '20 $660 Put
12/30/2020\tSold Short\tOPTN\tBIDU Jan 20 '23 $300 Put\t-1\t11024.24\t110.25\t0.5\tBIDU Jan 20 '23 $300 Put
12/30/2020\tBought To Open\tOPTN\tTSLA Jan 08 '21 $770 Call\t5\t-977.57\t1.95\t2.5\tTSLA Jan 08 '21 $770 Call
12/29/2020\tJournal\tUNKNOWN\t \t0\t0.78\t0\t0\tTRANSFER BAL TO MARGIN
12/29/2020\tJournal\tUNKNOWN\t \t0\t-0.78\t0\t0\tTRANSFER BAL FROM CASH
12/28/2020\tSold Short\tOPTN\tTSLA Jan 08 '21 $900 Call\t-2\t114.96\t0.58\t1\tTSLA Jan 08 '21 $900 Call
12/28/2020\tSold Short\tOPTN\tTSLA Jan 08 '21 $600 Put\t-3\t1768.41\t5.9\t1.5\tTSLA Jan 08 '21 $600 Put
12/28/2020\tInterest\tBOND\t00099A109\t0\t0.78\t0\t0\tINTEREST ON CASH BALANCE      AT  0.009% 11/26 THRU 12/25   
12/24/2020\tSold To Close\tOPTN\tTSLA Jan 21 '22 $700 Put\t-1\t18949.07\t189.5\t0.5\tTSLA Jan 21 '22 $700 Put
12/24/2020\tSold To Close\tOPTN\tTSLA Dec 24 '20 $710 Put\t-1\t4844.38\t48.45\t0.5\tTSLA Dec 24 '20 $710 Put
12/24/2020\tSold To Close\tOPTN\tTSLA Dec 24 '20 $700 Put\t-2\t7738.79\t38.7\t1\tTSLA Dec 24 '20 $700 Put
12/24/2020\tSold To Close\tOPTN\tTSLA Dec 24 '20 $685 Put\t-1\t2244.44\t22.45\t0.5\tTSLA Dec 24 '20 $685 Put
12/24/2020\tSold To Close\tOPTN\tTSLA Dec 24 '20 $650 Put\t-2\t30.96\t0.16\t1\tTSLA Dec 24 '20 $650 Put
12/24/2020\tBought To Open\tOPTN\tTSLA Jan 08 '21 $650 Put\t3\t-7363.54\t24.54\t1.5\tTSLA Jan 08 '21 $650 Put
12/23/2020\tSold To Close\tOPTN\tZM Dec 24 '20 $450 Call\t-2\t8.96\t0.05\t1\tZM Dec 24 '20 $450 Call
12/23/2020\tTransfer\tUNKNOWN\t \t0\t2000\t0\t0\tACH DEPOSIT                   REFID:9996119906;
12/22/2020\tBought To Open\tOPTN\tTSLA Dec 24 '20 $710 Put\t1\t-7280.51\t72.8\t0.5\tTSLA Dec 24 '20 $710 Put
12/21/2020\tBought To Open\tOPTN\tTSLA Dec 24 '20 $685 Put\t1\t-3767.51\t37.67\t0.5\tTSLA Dec 24 '20 $685 Put
12/21/2020\tBought To Open\tOPTN\tTSLA Dec 24 '20 $700 Put\t2\t-8841.03\t44.2\t1\tTSLA Dec 24 '20 $700 Put
12/21/2020\tOption Expiration\tOPTN\tTSLA Dec 18 '20 $700 Call\t-11\t0\t0\t0\tTSLA Dec 18 '20 $700 Call
12/18/2020\tSold To Close\tOPTN\tTSLA Dec 18 '20 $650 Put\t-1\t1519.45\t15.2\t0.5\tTSLA Dec 18 '20 $650 Put
12/18/2020\tSold To Close\tOPTN\tTSLA Dec 18 '20 $660 Put\t-2\t3008.9\t15.05\t1\tTSLA Dec 18 '20 $660 Put
12/18/2020\tBought To Cover\tOPTN\tTSLA Dec 18 '20 $575 Put\t8\t-452.11\t0.56\t4\tTSLA Dec 18 '20 $575 Put
12/18/2020\tBought To Cover\tOPTN\tTSLA Dec 18 '20 $720 Call\t11\t-753.65\t0.68\t5.5\tTSLA Dec 18 '20 $720 Call
12/18/2020\tBought To Open\tOPTN\tTSLA Jan 21 '22 $700 Put\t1\t-19700.51\t197\t0.5\tTSLA Jan 21 '22 $700 Put
12/18/2020\tBought To Open\tOPTN\tTSLA Dec 24 '20 $650 Put\t2\t-7601.03\t38\t1\tTSLA Dec 24 '20 $650 Put
12/18/2020\tBought To Cover\tOPTN\tTSLA Jan 15 '21 $650 Call\t1\t-7125.51\t71.25\t0.5\tTSLA Jan 15 '21 $650 Call
12/18/2020\tBought To Open\tOPTN\tZM Dec 24 '20 $450 Call\t2\t-181.03\t0.9\t1\tZM Dec 24 '20 $450 Call
12/18/2020\tSold To Close\tOPTN\tTSLA Dec 18 '20 $630 Put\t-1\t1349.46\t13.5\t0.5\tTSLA Dec 18 '20 $630 Put
12/18/2020\tSold To Close\tOPTN\tTSLA Dec 18 '20 $640 Put\t-1\t1699.45\t17\t0.5\tTSLA Dec 18 '20 $640 Put
12/18/2020\tSold To Close\tOPTN\tTSLA Dec 18 '20 $640 Put\t-3\t5098.33\t17\t1.5\tTSLA Dec 18 '20 $640 Put
12/17/2020\tSold Short\tOPTN\tTSLA Dec 18 '20 $720 Call\t-11\t2722.26\t2.48\t5.5\tTSLA Dec 18 '20 $720 Call
12/16/2020\tBought To Cover\tOPTN\tTSLA Dec 18 '20 $550 Put\t7\t-1746.6\t2.49\t3.5\tTSLA Dec 18 '20 $550 Put
12/16/2020\tSold Short\tOPTN\tTSLA Dec 18 '20 $575 Put\t-8\t3995.78\t5\t4\tTSLA Dec 18 '20 $575 Put
12/16/2020\tBought To Open\tOPTN\tTSLA Dec 18 '20 $630 Put\t1\t-2385.51\t23.85\t0.5\tTSLA Dec 18 '20 $630 Put
12/16/2020\tBought To Open\tOPTN\tTSLA Dec 18 '20 $700 Call\t11\t-2370.65\t2.15\t5.5\tTSLA Dec 18 '20 $700 Call
12/15/2020\tSold Short\tOPTN\tTSLA Dec 18 '20 $550 Put\t-7\t2341.33\t3.35\t3.5\tTSLA Dec 18 '20 $550 Put
12/15/2020\tBought To Open\tOPTN\tTSLA Dec 18 '20 $640 Put\t4\t-11642.06\t29.1\t2\tTSLA Dec 18 '20 $640 Put
12/15/2020\tJournal\tUNKNOWN\t \t0\t5000\t0\t0\tTRANSFER BAL TO MARGIN
12/15/2020\tTransfer\tUNKNOWN\t \t0\t15000\t0\t0\tACH DEPOSIT                   REFID:9283812906;
12/15/2020\tJournal\tUNKNOWN\t \t0\t-5000\t0\t0\tTRANSFER BAL FROM CASH
12/14/2020\tSold To Close\tOPTN\tZM Dec 18 '20 $450 Call\t-2\t90.96\t0.46\t1\tZM Dec 18 '20 $450 Call
12/14/2020\tBought To Cover\tOPTN\tTSLA Dec 18 '20 $500 Put\t3\t-397.54\t1.32\t1.5\tTSLA Dec 18 '20 $500 Put
12/14/2020\tSold To Close\tOPTN\tTSLA Dec 18 '20 $800 Call\t-2\t422.96\t2.12\t1\tTSLA Dec 18 '20 $800 Call
12/14/2020\tBought To Cover\tOPTN\tTSLA Dec 18 '20 $810 Call\t1\t-182.51\t1.82\t0.5\tTSLA Dec 18 '20 $810 Call
12/14/2020\tBought To Cover\tOPTN\tTSLA Jan 21 '22 $750 Call\t1\t-15050.51\t150.5\t0.5\tTSLA Jan 21 '22 $750 Call
12/14/2020\tBought To Cover\tOPTN\tTSLA Dec 18 '20 $810 Call\t1\t-168.51\t1.68\t0.5\tTSLA Dec 18 '20 $810 Call
12/14/2020\tSold To Close\tOPTN\tTSLA Dec 18 '20 $600 Put\t-3\t4633.34\t15.45\t1.5\tTSLA Dec 18 '20 $600 Put
12/14/2020\tBought To Open\tOPTN\tZM Dec 18 '20 $450 Call\t2\t-171.03\t0.85\t1\tZM Dec 18 '20 $450 Call
12/14/2020\tBought To Open\tOPTN\tTSLA Dec 18 '20 $650 Put\t1\t-5965.51\t59.65\t0.5\tTSLA Dec 18 '20 $650 Put
12/14/2020\tBought To Open\tOPTN\tTSLA Dec 18 '20 $660 Put\t1\t-4363.51\t43.63\t0.5\tTSLA Dec 18 '20 $660 Put
12/14/2020\tBought To Open\tOPTN\tTSLA Dec 18 '20 $660 Put\t1\t-4363.51\t43.63\t0.5\tTSLA Dec 18 '20 $660 Put
12/14/2020\tOption Expiration\tOPTN\tZM Dec 11 '20 $450 Call\t-2\t0\t0\t0\tZM Dec 11 '20 $450 Call
12/14/2020\tTransfer\tUNKNOWN\t \t0\t5000\t0\t0\tACH DEPOSIT                   REFID:9176264906;
12/11/2020\tBought To Open\tOPTN\tTSLA Dec 18 '20 $600 Put\t3\t-10471.54\t34.9\t1.5\tTSLA Dec 18 '20 $600 Put
12/11/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $605 Put\t-1\t53.48\t0.54\t0.5\tTSLA Dec 11 '20 $605 Put
12/11/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $605 Put\t1\t-320.51\t3.2\t0.5\tTSLA Dec 11 '20 $605 Put
12/11/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $650 Put\t-2\t8128.79\t40.65\t1\tTSLA Dec 11 '20 $650 Put
12/11/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $600 Put\t-6\t104.9\t0.18\t3\tTSLA Dec 11 '20 $600 Put
12/11/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $572.50 Put\t2\t-4.03\t0.02\t0\tTSLA Dec 11 '20 $572.50 Put
12/11/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $572.50 Put\t1\t-2.01\t0.02\t0\tTSLA Dec 11 '20 $572.50 Put
12/11/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $620 Put\t-1\t1714.45\t17.15\t0.5\tTSLA Dec 11 '20 $620 Put
12/11/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $700 Call\t-10\t14.83\t0.02\t5\tTSLA Dec 11 '20 $700 Call
12/11/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $720 Call\t10\t-10.14\t0.01\t0\tTSLA Dec 11 '20 $720 Call
12/11/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $760 Call\t-2\t0.96\t0.01\t1\tTSLA Dec 11 '20 $760 Call
12/11/2020\tSold Short\tOPTN\tTSLA Dec 18 '20 $810 Call\t-2\t540.95\t2.71\t1\tTSLA Dec 18 '20 $810 Call
12/11/2020\tSold Short\tOPTN\tTSLA Dec 18 '20 $500 Put\t-3\t1438.41\t4.8\t1.5\tTSLA Dec 18 '20 $500 Put
12/10/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $590 Put\t3\t-901.54\t3\t1.5\tTSLA Dec 11 '20 $590 Put
12/10/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $560 Put\t9\t-1804.63\t2\t4.5\tTSLA Dec 11 '20 $560 Put
12/10/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $572.50 Put\t-1\t105.48\t1.06\t0.5\tTSLA Dec 11 '20 $572.50 Put
12/10/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $572.50 Put\t-1\t105.48\t1.06\t0.5\tTSLA Dec 11 '20 $572.50 Put
12/10/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $572.50 Put\t-1\t104.48\t1.05\t0.5\tTSLA Dec 11 '20 $572.50 Put
12/10/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $720 Call\t-10\t134.83\t0.14\t5\tTSLA Dec 11 '20 $720 Call
12/10/2020\tBought To Open\tOPTN\tTSLA Dec 18 '20 $800 Call\t2\t-1301.03\t6.5\t1\tTSLA Dec 18 '20 $800 Call
12/10/2020\tBought To Open\tOPTN\tZM Dec 11 '20 $450 Call\t2\t-31.03\t0.15\t1\tZM Dec 11 '20 $450 Call
12/10/2020\tSold Short\tOPTN\tTSLA Jan 21 '22 $750 Call\t-1\t14479.16\t144.8\t0.5\tTSLA Jan 21 '22 $750 Call
12/10/2020\tJournal\tUNKNOWN\t \t0\t5000\t0\t0\tTRANSFER BAL TO MARGIN
12/10/2020\tJournal\tUNKNOWN\t \t0\t-5000\t0\t0\tTRANSFER BAL FROM CASH
12/9/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $800 Call\t2\t-57.03\t0.28\t1\tTSLA Dec 11 '20 $800 Call
12/9/2020\tSold Short\tOPTN\tTSLA Jan 15 '21 $650 Call\t-1\t6479.34\t64.8\t0.5\tTSLA Jan 15 '21 $650 Call
12/9/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $800 Call\t4\t-126.06\t0.31\t2\tTSLA Dec 11 '20 $800 Call
12/9/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $850 Call\t2\t-51.03\t0.25\t1\tTSLA Dec 11 '20 $850 Call
12/9/2020\tBought To Cover\tOPTN\tTSLA Jan 20 '23 $700 Call\t1\t-20900.51\t209\t0.5\tTSLA Jan 20 '23 $700 Call
12/9/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $760 Call\t-1\t54.48\t0.55\t0.5\tTSLA Dec 11 '20 $760 Call
12/9/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $700 Call\t7\t-927.6\t1.32\t3.5\tTSLA Dec 11 '20 $700 Call
12/9/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $740 Call\t1\t-190.51\t1.9\t0.5\tTSLA Dec 11 '20 $740 Call
12/9/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $740 Call\t-1\t67.48\t0.68\t0.5\tTSLA Dec 11 '20 $740 Call
12/9/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $850 Call\t-2\t28.96\t0.15\t1\tTSLA Dec 11 '20 $850 Call
12/9/2020\tTransfer\tUNKNOWN\t \t0\t5000\t0\t0\tACH DEPOSIT                   REFID:8754046906;
12/8/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $590 Put\t-3\t1033.42\t3.45\t1.5\tTSLA Dec 11 '20 $590 Put
12/8/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $620 Put\t1\t-975.51\t9.75\t0.5\tTSLA Dec 11 '20 $620 Put
12/8/2020\tBought To Cover\tOPTN\tNIO Jan 21 '22 $80 Put\t1\t-4505.51\t45.05\t0.5\tNIO Jan 21 '22 $80 Put
12/7/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $560 Put\t-9\t2110.3\t2.35\t4.5\tTSLA Dec 11 '20 $560 Put
12/7/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $600 Put\t3\t-1981.54\t6.6\t1.5\tTSLA Dec 11 '20 $600 Put
12/7/2020\tBought To Cover\tOPTN\tSQ Jan 21 '22 $280 Call\t2\t-5491.03\t27.45\t1\tSQ Jan 21 '22 $280 Call
12/7/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $550 Put\t-1\t181.48\t1.82\t0.5\tTSLA Dec 11 '20 $550 Put
12/7/2020\tSold To Close\tOPTN\tTSLA Dec 11 '20 $550 Put\t-2\t362.96\t1.82\t1\tTSLA Dec 11 '20 $550 Put
12/7/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $450 Put\t1\t-23.51\t0.23\t0.5\tTSLA Dec 11 '20 $450 Put
12/7/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $500 Put\t6\t-417.08\t0.69\t3\tTSLA Dec 11 '20 $500 Put
12/7/2020\tSold Short\tOPTN\tTSLA Jan 15 '21 $700 Call\t-2\t9968.74\t49.85\t1\tTSLA Jan 15 '21 $700 Call
12/7/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $450 Put\t1\t-26.51\t0.26\t0.5\tTSLA Dec 11 '20 $450 Put
12/7/2020\tBought To Cover\tOPTN\tTSLA Dec 11 '20 $450 Put\t2\t-49.03\t0.24\t1\tTSLA Dec 11 '20 $450 Put
12/7/2020\tBought To Cover\tOPTN\tTSLA Jan 15 '21 $650 Call\t3\t-20536.54\t68.45\t1.5\tTSLA Jan 15 '21 $650 Call
12/7/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $650 Put\t2\t-5551.03\t27.75\t1\tTSLA Dec 11 '20 $650 Put
12/4/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $700 Call\t3\t-526.54\t1.75\t1.5\tTSLA Dec 11 '20 $700 Call
12/4/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $550 Put\t3\t-2011.54\t6.7\t1.5\tTSLA Dec 11 '20 $550 Put
12/4/2020\tBought To Cover\tOPTN\tSQ Dec 04 '20 $200 Put\t2\t-2.03\t0.01\t0\tSQ Dec 04 '20 $200 Put
12/4/2020\tBought To Cover\tOPTN\tTSLA Dec 04 '20 $550 Put\t1\t-2.01\t0.02\t0\tTSLA Dec 04 '20 $550 Put
12/4/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $760 Call\t3\t-190.54\t0.63\t1.5\tTSLA Dec 11 '20 $760 Call
12/4/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $600 Put\t1\t-2509.51\t25.09\t0.5\tTSLA Dec 11 '20 $600 Put
12/4/2020\tBought To Open\tOPTN\tTSLA Dec 11 '20 $600 Put\t2\t-5031.03\t25.15\t1\tTSLA Dec 11 '20 $600 Put
12/4/2020\tSold To Close\tOPTN\tZM Dec 04 '20 $400 Put\t-1\t4.48\t0.05\t0.5\tZM Dec 04 '20 $400 Put
12/4/2020\tBought To Cover\tOPTN\tTSLA Dec 04 '20 $500 Put\t4\t-4.06\t0.01\t0\tTSLA Dec 04 '20 $500 Put
12/4/2020\tSold To Close\tOPTN\tTSLA Dec 04 '20 $590 Put\t-2\t138.96\t0.7\t1\tTSLA Dec 04 '20 $590 Put
12/4/2020\tSold To Close\tOPTN\tTSLA Dec 04 '20 $580 Put\t-1\t9.48\t0.1\t0.5\tTSLA Dec 04 '20 $580 Put
12/4/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $800 Call\t-6\t260.9\t0.44\t3\tTSLA Dec 11 '20 $800 Call
12/4/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $450 Put\t-4\t329.92\t0.83\t2\tTSLA Dec 11 '20 $450 Put
12/4/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $500 Put\t-4\t917.9\t2.3\t2\tTSLA Dec 11 '20 $500 Put
12/4/2020\tSold Short\tOPTN\tTSLA Dec 11 '20 $500 Put\t-2\t456.95\t2.29\t1\tTSLA Dec 11 '20 $500 Put
12/4/2020\tSold Short\tOPTN\tTSLA Jan 15 '21 $650 Call\t-3\t12988.16\t43.3\t1.5\tTSLA Jan 15 '21 $650 Call
12/4/2020\tBought To Cover\tOPTN\tTSLA Dec 04 '20 $600 Call\t2\t-18.03\t0.09\t0\tTSLA Dec 04 '20 $600 Call
12/3/2020\tSold To Close\tOPTN\tZM Dec 04 '20 $400 Put\t-9\t3775.26\t4.2\t4.5\tZM Dec 04 '20 $400 Put
12/3/2020\tBought To Open\tOPTN\tTSLA Dec 04 '20 $590 Put\t2\t-1361.03\t6.8\t1\tTSLA Dec 04 '20 $590 Put
12/3/2020\tSold To Close\tOPTN\tTSLA Dec 04 '20 $580 Put\t-1\t344.48\t3.45\t0.5\tTSLA Dec 04 '20 $580 Put
12/3/2020\tSold Short\tOPTN\tNIO Jan 21 '22 $80 Put\t-1\t4534.38\t45.35\t0.5\tNIO Jan 21 '22 $80 Put
12/2/2020\tSold Short\tOPTN\tTSLA Dec 04 '20 $550 Put\t-1\t554.47\t5.55\t0.5\tTSLA Dec 04 '20 $550 Put
12/2/2020\tBought To Open\tOPTN\tZM Dec 04 '20 $400 Put\t10\t-4105.14\t4.1\t5\tZM Dec 04 '20 $400 Put
12/1/2020\tBought To Cover\tOPTN\tTSLA Dec 04 '20 $600 Call\t1\t-1120.51\t11.2\t0.5\tTSLA Dec 04 '20 $600 Call
12/1/2020\tSold To Close\tOPTN\tTSLA Dec 04 '20 $550 Put\t-1\t644.47\t6.45\t0.5\tTSLA Dec 04 '20 $550 Put
12/1/2020\tBought To Open\tOPTN\tTSLA Dec 04 '20 $580 Put\t2\t-3171.03\t15.85\t1\tTSLA Dec 04 '20 $580 Put
12/1/2020\tBought To Open\tOPTN\tTSLA Dec 04 '20 $550 Put\t1\t-550.51\t5.5\t0.5\tTSLA Dec 04 '20 $550 Put
11/30/2020\tSold Short\tOPTN\tSQ Dec 04 '20 $200 Put\t-2\t278.96\t1.4\t1\tSQ Dec 04 '20 $200 Put
11/30/2020\tSold Short\tOPTN\tTSLA Dec 04 '20 $500 Put\t-4\t1297.9\t3.25\t2\tTSLA Dec 04 '20 $500 Put
11/30/2020\tJournal\tUNKNOWN\t \t0\t0.89\t0\t0\tTRANSFER BAL TO MARGIN
11/30/2020\tJournal\tUNKNOWN\t \t0\t-0.89\t0\t0\tTRANSFER BAL FROM CASH
11/27/2020\tBought To Cover\tOPTN\tTSLA Jan 21 '22 $400 Put\t1\t-6600.51\t66\t0.5\tTSLA Jan 21 '22 $400 Put
11/27/2020\tSold Short\tOPTN\tTSLA Dec 04 '20 $600 Call\t-3\t6658.3\t22.2\t1.5\tTSLA Dec 04 '20 $600 Call
11/27/2020\tBought To Cover\tOPTN\tPLTR Jan 21 '22 $25 Call\t5\t-6102.57\t12.2\t2.5\tPLTR Jan 21 '22 $25 Call
11/27/2020\tBought To Cover\tOPTN\tTSLA Jun 17 '22 $600 Call\t1\t-19341.51\t193.41\t0.5\tTSLA Jun 17 '22 $600 Call
11/27/2020\tSold To Close\tOPTN\tTSLA Nov 27 '20 $450 Call\t-2\t27272.36\t136.37\t1\tTSLA Nov 27 '20 $450 Call
11/27/2020\tSold Short\tOPTN\tTSLA Jan 20 '23 $700 Call\t-1\t19199.06\t192\t0.5\tTSLA Jan 20 '23 $700 Call
11/27/2020\tInterest\tBOND\t00099A109\t0\t0.89\t0\t0\tINTEREST ON CASH BALANCE      AT  0.009% 10/26 THRU 11/25   
11/24/2020\tBought To Cover\tOPTN\tZM Jan 21 '22 $350 Put\t2\t-14181.03\t70.9\t1\tZM Jan 21 '22 $350 Put
11/23/2020\tSold Short\tOPTN\tSQ Jan 21 '22 $280 Call\t-1\t2399.43\t24\t0.5\tSQ Jan 21 '22 $280 Call
11/20/2020\tBought To Cover\tOPTN\tTSLA Jan 21 '22 $400 Call\t1\t-18250.51\t182.5\t0.5\tTSLA Jan 21 '22 $400 Call
11/20/2020\tSold To Close\tOPTN\tZM Jan 21 '22 $500 Put\t-1\t15569.14\t155.7\t0.5\tZM Jan 21 '22 $500 Put
11/20/2020\tSold Short\tOPTN\tZM Jan 21 '22 $350 Put\t-2\t13538.67\t67.7\t1\tZM Jan 21 '22 $350 Put
11/20/2020\tBought To Open\tOPTN\tTSLA Nov 27 '20 $450 Call\t1\t-4265.51\t42.65\t0.5\tTSLA Nov 27 '20 $450 Call
11/20/2020\tBought To Open\tOPTN\tTSLA Nov 27 '20 $450 Call\t1\t-4265.51\t42.65\t0.5\tTSLA Nov 27 '20 $450 Call
11/20/2020\tBought To Cover\tOPTN\tZM Jan 21 '22 $500 Call\t1\t-10130.51\t101.3\t0.5\tZM Jan 21 '22 $500 Call
11/19/2020\tBought To Cover\tOPTN\tTSLA Jan 21 '22 $500 Call\t1\t-15350.51\t153.5\t0.5\tTSLA Jan 21 '22 $500 Call
11/19/2020\tSold To Close\tOPTN\tZM Nov 20 '20 $420 Put\t-1\t869.47\t8.7\t0.5\tZM Nov 20 '20 $420 Put
11/19/2020\tBought To Open\tOPTN\tZM Jan 21 '22 $500 Put\t1\t-16900.51\t169\t0.5\tZM Jan 21 '22 $500 Put
11/19/2020\tSold Short\tOPTN\tTSLA Jan 21 '22 $400 Put\t-1\t9109.28\t91.1\t0.5\tTSLA Jan 21 '22 $400 Put
11/18/2020\tSold To Close\tOPTN\tZM Nov 20 '20 $400 Put\t-2\t2318.91\t11.6\t1\tZM Nov 20 '20 $400 Put
11/18/2020\tBought To Open\tOPTN\tZM Nov 20 '20 $420 Put\t1\t-1450.51\t14.5\t0.5\tZM Nov 20 '20 $420 Put
11/18/2020\tSold To Close\tOPTN\tZM Nov 20 '20 $450 Call\t-5\t1417.38\t2.84\t2.5\tZM Nov 20 '20 $450 Call
11/18/2020\tBought To Cover\tOPTN\tNIO Jan 21 '22 $60 Call\t2\t-2771.03\t13.85\t1\tNIO Jan 21 '22 $60 Call
11/18/2020\tBought To Cover\tOPTN\tNIO Jan 21 '22 $55 Call\t2\t-3001.03\t15\t1\tNIO Jan 21 '22 $55 Call
11/18/2020\tSold To Close\tOPTN\tTSLA Jan 21 '22 $550 Put\t-1\t18424.08\t184.25\t0.5\tTSLA Jan 21 '22 $550 Put
11/16/2020\tBought To Open\tOPTN\tZM Nov 20 '20 $450 Call\t5\t-1402.57\t2.8\t2.5\tZM Nov 20 '20 $450 Call
11/16/2020\tBought To Open\tOPTN\tZM Nov 20 '20 $400 Put\t2\t-3241.03\t16.2\t1\tZM Nov 20 '20 $400 Put
11/16/2020\tSold Short\tOPTN\tTSLA Jan 21 '22 $400 Call\t-1\t11549.23\t115.5\t0.5\tTSLA Jan 21 '22 $400 Call
11/16/2020\tBought To Cover\tOPTN\tZM Jan 21 '22 $510 Call\t4\t-30002.06\t75\t2\tZM Jan 21 '22 $510 Call
11/16/2020\tBought To Cover\tOPTN\tTSLA Jan 21 '22 $600 Call\t1\t-6430.51\t64.3\t0.5\tTSLA Jan 21 '22 $600 Call
11/16/2020\tBought To Cover\tOPTN\tZM Jan 21 '22 $550 Call\t1\t-6550.51\t65.5\t0.5\tZM Jan 21 '22 $550 Call
11/16/2020\tSold To Close\tOPTN\tTSLA Dec 04 '20 $620 Call\t-1\t20.48\t0.21\t0.5\tTSLA Dec 04 '20 $620 Call
11/13/2020\tSold To Close\tOPTN\tTSLA Nov 13 '20 $500 Put\t-1\t9709.27\t97.1\t0.5\tTSLA Nov 13 '20 $500 Put
11/13/2020\tSold To Close\tOPTN\tTSLA Nov 13 '20 $380 Put\t-1\t5.48\t0.06\t0.5\tTSLA Nov 13 '20 $380 Put
11/13/2020\tSold To Close\tOPTN\tZM Nov 13 '20 $500 Put\t-1\t9899.27\t99\t0.5\tZM Nov 13 '20 $500 Put
11/13/2020\tSold To Close\tOPTN\tNFLX Nov 13 '20 $470 Put\t-1\t7.48\t0.08\t0.5\tNFLX Nov 13 '20 $470 Put
11/13/2020\tSold Short\tOPTN\tZM Jan 21 '22 $510 Call\t-4\t31837.22\t79.6\t2\tZM Jan 21 '22 $510 Call
11/12/2020\tSold To Close\tOPTN\tTSLA Nov 13 '20 $505 Call\t-1\t1.48\t0.02\t0.5\tTSLA Nov 13 '20 $505 Call
11/12/2020\tSold To Close\tOPTN\tTSLA Nov 13 '20 $510 Call\t-1\t2.48\t0.03\t0.5\tTSLA Nov 13 '20 $510 Call
11/12/2020\tSold To Close\tOPTN\tTSLA Nov 13 '20 $500 Call\t-1\t1.48\t0.02\t0.5\tTSLA Nov 13 '20 $500 Call
11/12/2020\tSold To Close\tOPTN\tNFLX Nov 13 '20 $550 Call\t-1\t2.48\t0.03\t0.5\tNFLX Nov 13 '20 $550 Call
11/11/2020\tSold Short\tOPTN\tZM Jan 21 '22 $550 Call\t-1\t7249.32\t72.5\t0.5\tZM Jan 21 '22 $550 Call
11/10/2020\tSold Short\tOPTN\tNIO Jan 21 '22 $55 Call\t-2\t2878.9\t14.4\t1\tNIO Jan 21 '22 $55 Call
11/9/2020\tBought To Open\tOPTN\tTSLA Nov 13 '20 $500 Call\t1\t-45.51\t0.45\t0.5\tTSLA Nov 13 '20 $500 Call
11/9/2020\tSold Short\tOPTN\tTSLA Jan 21 '22 $600 Call\t-1\t7374.32\t73.75\t0.5\tTSLA Jan 21 '22 $600 Call
11/9/2020\tSold Short\tOPTN\tNIO Jan 21 '22 $60 Call\t-2\t2358.91\t11.8\t1\tNIO Jan 21 '22 $60 Call
11/9/2020\tSold Short\tOPTN\tPLTR Jan 21 '22 $25 Call\t-5\t1897.37\t3.8\t2.5\tPLTR Jan 21 '22 $25 Call
11/9/2020\tBought To Cover\tOPTN\tSQ Jan 21 '22 $200 Call\t5\t-21427.57\t42.85\t2.5\tSQ Jan 21 '22 $200 Call
11/9/2020\tBought To Open\tOPTN\tTSLA Dec 04 '20 $620 Call\t1\t-100.51\t1\t0.5\tTSLA Dec 04 '20 $620 Call
11/9/2020\tSold Short\tOPTN\tZM Jan 21 '22 $500 Call\t-1\t8899.29\t89\t0.5\tZM Jan 21 '22 $500 Call
11/9/2020\tBought To Open\tOPTN\tNFLX Nov 13 '20 $550 Call\t1\t-70.51\t0.7\t0.5\tNFLX Nov 13 '20 $550 Call
11/9/2020\tBought To Open\tOPTN\tTSLA Nov 13 '20 $505 Call\t1\t-45.51\t0.45\t0.5\tTSLA Nov 13 '20 $505 Call
11/6/2020\tSold To Close\tOPTN\tZM Nov 06 '20 $500 Call\t-1\t59.48\t0.6\t0.5\tZM Nov 06 '20 $500 Call
11/6/2020\tBought To Open\tOPTN\tTSLA Nov 13 '20 $510 Call\t1\t-44.51\t0.44\t0.5\tTSLA Nov 13 '20 $510 Call
11/6/2020\tSold To Close\tOPTN\tGOOG Nov 06 '20 $1700 Call\t-1\t6699.34\t67\t0.5\tGOOG Nov 06 '20 $1700 Call
11/6/2020\tBought To Cover\tOPTN\tZM Nov 06 '20 $520 Call\t1\t-10.01\t0.1\t0\tZM Nov 06 '20 $520 Call
11/6/2020\tBought To Open\tOPTN\tTSLA Nov 13 '20 $500 Put\t1\t-7225.51\t72.25\t0.5\tTSLA Nov 13 '20 $500 Put
11/6/2020\tSold To Close\tOPTN\tZM Nov 06 '20 $500 Put\t-1\t1599.45\t16\t0.5\tZM Nov 06 '20 $500 Put
11/6/2020\tBought To Cover\tOPTN\tGOOG Nov 06 '20 $1820 Call\t1\t-5.01\t0.05\t0\tGOOG Nov 06 '20 $1820 Call
11/6/2020\tSold To Close\tOPTN\tTSLA Nov 06 '20 $450 Put\t-1\t2304.43\t23.05\t0.5\tTSLA Nov 06 '20 $450 Put
11/6/2020\tBought To Open\tOPTN\tNFLX Nov 13 '20 $470 Put\t1\t-136.51\t1.36\t0.5\tNFLX Nov 13 '20 $470 Put
11/6/2020\tBought To Cover\tOPTN\tZM Nov 06 '20 $450 Put\t1\t-10.01\t0.1\t0\tZM Nov 06 '20 $450 Put
11/6/2020\tSold To Close\tOPTN\tNFLX Jan 21 '22 $600 Put\t-1\t15299.15\t153\t0.5\tNFLX Jan 21 '22 $600 Put
11/6/2020\tBought To Cover\tOPTN\tTSLA Nov 06 '20 $400 Put\t1\t-8.01\t0.08\t0\tTSLA Nov 06 '20 $400 Put
11/6/2020\tBought To Cover\tOPTN\tNFLX Nov 06 '20 $490 Put\t1\t-9.01\t0.09\t0\tNFLX Nov 06 '20 $490 Put
11/6/2020\tBought To Cover\tOPTN\tZM Jan 21 '22 $500 Call\t1\t-13180.51\t131.8\t0.5\tZM Jan 21 '22 $500 Call
11/6/2020\tBought To Cover\tOPTN\tTSLA Nov 06 '20 $380 Put\t1\t-7.01\t0.07\t0\tTSLA Nov 06 '20 $380 Put
11/6/2020\tBought To Open\tOPTN\tZM Nov 13 '20 $500 Put\t1\t-1630.51\t16.3\t0.5\tZM Nov 13 '20 $500 Put
11/6/2020\tBought To Cover\tOPTN\tNFLX Nov 06 '20 $532.50 Call\t1\t-7.01\t0.07\t0\tNFLX Nov 06 '20 $532.50 Call
11/6/2020\tBought To Cover\tOPTN\tNIO Jan 21 '22 $30 Call\t2\t-3961.03\t19.8\t1\tNIO Jan 21 '22 $30 Call
11/6/2020\tSold Short\tOPTN\tSQ Jan 21 '22 $280 Call\t-1\t2364.43\t23.65\t0.5\tSQ Jan 21 '22 $280 Call
11/6/2020\tBought To Open\tOPTN\tTSLA Nov 13 '20 $380 Put\t1\t-130.51\t1.3\t0.5\tTSLA Nov 13 '20 $380 Put
11/6/2020\tSold To Close\tOPTN\tNFLX Nov 06 '20 $520 Call\t-1\t27.48\t0.28\t0.5\tNFLX Nov 06 '20 $520 Call
11/5/2020\tSold To Close\tOPTN\tSQ Nov 06 '20 $130 Put\t-5\t37.41\t0.08\t2.5\tSQ Nov 06 '20 $130 Put
11/5/2020\tBought To Open\tOPTN\tTSLA Jan 21 '22 $550 Put\t1\t-20400.51\t204\t0.5\tTSLA Jan 21 '22 $550 Put
11/5/2020\tSold Short\tOPTN\tZM Nov 06 '20 $450 Put\t-1\t54.48\t0.55\t0.5\tZM Nov 06 '20 $450 Put
11/5/2020\tSold Short\tOPTN\tZM Nov 06 '20 $520 Call\t-1\t79.48\t0.8\t0.5\tZM Nov 06 '20 $520 Call
11/5/2020\tSold Short\tOPTN\tTSLA Nov 06 '20 $400 Put\t-1\t49.48\t0.5\t0.5\tTSLA Nov 06 '20 $400 Put
11/5/2020\tSold Short\tOPTN\tTSLA Nov 06 '20 $380 Put\t-1\t17.48\t0.18\t0.5\tTSLA Nov 06 '20 $380 Put
11/5/2020\tSold Short\tOPTN\tNFLX Nov 06 '20 $532.50 Call\t-1\t107.48\t1.08\t0.5\tNFLX Nov 06 '20 $532.50 Call
11/5/2020\tSold Short\tOPTN\tNFLX Nov 06 '20 $490 Put\t-1\t50.48\t0.51\t0.5\tNFLX Nov 06 '20 $490 Put
11/5/2020\tSold Short\tOPTN\tGOOG Nov 06 '20 $1820 Call\t-1\t149.48\t1.5\t0.5\tGOOG Nov 06 '20 $1820 Call
11/5/2020\tSold To Close\tOPTN\tGOOG Nov 06 '20 $1650 Put\t-1\t14.48\t0.15\t0.5\tGOOG Nov 06 '20 $1650 Put
11/3/2020\tBought To Open\tOPTN\tZM Nov 06 '20 $500 Call\t1\t-190.51\t1.9\t0.5\tZM Nov 06 '20 $500 Call
11/3/2020\tBought To Open\tOPTN\tSQ Nov 06 '20 $130 Put\t5\t-202.57\t0.4\t2.5\tSQ Nov 06 '20 $130 Put
11/3/2020\tBought To Open\tOPTN\tNFLX Nov 06 '20 $520 Call\t1\t-100.51\t1\t0.5\tNFLX Nov 06 '20 $520 Call
11/3/2020\tSold Short\tOPTN\tSQ Jan 21 '22 $200 Call\t-3\t7183.29\t23.95\t1.5\tSQ Jan 21 '22 $200 Call
11/3/2020\tSold Short\tOPTN\tSQ Jan 21 '22 $200 Call\t-2\t4788.86\t23.95\t1\tSQ Jan 21 '22 $200 Call
11/2/2020\tSold Short\tOPTN\tZM Jan 21 '22 $500 Call\t-1\t11049.24\t110.5\t0.5\tZM Jan 21 '22 $500 Call
11/2/2020\tBought To Open\tOPTN\tGOOG Nov 06 '20 $1700 Call\t1\t-580.51\t5.8\t0.5\tGOOG Nov 06 '20 $1700 Call
11/2/2020\tBought To Open\tOPTN\tGOOG Nov 06 '20 $1650 Put\t1\t-5850.51\t58.5\t0.5\tGOOG Nov 06 '20 $1650 Put
11/2/2020\tOption Expiration\tOPTN\tAMZN Oct 30 '20 $2800 Put\t-1\t0\t0\t0\tAMZN Oct 30 '20 $2800 Put
11/2/2020\tOption Expiration\tOPTN\tZM Oct 30 '20 $550 Call\t-1\t0\t0\t0\tZM Oct 30 '20 $550 Call
10/30/2020\tBought To Open\tOPTN\tZM Nov 06 '20 $500 Put\t1\t-4680.51\t46.8\t0.5\tZM Nov 06 '20 $500 Put
10/30/2020\tBought To Open\tOPTN\tTSLA Nov 06 '20 $450 Put\t1\t-6275.51\t62.75\t0.5\tTSLA Nov 06 '20 $450 Put
10/30/2020\tSold To Close\tOPTN\tTSLA Oct 30 '20 $450 Put\t-3\t18358.04\t61.2\t1.5\tTSLA Oct 30 '20 $450 Put
10/30/2020\tSold To Close\tOPTN\tTSLA Oct 30 '20 $450 Put\t-1\t6119.35\t61.2\t0.5\tTSLA Oct 30 '20 $450 Put
10/30/2020\tSold To Close\tOPTN\tZM Oct 30 '20 $500 Put\t-3\t11728.19\t39.1\t1.5\tZM Oct 30 '20 $500 Put
10/29/2020\tSold To Close\tOPTN\tVIXW Nov 04 '20 $55 Call\t-1\t34.17\t0.35\t0.5\tVIX Nov 04 '20 $55 Call
10/29/2020\tBought To Open\tOPTN\tZM Oct 30 '20 $550 Call\t1\t-265.51\t2.65\t0.5\tZM Oct 30 '20 $550 Call
10/29/2020\tBought To Open\tOPTN\tVIXW Nov 04 '20 $55 Call\t1\t-75.83\t0.75\t0.5\tVIX Nov 04 '20 $55 Call
10/29/2020\tBought To Open\tOPTN\tZM Oct 30 '20 $500 Put\t3\t-1351.54\t4.5\t1.5\tZM Oct 30 '20 $500 Put
10/29/2020\tSold To Close\tOPTN\tNFLX Oct 30 '20 $550 Call\t-1\t3.48\t0.04\t0.5\tNFLX Oct 30 '20 $550 Call
10/28/2020\tSold To Close\tOPTN\tZM Oct 30 '20 $550 Put\t-3\t10168.22\t33.9\t1.5\tZM Oct 30 '20 $550 Put
10/28/2020\tSold To Close\tOPTN\tTSLA Oct 30 '20 $500 Call\t-4\t13.92\t0.04\t2\tTSLA Oct 30 '20 $500 Call
10/28/2020\tSold To Close\tOPTN\tZM Oct 30 '20 $600 Call\t-4\t137.92\t0.35\t2\tZM Oct 30 '20 $600 Call
10/27/2020\tJournal\tUNKNOWN\t \t0\t0.7\t0\t0\tTRANSFER BAL TO MARGIN
10/27/2020\tJournal\tUNKNOWN\t \t0\t-0.7\t0\t0\tTRANSFER BAL FROM CASH
10/26/2020\tBought To Open\tOPTN\tZM Oct 30 '20 $600 Call\t4\t-322.06\t0.8\t2\tZM Oct 30 '20 $600 Call
10/26/2020\tBought To Open\tOPTN\tNFLX Oct 30 '20 $550 Call\t1\t-44.51\t0.44\t0.5\tNFLX Oct 30 '20 $550 Call
10/26/2020\tBought To Open\tOPTN\tAMZN Oct 30 '20 $2800 Put\t1\t-510.51\t5.1\t0.5\tAMZN Oct 30 '20 $2800 Put
10/26/2020\tOption Expiration\tOPTN\tZM Oct 23 '20 $700 Call\t-4\t0\t0\t0\tZM Oct 23 '20 $700 Call
10/26/2020\tOption Expiration\tOPTN\tZM Oct 23 '20 $610 Call\t-5\t0\t0\t0\tZM Oct 23 '20 $610 Call
10/26/2020\tInterest\tBOND\t00099A109\t0\t0.7\t0\t0\tINTEREST ON CASH BALANCE      AT  0.009% 09/26 THRU 10/25   
10/23/2020\tSold To Close\tOPTN\tZM Oct 23 '20 $500 Put\t-2\t78.96\t0.4\t1\tZM Oct 23 '20 $500 Put
10/23/2020\tSold To Close\tOPTN\tZM Oct 23 '20 $550 Put\t-3\t11638.19\t38.8\t1.5\tZM Oct 23 '20 $550 Put
10/23/2020\tSold To Close\tOPTN\tTSLA Oct 23 '20 $440 Put\t-4\t9957.7\t24.9\t2\tTSLA Oct 23 '20 $440 Put
10/23/2020\tBought To Open\tOPTN\tZM Oct 30 '20 $550 Put\t3\t-13231.54\t44.1\t1.5\tZM Oct 30 '20 $550 Put
10/23/2020\tBought To Open\tOPTN\tTSLA Oct 30 '20 $450 Put\t1\t-3370.51\t33.7\t0.5\tTSLA Oct 30 '20 $450 Put
10/23/2020\tBought To Open\tOPTN\tTSLA Oct 30 '20 $450 Put\t3\t-10111.54\t33.7\t1.5\tTSLA Oct 30 '20 $450 Put
10/23/2020\tBought To Open\tOPTN\tTSLA Oct 30 '20 $500 Call\t4\t-118.06\t0.29\t2\tTSLA Oct 30 '20 $500 Call
10/22/2020\tSold To Close\tOPTN\tTSLA Oct 23 '20 $550 Call\t-2\t0.96\t0.01\t1\tTSLA Oct 23 '20 $550 Call
10/22/2020\tSold To Close\tOPTN\tTSLA Oct 23 '20 $370 Put\t-2\t22.96\t0.12\t1\tTSLA Oct 23 '20 $370 Put
10/22/2020\tBought To Open\tOPTN\tTSLA Oct 23 '20 $440 Put\t4\t-4482.06\t11.2\t2\tTSLA Oct 23 '20 $440 Put
10/22/2020\tSold To Close\tOPTN\tSQ Oct 23 '20 $200 Call\t-2\t8.96\t0.05\t1\tSQ Oct 23 '20 $200 Call
10/21/2020\tSold To Close\tOPTN\tNFLX Oct 23 '20 $500 Put\t-2\t1838.92\t9.2\t1\tNFLX Oct 23 '20 $500 Put
10/21/2020\tSold To Close\tOPTN\tNFLX Oct 23 '20 $620 Call\t-2\t6.96\t0.04\t1\tNFLX Oct 23 '20 $620 Call
10/20/2020\tBought To Open\tOPTN\tZM Oct 23 '20 $610 Call\t5\t-202.57\t0.4\t2.5\tZM Oct 23 '20 $610 Call
10/20/2020\tSold To Close\tOPTN\tAMZN Oct 23 '20 $3000 Put\t-1\t464.47\t4.65\t0.5\tAMZN Oct 23 '20 $3000 Put
10/20/2020\tBought To Open\tOPTN\tSQ Oct 23 '20 $200 Call\t2\t-161.03\t0.8\t1\tSQ Oct 23 '20 $200 Call
10/19/2020\tBought To Open\tOPTN\tZM Oct 23 '20 $700 Call\t4\t-122.06\t0.3\t2\tZM Oct 23 '20 $700 Call
10/19/2020\tBought To Open\tOPTN\tZM Oct 23 '20 $550 Put\t3\t-1561.54\t5.2\t1.5\tZM Oct 23 '20 $550 Put
10/19/2020\tBought To Open\tOPTN\tNFLX Jan 21 '22 $600 Put\t1\t-15100.51\t151\t0.5\tNFLX Jan 21 '22 $600 Put
10/19/2020\tBought To Open\tOPTN\tNFLX Oct 23 '20 $500 Put\t2\t-1801.03\t9\t1\tNFLX Oct 23 '20 $500 Put
10/19/2020\tBought To Open\tOPTN\tZM Oct 23 '20 $500 Put\t2\t-291.03\t1.45\t1\tZM Oct 23 '20 $500 Put
10/19/2020\tBought To Open\tOPTN\tAMZN Oct 23 '20 $3000 Put\t1\t-615.51\t6.15\t0.5\tAMZN Oct 23 '20 $3000 Put
10/16/2020\tSold To Close\tOPTN\tAMZN Oct 16 '20 $3250 Put\t-1\t19.48\t0.2\t0.5\tAMZN Oct 16 '20 $3250 Put
10/16/2020\tBought To Open\tOPTN\tTSLA Oct 23 '20 $370 Put\t2\t-265.03\t1.32\t1\tTSLA Oct 23 '20 $370 Put
10/16/2020\tBought To Open\tOPTN\tNFLX Oct 23 '20 $620 Call\t2\t-1001.03\t5\t1\tNFLX Oct 23 '20 $620 Call
10/16/2020\tSold To Close\tOPTN\tZM Jan 21 '22 $500 Put\t-1\t12429.21\t124.3\t0.5\tZM Jan 21 '22 $500 Put
10/16/2020\tBought To Cover\tOPTN\tZM Jan 15 '21 $500 Call\t1\t-11050.51\t110.5\t0.5\tZM Jan 15 '21 $500 Call
10/16/2020\tSold To Close\tOPTN\tZM Oct 16 '20 $550 Call\t-3\t3568.37\t11.9\t1.5\tZM Oct 16 '20 $550 Call
10/16/2020\tSold Short\tOPTN\tNIO Jan 21 '22 $30 Call\t-2\t2238.92\t11.2\t1\tNIO Jan 21 '22 $30 Call
10/16/2020\tBought To Cover\tOPTN\tAMZN Oct 16 '20 $3000 Put\t1\t-5.01\t0.05\t0\tAMZN Oct 16 '20 $3000 Put
10/16/2020\tBought To Cover\tOPTN\tTSLA Oct 16 '20 $365 Put\t2\t-2.03\t0.01\t0\tTSLA Oct 16 '20 $365 Put
10/16/2020\tBought To Open\tOPTN\tTSLA Oct 23 '20 $550 Call\t2\t-511.03\t2.55\t1\tTSLA Oct 23 '20 $550 Call
10/15/2020\tSold To Close\tOPTN\tNFLX Oct 16 '20 $600 Call\t-1\t7.48\t0.08\t0.5\tNFLX Oct 16 '20 $600 Call
10/15/2020\tBought To Cover\tOPTN\tNFLX Oct 16 '20 $605 Call\t1\t-7.01\t0.07\t0\tNFLX Oct 16 '20 $605 Call
10/15/2020\tBought To Cover\tOPTN\tZM Oct 16 '20 $600 Call\t2\t-20.03\t0.1\t0\tZM Oct 16 '20 $600 Call
10/15/2020\tSold To Close\tOPTN\tZM Oct 16 '20 $450 Put\t-3\t28.44\t0.1\t1.5\tZM Oct 16 '20 $450 Put
10/15/2020\tBought To Cover\tOPTN\tZM Oct 16 '20 $440 Put\t4\t-36.06\t0.09\t0\tZM Oct 16 '20 $440 Put
10/15/2020\tSold To Close\tOPTN\tTSLA Oct 16 '20 $500 Call\t-1\t10.48\t0.11\t0.5\tTSLA Oct 16 '20 $500 Call
10/15/2020\tSold To Close\tOPTN\tTSLA Oct 16 '20 $490 Call\t-1\t16.48\t0.17\t0.5\tTSLA Oct 16 '20 $490 Call
10/15/2020\tBought To Cover\tOPTN\tTSLA Oct 16 '20 $510 Call\t2\t-14.03\t0.07\t0\tTSLA Oct 16 '20 $510 Call
10/15/2020\tSold To Close\tOPTN\tTSLA Oct 16 '20 $370 Put\t-1\t5.48\t0.06\t0.5\tTSLA Oct 16 '20 $370 Put
10/15/2020\tSold To Close\tOPTN\tTSLA Oct 16 '20 $380 Put\t-1\t8.48\t0.09\t0.5\tTSLA Oct 16 '20 $380 Put
10/14/2020\tSold To Close\tOPTN\tSQ Jan 21 '22 $200 Put\t-1\t5299.37\t53\t0.5\tSQ Jan 21 '22 $200 Put
10/14/2020\tSold Short\tOPTN\tAMZN Oct 16 '20 $3000 Put\t-1\t43.48\t0.44\t0.5\tAMZN Oct 16 '20 $3000 Put
10/14/2020\tBought To Cover\tOPTN\tSQ Oct 16 '20 $180 Put\t1\t-60.51\t0.6\t0.5\tSQ Oct 16 '20 $180 Put
10/14/2020\tSold To Close\tOPTN\tSQ Oct 16 '20 $220 Call\t-2\t6.96\t0.04\t1\tSQ Oct 16 '20 $220 Call
10/14/2020\tBought To Open\tOPTN\tAMZN Oct 16 '20 $3250 Put\t1\t-830.51\t8.3\t0.5\tAMZN Oct 16 '20 $3250 Put
10/14/2020\tBought To Cover\tOPTN\tZM Oct 16 '20 $600 Call\t1\t-50.51\t0.5\t0.5\tZM Oct 16 '20 $600 Call
10/14/2020\tSold To Close\tOPTN\tSQ Oct 16 '20 $170 Put\t-2\t22.96\t0.12\t1\tSQ Oct 16 '20 $170 Put
10/14/2020\tSold To Close\tOPTN\tAMZN Oct 16 '20 $3650 Call\t-1\t199.48\t2\t0.5\tAMZN Oct 16 '20 $3650 Call
10/14/2020\tBought To Cover\tOPTN\tAMZN Oct 16 '20 $3700 Call\t1\t-119.51\t1.19\t0.5\tAMZN Oct 16 '20 $3700 Call
10/14/2020\tBought To Cover\tOPTN\tSQ Oct 16 '20 $167.50 Put\t2\t-18.03\t0.09\t0\tSQ Oct 16 '20 $167.50 Put
10/13/2020\tSold Short\tOPTN\tZM Oct 16 '20 $440 Put\t-4\t357.92\t0.9\t2\tZM Oct 16 '20 $440 Put
10/13/2020\tSold Short\tOPTN\tTSLA Oct 16 '20 $510 Call\t-2\t108.96\t0.55\t1\tTSLA Oct 16 '20 $510 Call
10/13/2020\tSold Short\tOPTN\tTSLA Oct 16 '20 $365 Put\t-2\t30.96\t0.16\t1\tTSLA Oct 16 '20 $365 Put
10/13/2020\tSold Short\tOPTN\tZM Oct 16 '20 $600 Call\t-3\t178.44\t0.6\t1.5\tZM Oct 16 '20 $600 Call
10/13/2020\tSold Short\tOPTN\tSQ Oct 16 '20 $180 Put\t-1\t67.48\t0.68\t0.5\tSQ Oct 16 '20 $180 Put
10/13/2020\tSold Short\tOPTN\tTSLA Jun 17 '22 $600 Call\t-1\t12199.22\t122\t0.5\tTSLA Jun 17 '22 $600 Call
10/12/2020\tBought To Open\tOPTN\tTSLA Oct 16 '20 $490 Call\t1\t-100.51\t1\t0.5\tTSLA Oct 16 '20 $490 Call
10/12/2020\tSold Short\tOPTN\tSQ Oct 16 '20 $167.50 Put\t-2\t50.96\t0.26\t1\tSQ Oct 16 '20 $167.50 Put
10/12/2020\tSold Short\tOPTN\tNFLX Oct 16 '20 $605 Call\t-1\t42.48\t0.43\t0.5\tNFLX Oct 16 '20 $605 Call
10/12/2020\tBought To Open\tOPTN\tSQ Jan 21 '22 $200 Put\t1\t-5435.51\t54.35\t0.5\tSQ Jan 21 '22 $200 Put
10/9/2020\tBought To Cover\tOPTN\tZM Jan 15 '21 $450 Call\t1\t-9270.51\t92.7\t0.5\tZM Jan 15 '21 $450 Call
10/9/2020\tBought To Open\tOPTN\tNFLX Oct 16 '20 $600 Call\t1\t-110.51\t1.1\t0.5\tNFLX Oct 16 '20 $600 Call
10/9/2020\tSold Short\tOPTN\tTSLA Jan 21 '22 $500 Call\t-1\t12039.22\t120.4\t0.5\tTSLA Jan 21 '22 $500 Call
10/9/2020\tBought To Cover\tOPTN\tSQ Oct 09 '20 $150 Put\t1\t-1.01\t0.01\t0\tSQ Oct 09 '20 $150 Put
10/9/2020\tBought To Open\tOPTN\tSQ Oct 16 '20 $170 Put\t2\t-121.03\t0.6\t1\tSQ Oct 16 '20 $170 Put
10/9/2020\tBought To Open\tOPTN\tZM Oct 16 '20 $450 Put\t3\t-1639.54\t5.46\t1.5\tZM Oct 16 '20 $450 Put
10/9/2020\tBought To Open\tOPTN\tTSLA Oct 16 '20 $380 Put\t1\t-96.51\t0.96\t0.5\tTSLA Oct 16 '20 $380 Put
10/9/2020\tBought To Open\tOPTN\tTSLA Oct 16 '20 $370 Put\t1\t-64.51\t0.64\t0.5\tTSLA Oct 16 '20 $370 Put
10/9/2020\tBought To Open\tOPTN\tTSLA Oct 16 '20 $500 Call\t1\t-78.51\t0.78\t0.5\tTSLA Oct 16 '20 $500 Call
10/9/2020\tBought To Open\tOPTN\tSQ Oct 16 '20 $220 Call\t1\t-20.51\t0.2\t0.5\tSQ Oct 16 '20 $220 Call
10/9/2020\tBought To Open\tOPTN\tSQ Oct 16 '20 $220 Call\t1\t-20.51\t0.2\t0.5\tSQ Oct 16 '20 $220 Call
10/9/2020\tBought To Cover\tOPTN\tSQ Oct 16 '20 $220 Call\t1\t-17.51\t0.17\t0.5\tSQ Oct 16 '20 $220 Call
10/9/2020\tBought To Cover\tOPTN\tSQ Jan 21 '22 $200 Put\t1\t-5370.51\t53.7\t0.5\tSQ Jan 21 '22 $200 Put
10/9/2020\tBought To Cover\tOPTN\tSQ Oct 09 '20 $195 Call\t1\t-2.01\t0.02\t0\tSQ Oct 09 '20 $195 Call
10/9/2020\tSold Short\tOPTN\tAMZN Oct 16 '20 $3700 Call\t-1\t241.48\t2.42\t0.5\tAMZN Oct 16 '20 $3700 Call
10/9/2020\tBought To Cover\tOPTN\tAAPL Jan 21 '22 $200 Put\t1\t-8740.51\t87.4\t0.5\tAAPL Jan 21 '22 $200 Put
10/9/2020\tBought To Open\tOPTN\tAMZN Oct 16 '20 $3650 Call\t1\t-420.51\t4.2\t0.5\tAMZN Oct 16 '20 $3650 Call
10/9/2020\tBought To Cover\tOPTN\tZM Oct 09 '20 $430 Put\t1\t-5.01\t0.05\t0\tZM Oct 09 '20 $430 Put
10/9/2020\tBought To Cover\tOPTN\tZM Oct 09 '20 $447.50 Put\t2\t-10.03\t0.05\t0\tZM Oct 09 '20 $447.50 Put
10/9/2020\tSold To Close\tOPTN\tAMZN Oct 09 '20 $3500 Call\t-1\t2.48\t0.03\t0.5\tAMZN Oct 09 '20 $3500 Call
10/9/2020\tBought To Cover\tOPTN\tSQ Oct 09 '20 $170 Put\t1\t-1.01\t0.01\t0\tSQ Oct 09 '20 $170 Put
10/8/2020\tBought To Cover\tOPTN\tAMZN Oct 09 '20 $3505 Call\t1\t-10.01\t0.1\t0\tAMZN Oct 09 '20 $3505 Call
10/8/2020\tBought To Open\tOPTN\tZM Oct 16 '20 $550 Call\t3\t-856.54\t2.85\t1.5\tZM Oct 16 '20 $550 Call
10/8/2020\tSold To Close\tOPTN\tZM Oct 09 '20 $450 Put\t-2\t68.96\t0.35\t1\tZM Oct 09 '20 $450 Put
10/8/2020\tSold To Close\tOPTN\tZM Oct 09 '20 $550 Call\t-1\t4.48\t0.05\t0.5\tZM Oct 09 '20 $550 Call
10/8/2020\tSold To Close\tOPTN\tZM Oct 09 '20 $550 Call\t-2\t8.96\t0.05\t1\tZM Oct 09 '20 $550 Call
10/8/2020\tBought To Cover\tOPTN\tZM Oct 09 '20 $555 Call\t3\t-15.04\t0.05\t0\tZM Oct 09 '20 $555 Call
10/7/2020\tSold Short\tOPTN\tSQ Oct 09 '20 $170 Put\t-1\t42.48\t0.43\t0.5\tSQ Oct 09 '20 $170 Put
10/6/2020\tSold Short\tOPTN\tAAPL Jan 21 '22 $200 Put\t-1\t9019.29\t90.2\t0.5\tAAPL Jan 21 '22 $200 Put
10/6/2020\tSold Short\tOPTN\tZM Oct 09 '20 $430 Put\t-1\t69.48\t0.7\t0.5\tZM Oct 09 '20 $430 Put
10/6/2020\tSold Short\tOPTN\tZM Oct 09 '20 $555 Call\t-3\t142.44\t0.48\t1.5\tZM Oct 09 '20 $555 Call
10/6/2020\tSold Short\tOPTN\tZM Oct 09 '20 $447.50 Put\t-1\t166.48\t1.67\t0.5\tZM Oct 09 '20 $447.50 Put
10/6/2020\tSold Short\tOPTN\tZM Oct 09 '20 $447.50 Put\t-1\t166.48\t1.67\t0.5\tZM Oct 09 '20 $447.50 Put
10/6/2020\tSold Short\tOPTN\tAMZN Oct 09 '20 $3505 Call\t-1\t39.48\t0.4\t0.5\tAMZN Oct 09 '20 $3505 Call
10/6/2020\tSold Short\tOPTN\tSQ Oct 16 '20 $220 Call\t-1\t42.48\t0.43\t0.5\tSQ Oct 16 '20 $220 Call
10/6/2020\tSold Short\tOPTN\tSQ Oct 09 '20 $195 Call\t-1\t62.48\t0.63\t0.5\tSQ Oct 09 '20 $195 Call
10/5/2020\tBought To Open\tOPTN\tZM Oct 09 '20 $550 Call\t3\t-406.54\t1.35\t1.5\tZM Oct 09 '20 $550 Call
10/5/2020\tSold Short\tOPTN\tSQ Jan 21 '22 $200 Put\t-1\t5679.36\t56.8\t0.5\tSQ Jan 21 '22 $200 Put
10/5/2020\tSold To Close\tOPTN\tZM Oct 09 '20 $530 Call\t-2\t598.95\t3\t1\tZM Oct 09 '20 $530 Call
10/5/2020\tBought To Open\tOPTN\tZM Oct 09 '20 $450 Put\t2\t-661.03\t3.3\t1\tZM Oct 09 '20 $450 Put
10/5/2020\tOption Expiration\tOPTN\tTSLA Oct 02 '20 $370 Put\t1\t0\t0\t0\tTSLA Oct 02 '20 $370 Put
10/5/2020\tOption Expiration\tOPTN\tTSLA Oct 02 '20 $500 Call\t-1\t0\t0\t0\tTSLA Oct 02 '20 $500 Call
10/5/2020\tOption Expiration\tOPTN\tTSLA Oct 02 '20 $475 Call\t-1\t0\t0\t0\tTSLA Oct 02 '20 $475 Call
10/5/2020\tOption Expiration\tOPTN\tZM Oct 02 '20 $550 Call\t-1\t0\t0\t0\tZM Oct 02 '20 $550 Call
10/5/2020\tOption Expiration\tOPTN\tZM Oct 02 '20 $450 Put\t-2\t0\t0\t0\tZM Oct 02 '20 $450 Put
10/5/2020\tOption Expiration\tOPTN\tAMZN Oct 02 '20 $3350 Call\t-1\t0\t0\t0\tAMZN Oct 02 '20 $3350 Call
10/2/2020\tSold Short\tOPTN\tSQ Oct 09 '20 $150 Put\t-1\t45.48\t0.46\t0.5\tSQ Oct 09 '20 $150 Put
10/2/2020\tBought To Open\tOPTN\tZM Oct 09 '20 $530 Call\t2\t-901.03\t4.5\t1\tZM Oct 09 '20 $530 Call
10/2/2020\tBought To Open\tOPTN\tAMZN Oct 09 '20 $3500 Call\t1\t-220.51\t2.2\t0.5\tAMZN Oct 09 '20 $3500 Call
10/1/2020\tSold To Close\tOPTN\tTSLA Oct 02 '20 $560 Put\t-1\t11179.24\t111.8\t0.5\tTSLA Oct 02 '20 $560 Put
9/30/2020\tBought To Open\tOPTN\tZM Jan 21 '22 $500 Put\t1\t-15350.51\t153.5\t0.5\tZM Jan 21 '22 $500 Put
9/30/2020\tBought To Cover\tOPTN\tTSLA Jan 21 '22 $400 Put\t1\t-12765.51\t127.65\t0.5\tTSLA Jan 21 '22 $400 Put
9/30/2020\tSold To Close\tOPTN\tTSLA Oct 02 '20 $450 Put\t-1\t2548.43\t25.49\t0.5\tTSLA Oct 02 '20 $450 Put
9/30/2020\tBought To Cover\tOPTN\tTSLA Oct 02 '20 $580 Put\t1\t-15020.51\t150.2\t0.5\tTSLA Oct 02 '20 $580 Put
9/29/2020\tSold Short\tOPTN\tZM Jan 15 '21 $450 Call\t-1\t8239.3\t82.4\t0.5\tZM Jan 15 '21 $450 Call
9/29/2020\tSold To Close\tOPTN\tTSLA Oct 02 '20 $500 Put\t-1\t8099.31\t81\t0.5\tTSLA Oct 02 '20 $500 Put
9/29/2020\tBought To Cover\tOPTN\tNKLA Jan 21 '22 $10 Put\t1\t-450.51\t4.5\t0.5\tNKLA Jan 21 '22 $10 Put
9/29/2020\tJournal\tUNKNOWN\t \t0\t0.5\t0\t0\tTRANSFER BAL TO MARGIN
9/29/2020\tJournal\tUNKNOWN\t \t0\t-0.5\t0\t0\tTRANSFER BAL FROM CASH
9/28/2020\tSold Short\tOPTN\tTSLA Oct 02 '20 $580 Put\t-1\t15949.13\t159.5\t0.5\tTSLA Oct 02 '20 $580 Put
9/28/2020\tBought To Open\tOPTN\tTSLA Oct 02 '20 $540 Put\t1\t-12360.51\t123.6\t0.5\tTSLA Oct 02 '20 $540 Put
9/28/2020\tBought To Open\tOPTN\tZM Oct 02 '20 $550 Call\t1\t-380.51\t3.8\t0.5\tZM Oct 02 '20 $550 Call
9/28/2020\tSold To Close\tOPTN\tTSLA Oct 02 '20 $540 Put\t-1\t12399.21\t124\t0.5\tTSLA Oct 02 '20 $540 Put
9/28/2020\tBought To Open\tOPTN\tTSLA Oct 02 '20 $475 Call\t1\t-150.51\t1.5\t0.5\tTSLA Oct 02 '20 $475 Call
9/28/2020\tOption Expiration\tOPTN\tZM Sep 25 '20 $500 Call\t-2\t0\t0\t0\tZM Sep 25 '20 $500 Call
9/28/2020\tInterest\tBOND\t00099A109\t0\t0.5\t0\t0\tINTEREST ON CASH BALANCE      AT  0.009% 08/26 THRU 09/25   
9/25/2020\tBought To Open\tOPTN\tZM Oct 02 '20 $450 Put\t2\t-921.03\t4.6\t1\tZM Oct 02 '20 $450 Put
9/25/2020\tBought To Open\tOPTN\tTSLA Oct 02 '20 $560 Put\t1\t-15330.51\t153.3\t0.5\tTSLA Oct 02 '20 $560 Put
9/25/2020\tSold Short\tOPTN\tTSLA Oct 02 '20 $370 Put\t-1\t549.47\t5.5\t0.5\tTSLA Oct 02 '20 $370 Put
9/25/2020\tBought To Open\tOPTN\tAMZN Oct 02 '20 $3350 Call\t1\t-630.51\t6.3\t0.5\tAMZN Oct 02 '20 $3350 Call
9/25/2020\tSold To Close\tOPTN\tTSLA Sep 25 '20 $500 Put\t-1\t9484.28\t94.85\t0.5\tTSLA Sep 25 '20 $500 Put
9/25/2020\tSold To Close\tOPTN\tAMZN Sep 25 '20 $3200 Call\t-1\t5.48\t0.06\t0.5\tAMZN Sep 25 '20 $3200 Call
9/25/2020\tBought To Open\tOPTN\tTSLA Oct 02 '20 $450 Put\t1\t-4890.51\t48.9\t0.5\tTSLA Oct 02 '20 $450 Put
9/25/2020\tBought To Open\tOPTN\tTSLA Oct 02 '20 $500 Put\t1\t-9610.51\t96.1\t0.5\tTSLA Oct 02 '20 $500 Put
9/25/2020\tBought To Open\tOPTN\tTSLA Sep 25 '20 $420 Call\t2\t-101.03\t0.5\t1\tTSLA Sep 25 '20 $420 Call
9/25/2020\tSold To Close\tOPTN\tTSLA Sep 25 '20 $550 Put\t-1\t14669.16\t146.7\t0.5\tTSLA Sep 25 '20 $550 Put
9/25/2020\tSold To Close\tOPTN\tTSLA Sep 25 '20 $450 Put\t-1\t4639.38\t46.4\t0.5\tTSLA Sep 25 '20 $450 Put
9/25/2020\tBought To Cover\tOPTN\tTSLA Sep 25 '20 $370 Put\t1\t-2.01\t0.02\t0\tTSLA Sep 25 '20 $370 Put
9/25/2020\tSold To Close\tOPTN\tTSLA Sep 25 '20 $420 Call\t-2\t8.96\t0.05\t1\tTSLA Sep 25 '20 $420 Call
9/24/2020\tBought To Open\tOPTN\tTSLA Oct 02 '20 $500 Call\t1\t-110.51\t1.1\t0.5\tTSLA Oct 02 '20 $500 Call
9/24/2020\tSold Short\tOPTN\tTSLA Sep 25 '20 $370 Put\t-1\t291.48\t2.92\t0.5\tTSLA Sep 25 '20 $370 Put
9/24/2020\tBought To Open\tOPTN\tZM Sep 25 '20 $500 Call\t2\t-141.03\t0.7\t1\tZM Sep 25 '20 $500 Call
9/24/2020\tSold To Close\tOPTN\tZM Sep 25 '20 $470 Put\t-1\t1149.46\t11.5\t0.5\tZM Sep 25 '20 $470 Put
9/24/2020\tBought To Open\tOPTN\tAMZN Sep 25 '20 $3200 Call\t1\t-145.51\t1.45\t0.5\tAMZN Sep 25 '20 $3200 Call
9/23/2020\tSold Short\tOPTN\tTSLA Jan 21 '22 $400 Put\t-1\t14499.16\t145\t0.5\tTSLA Jan 21 '22 $400 Put
9/23/2020\tSold To Close\tOPTN\tTSLA Sep 25 '20 $350 Put\t-1\t349.48\t3.5\t0.5\tTSLA Sep 25 '20 $350 Put
9/23/2020\tSold To Close\tOPTN\tAMZN Sep 25 '20 $2800 Put\t-1\t424.48\t4.25\t0.5\tAMZN Sep 25 '20 $2800 Put
9/23/2020\tSold To Close\tOPTN\tTSLA Sep 25 '20 $370 Put\t-1\t834.47\t8.35\t0.5\tTSLA Sep 25 '20 $370 Put
9/23/2020\tSold To Close\tOPTN\tTSLA Sep 25 '20 $550 Call\t-1\t5.48\t0.06\t0.5\tTSLA Sep 25 '20 $550 Call
9/23/2020\tSold To Close\tOPTN\tTSLA Sep 25 '20 $550 Call\t-3\t16.44\t0.06\t1.5\tTSLA Sep 25 '20 $550 Call
9/23/2020\tBought To Open\tOPTN\tAMZN Sep 25 '20 $2800 Put\t1\t-455.51\t4.55\t0.5\tAMZN Sep 25 '20 $2800 Put
9/22/2020\tBought To Open\tOPTN\tTSLA Sep 25 '20 $450 Put\t1\t-4095.51\t40.95\t0.5\tTSLA Sep 25 '20 $450 Put
9/22/2020\tBought To Open\tOPTN\tTSLA Sep 25 '20 $370 Put\t1\t-520.51\t5.2\t0.5\tTSLA Sep 25 '20 $370 Put
9/22/2020\tBought To Open\tOPTN\tTSLA Sep 25 '20 $550 Call\t4\t-922.06\t2.3\t2\tTSLA Sep 25 '20 $550 Call
9/22/2020\tBought To Open\tOPTN\tTSLA Sep 25 '20 $350 Put\t1\t-220.51\t2.2\t0.5\tTSLA Sep 25 '20 $350 Put
9/22/2020\tSold Short\tOPTN\tZM Jan 15 '21 $500 Call\t-1\t7959.31\t79.6\t0.5\tZM Jan 15 '21 $500 Call
9/22/2020\tSold To Close\tOPTN\tZM Jan 15 '21 $500 Call\t-1\t7939.31\t79.4\t0.5\tZM Jan 15 '21 $500 Call
9/21/2020\tBought To Open\tOPTN\tZM Jan 15 '21 $500 Call\t1\t-6350.51\t63.5\t0.5\tZM Jan 15 '21 $500 Call
9/21/2020\tBought To Open\tOPTN\tZM Sep 25 '20 $470 Put\t1\t-1600.51\t16\t0.5\tZM Sep 25 '20 $470 Put
9/21/2020\tSold To Close\tOPTN\tZM Sep 25 '20 $300 Call\t-1\t16369.12\t163.7\t0.5\tZM Sep 25 '20 $300 Call
9/21/2020\tBought To Open\tOPTN\tTSLA Sep 25 '20 $550 Put\t1\t-11265.51\t112.65\t0.5\tTSLA Sep 25 '20 $550 Put
9/21/2020\tBought To Open\tOPTN\tTSLA Sep 25 '20 $500 Put\t1\t-7125.51\t71.25\t0.5\tTSLA Sep 25 '20 $500 Put
9/21/2020\tOption Expiration\tOPTN\tZM Sep 18 '20 $450 Call\t-1\t0\t0\t0\tZM Sep 18 '20 $450 Call
9/21/2020\tOption Expiration\tOPTN\tTSLA Sep 18 '20 $450 Call\t-1\t0\t0\t0\tTSLA Sep 18 '20 $450 Call
9/21/2020\tOption Expiration\tOPTN\tZM Sep 18 '20 $350 Put\t-2\t0\t0\t0\tZM Sep 18 '20 $350 Put
9/18/2020\tBought To Open\tOPTN\tZM Sep 25 '20 $300 Call\t1\t-14010.51\t140.1\t0.5\tZM Sep 25 '20 $300 Call
9/18/2020\tSold To Close\tOPTN\tZM Sep 18 '20 $300 Call\t-1\t13799.18\t138\t0.5\tZM Sep 18 '20 $300 Call
9/17/2020\tSold To Close\tOPTN\tTSLA Sep 18 '20 $500 Put\t-1\t7499.32\t75\t0.5\tTSLA Sep 18 '20 $500 Put
9/16/2020\tSold Short\tOPTN\tNKLA Jan 21 '22 $10 Put\t-1\t389.48\t3.9\t0.5\tNKLA Jan 21 '22 $10 Put
9/15/2020\tBought To Open\tOPTN\tZM Sep 18 '20 $450 Call\t1\t-60.51\t0.6\t0.5\tZM Sep 18 '20 $450 Call
9/14/2020\tBought To Open\tOPTN\tZM Sep 18 '20 $350 Put\t2\t-511.03\t2.55\t1\tZM Sep 18 '20 $350 Put
9/14/2020\tBought To Open\tOPTN\tTSLA Sep 18 '20 $450 Call\t1\t-240.51\t2.4\t0.5\tTSLA Sep 18 '20 $450 Call
9/14/2020\tOption Expiration\tOPTN\tTSLA Sep 11 '20 $500 Call\t-1\t0\t0\t0\tTSLA Sep 11 '20 $500 Call
9/14/2020\tOption Expiration\tOPTN\tZM Sep 11 '20 $310 Put\t-1\t0\t0\t0\tZM Sep 11 '20 $310 Put
9/14/2020\tOption Expiration\tOPTN\tZM Sep 11 '20 $300 Put\t-1\t0\t0\t0\tZM Sep 11 '20 $300 Put
9/11/2020\tBought To Open\tOPTN\tZM Sep 18 '20 $300 Call\t1\t-8200.51\t82\t0.5\tZM Sep 18 '20 $300 Call
9/11/2020\tBought To Open\tOPTN\tTSLA Sep 18 '20 $500 Put\t1\t-12955.51\t129.55\t0.5\tTSLA Sep 18 '20 $500 Put
9/11/2020\tSold To Close\tOPTN\tZM Sep 11 '20 $300 Call\t-1\t8269.3\t82.7\t0.5\tZM Sep 11 '20 $300 Call
9/11/2020\tSold To Close\tOPTN\tTSLA Sep 11 '20 $500 Put\t-1\t12749.2\t127.5\t0.5\tTSLA Sep 11 '20 $500 Put
9/9/2020\tBought To Open\tOPTN\tZM Sep 11 '20 $300 Put\t1\t-60.51\t0.6\t0.5\tZM Sep 11 '20 $300 Put
9/8/2020\tBought To Open\tOPTN\tZM Sep 11 '20 $310 Put\t1\t-180.51\t1.8\t0.5\tZM Sep 11 '20 $310 Put
9/8/2020\tBought To Open\tOPTN\tZM Sep 11 '20 $300 Call\t1\t-5120.51\t51.2\t0.5\tZM Sep 11 '20 $300 Call
9/8/2020\tOption Expiration\tOPTN\tTSLA Sep 04 '20 $600 Call\t-5\t0\t0\t0\tTSLA Sep 04 '20 $600 Call
9/8/2020\tOption Expiration\tOPTN\tTSLA Sep 04 '20 $400 Put\t-1\t0\t0\t0\tTSLA Sep 04 '20 $400 Put
9/8/2020\tOption Expiration\tOPTN\tZM Sep 04 '20 $500 Call\t-1\t0\t0\t0\tZM Sep 04 '20 $500 Call
9/8/2020\tOption Expiration\tOPTN\tAAPL Sep 04 '20 $143.75 Call\t-3\t0\t0\t0\tAAPL Sep 04 '20 $143.75 Call
9/8/2020\tOption Expiration\tOPTN\tZM Sep 04 '20 $400 Call\t-1\t0\t0\t0\tZM Sep 04 '20 $400 Call
9/8/2020\tOption Expiration\tOPTN\tZM Sep 04 '20 $250 Put\t-1\t0\t0\t0\tZM Sep 04 '20 $250 Put
9/4/2020\tBought To Open\tOPTN\tTSLA Sep 11 '20 $500 Call\t1\t-600.51\t6\t0.5\tTSLA Sep 11 '20 $500 Call
9/4/2020\tBought To Open\tOPTN\tTSLA Sep 11 '20 $500 Put\t1\t-8350.51\t83.5\t0.5\tTSLA Sep 11 '20 $500 Put
9/4/2020\tSold To Close\tOPTN\tAAPL Sep 04 '20 $125 Put\t-4\t1417.89\t3.55\t2\tAAPL Sep 04 '20 $125 Put
9/3/2020\tSold To Close\tOPTN\tZM Sep 04 '20 $480 Put\t-1\t9659.12\t96.6\t0.65\tZM Sep 04 '20 $480 Put
9/3/2020\tBought To Open\tOPTN\tTSLA Sep 04 '20 $400 Put\t1\t-810.66\t8.1\t0.65\tTSLA Sep 04 '20 $400 Put
9/3/2020\tSold To Close\tOPTN\tTSLA Sep 04 '20 $500 Put\t-2\t17798.27\t89\t1.3\tTSLA Sep 04 '20 $500 Put
9/2/2020\tSold To Close\tOPTN\tTSLA Sep 04 '20 $430 Put\t-5\t4521.56\t9.05\t3.25\tTSLA Sep 04 '20 $430 Put
9/2/2020\tSold To Close\tOPTN\tAAPL Sep 04 '20 $143.75 Call\t-1\t13.33\t0.14\t0.65\tAAPL Sep 04 '20 $143.75 Call
9/2/2020\tBought To Open\tOPTN\tZM Sep 04 '20 $500 Call\t1\t-340.66\t3.4\t0.65\tZM Sep 04 '20 $500 Call
9/1/2020\tBought To Open\tOPTN\tZM Sep 04 '20 $480 Put\t1\t-3400.66\t34\t0.65\tZM Sep 04 '20 $480 Put
8/31/2020\tBought To Open\tOPTN\tZM Sep 04 '20 $250 Put\t1\t-100.66\t1\t0.65\tZM Sep 04 '20 $250 Put
8/31/2020\tBought To Open\tOPTN\tAAPL Sep 04 '20 $143.75 Call\t4\t-102.66\t0.25\t2.6\tAAPL Sep 04 '20 $143.75 Call
8/31/2020\tBought To Open\tOPTN\tTSLA Sep 04 '20 $500 Put\t2\t-5401.33\t27\t1.3\tTSLA Sep 04 '20 $500 Put
8/31/2020\tBought To Open\tOPTN\tZM Sep 04 '20 $400 Call\t1\t-130.66\t1.3\t0.65\tZM Sep 04 '20 $400 Call
8/31/2020\tBought To Open\tOPTN\tAAPL Sep 04 '20 $125 Put\t4\t-734.66\t1.83\t2.6\tAAPL Sep 04 '20 $125 Put
8/31/2020\tBought To Open\tOPTN\tTSLA Sep 04 '20 $430 Put\t5\t-5603.32\t11.2\t3.25\tTSLA Sep 04 '20 $430 Put
8/31/2020\tOption Expiration\tOPTN\t#8BWPDS4\t-1\t0\t0\t0\tCALL TSLA   08/28/20  2500    TESLA INC                     
8/31/2020\tOption Expiration\tOPTN\t#8BWPBV2\t-1\t0\t0\t0\tPUT  TSLA   08/28/20  2000    TESLA INC                     
8/31/2020\tDividend\tOPTN\tTSLA Sep 04 '20 $600 Call\t5\t0\t0\t0\tTSLA Sep 04 '20 $600 Call
8/31/2020\tDividend\tOPTN\t#8GPFVB6\t-1\t0\t0\t0\tCALL TSLA   09/04/20  3000    TESLA INC                     
8/28/2020\tBought To Open\tOPTN\tTSLA Sep 04 '20 $3000 Call\t1\t-1100.66\t11\t0.65\tTSLA Sep 04 '20 $3000 Call
8/27/2020\tJournal\tUNKNOWN\t \t0\t0.42\t0\t0\tTRANSFER BAL TO MARGIN
8/27/2020\tJournal\tUNKNOWN\t \t0\t-0.42\t0\t0\tTRANSFER BAL FROM CASH
8/26/2020\tInterest\tBOND\t00099A109\t0\t0.42\t0\t0\tINTEREST ON CASH BALANCE      AT  0.009% 07/26 THRU 08/25   
8/21/2020\tBought To Open\tOPTN\tTSLA Aug 28 '20 $2500 Call\t1\t-1040.66\t10.4\t0.65\tTSLA Aug 28 '20 $2500 Call
8/21/2020\tBought To Open\tOPTN\tTSLA Aug 28 '20 $2000 Put\t1\t-6700.66\t67\t0.65\tTSLA Aug 28 '20 $2000 Put
8/21/2020\tSold To Close\tOPTN\tTSLA Aug 21 '20 $1950 Put\t-1\t47.33\t0.48\t0.65\tTSLA Aug 21 '20 $1950 Put
8/20/2020\tSold To Close\tOPTN\tTSLA Aug 21 '20 $1350 Put\t-1\t17.33\t0.18\t0.65\tTSLA Aug 21 '20 $1350 Put
8/20/2020\tBought To Open\tOPTN\tTSLA Aug 21 '20 $1950 Put\t1\t-1620.66\t16.2\t0.65\tTSLA Aug 21 '20 $1950 Put
8/17/2020\tSold To Close\tOPTN\tTSLA Aug 21 '20 $1550 Call\t-1\t24163.8\t241.65\t0.65\tTSLA Aug 21 '20 $1550 Call
8/17/2020\tOption Expiration\tOPTN\tTSLA Aug 14 '20 $1300 Put\t-1\t0\t0\t0\tTSLA Aug 14 '20 $1300 Put
8/14/2020\tBought To Open\tOPTN\tTSLA Aug 21 '20 $1350 Put\t1\t-600.66\t6\t0.65\tTSLA Aug 21 '20 $1350 Put
8/14/2020\tSold To Close\tOPTN\tTSLA Aug 14 '20 $1550 Call\t-1\t9149.13\t91.5\t0.65\tTSLA Aug 14 '20 $1550 Call
8/14/2020\tBought To Open\tOPTN\tTSLA Aug 21 '20 $1550 Call\t1\t-11745.66\t117.45\t0.65\tTSLA Aug 21 '20 $1550 Call
8/13/2020\tSold To Close\tOPTN\tTSLA Aug 14 '20 $1325 Put\t-1\t39.33\t0.4\t0.65\tTSLA Aug 14 '20 $1325 Put
8/10/2020\tBought To Open\tOPTN\tTSLA Aug 14 '20 $1325 Put\t1\t-1070.66\t10.7\t0.65\tTSLA Aug 14 '20 $1325 Put
8/10/2020\tOption Expiration\tOPTN\tTSLA Aug 07 '20 $1400 Put\t-1\t0\t0\t0\tTSLA Aug 07 '20 $1400 Put
8/10/2020\tOption Expiration\tOPTN\tTSLA Aug 07 '20 $1575 Call\t-1\t0\t0\t0\tTSLA Aug 07 '20 $1575 Call
8/7/2020\tBought To Open\tOPTN\tTSLA Aug 14 '20 $1300 Put\t1\t-550.66\t5.5\t0.65\tTSLA Aug 14 '20 $1300 Put
8/7/2020\tBought To Open\tOPTN\tTSLA Aug 14 '20 $1550 Call\t1\t-1250.66\t12.5\t0.65\tTSLA Aug 14 '20 $1550 Call
8/3/2020\tBought To Open\tOPTN\tTSLA Aug 07 '20 $1400 Put\t1\t-1305.66\t13.05\t0.65\tTSLA Aug 07 '20 $1400 Put
8/3/2020\tBought To Open\tOPTN\tTSLA Aug 07 '20 $1575 Call\t1\t-1235.66\t12.35\t0.65\tTSLA Aug 07 '20 $1575 Call
7/28/2020\tJournal\tUNKNOWN\t \t0\t0.4\t0\t0\tTRANSFER BAL TO MARGIN
7/28/2020\tJournal\tUNKNOWN\t \t0\t-0.4\t0\t0\tTRANSFER BAL FROM CASH
7/27/2020\tInterest\tBOND\t00099A109\t0\t0.4\t0\t0\tINTEREST ON CASH BALANCE      AT  0.009% 06/26 THRU 07/25   
7/16/2020\tJournal\tUNKNOWN\t \t0\t200\t0\t0\tTRANSFER BAL TO MARGIN
7/16/2020\tJournal\tUNKNOWN\t \t0\t-200\t0\t0\tTRANSFER BAL FROM CASH
7/15/2020\tCredit\tUNKNOWN\t \t0\t200\t0\t0\tCustomer Promotion            REFID:P7-CSR-1594812633604;
6/29/2020\tJournal\tUNKNOWN\t \t0\t0.35\t0\t0\tTRANSFER BAL TO MARGIN
6/29/2020\tOption Expiration\tOPTN\tMSFT Jun 26 '20 $190 Put\t-1\t0\t0\t0\tMSFT Jun 26 '20 $190 Put
6/29/2020\tJournal\tUNKNOWN\t \t0\t-0.35\t0\t0\tTRANSFER BAL FROM CASH
6/26/2020\tInterest\tBOND\t00099A109\t0\t0.35\t0\t0\tINTEREST ON CASH BALANCE      AT  0.009% 05/26 THRU 06/25   
6/22/2020\tBought To Open\tOPTN\tMSFT Jun 26 '20 $190 Put\t1\t-37.67\t0.37\t0.65\tMSFT Jun 26 '20 $190 Put
6/12/2020\tSold To Close\tOPTN\tZM Jun 12 '20 $212.50 Call\t-10\t6093.18\t6.1\t6.5\tZM Jun 12 '20 $212.50 Call
6/9/2020\tBought To Open\tOPTN\tZM Jun 12 '20 $212.50 Call\t10\t-2656.66\t2.65\t6.5\tZM Jun 12 '20 $212.50 Call
6/8/2020\tJournal\tUNKNOWN\t \t0\t15008.06\t0\t0\tTRANSFER BAL TO MARGIN
6/8/2020\tOption Expiration\tOPTN\tZM Jun 05 '20 $220 Call\t-10\t0\t0\t0\tZM Jun 05 '20 $220 Call
6/8/2020\tOption Expiration\tOPTN\tZM Jun 05 '20 $210 Call\t-10\t0\t0\t0\tZM Jun 05 '20 $210 Call
6/8/2020\tOption Expiration\tOPTN\tZM Jun 05 '20 $197.50 Put\t-10\t0\t0\t0\tZM Jun 05 '20 $197.50 Put
6/8/2020\tJournal\tUNKNOWN\t \t0\t-15008.06\t0\t0\tTRANSFER BAL FROM CASH
6/5/2020\tBought To Open\tOPTN\tZM Jun 05 '20 $210 Call\t10\t-306.66\t0.3\t6.5\tZM Jun 05 '20 $210 Call
6/5/2020\tBought To Open\tOPTN\tZM Jun 05 '20 $197.50 Put\t10\t-406.66\t0.4\t6.5\tZM Jun 05 '20 $197.50 Put
6/5/2020\tBought To Cover\tOPTN\tZM Jun 05 '20 $210 Put\t1\t-1000.67\t10\t0.65\tZM Jun 05 '20 $210 Put
6/5/2020\tTransfer\tUNKNOWN\t \t0\t15000\t0\t0\tACH DEPOSIT                   REFID:46968338482;
6/5/2020\tCredit\tUNKNOWN\t \t0\t0.09\t0\t0\tCustomer Service              Credit                        
6/5/2020\tCredit\tUNKNOWN\t \t0\t7.97\t0\t0\tCustomer Service              Credit                        
6/4/2020\tBought To Cover\tOPTN\tZM Jun 05 '20 $210 Call\t1\t-1200.67\t12\t0.65\tZM Jun 05 '20 $210 Call
6/4/2020\tBought To Open\tOPTN\tZM Jun 05 '20 $220 Call\t10\t-606.66\t0.6\t6.5\tZM Jun 05 '20 $220 Call
6/2/2020\tSold Short\tOPTN\tZM Jun 05 '20 $210 Put\t-1\t1429.29\t14.3\t0.65\tZM Jun 05 '20 $210 Put
6/2/2020\tSold Short\tOPTN\tZM Jun 05 '20 $210 Call\t-1\t1219.3\t12.2\t0.65\tZM Jun 05 '20 $210 Call
5/27/2020\tJournal\tUNKNOWN\t \t0\t0.09\t0\t0\tTRANSFER BAL TO MARGIN
5/27/2020\tJournal\tUNKNOWN\t \t0\t-0.09\t0\t0\tTRANSFER BAL FROM CASH
5/26/2020\tInterest\tBOND\t00099A109\t0\t0.09\t0\t0\tINTEREST ON CASH BALANCE      AT  0.009% 05/15 THRU 05/25   
5/18/2020\tJournal\tUNKNOWN\t \t0\t30000\t0\t0\tTRANSFER BAL TO MARGIN
5/18/2020\tJournal\tUNKNOWN\t \t0\t-30000\t0\t0\tTRANSFER BAL FROM CASH
5/15/2020\tTransfer\tUNKNOWN\t \t0\t15000\t0\t0\tACH DEPOSIT                   REFID:45415127482;
5/15/2020\tTransfer\tUNKNOWN\t \t0\t15000\t0\t0\tACH DEPOSIT                   REFID:45415783482;
`

describe('Matcher', () => {
  it('sums gain', () => {
    const currencies = Object.values(data).map((r) => currency(r.gain))
    expect(sum(currencies).value).toEqual(-4445.01)
  })

  it('parses and computes gain', () => {
    const parsed = parseEtrade(tsvData)
    const account: TradingAccount = {
      accountID: 'default',
      transactions: parsed,
    }
    const match = matchAcrossAccounts([account])

    expect(match.grandTotal.value).toEqual(-4445.01)
  })
})
