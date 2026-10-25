# 🇮🇳 LENDING PULSE
### *India's Lending Intelligence Atlas*
> **Tagline:** *Discover growth. Diagnose pressure. Identify opportunities.*  
> **Event:** Built for **Kaleidoscope 3.0 — Data Voyage** Hackathon  
> **Architecture:** React 18 • TypeScript • Vite • MapLibre GL JS • deck.gl v9 • Apache ECharts • Zustand • Tailwind CSS

---

## Executive Summary

**Lending Pulse** is an institutional-grade financial intelligence application engineered for credit executives, risk analysts, and field collections leaders. Rather than presenting a disjointed collection of static BI cards, Lending Pulse integrates macroeconomic choropleth mapping, district-level geospatial drill-down, cross-sectional portfolio decomposition, and interactive recovery scenario simulation into a unified, high-performance financial command center.

The application is built on top of real non-performing asset (NPA) and collections datasets combined with retail sales disbursement registries, adhering to strict financial data science standards: **conservation of portfolio mass**, **strict fact separation between independent processes**, and **transparent mathematical formulas**.

---

## 🏆 Hackathon Judging Criteria Alignment

| Criteria | Weight | How Lending Pulse Delivers |
|---|:---:|---|
| **Visual Design & UI** | **25%** | Bespoke financial terminal aesthetic inspired by Bloomberg/Palantir. Deep navy/graphite surfaces (`#08131F`), vibrant teal (`#54D7C7`) and coral accents, crisp typography, MapLibre GL + deck.gl v9 WebGL hardware-accelerated rendering, zero watermarks, and smooth microinteractions via Framer Motion. |
| **Data Analysis & Insights** | **25%** | Methodologically rigorous financial data modeling. Collections POS (₹50.7742 Cr) and Sales Disbursements (₹93.42 L) are modeled as distinct business facts. Dual normalization modes (**Census Norm** vs **NCR Cluster**) accurately resolve regional metro agglomerations without statistical distortion. |
| **Storytelling & Narrative** | **20%** | Three tightly coordinated, intuitive analytical workflows: **India Pulse** (Macro surveillance), **Hotspot Explorer** (Regional deep-dive forensics), and **Decision Lab** (Prescriptive prioritization & scenario modeling). Includes a deterministic, evidence-based narrative insight engine. |
| **Functionality & Interactivity** | **15%** | Seamless state-to-district drill-downs, 4 multi-layer map selectors (Exposure, Delinquency Pressure, Sourcing Activity, Allocation Distribution), synced cross-chart filtering, instant geographic search, interactive weight sliders, and sensitivity matrices. |
| **Innovation & Creativity** | **10%** | Dual-mode normalization engine for boundary reconciliation; complete 88/88 validated retail branch crosswalk with precise WGS84 geolocation; structured insight engine with LLM adapter architecture; interactive recovery sensitivity matrix. |
| **Accuracy & Data Handling** | **5%** | 100% mathematical reconciliation across all 37 Indian states and UTs with **zero mass loss** (₹50.7742 Cr audited POS). Dedicated in-app **Audit Reconciled Modal**, comprehensive data dictionary, documented metric definitions, and zero synthetic joins. |

---

## 🌐 Three Coordinated Storytelling Experiences

### Experience 1: India Pulse (Macro Surveillance)
*Question: Where is lending activity concentrated, and where is collections pressure visible?*
- **Interactive Geospatial Atlas:** 37 States & UT boundaries rendered via MapLibre GL and deck.gl `GeoJsonLayer` with hardware-accelerated choropleth color ramping.
- **Segmented Intelligence Layers:**
  - **Layer A (Collections Exposure):** Total POS distribution (₹ Cr), portfolio share, and account count.
  - **Layer B (Collections Pressure):** Delinquency concentration in 90+ DPD and written-off segments (`3.B3+` and `4.NPA`).
  - **Layer C (Lending Activity):** Retail sales disbursements (₹ Lakhs) and sourcing yield from 88 validated branch hubs.
  - **Layer D (Allocation Distribution):** Operational tracking of POS across allocations (`direct_calling`, `agency`, `legal`, `unallocated`).
- **deck.gl Proportional Bubble Overlays:** GPU-rendered scatterplot layers dynamically sized by portfolio weight.
- **Dynamic Geographic Ranking Sidebar:** Instant leaderboard sorting by exposure, delinquency ratio, or sourcing volume.

### Experience 2: Hotspot Explorer (Forensic Investigation)
*Question: What factors explain the observed concentration in a selected region?*
- **District Contribution Breakdown:** Horizontal ranked bar chart decomposing state exposure across validated revenue districts (e.g., Pune vs Mumbai in Maharashtra).
- **Exposure Anatomy Decomposition (Sankey):** Multi-stage cross-sectional decomposition:
  $$\text{State} \longrightarrow \text{Product Line} \longrightarrow \text{Aging Bucket} \longrightarrow \text{Allocation Tag}$$
