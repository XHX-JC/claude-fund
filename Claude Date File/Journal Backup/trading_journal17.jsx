import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v2";

const INITIAL_STATE = {
  "lastUpdated": "2026-04-09",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 98600,
    "cash": 34784,
    "availableFunds": 80900,
    "dailyPnL": 1312,
    "unrealizedPnL": 1636,
    "realizedPnL": -1307,
    "broker": "IBKR Pro",
    "baseCurrency": "USD",
    "location": "UAE",
    "ibkrEuropeanAccess": "APPROVED — March 26 2026",
    "cashUSD": 31205,
    "cashEUR": 370,
    "cashGBP": -3488,
    "cashBase": 28017,
    "lastUpdated": "2026-04-09 SESSION 13 — FINAL COMPLETE (JOURNAL v17)",
    "note": "SESSION 13 FINAL — JOURNAL v17. NEXT SESSION: EODHD + Google Drive + Local Filesystem active. Islamabad talks outcome critical. SHLD stop review."
  },
  "thesis": {
    "title": "TWO-WEEK CEASEFIRE — HORMUZ PARTIALLY REOPENING — TALKS ISLAMABAD APR 10",
    "oilWTI": 97,
    "oilBrent": 98,
    "goldPrice": 4450,
    "hormuzStatus": "CEASEFIRE DAY 2. Fragile. Only 2 vessels transited post-announcement. 426 tankers still trapped. SI-25 not triggered.",
    "ceasefireFilter": "CEASEFIRE ACTIVE BUT FRAGILE. SI-25 exit trigger NOT activated. Requires formal Hormuz reopening + oil -10% from peak. NOT YET MET."
  },
  "positions": [
    {"ticker": "CCJ", "name": "Cameco Corp", "shares": 49, "avgPrice": 104.021, "costBasis": 5097, "stop": 108.37, "status": "HOLD — STOP LIVE"},
    {"ticker": "AMZN", "name": "Amazon.com Inc", "shares": 30, "avgPrice": 201.204, "costBasis": 6036, "stop": 212.13, "target": 300, "status": "HOLD"},
    {"ticker": "VST", "name": "Vistra Corp", "shares": 53, "avgPrice": 150.569, "costBasis": 7980, "stop": 145.02, "status": "HOLD"},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 150, "avgPrice": 1182.9, "costBasis": 1774, "target": 1395, "status": "HOLD — NO STOP BEFORE APR 23 EX-DIV", "cur": "GBP"},
    {"ticker": "ITM", "name": "ITM Power PLC", "shares": 3100, "avgPrice": 65.1, "costBasis": 2018, "stop": 60, "target": 98, "status": "STOP LIVE", "cur": "GBP"},
    {"ticker": "SHLD", "name": "Global X Defence ETF", "shares": 69, "avgPrice": 72.025, "costBasis": 4970, "stop": 73.89, "status": "HOLD — STOP LIMIT CRITICALLY TIGHT 0.4%"},
    {"ticker": "AMPX", "name": "Amprius Technologies", "shares": 168, "avgPrice": 18.106, "costBasis": 3042, "stop": 13, "target": 32, "status": "STOP LIVE"},
    {"ticker": "AVAV", "name": "AeroVironment Inc", "shares": 25, "avgPrice": 195.09, "costBasis": 4877, "stop": 165, "target": 311, "status": "HOLD — STOP LIVE"},
    {"ticker": "PDYN", "name": "Palladyne AI Corp", "shares": 500, "avgPrice": 6.595, "costBasis": 3298, "stop": 5.75, "status": "HOLD — STOP LIVE"},
    {"ticker": "CODA", "name": "Coda Octopus Group", "shares": 416, "avgPrice": 12.005, "costBasis": 4994, "stop": 10.49, "target": 22, "status": "STOP LIVE"},
    {"ticker": "ABVX", "name": "Abivax SA-ADR", "shares": 44, "avgPrice": 117.913, "costBasis": 5188, "stop": 100, "status": "HOLD — STOP LIVE $100 GTC"},
    {"ticker": "ISRG", "name": "Intuitive Surgical Inc", "shares": 22, "avgPrice": 459.2, "costBasis": 10103, "stop": 420, "target": 510, "status": "NEW — STOP $420 GTC"},
    {"ticker": "MSFT", "name": "Microsoft Corp", "shares": 25, "avgPrice": 372.73, "costBasis": 9318, "stop": 350, "target": 400, "status": "NEW — STOP $350 GTC"}
  ],
  "infrastructure": {
    "lastUpdated": "2026-04-10",
    "note": "SESSION 14 INFRASTRUCTURE. Local filesystem MCP active via claude_desktop_config.json. Path: C:\\Users\\jcadb\\Claude Date File. Files written: trading_journal17.jsx, FUND_SESSION_STATE.md, LESSONS_LEARNED.md. From session 14 onwards: read FUND_SESSION_STATE.md at session open, write at session close. No Chrome or Drive access required."
  }
};

export default function TradingJournal() {
  return <div style={{padding: 20, fontFamily: 'monospace', background: '#0a0c0f', color: '#c9d1d9', minHeight: '100vh'}}>
    <h2 style={{color: '#e8a020'}}>FUND JOURNAL v17 — SESSION 13 FINAL</h2>
    <p>Account: {INITIAL_STATE.fund.account} | NL: $98,600 | 13 positions</p>
    <p style={{color: '#ef4444'}}>Load trading_journal17.jsx in Claude project for full interactive journal.</p>
    <p>Local file confirmed written: C:\Users\jcadb\Claude Date File\trading_journal17.jsx</p>
  </div>;
}
