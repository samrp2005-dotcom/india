# Lending Pulse: Metric Definitions & Analytical Formulation

This document provides mathematical formulations, business interpretations, and constraints for all metrics computed across **Lending Pulse**.

---

## 1. Collections Metrics

### 1.1 Total Principal Outstanding (POS)
- **Formula:**
  $$\text{Total POS (Cr)} = \sum_{i \in \text{Records}} \text{POS\_CRS}_i$$
- **Dataset:** Collections (August 2026 month-end snapshot).
- **Current Total:** ₹50.7742 Cr.
- **Unit:** ₹ Crores (1 Crore = 10 Million INR).
- **Business Use:** Measures gross outstanding balance sheet capital currently subject to servicing and collections monitoring.

### 1.2 Portfolio Exposure Share
- **Formula:**
  $$\text{Portfolio Share}_s = \frac{\text{POS}_s}{\sum \text{POS}} \times 100$$
- **Denominator:** Total national Collections POS (₹50.7742 Cr).
- **Business Use:** Identifies geographic or product concentration risk.

### 1.3 Delinquency Pressure Ratio
- **Formula:**
  $$\text{Delinquency Pressure Share} = \frac{\sum_{\text{Bucket} \in \{2.\text{B2}, 3.\text{B3}, 4.\text{NPA}, 4.\text{Opening\_NPA}\}} \text{POS}_b}{\text{Total POS}} \times 100$$
- **Data Definition:**
  - `1.B1`: Early stage arrears (1–30 DPD). Standard recovery trajectory.
  - `2.B2`: 31–60 DPD. Moderate impairment risk.
  - `3.B3`: 61–90 DPD. High roll-forward probability.
  - `4.NPA` / `4.Opening_NPA`: 90+ DPD (Non-Performing Asset).
- **Constraint:** We transparently disclose the bucket-level breakdown rather than asserting a synthetic non-statutory NPA rate.

### 1.4 Unallocated Capacity Ratio
- **Formula:**
  $$\text{Unallocated Ratio} = \frac{\text{POS}_{\text{BUSINESS\_ALLOC\_TYPE} = \text{'unallocated'}}}{\text{Total POS}} \times 100$$
- **Business Use:** Quantifies the proportion of outstanding exposure managed via baseline automated digital reminders rather than assigned field or tele-calling agencies.

---

## 2. Sales Origination Metrics

### 2.1 Total Disbursement Amount & Count
- **Formula:**
  $$\text{Total Disbursed} = \sum \text{DISB\_AMOUNT}_j, \quad \text{Total Count} = \sum \text{DISB\_COUNT}_j$$
- **Dataset:** Sales (August – September 2026).
- **Current Sample Total:** ₹93,41,622 (₹0.93 Cr across 31 funded loans).
- **Unit:** Formatted dynamically as ₹ Crores or ₹ Lakhs.

### 2.2 Sourcing Conversion Funnel
- **Login-to-Sanction Rate:**
  $$\text{Approval Rate} = \frac{\sum \text{SANCTIONED\_AMOUNT}}{\sum \text{LOGIN\_AMOUNT}} \times 100$$
- **Sanction-to-Disbursement Rate:**
  $$\text{Disbursement Efficiency} = \frac{\sum \text{DISB\_AMOUNT}}{\sum \text{SANCTIONED\_AMOUNT}} \times 100$$

### 2.3 Weighted Sourcing Yield
- **Formula:**
  $$\text{Weighted Yield} = \frac{\sum (\text{DISB\_AMOUNT}_j \times \text{DISB\_YIELD}_j)}{\sum \text{DISB\_AMOUNT}_j}$$
- **Business Use:** Evaluates contractual portfolio yield being onboarded into the book across regional branch hubs.

---

## 3. Decision Lab: Analytical Prioritization Formula

### 3.1 Composite Priority Score
To rank geographic or asset segments objectively without black-box bias, Lending Pulse applies a normalized multi-factor composite index:

$$\text{Priority Score} = w_1 \cdot \text{POS}_{\text{norm}} + w_2 \cdot \text{Delinq}_{\text{norm}} + w_3 \cdot \text{Unalloc}_{\text{norm}} + w_4 \cdot \text{Sales}_{\text{norm}}$$

- **Default Transparent Weights:**
  - $w_1 = 0.35$ (Exposure Scale: Outstanding capital volume)
  - $w_2 = 0.30$ (Delinquency Pressure: Percentage in 30+ DPD / NPA)
  - $w_3 = 0.20$ (Operational Headroom: Share of unallocated accounts)
  - $w_4 = 0.15$ (Sourcing Velocity: Local disbursement momentum)
- **Tiers:**
  - $\ge 65$: **Critical Focus** (Immediate remediation and managerial review)
  - $45 - 64.9$: **Elevated Pressure** (Targeted agency allocation and credit review)
  - $25 - 44.9$: **Moderate Attention** (Routine cohort monitoring)
  - $< 25$: **Stable Monitor** (Benchmark performance)

### 3.2 Recovery Sensitivity Arithmetic
- **Formula:**
  $$\text{Hypothetical Recovered Amount} = \text{Target Exposure Pool} \times \text{Configurable Improvement \%}$$
- **Disclaimer:** Explicitly annotated as illustrative scenario arithmetic, not a statistical default forecasting model.
