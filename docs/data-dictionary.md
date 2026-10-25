# Lending Pulse: Data Dictionary & Semantic Specification

This data dictionary formally documents all primary business fields from the initial two fact datasets: **Collections** and **Sales**, adhering to the modeling integrity rules of the Kaleidoscope 3.0 hackathon.

---

## 1. Collections Dataset (Fact Table: Debt Resolution & Portfolio Exposure)

- **Snapshot Frequency:** Monthly snapshot (August 2026 month-end status: `2026-08-26`).
- **Granularity:** Cross-sectional aggregated slices by product line, delinquency bucket, allocation strategy, and geography.

| Field Name | Type | Description | Values / Unit | Modeling Treatment |
|---|---|---|---|---|
| `POS_CRS` | Float | Principal Outstanding in Crores (10 Million INR). Primary exposure measure. | ₹ Crores (`0.0050` to `5.8432`) | Additive measure. Never join directly with Sales disbursement. |
| `NO_ACCOUNTS` | Integer | Total active loan accounts within this cohort slice. | Count (`1` to `48`) | Additive measure. |
| `BUCKET` | String | Point-in-time delinquency aging bucket. | `1.B1`, `2.B2`, `3.B3`, `4.NPA`, `4.Opening_NPA` | `1.B1` = 1–30 DPD, `2.B2` = 31–60 DPD, `3.B3` = 61–90 DPD, `4.NPA` = 90+ DPD / Non-performing asset. |
| `FINAL_PRODUCT_CATEGORY` | String | High-level business asset class classification. | `HL` (Home Loan), `SHAKTI`, `MSME`, `UCL` (Used Car), `UBL` (Unsecured Business), `EF`, `PL` | Categorical dimension. Used for treemap and decomposition. |
| `PRODUCT_LINE` | String | Granular sub-product line or sourcing partnership. | e.g. `CAR DEKHO`, `PHONE PE`, `PAYTAIL`, `AF`, `LAP`, `SBL` | Sub-level hierarchy under `FINAL_PRODUCT_CATEGORY`. |
| `STATE` | String | Administrative state or designated operational cluster. | 18 distinct values including `Delhi NCR`. | See Delhi NCR Normalization Note below. |
| `DISTRICT` | String | District-level operational assignment. | 71 distinct districts. | Normalized and linked to district boundary polygons. |
| `ZONE` | String | Macro geographic zone. | `North`, `South`, `West`, `East` | Regional grouping. |
| `BUSINESS_ALLOC_TYPE` | String | Operational routing mechanism assigned to cohort. | `unallocated`, `Field_Referral`, `Call-Agency`, `Call_Center`, `Strategic_Allocation` | Represents operational workflow state, NOT collection failure. |
| `DISPOSITION_TAG_CATG` | String | Collections contact outcome disposition grouping. | `unallocated`, `Field_Referral`, `Call_Center`, `Strategic_Allocation`, `Agency_Referral`, `Self_Cure` | High-level contact outcome tag. |
| `CITY_TIER` | String | Urbanization tiering classification. | `Tier A`, `Tier B`, `Tier C`, `Tier E`, `Unclassified` | Economic tier dimension. Missing values kept as Unclassified. |
| `AUM_ON_BOOK` | Float | Assets Under Management maintained on balance sheet (Crores). | ₹ Crores | Balance sheet metric. |
| `AUM_OFF_BOOK` | Float | Assets Under Management co-originated or assigned off balance sheet. | ₹ Crores | Off-balance sheet component. |
| `WRITE_OFF_AMT` | Float | Cumulative or period write-off amount recorded against cohort. | ₹ Crores | Bad-debt write-off. |
| `MONTH_NAME` | Date | Snapshot reference month. | `2026-08-26` | Temporal reference. |
| `STATUS_DATE` | Date | Date status recorded in source servicing system. | Date range `2026-08-02` to `2026-08-31` | Audit timestamp. |

### Delhi NCR Normalization Note
In the raw Collections sheet, `STATE = 'Delhi NCR'` aggregates ₹13.70 Cr of POS (27% of portfolio). It encompasses districts spanning three official jurisdictions:
- **Uttar Pradesh:** `GHAZIABAD`, `GAUTAM BUDDHA NAGAR`, `BULANDSHAHR`
- **Haryana:** `GURGAON`
- **NCT of Delhi:** `SOUTH DELHI`, `WEST DELHI`, `NORTH WEST DELHI`, `SHAHDARA`

Lending Pulse provides dual-mode toggling:
1. **Official Census Normalization:** Districts resolved to official state boundaries.
2. **Operational Cluster Mode:** Retains Delhi NCR as an integrated corporate region.

---

## 2. Sales Dataset (Fact Table: Loan Origination & Sourcing Velocity)

- **Snapshot Frequency:** Monthly series (`2026-08-31` and `2026-09-30`).
- **Granularity:** Branch, Department, Lead Source, and Product Type slices.

| Field Name | Type | Description | Values / Unit | Modeling Treatment |
|---|---|---|---|---|
| `BRANCH` | String | Operating branch location name. | 88 verified branch locations. | Mapped via explicit crosswalk to validated State, District, and Lat/Lng coordinates. |
| `LOGIN_AMOUNT` | Float | Total application volume logged into origination system. | ₹ INR (Rupees) | Sourcing top-of-funnel demand. |
| `LOGIN_COUNT` | Integer | Total count of loan files submitted. | Integer count | Demand velocity. |
| `DECISION_COUNT` | Integer | Total files underwritten and evaluated by credit committee. | Integer count | Underwriting throughput. |
| `SANCTIONED_AMOUNT` | Float | Total approved credit facility value. | ₹ INR (Rupees) | Credit approval volume. |
| `SANCTION_COUNT` | Integer | Number of distinct sanction letters issued. | Integer count | Approval throughput. |
| `SANCTION_YIELD` | Float | Contracted interest rate percentage on approved loans. | Percentage (%) | Risk-based pricing. |
| `DISB_AMOUNT` | Float | Actual capital disbursed to borrowers. | ₹ INR (Rupees) | Disbursed principal volume. |
| `DISB_COUNT` | Integer | Number of disbursements successfully funded. | Integer count | Funding throughput. |
| `DISB_YIELD` | Float | Weighted average interest rate realized on disbursed principal. | Percentage (%) | Asset yield. |
| `DEPT` | String | Sourcing department / channel. | `HL`, `PL`, `LAP`, `UCL`, `UBL`, `MLAP`, `Others` | Channel dimension. |
| `LEAD_SOURCE` | String | Lead generation partner or direct channel. | `DSA`, `CSC`, `CALL_CENTER`, `Vakrangee`, `SELF`, `DIGITALLY_SOURCED`, etc. | Sourcing attribution. |
| `DATESERIES` | Date | Snapshot month-end date. | `2026-08-31`, `2026-09-30` | Time-series axis. |

---

## 3. Critical Semantic Boundaries

1. **No Artificial Joins:** Collections records and Sales records are independent business facts and are never joined on non-unique keys.
2. **Unit Consistency:** Collections figures are reported in ₹ Crores (1 Cr = ₹10,000,000); Sales amounts are converted into ₹ Crores / Lakhs with explicit unit indicators.
3. **No Fabricated Data:** Missing values remain explicitly flagged as missing or unclassified.
