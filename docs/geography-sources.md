# Lending Pulse: Geographic Boundary Sources & Licensing

This document details the spatial boundaries, licensing attribution, and coordinate systems utilized across the interactive India maps and district drill-downs.

---

## 1. Boundary Sources

### 1.1 State & Union Territory Boundaries (`public/maps/india-states.geojson`)
- **Source:** Open Spatial Data for India (Adarsh Biradar / DataMeet Open Spatial initiative).
- **Format:** GeoJSON FeatureCollection with 37 features (28 States + 8 UTs + NCT of Delhi).
- **Properties:** Key property `st_nm` contains canonical state names matching standard administrative designations.
- **Coverage:** Includes post-2019 administrative boundaries:
  - Union Territory of Ladakh
  - Union Territory of Jammu and Kashmir
  - State of Telangana
  - Updated merged UT of Dadra and Nagar Haveli and Daman and Diu.
- **Attribution & License:** Open Data Commons Open Database License (ODbL) / MIT.

### 1.2 District Boundaries (`public/maps/districts/*.geojson`)
- **Source:** Open-access district boundaries collection (Survey of India reference geometry via `udit-001/india-maps-data`).
- **Format:** Per-state GeoJSON files containing sub-polygons for validated districts:
  - `maharashtra.geojson`: 35 districts
  - `telangana.geojson`: 33 districts
  - `tamil-nadu.geojson`: 37 districts
  - `karnataka.geojson`: 30 districts
  - `uttar-pradesh.geojson`: 75 districts
  - `punjab.geojson`: 22 districts
  - `andhra-pradesh.geojson`: 26 districts
  - `gujarat.geojson`: 34 districts
  - `rajasthan.geojson`: 33 districts
  - `haryana.geojson`: 22 districts
  - `jharkhand.geojson`: 24 districts
  - `madhya-pradesh.geojson`: 52 districts
  - `kerala.geojson`: 14 districts
  - `tripura.geojson`: 8 districts
  - `chhattisgarh.geojson`: 27 districts
  - `himachal-pradesh.geojson`: 12 districts
  - `uttarakhand.geojson`: 13 districts
  - `west-bengal.geojson`: 23 districts
  - `bihar.geojson`: 38 districts
  - `odisha.geojson`: 30 districts
  - `assam.geojson`: 33 districts
- **Properties:** `district`, `dt_code`, `st_nm`.

---

## 2. Sales Branch Geocoding Crosswalk (`scripts/normalize/crosswalk.ts`)
- **Total Unique Branches:** 88 branches in sales dataset.
- **Mapping Precision:** 100% matched to verified municipality/district centers with precise WGS84 decimal coordinates (`lat`, `lng`).
- **Coordinate Standard:** WGS84 (EPSG:4326), compatible with MapLibre GL and deck.gl.
- **No Fabricated Points:** No random or jittered coordinates are generated. Unmapped branches, if any appear in future full datasets, are routed to a verified diagnostic queue rather than plotted arbitrarily.