- **Product Mix Treemap (Apache ECharts):** Hierarchical view of product categories (`LAP`, `PL`, `BL`, `Two Wheeler`) with dynamic click-to-filter mechanics.
- **Delinquency Heatmap:** Matrix cross-tabulating Indian states against aging buckets (`1.B1`, `2.B2`, `3.B3`, `4.NPA`).
- **Bilateral State Comparator:** Side-by-side benchmark comparing POS, accounts, delinquency ratios, and sourcing yield between any two geographies.

### Experience 3: Decision Lab (Prescriptive Strategy)
*Question: Which segments deserve investigation, and what could different actions achieve?*
- **Opportunity Prioritization Matrix:** Multi-factor composite risk and opportunity index scoring states with customizable interactive sliders:
  $$\text{Priority Index} = w_1 \cdot \widehat{\text{POS}} + w_2 \cdot \widehat{\text{Delinquency \%}} + w_3 \cdot \widehat{\text{Unallocated \%}} + w_4 \cdot \widehat{\text{Sourcing Yield}}$$
- **Scenario Simulator & Sensitivity Matrix:** Real-time simulation of hypothetical collections improvement:
  $$\text{Hypothetical Recovery} = \text{Eligible Exposure} \times \text{Improvement \%}$$
  Includes a dynamic $3 \times 3$ sensitivity matrix testing varying recovery intensities against baseline portfolios.
- **Evidence-Based Insight Engine:** Deterministic rule-based analytical engine highlighting operational concentrations, regional divergence, and data caveats, equipped with an extensible LLM provider adapter.

---

## 📐 Data Modeling & Semantic Integrity Rules

### 1. Strict Separation of Facts
- **Collections Fact Table:** Cross-sectional snapshot (August 2026) totaling **₹50.7742 Cr** across **561 accounts**. Contains POS, bucket aging (`1.B1` to `4.NPA`), allocation types, and write-off metrics.
- **Sales Fact Table:** Time-series disbursement registry (August–September 2026) totaling **₹93.42 Lakhs** across **31 disbursed loans** and **88 branch hubs**. Contains login, sanction, and disbursement amounts with sourcing yields.
- **Rule:** Never perform synthetic loan-level joins between Collections and Sales. Geographic comparisons occur strictly through aggregated, validated regional keys.

### 2. Delhi NCR Dual-Mode Normalization Engine
In raw banking records, `Delhi NCR` is frequently recorded as a single operational geography, spanning three distinct administrative jurisdictions (NCT of Delhi, Uttar Pradesh, and Haryana). Lending Pulse provides a real-time header toggle:
- **Census Normalized Mode (Default):** Disaggregates Delhi NCR records to official Survey of India boundaries (Ghaziabad & Gautam Buddha Nagar $\rightarrow$ Uttar Pradesh; Gurgaon $\rightarrow$ Haryana; Central/West/South/Shahdara $\rightarrow$ NCT of Delhi).
- **NCR Cluster Mode:** Consolidates all 10 National Capital Region records under a unified economic zone for regional syndicate analysis.

### 3. Transparent Handling of "Unallocated" POS
Approximately 75% of collections POS is categorized under `unallocated` disposition. **Lending Pulse explicitly avoids labeling this as collection failure.** In Indian retail lending operations, `unallocated` accounts represent automated mandate clearing (NACH / e-NACH / ECS) prior to manual allocation to tele-calling or field recovery agencies.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 18, TypeScript, Vite 8 |
| **Styling & Design System** | Tailwind CSS 3, Lucide React, Framer Motion |
| **Geospatial Mapping** | MapLibre GL JS, deck.gl v9 (`@deck.gl/maplibre`, `@deck.gl/layers`), GeoJSON |
| **Financial Charting** | Apache ECharts (`echarts-for-react`), D3.js (color scales & formatting) |
| **State Management** | Zustand (persistent global filters, navigation, dual-mode normalization) |
| **Data Ingestion Pipeline** | Node.js (`tsx`), SheetJS (`xlsx`), Zod schema validation |

---

## 🚀 Getting Started

