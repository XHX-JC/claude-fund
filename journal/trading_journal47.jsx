import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fund_journal_v3";

// ═══════════════════════════════════════════════════════════════════
// TIMEZONE REFERENCE — MANDATORY (E1 CORRECTED S30)
// NYSE: opens 17:30 UAE / closes 00:00 UAE
// LSE:  opens 11:00 UAE (BST Apr-Oct) / 12:00 UAE (GMT Nov-Mar) / closes 19:30 UAE
// ═══════════════════════════════════════════════════════════════════

const INITIAL_STATE = {
  "lastUpdated": "2026-04-28 SESSION 31 EVENING — ITM stopped 130.39p (Trade #24). WTI $98.97 SI-25 gap $1.41. CRML $835M acquisition. V earnings tonight.",
  "sessionNumber": "S31-EVE",
  "fund": {
    "account": "U24936508",
    "netLiquidity": 105100,
    "unrealizedPnL": 5778.94,
    "realizedPnL": -1696,
    "realizedPnLNote": "S31 Eve: ITM Trade #24 +$1,041 added. Journal gross ~-$1,696",
    "cashBase": 37734,
    "broker": "IBKR Pro",
    "note": "JOURNAL v47. Tue 28 Apr 2026 evening. 18 positions. ITM stopped out 130.39p. WTI $98.97 — SI-25 gap $1.41 CRITICAL. V earnings tonight."
  },
  "thesis": {
    "title": "DUAL BLOCKADE — WTI $98.97 — SI-25 GAP $1.41 — CRITICAL WATCH",
    "summary": "WTI surged to $98.97 intraday high $99.23. SI-25 trigger $100.38 — gap only $1.41. Pakistan hinting at new talks temporarily capping prices. Iran proposal structural impasse continues. Mine-clearing ops active. CRML European Lithium $835M acquisition confirmed — thesis expanding.",
    "oilWTI": 98.97,
    "oilWTIIntraHigh": 99.23,
    "SI25Trigger": 100.38,
    "SI25Gap": 1.41,
    "SI25Status": "⚠️ CRITICAL — GAP ONLY $1.41. NOT YET TRIGGERED. Condition requires permanent Hormuz reopening + WTI -10% from $111.54. Monitor pre-open Wed.",
    "hormuzStatus": "DUAL BLOCKADE. Mine-clearing ops active. Iran new proposal unresolved.",
    "keyDates": [
      {"date": "TONIGHT AMC (01:00 UAE Wed)", "event": "V Q2 earnings — EPS consensus $3.09. Stop $285. P24 DO NOT TOUCH.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 BMO", "event": "ABBV Q1 — $2.69 EPS consensus. Stop $192. 3.4% clearance. Accept gap risk.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "AMZN Q1 — AWS $36.8B consensus. Stop $234.39. ±3.28% implied move.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "MSFT Q3 — Azure $34.3B/28.5% consensus. Stop $400.43. ±6.77% implied — STOP IN RISK RANGE.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "MSTR Q1 — Review before Thu May 1 entry. 12sh market, stop $135, limit $420.", "priority": "CRITICAL"},
      {"date": "Wed Apr 29 AMC", "event": "GOOGL Q1 — EPS $2.83. GTC $315 active. ±5.81% implied.", "priority": "HIGH"},
      {"date": "Wed Apr 29 AMC", "event": "QCOM Q2 — EPS $2.58 consensus (below $2.85 prior). Stage 2 review post-print.", "priority": "HIGH"},
      {"date": "ONGOING", "event": "WTI $98.97 — SI-25 trigger $100.38 — gap $1.41. Monitor pre-open every session.", "priority": "CRITICAL"},
      {"date": "Thu Apr 30", "event": "NOG Q1 at WTI ~$99. War premium intact. Stop $24.49.", "priority": "CRITICAL"},
      {"date": "Thu May 1", "event": "MSTR entry — 12sh market post Q1 review. Stop $135. Limit $420. SI-37 $2,000.", "priority": "CRITICAL"},
      {"date": "May 5 BMO", "event": "LDOS Q1 — GTC $143 near miss (low $143.39 Apr 27).", "priority": "HIGH"},
      {"date": "May 5", "event": "LDO.MI Q1 — stop €50, 3.8% clearance TIGHT.", "priority": "HIGH"},
      {"date": "May 6", "event": "R3NK Q1 — 200M EUR deferred orders key.", "priority": "HIGH"},
      {"date": "May 7", "event": "AMPX Q1 — stop $18.92.", "priority": "HIGH"},
      {"date": "May 11", "event": "CEG Q1 — catalyst gate. Stop $278.", "priority": "HIGH"},
      {"date": "May 20", "event": "SNPS Q2 — catalyst gate. Stop $440.", "priority": "HIGH"},
      {"date": "May 28", "event": "MRVL Q1 — Google ASIC. Stop $135.", "priority": "HIGH"},
      {"date": "ONGOING", "event": "CODA P11 — 48hr hold. Reassess Wed. Target 250-300sh below $11.51. Stop <$10.50.", "priority": "HIGH"},
      {"date": "POST-WED", "event": "QCOM Stage 2 — post Q2 earnings. OpenAI phone 2028. SI-48 tests.", "priority": "MEDIUM"}
    ]
  },
  "positions": [
    {"ticker": "AMZN", "shares": 30, "avgPrice": 201.204, "last": 260.99, "unrealPnL": 1789, "unrealPct": 29.6, "stop": 234.39, "stopType": "Stop Limit", "stopLimit": 224, "status": "HOLD — EARNINGS TMW AMC — DO NOT TOUCH", "note": "AWS $36.8B consensus. ±3.28% implied. Stop locks +$33/sh."},
    {"ticker": "MSFT", "shares": 25, "avgPrice": 372.77, "last": 423.63, "unrealPnL": 1273, "unrealPct": 13.7, "stop": 400.43, "status": "HOLD — EARNINGS TMW AMC ±6.77% IMPLIED — STOP IN RISK RANGE — DO NOT WIDEN", "note": "Azure $34.3B/28.5% growth consensus. Stop 5.5% below current. 6.77% implied move means stop is within downside risk envelope. Accept within SI-35."},
    {"ticker": "CCJ", "shares": 49, "avgPrice": 104.021, "last": 123.11, "unrealPnL": 906, "unrealPct": 17.8, "stop": 116.96, "status": "HOLD — STOP $116.96 GTC", "note": "Nuclear thesis intact."},
    {"ticker": "VST", "shares": 53, "avgPrice": 150.569, "last": 165.13, "unrealPnL": 791, "unrealPct": 9.9, "stop": 156.58, "status": "HOLD — STOP $156.58 GTC", "note": "Raised S31. Locks $6/sh."},
    {"ticker": "AMPX", "shares": 168, "avgPrice": 18.106, "last": 21.60, "unrealPnL": 511, "unrealPct": 16.8, "stop": 18.92, "status": "HOLD — STOP $18.92 — EARNINGS MAY 7", "note": "Above cost. Limit $32 standalone."},
    {"ticker": "CRML", "shares": 110, "avgPrice": 9.08, "last": 13.73, "unrealPnL": 512, "unrealPct": 51.2, "stop": 10.51, "status": "HOLD — STOP $10.51 — ACQUISITION NEWS — $835M EUROPEAN LITHIUM", "note": "Major corporate: acquiring European Lithium $835M (Wolfsberg lithium + Tanbreez). Dual asset critical minerals. Thesis confirmed. -5% today = profit-taking post-announcement. Hold."},
    {"ticker": "NOG", "shares": 80, "avgPrice": 24.383, "last": 26.87, "unrealPnL": 199, "unrealPct": 10.2, "stop": 24.49, "status": "HOLD — STOP $24.49 — ⚠️ WTI $98.97 — SI-25 GAP $1.41 — Q1 THU", "note": "War premium thesis at maximum tension. Q1 earnings Thu at ~$99 WTI = very supportive print expected. SI-25 gap $1.41 — monitor pre-open daily."},
    {"ticker": "CEG", "shares": 14, "avgPrice": 308.072, "last": 314.00, "unrealPnL": 69, "unrealPct": 1.6, "stop": 278, "status": "HOLD — STOP $278 — CATALYST MAY 11", "note": "Nuclear + AI power demand."},
    {"ticker": "R3NK", "shares": 25, "avgPrice": 52.27, "last": 54.39, "unrealPnL": 54, "unrealPct": 4.1, "stop": 48, "stopType": "Stop Limit", "stopLimit": 47, "cur": "EUR", "status": "HOLD — STOP LIMIT 48/47 — EARNINGS MAY 6", "note": "200M EUR deferred orders key."},
    {"ticker": "V", "shares": 8, "avgPrice": 307.125, "last": 309.65, "unrealPnL": 17, "unrealPct": 0.7, "stop": 285, "status": "HOLD — EARNINGS TONIGHT AMC — P24 — DO NOT TOUCH", "note": "EPS consensus $3.09. WTI $99 = positive for nominal payment volumes."},
    {"ticker": "MRVL", "shares": 10, "avgPrice": 152.10, "last": 153.46, "unrealPnL": 15, "unrealPct": 1.0, "stop": 135, "status": "HOLD — STOP $135 — POET RESIDUAL DRAG — THESIS INTACT — MAY 28", "note": "-3% today on residual POET/Celestial AI sentiment. Google ASIC thesis unchanged. Stop $135 gives 12% room."},
    {"ticker": "SNPS", "shares": 8, "avgPrice": 495.125, "last": 498.54, "unrealPnL": -1, "unrealPct": -0.1, "stop": 440, "status": "HOLD — STOP $440 — CATALYST MAY 20", "note": "EDA duopoly. Slightly underwater on mark-to-market, well above stop."},
    {"ticker": "CGCT", "shares": 291, "avgPrice": 10.295, "last": 10.31, "unrealPnL": 4, "unrealPct": 0.1, "stop": null, "status": "HOLD — NO STOP — SPAC", "note": "Trust floor ~$10.27."},
    {"ticker": "RR", "name": "Rolls-Royce Holdings", "shares": 100, "avgPrice": 1128.6, "last": 1125.60, "unrealPnL": -3, "unrealPct": -0.3, "stop": 1050, "cur": "GBP", "status": "HOLD — STOP 1050p — H1 JUL 30", "note": "Slight unrealised loss, thesis intact."},
    {"ticker": "IES", "name": "Invinity Energy Systems", "shares": 3000, "avgPrice": 17.49, "last": 17.50, "unrealPnL": 0, "stop": null, "stopType": "MANUAL ALERT 12.5p", "cur": "GBP", "status": "HOLD — E15 MANUAL ALERT 12.5p", "note": "LDES decision pending."},
    {"ticker": "PDYN", "shares": 250, "avgPrice": 6.595, "last": 6.25, "unrealPnL": -86, "unrealPct": -5.2, "stop": 5.75, "status": "HOLD — STOP $5.75 — EARNINGS MAY 13", "note": "Underwater. Stop within SI-35."},
    {"ticker": "ABBV", "shares": 20, "avgPrice": 205.22, "last": 198.87, "unrealPnL": -123, "unrealPct": -3.0, "stop": 192, "status": "HOLD — EARNINGS TMW BMO — STOP $192 — 3.4% CLEARANCE — DO NOT TOUCH", "note": "Wed before open. $2.69 EPS consensus. Stop 3.4% below current $198.87. Clearance improved from 2.7% on day recovery."},
    {"ticker": "LDO", "name": "Leonardo SpA", "shares": 35, "avgPrice": 56.086, "last": 52.24, "unrealPnL": -135, "unrealPct": -6.9, "stop": 50, "cur": "EUR", "status": "HOLD — STOP €50 — TIGHT 3.8% — Q1 MAY 5", "note": "Do NOT widen stop."}
  ],
  "tradeTracker": {
    "closedTrades": [
      {"id":1,"ticker":"CCL","dateIn":"2026-03-24","dateOut":"2026-03-26","qty":240,"entry":24.83,"exit":25.35,"ccy":"USD","pnlUSD":122.35,"note":"S07. +$122.35."},
      {"id":2,"ticker":"ONDS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":250,"entry":10.90,"exit":8.505,"ccy":"USD","pnlUSD":-601.30,"note":"Stopped. -$601.30."},
      {"id":3,"ticker":"KTOS","dateIn":"2026-03-24","dateOut":"2026-03-30","qty":100,"entry":81.00,"exit":64.977,"ccy":"USD","pnlUSD":-1604.27,"note":"P12. -$1,604.27."},
      {"id":4,"ticker":"UEC","dateIn":"2026-03-25","dateOut":"2026-03-31","qty":206,"entry":13.77,"exit":13.16,"ccy":"USD","pnlUSD":-127.76,"note":"Stopped. -$127.76."},
      {"id":5,"ticker":"IAG","dateIn":"2026-03-27","dateOut":"2026-04-01","qty":2200,"entry":3.55,"exit":3.70,"ccy":"GBP","pnlUSD":407.36,"note":"Peace thesis broken. +$407."},
      {"id":6,"ticker":"RCL","dateIn":"2026-03-24","dateOut":"2026-04-02","qty":36,"entry":273.54,"exit":269.91,"ccy":"USD","pnlUSD":-132.89,"note":"Stopped. -$132.89."},
      {"id":7,"ticker":"LEU","dateIn":"2026-03-24","dateOut":"2026-04-07","qty":13,"entry":188.79,"exit":170.26,"ccy":"USD","pnlUSD":-242.94,"note":"P11 ACTIVE. GTC $168."},
      {"id":8,"ticker":"LDO","dateIn":"2026-03-27","dateOut":"2026-04-07","qty":17,"entry":58.10,"exit":59.56,"ccy":"EUR","pnlUSD":20.51,"note":"T1. T2 35sh active."},
      {"id":9,"ticker":"UPS","dateIn":"2026-04-08","dateOut":"2026-04-08","qty":50,"entry":100.17,"exit":99.60,"ccy":"USD","pnlUSD":-30.61,"note":"Same-day. -$30.61."},
      {"id":10,"ticker":"R3NK","dateIn":"2026-03-26","dateOut":"2026-04-08","qty":80,"entry":51.51,"exit":56.01,"ccy":"EUR","pnlUSD":385.86,"note":"First entry. +$386."},
      {"id":11,"ticker":"PLTR","dateIn":"2026-03-24","dateOut":"2026-04-09","qty":49,"entry":161.608,"exit":134.976,"ccy":"USD","pnlUSD":-1307.11,"note":"P6. -$1,307.11."},
      {"id":12,"ticker":"SHLD","dateIn":"2026-03-24","dateOut":"2026-04-10","qty":69,"entry":72.01,"exit":73.21,"ccy":"USD","pnlUSD":112.65,"note":"Tactical. +$112.65."},
      {"id":13,"ticker":"PDYN","dateIn":"2026-03-25","dateOut":"2026-04-14","qty":250,"entry":6.59,"exit":6.67,"ccy":"USD","pnlUSD":17.42,"note":"250 of 500sh sold."},
      {"id":14,"ticker":"AVAV","dateIn":"2026-03-26","dateOut":"2026-04-15","qty":25,"entry":195.05,"exit":197.945,"ccy":"USD","pnlUSD":70.27,"note":"SI-42. +$70.27."},
      {"id":15,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-17","qty":1100,"entry":65.1,"exit":124.60,"ccy":"GBP","pnlUSD":828.00,"note":"Trim 1. +$828."},
      {"id":16,"ticker":"LNG","dateIn":"2026-04-13","dateOut":"2026-04-17","qty":19,"entry":268.813,"exit":248.00,"ccy":"USD","pnlUSD":-396.54,"note":"Stopped. -$396.54."},
      {"id":17,"ticker":"PATK","dateIn":"2026-04-17","dateOut":"2026-04-17","qty":25,"entry":108.80,"exit":109.256,"ccy":"USD","pnlUSD":9.34,"note":"P17. +$9.34."},
      {"id":18,"ticker":"ABVX","dateIn":"2026-04-06","dateOut":"2026-04-21","qty":44,"entry":117.913,"exit":114.26,"ccy":"USD","pnlUSD":-158.53,"note":"Stopped. -$158.53."},
      {"id":19,"ticker":"RR","dateIn":"2026-03-26","dateOut":"2026-04-22","qty":150,"entry":1182.88,"exit":1150.00,"ccy":"GBP","pnlUSD":-62.39,"note":"Stopped. Re-entry 100sh."},
      {"id":20,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-24","qty":800,"entry":65.1,"exit":141.20,"ccy":"GBP","pnlUSD":770.00,"note":"Trim 2. +$770."},
      {"id":21,"ticker":"LLY","dateIn":"2026-04-16","dateOut":"2026-04-25","qty":3,"entry":905.344,"exit":875.54,"ccy":"USD","pnlUSD":-89.41,"note":"T28. -$89.41."},
      {"id":22,"ticker":"CODA","dateIn":"2026-04-08","dateOut":"2026-04-27","qty":416,"entry":12.005,"exit":11.42,"ccy":"USD","pnlUSD":-243.36,"note":"S30 stop. CORRECTED S31: fill $11.42. E17. P11 active. -$243.36."},
      {"id":23,"ticker":"ISRG","dateIn":"2026-03-24","dateOut":"2026-04-27","qty":22,"entry":459.246,"exit":471.676,"ccy":"USD","pnlUSD":272.24,"note":"E16 corrected S31. Stop triggered. Q1 beat EPS $2.50. +$272.24."},
      {"id":24,"ticker":"ITM","dateIn":"2026-04-01","dateOut":"2026-04-28","qty":1200,"entry":65.1,"exit":130.39,"ccy":"GBP","pnlUSD":1041.00,"note":"ADDED S31 EVE. Stop Limit 130p/128p triggered on AIM intraday wick. Stock recovered to ~138p post-fill — no news catalyst. 172p limit auto-cancelled (OCA). Final ITM tranche. Total ITM programme: #15 +$828 + #20 +$770 + #24 +$1,041 = +$2,639. +$1,041."}
    ],
    "grossRealizedPnLUSD": -1696,
    "lastUpdated": "2026-04-28 S31 Eve — ITM #24 added. Revised ~-$1,696."
  },
  "sessionNotes": [
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — ITM STOP-OUT. Stop Limit 130p/128p filled at 130.39p on 1,200 shares. No news catalyst — AIM intraday wick on thin volume, stock recovered to ~138p post-fill. 172p GTC limit auto-cancelled (OCA behaviour confirmed). Trade #24 added: entry 65.1p, exit 130.39p, +£783/+$1,041. Total ITM programme realised +$2,639 across three tranches. P11 does NOT apply — stop was placed deliberately at 130p, this is normal exit, not a thesis break. No re-entry contemplated. GBP cash confirmed +£637 in IBKR balances."},
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — WTI CRITICAL. WTI hit $99.23 intraday, settled ~$98.97. SI-25 trigger $100.38 — gap reduced to ~$1.41, the narrowest since thesis established. Pakistan mediators hinting at new talks temporarily capped prices at $99.23. Iran new proposal (extend ceasefire, postpone nuclear talks) remains unresolved. SI-25 condition NOT triggered — requires permanent Hormuz reopening + WTI -10% from $111.54 peak, neither condition met. Monitor pre-open every session. NOG Q1 Thursday at this price level will be very supportive."},
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — CRML ACQUISITION. Critical Metals announced $835M acquisition of European Lithium, adding Wolfsberg lithium project (Austria) to existing Tanbreez rare earths (Greenland). CRML +7% on announcement, gave back to -5% ($13.73) on profit-taking. Stop $10.51 — 26% clearance. Thesis confirmed and expanding: dual-asset critical minerals (REE + lithium) with European jurisdiction, US EXIM $620M interest, Saudi JV term sheet. No action — hold and allow thesis to develop. $10.51 stop appropriate — do not raise again immediately after recent adjustment."},
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — MRVL -3%. Closed $153.46 vs $158.21 yesterday. Residual POET/Celestial AI sentiment drag on semiconductor supply chain theme broadly. No new specific MRVL news. Google ASIC (Dorado) thesis unaffected. Stop $135 = 12% below current. No action. Catalyst May 28."},
    {"date": "2026-04-28", "note": "SESSION 31 EVENING — EARNINGS PREVIEW. V reports tonight (consensus $3.09 EPS, $10.7B revenue). ABBV, AMZN, MSFT, MSTR, GOOGL all tomorrow. Options pricing MSFT ±6.77% (largest Mag 7 implied move) — stop $400.43 is within the downside risk range but accepted within SI-35. AMZN ±3.28% (calmest). Key AI bubble signal to watch: FCF compression across AMZN/MSFT/META from $630B+ capex plans. No changes to stops pre-earnings per standing protocol."}
  ]
};

const COLORS = {
  bg:"#0d1117",card:"#161b22",border:"#30363d",accent:"#58a6ff",
  green:"#3fb950",red:"#f85149",yellow:"#d29922",blue:"#388bfd",
  text:"#c9d1d9",textDim:"#8b949e",textBright:"#f0f6fc",purple:"#a371f7",
  orange:"#f0883e"
};

export default function TradingJournal() {
  const [data,setData]=useState(()=>{try{const s=localStorage.getItem(STORAGE_KEY);return s?JSON.parse(s):INITIAL_STATE;}catch{return INITIAL_STATE;}});
  const [activeTab,setActiveTab]=useState("positions");
  const [newNote,setNewNote]=useState("");
  useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch{}},[data]);
  const update=useCallback((d)=>setData(d),[]);
  const addNote=()=>{if(!newNote.trim())return;update({...data,sessionNotes:[...(data.sessionNotes||[]),{date:new Date().toISOString().slice(0,10),note:newNote}]});setNewNote("");};
  const tabs=["positions","thesis","tracker","notes"];
  const pnlColor=(v)=>v>0?COLORS.green:v<0?COLORS.red:COLORS.textDim;

  return(
    <div style={{background:COLORS.bg,minHeight:"100vh",color:COLORS.text,fontFamily:"monospace",padding:16,maxWidth:1200,margin:"0 auto"}}>
      <style>{`.card{background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:6px;padding:12px}.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;display:inline-block}.badge-green{background:rgba(63,185,80,0.15);color:${COLORS.green};border:1px solid rgba(63,185,80,0.3)}.badge-red{background:rgba(248,81,73,0.15);color:${COLORS.red};border:1px solid rgba(248,81,73,0.3)}.badge-amber{background:rgba(210,153,34,0.15);color:${COLORS.yellow};border:1px solid rgba(210,153,34,0.3)}.badge-orange{background:rgba(240,136,62,0.15);color:${COLORS.orange};border:1px solid rgba(240,136,62,0.3)}.badge-grey{background:rgba(139,148,158,0.15);color:${COLORS.textDim};border:1px solid rgba(139,148,158,0.3)}.btn{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:6px 12px;border-radius:4px;cursor:pointer;font-family:monospace;font-size:12px}.btn:hover{background:#21262d}.btn-primary{background:rgba(88,166,255,0.15);border-color:rgba(88,166,255,0.4);color:${COLORS.accent}}input{background:${COLORS.card};border:1px solid ${COLORS.border};color:${COLORS.text};padding:8px;border-radius:4px;font-family:monospace;font-size:12px;flex:1}`}</style>

      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,color:COLORS.textBright}}>CLAUDE FUND — JOURNAL v47</div>
            <div style={{fontSize:11,color:COLORS.textDim,marginTop:2}}>S31 Evening — Tue 28 Apr 2026 | {data.fund.account} | 18 positions</div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[
              {label:"NET LIQ",val:"$105.1K"},
              {label:"UNREAL",val:"+$5,779",color:COLORS.green},
              {label:"REALIZED",val:"~-$1,696",color:COLORS.red},
              {label:"WTI",val:"$98.97",color:COLORS.orange}
            ].map(m=>(
              <div key={m.label} className="card" style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:9,color:COLORS.textDim}}>{m.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:m.color||COLORS.textBright,marginTop:2}}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:6,padding:"8px 12px",background:"rgba(240,136,62,0.15)",border:"2px solid rgba(240,136,62,0.5)",borderRadius:4,fontSize:12,color:COLORS.orange,fontWeight:600}}>
          ⚠️ SI-25 CRITICAL — WTI $98.97 | INTRADAY HIGH $99.23 | TRIGGER $100.38 | GAP ONLY $1.41
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:4,fontSize:11,color:COLORS.red}}>
          ITM STOPPED 130.39p (Trade #24 +$1,041) | V EARNINGS TONIGHT | ABBV/AMZN/MSFT/MSTR TMW
        </div>
        <div style={{marginTop:4,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:11,color:COLORS.green}}>
          CRML: $835M European Lithium acquisition ✅ | ITM programme total +$2,639 across 3 tranches ✅
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {tabs.map(t=>(<button key={t} className={`btn ${activeTab===t?"btn-primary":""}`} onClick={()=>setActiveTab(t)} style={{textTransform:"uppercase",fontSize:11}}>{t}</button>))}
      </div>

      {activeTab==="positions"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {data.positions?.map((p)=>(
            <div key={p.ticker} className="card" style={{borderLeft:p.status?.includes("SI-25")?`3px solid ${COLORS.orange}`:p.status?.includes("EARNINGS")?`3px solid ${COLORS.yellow}`:p.status?.includes("ACQUISITION")?`3px solid ${COLORS.green}`:p.unrealPnL>500?`3px solid ${COLORS.green}`:p.unrealPnL<-50?`3px solid ${COLORS.red}`:undefined}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:6}}>
                <span style={{fontWeight:700,fontSize:14,color:COLORS.textBright}}>{p.ticker}</span>
                {p.cur&&<span className="badge badge-grey">{p.cur}</span>}
                {p.status?.includes("EARNINGS")&&<span className="badge badge-amber">EARNINGS</span>}
                {p.status?.includes("SI-25")&&<span className="badge badge-orange">SI-25 WATCH</span>}
                {p.status?.includes("ACQUISITION")&&<span className="badge badge-green">ACQUISITION</span>}
                <span className={`badge ${p.unrealPnL>50?"badge-green":p.unrealPnL<-20?"badge-red":"badge-amber"}`}>{p.unrealPnL>=0?"+":""}{p.unrealPct?.toFixed(1)}%</span>
              </div>
              <div style={{display:"flex",gap:16,flexWrap:"wrap",fontSize:11,marginBottom:4}}>
                <span>Avg: <b>{p.avgPrice}</b></span>
                <span>Last: <b>{p.last}</b></span>
                <span>P&L: <b style={{color:pnlColor(p.unrealPnL)}}>{p.unrealPnL>=0?"+":""}{p.unrealPnL?.toFixed(0)}</b></span>
                {p.stop&&<span>Stop: <b style={{color:COLORS.yellow}}>{p.stop}</b></span>}
              </div>
              <div style={{fontSize:10,color:COLORS.textDim}}>{p.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="thesis"&&(
        <div>
          <div className="card" style={{marginBottom:12,borderLeft:`4px solid ${COLORS.orange}`}}>
            <div style={{fontWeight:700,color:COLORS.orange,marginBottom:6,fontSize:13}}>{data.thesis.title}</div>
            <div style={{fontSize:12,lineHeight:1.8,marginBottom:8}}>{data.thesis.summary}</div>
            <div style={{padding:"6px 10px",background:"rgba(240,136,62,0.1)",borderRadius:4,fontSize:11,color:COLORS.orange}}>{data.thesis.SI25Status}</div>
          </div>
          {data.thesis.keyDates?.map((d,i)=>(
            <div key={i} className="card" style={{marginBottom:5,borderLeft:`3px solid ${d.priority==="CRITICAL"?COLORS.red:d.priority==="HIGH"?COLORS.yellow:COLORS.textDim}`}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{fontSize:10,fontWeight:600,minWidth:200,color:COLORS.textBright}}>{d.date}</span>
                <span style={{fontSize:10,color:COLORS.textDim,flex:1}}>{d.event}</span>
                <span className={`badge ${d.priority==="CRITICAL"?"badge-red":d.priority==="HIGH"?"badge-amber":"badge-grey"}`}>{d.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="tracker"&&(
        <div>
          <div style={{fontSize:12,fontWeight:600,color:COLORS.accent,marginBottom:8}}>
            TRADE TRACKER — {data.tradeTracker?.closedTrades?.length} CLOSED | Gross Realized: ${data.tradeTracker?.grossRealizedPnLUSD?.toFixed(0)}
          </div>
          <div style={{marginBottom:6,padding:"6px 10px",background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:4,fontSize:11,color:COLORS.green}}>
            ITM PROGRAMME COMPLETE: Trade #15 +$828 | #20 +$770 | #24 +$1,041 = TOTAL +$2,639
          </div>
          {data.tradeTracker?.closedTrades?.map((t)=>(
            <div key={t.id} className="card" style={{marginBottom:4,borderLeft:`3px solid ${t.pnlUSD>0?COLORS.green:COLORS.red}`}}>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:10,color:COLORS.textDim,minWidth:20}}>#{t.id}</span>
                <span style={{fontWeight:700}}>{t.ticker}</span>
                <span style={{fontSize:10,color:COLORS.textDim}}>{t.dateOut}</span>
                <span style={{fontWeight:700,color:pnlColor(t.pnlUSD)}}>{t.pnlUSD>=0?"+":""}${t.pnlUSD?.toFixed(2)}</span>
                <span className="badge badge-grey">{t.ccy}</span>
                {t.id===24&&<span className="badge badge-green">NEW S31</span>}
              </div>
              <div style={{fontSize:9,color:COLORS.textDim,marginTop:2}}>{t.note}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==="notes"&&(
        <div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add note..." onKeyDown={e=>e.key==="Enter"&&addNote()}/>
            <button className="btn btn-primary" onClick={addNote}>ADD</button>
          </div>
          {(data.sessionNotes||[]).slice().reverse().map((n,i)=>(
            <div key={i} className="card" style={{marginBottom:8}}>
              <div style={{fontSize:10,color:COLORS.textDim,marginBottom:4}}>{n.date}</div>
              <div style={{fontSize:11,lineHeight:1.7}}>{n.note}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop:24,paddingTop:12,borderTop:`1px solid ${COLORS.border}`,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,alignItems:"center"}}>
        <span style={{fontSize:10,color:COLORS.textDim}}>v47 | S31-EVE | 18 positions | WTI $98.97 | SI-25 GAP $1.41</span>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <span className="badge badge-orange">SI-25 $1.41 GAP</span>
          <span className="badge badge-red">ITM STOPPED</span>
          <span className="badge badge-green">CRML ACQUISITION</span>
          <span className="badge badge-amber">V EARNINGS TONIGHT</span>
        </div>
      </div>
    </div>
  );
}