### Prerequisites
- Node.js version 18.0.0 or higher
- npm version 9.0.0 or higher

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/samiksha-hackthon.git
cd samiksha-hackthon
npm install
```

### 2. Run the Ingestion & Aggregation Pipeline
To process the Excel dataset (`hackthon.xlsx`) and generate the audited static aggregates:
```bash
npm run data:ingest
```
*Output files will be generated in `public/data/` (state aggregates, district drilldowns, branch coordinates, and data quality audits).*

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Production Build
To create an optimized production bundle:
```bash
npm run build
npm run preview
```

---

## 🔄 Dataset Replacement Guide (For Judges & Evaluators)

To test the application with new, full, or alternative portfolios:

1. **Prepare your Excel workbook:**
   - Save the file as `hackthon.xlsx` in the project root directory.
   - Ensure the workbook contains sheets named `collection` and `sales` (case-insensitive).
   - Expected columns match standard Indian retail banking nomenclature (see [data-dictionary.md](file:///Users/akshaymohite/Documents/samiksha-hackthon/docs/data-dictionary.md)).
2. **Execute the ingestion script:**
   ```bash
   npm run data:ingest
   ```
3. **Automatic Validation & Diagnostics:**
   - The ingestion script automatically validates headers, converts Excel serial dates, normalizes geographic names, maps branch geolocations, and checks mass conservation.
   - If unmapped branches or districts are discovered, a diagnostic report will be output to the terminal and recorded in `public/data/data-quality-report.json`.
4. **Reload the web application:**
   - The React application will immediately reflect the newly aggregated portfolio data.

---

## ⏱️ 90–120 Second Demonstration Pitch Script

Use this script during live jury evaluation to highlight all six criteria within two minutes:

* **[0:00 – 0:25] The Hook & Macro Pulse (Visual Design & Storytelling):**
  > *"Good morning, judges. Welcome to **Lending Pulse: India's Lending Intelligence Atlas**. In retail credit, leaders often suffer from chart fatigue. Lending Pulse transforms raw banking sheets into an institutional geospatial terminal. Here on **India Pulse**, our interactive GPU choropleth renders 37 states and UTs with zero tile watermarks. By toggling from **Layer A (Collections Exposure)** to **Layer B (Collections Pressure)**, we immediately see that while Maharashtra and Delhi represent over 55% of total portfolio exposure, severe delinquency is heavily concentrated in specific northern districts. Notice our **Census Norm vs NCR Cluster toggle** in the top bar: it algorithmically redistributes ₹13.7 Cr of Delhi NCR exposure into its true statutory boundaries across UP, Haryana, and Delhi."*

* **[0:25 – 0:50] Geospatial Drill-down & Audit Integrity (Accuracy & Data Handling):**
  > *"Let's click on **Maharashtra** on the map. Notice the fluid camera transition into district-level drill-down. Now let's look at the top right: click **Audit Reconciled**. Every single rupee in our ₹50.7742 Cr portfolio is reconciled across 561 accounts with zero statistical mass loss. Furthermore, we observe our 88 retail branches mapped with verified WGS84 coordinates on Layer C, preserving strict separation of facts between loan sales and collection outcomes."*

* **[0:50 – 1:20] Hotspot Explorer (Data Analysis & Insights):**
  > *"Next, we transition to the **Hotspot Explorer** tab. Here we dissect the regional portfolio: our **District Contribution** chart shows Pune and Mumbai driving 70% of state exposure. Below, our **Exposure Anatomy Sankey** provides a clean cross-sectional breakdown: from State to Product Line, into Delinquency Aging Buckets, and finally into Allocation Tags. Notice our transparent data disclosure: 75% of POS is marked 'unallocated', which we correctly explain as automated NACH/mandate clearing rather than operational failure."*

* **[1:20 – 1:50] Decision Lab (Functionality & Innovation):**
  > *"Finally, we step into the **Decision Lab**. Credit committees require prescriptive intelligence. Our **Prioritization Matrix** combines POS exposure, delinquency, and sourcing yields into a transparent priority score—with dynamic weight sliders allowing risk managers to adjust their operational thesis in real time. Beside it, our **Scenario Simulator** models targeted recovery interventions across NPA pools, backed by an interactive sensitivity matrix. Below, our deterministic **Evidence-Based Insight Engine** generates auditable operational recommendations ready for executive export."*

* **[1:50 – 2:00] Conclusion:**
  > *"Lending Pulse proves that financial data visualization can be visually stunning, computationally sound, and immediately actionable. Thank you!"*

---

## 📚 Technical Documentation Index

Detailed engineering and domain documentation is available in the `docs/` directory:
- [Data Dictionary (`docs/data-dictionary.md`)](file:///Users/akshaymohite/Documents/samiksha-hackthon/docs/data-dictionary.md) — Comprehensive schema specifications for Collections and Sales facts.
- [Metric Definitions (`docs/metric-definitions.md`)](file:///Users/akshaymohite/Documents/samiksha-hackthon/docs/metric-definitions.md) — Exact mathematical formulas, denominators, and boundary conditions.
- [Geography Sources & Licensing (`docs/geography-sources.md`)](file:///Users/akshaymohite/Documents/samiksha-hackthon/docs/geography-sources.md) — Boundary GeoJSON sources, Survey of India alignment, and 88-branch crosswalk.
- [Data Quality & Audit Report (`docs/data-quality-report.md`)](file:///Users/akshaymohite/Documents/samiksha-hackthon/docs/data-quality-report.md) — Mass conservation proofs, Delhi NCR reconciliation, and operational caveats.

---

### Developed for Kaleidoscope 3.0 — Data Voyage 🚀
*Crafted with precision for institutional credit intelligence.*
