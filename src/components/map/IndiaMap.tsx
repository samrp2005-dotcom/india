import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import { MapLibreOverlay } from '@deck.gl/maplibre';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { useAppStore } from '../../store/useAppStore';
import { MapLegend } from './MapLegend';
import { MapTooltip } from './MapTooltip';
import { MapBreadcrumbs } from './MapBreadcrumbs';
import { StateAggregate, LayerType } from '../../types';

const STATE_SLUG_MAP: Record<string, string> = {
  'Maharashtra': 'maharashtra',
  'Telangana': 'telangana',
  'Tamil Nadu': 'tamil-nadu',
  'Karnataka': 'karnataka',
  'Uttar Pradesh': 'uttar-pradesh',
  'Punjab': 'punjab',
  'Andhra Pradesh': 'andhra-pradesh',
  'Gujarat': 'gujarat',
  'Rajasthan': 'rajasthan',
  'Haryana': 'haryana',
  'Jharkhand': 'jharkhand',
  'Madhya Pradesh': 'madhya-pradesh',
  'Kerala': 'kerala',
  'Tripura': 'tripura',
  'Chhattisgarh': 'chhattisgarh',
  'Himachal Pradesh': 'himachal-pradesh',
  'Uttarakhand': 'uttarakhand',
  'West Bengal': 'west-bengal',
  'Bihar': 'bihar',
  'Odisha': 'odisha',
  'Assam': 'assam',
  'Delhi': 'delhi',
  'Delhi NCR': 'delhi'
};

const INDIA_CENTER: [number, number] = [79.2, 22.5];
const INDIA_ZOOM = 4.1;

// Self-contained base styles (0 API keys, 0 watermarks)
const DARK_BASE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {},
  layers: [
    {
      id: 'bg',
      type: 'background',
      paint: {
        'background-color': '#0B132B'
      }
    }
  ]
};

const LIGHT_BASE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {},
  layers: [
    {
      id: 'bg',
      type: 'background',
      paint: {
        'background-color': '#F8FAFC'
      }
    }
  ]
};

function getStateColor(
  stData: StateAggregate | undefined,
  layer: LayerType,
  maxVal: number,
  theme: 'light' | 'dark' = 'light'
): [number, number, number, number] {
  if (!stData || stData.posCrs <= 0) {
    return theme === 'light' ? [241, 245, 249, 220] : [28, 37, 65, 170]; // Unmapped surface
  }

  let metricVal = 0;
  if (layer === 'exposure') metricVal = stData.posCrs;
  else if (layer === 'pressure') metricVal = stData.delinquentShare;
  else if (layer === 'sales') metricVal = stData.salesDisbAmount;
  else if (layer === 'allocation') {
    const unalloc = stData.allocationBreakdown?.unallocated || 0;
    metricVal = stData.posCrs > 0 ? (unalloc / stData.posCrs) * 100 : 0;
  }

  const ratio = Math.min(Math.max(metricVal / (maxVal || 1), 0.1), 1.0);

  if (theme === 'light') {
    if (layer === 'exposure') {
      // Light mode Pure Blue Scale: soft ice blue [219, 234, 254] to deep royal blue [29, 78, 216]
      return [
        Math.round(219 - ratio * 190),
        Math.round(234 - ratio * 156),
        Math.round(254 - ratio * 38),
        240
      ];
    } else if (layer === 'pressure') {
      // Light mode Pure Orange Scale: soft peach [255, 237, 213] to deep burnt orange [194, 65, 12]
      return [
        Math.round(255 - ratio * 61),
        Math.round(237 - ratio * 172),
        Math.round(213 - ratio * 201),
        240
      ];
    } else if (layer === 'sales') {
      // Light mode Sapphire/Cobalt Blue Scale: pale sky [191, 219, 254] to deep navy blue [30, 58, 138]
      return [
        Math.round(191 - ratio * 161),
        Math.round(219 - ratio * 161),
        Math.round(254 - ratio * 116),
        240
      ];
    } else {
      // Light mode Warm Amber/Orange Scale: light apricot [254, 243, 199] to deep amber-orange [217, 119, 6]
      return [
        Math.round(254 - ratio * 37),
        Math.round(243 - ratio * 124),
        Math.round(199 - ratio * 193),
        240
      ];
    }
  }

  // Dark mode scales: Blue & Orange shades
  if (layer === 'exposure') {
    // Blue scale (Navy to Light Blue)
    return [
      Math.round(30 + ratio * 66),
      Math.round(64 + ratio * 101),
      Math.round(175 + ratio * 75),
      220
    ];
  } else if (layer === 'pressure') {
    // Orange scale (Deep Rust to Bright Orange)
    return [
      Math.round(124 + ratio * 127),
      Math.round(45 + ratio * 101),
      Math.round(18 + ratio * 42),
      220
    ];
  } else if (layer === 'sales') {
    // Sapphire blue scale
    return [
      Math.round(30 + ratio * 66),
      Math.round(58 + ratio * 107),
      Math.round(138 + ratio * 112),
      220
    ];
  } else {
    // Amber orange scale
    return [
      Math.round(120 + ratio * 125),
      Math.round(53 + ratio * 105),
      Math.round(15 + ratio * 21),
      220
    ];
  }
}

export const IndiaMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const deckOverlayRef = useRef<MapLibreOverlay | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [statesGeoJson, setStatesGeoJson] = useState<any>(null);
  const [districtGeoJson, setDistrictGeoJson] = useState<any>(null);

  const {
    selectedLayer,
    selectedState,
    selectedDistrict,
    setSelectedState,
    setSelectedDistrict,
    setHoveredGeography,
    getActiveStateAggregates,
    districtAggregates,
    branches,
    showBranches,
    showBubbles,
    normalizationMode,
    theme
  } = useAppStore();

  const stateAggregates = getActiveStateAggregates();

  // Load States GeoJSON on mount
  useEffect(() => {
    fetch('/maps/india-states.geojson')
      .then((res) => res.json())
      .then((data) => setStatesGeoJson(data))
      .catch((err) => console.error('Failed to load india-states.geojson:', err));
  }, []);

  // Initialize MapLibre GL
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: theme === 'dark' ? DARK_BASE_STYLE : LIGHT_BASE_STYLE,
      center: INDIA_CENTER,
      zoom: INDIA_ZOOM,
      minZoom: 3.5,
      maxZoom: 12,
      pitch: 0,
      bearing: 0,
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');

    const overlay = new MapLibreOverlay({
      layers: []
    });
    map.addControl(overlay as any);
    deckOverlayRef.current = overlay;

    map.on('load', () => {
      setMapLoaded(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map background style when theme toggles
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      mapRef.current.setStyle(theme === 'dark' ? DARK_BASE_STYLE : LIGHT_BASE_STYLE);
    }
  }, [theme, mapLoaded]);

  // Handle State Selection & Camera flyTo
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (!selectedState) {
      setDistrictGeoJson(null);
      map.flyTo({
        center: INDIA_CENTER,
        zoom: INDIA_ZOOM,
        duration: 1200
      });
      return;
    }

    const slug = STATE_SLUG_MAP[selectedState];
    if (slug) {
      fetch(`/maps/districts/${slug}.geojson`)
        .then((res) => res.json())
        .then((data) => {
          setDistrictGeoJson(data);

          // Fly camera to state bounds
          const coords: [number, number][] = [];
          for (const feat of data.features || []) {
            const geom = feat.geometry;
            if (geom?.type === 'Polygon') {
              coords.push(...geom.coordinates[0]);
            } else if (geom?.type === 'MultiPolygon') {
              for (const poly of geom.coordinates) {
                coords.push(...poly[0]);
              }
            }
          }

          if (coords.length > 0) {
            const bounds = coords.reduce(
              (acc, coord) => [
                Math.min(acc[0], coord[0]),
                Math.min(acc[1], coord[1]),
                Math.max(acc[2], coord[0]),
                Math.max(acc[3], coord[1])
              ],
              [Infinity, Infinity, -Infinity, -Infinity]
            );

            map.fitBounds(bounds as [number, number, number, number], {
              padding: { top: 70, bottom: 70, left: 60, right: 60 },
              duration: 1200
            });
          }
        })
        .catch((err) => console.warn(`Could not load district geojson for ${selectedState}:`, err));
    }
  }, [selectedState]);

  // Update deck.gl Layers (States Choropleth, Districts, Branches, Bubbles)
  useEffect(() => {
    if (!deckOverlayRef.current || !statesGeoJson) return;

    const values = Object.values(stateAggregates);
    let maxVal = 1;
    if (selectedLayer === 'exposure') {
      maxVal = Math.max(...values.map((v) => v.posCrs), 5);
    } else if (selectedLayer === 'pressure') {
      maxVal = Math.max(...values.map((v) => v.delinquentShare), 50);
    } else if (selectedLayer === 'sales') {
      maxVal = Math.max(...values.map((v) => v.salesDisbAmount), 1000000);
    } else if (selectedLayer === 'allocation') {
      maxVal = 100;
    }

    const layers: any[] = [];

    // Layer 1: India State Boundaries Choropleth
    layers.push(
      new GeoJsonLayer({
        id: 'india-states-layer',
        data: statesGeoJson,
        filled: true,
        stroked: true,
        lineWidthMinPixels: 1.5,
        lineWidthMaxPixels: 3.5,
        getLineColor: (f: any) => {
          const stName = f.properties?.st_nm;
          if (stName === selectedState) {
            return theme === 'light' ? [234, 88, 12, 255] : [251, 146, 60, 255]; // Orange highlight
          }
          return theme === 'light' ? [203, 213, 225, 255] : [46, 64, 104, 220]; // Slate borders
        },
        getLineWidth: (f: any) => (f.properties?.st_nm === selectedState ? 3.5 : 1.5),
        getFillColor: (f: any) => {
          const stName = f.properties?.st_nm;
          const stData = stateAggregates[stName];
          return getStateColor(stData, selectedLayer, maxVal, theme);
        },
        pickable: true,
        autoHighlight: true,
        highlightColor: theme === 'light' ? [37, 99, 235, 120] : [96, 165, 250, 120],
        onHover: (info: any) => {
          if (info.object) {
            const stName = info.object.properties?.st_nm;
            const stData = stateAggregates[stName];
            setHoveredGeography({
              name: stName,
              type: 'state',
              x: info.x,
              y: info.y,
              data: stData
            });
          } else {
            setHoveredGeography(null);
          }
        },
        onClick: (info: any) => {
          if (info.object) {
            const stName = info.object.properties?.st_nm;
            if (stName) {
              setSelectedState(selectedState === stName ? null : stName);
            }
          }
        },
        updateTriggers: {
          getFillColor: [selectedLayer, normalizationMode, stateAggregates, theme],
          getLineColor: [selectedState, theme],
          getLineWidth: [selectedState]
        }
      })
    );

    // Layer 2: District Polygons for Selected State
    if (districtGeoJson) {
      layers.push(
        new GeoJsonLayer({
          id: 'selected-state-districts-layer',
          data: districtGeoJson,
          filled: true,
          stroked: true,
          lineWidthMinPixels: 1.2,
          getLineColor: (f: any) => {
            const distName = f.properties?.district;
            if (distName === selectedDistrict) {
              return theme === 'light' ? [234, 88, 12, 255] : [251, 146, 60, 255]; // Orange highlight
            }
            return theme === 'light' ? [37, 99, 235, 220] : [96, 165, 250, 180]; // Blue district border
          },
          getLineWidth: (f: any) => (f.properties?.district === selectedDistrict ? 3.0 : 1.2),
          getFillColor: (f: any) => {
            const distName = f.properties?.district;
            const dData = districtAggregates.find(
              (d) => d.district.toLowerCase() === distName?.toLowerCase() && d.state === selectedState
            );
            if (dData && dData.posCrs > 0) {
              return theme === 'light' ? [37, 99, 235, 200] : [59, 130, 246, 190]; // Blue active fill
            }
            return theme === 'light' ? [241, 245, 249, 200] : [28, 37, 65, 180];
          },
          pickable: true,
          autoHighlight: true,
          highlightColor: theme === 'light' ? [234, 88, 12, 140] : [251, 146, 60, 140],
          onHover: (info: any) => {
            if (info.object) {
              const distName = info.object.properties?.district;
              const dData = districtAggregates.find(
                (d) => d.district.toLowerCase() === distName?.toLowerCase() && d.state === selectedState
              );
              setHoveredGeography({
                name: distName,
                type: 'district',
                x: info.x,
                y: info.y,
                data: dData
              });
            } else {
              setHoveredGeography(null);
            }
          },
          onClick: (info: any) => {
            if (info.object) {
              const distName = info.object.properties?.district;
              if (distName) {
                setSelectedDistrict(selectedDistrict === distName ? null : distName);
              }
            }
          },
          updateTriggers: {
            getLineColor: [selectedDistrict, theme],
            getLineWidth: [selectedDistrict],
            getFillColor: [selectedState, districtAggregates, theme]
          }
        })
      );
    }

    // Layer 3: Proportional Exposure Bubbles
    if (showBubbles) {
      const bubbleData = Object.entries(stateAggregates).map(([state, data]) => {
        const stateBranch = branches.find((b) => b.state === state);
        return {
          state,
          lat: stateBranch ? stateBranch.lat : 20.59,
          lng: stateBranch ? stateBranch.lng : 78.96,
          radius: Math.max(Math.sqrt(data.posCrs) * 35000, 18000),
          posCrs: data.posCrs
        };
      });

      layers.push(
        new ScatterplotLayer({
          id: 'exposure-bubbles',
          data: bubbleData,
          getPosition: (d: any) => [d.lng, d.lat],
          getRadius: (d: any) => d.radius,
          getFillColor: theme === 'light' ? [37, 99, 235, 60] : [96, 165, 250, 75],
          getLineColor: theme === 'light' ? [37, 99, 235, 220] : [96, 165, 250, 220],
          stroked: true,
          filled: true,
          lineWidthMinPixels: 2,
          pickable: false
        })
      );
    }

    // Layer 4: Verified Sales Branch Locations (Pins)
    if (showBranches) {
      const activeBranches = selectedState
        ? branches.filter((b) => b.state === selectedState)
        : branches;

      layers.push(
        new ScatterplotLayer({
          id: 'sales-branches',
          data: activeBranches,
          getPosition: (d: any) => [d.lng, d.lat],
          getRadius: (d: any) => Math.max(Math.sqrt(d.disbAmount || 100000) * 16, 12000),
          getFillColor: (d: any) =>
            d.disbAmount > 0
              ? (theme === 'light' ? [234, 88, 12, 240] : [251, 146, 60, 240]) // Orange for disbursed hubs
              : (theme === 'light' ? [37, 99, 235, 180] : [96, 165, 250, 160]), // Blue for pipeline hubs
          getLineColor: () => [255, 255, 255, 255], // Pure White rim
          stroked: true,
          filled: true,
          lineWidthMinPixels: 1.5,
          pickable: true,
          onHover: (info: any) => {
            if (info.object) {
              setHoveredGeography({
                name: info.object.branch,
                type: 'branch',
                x: info.x,
                y: info.y,
                data: info.object
              });
            } else {
              setHoveredGeography(null);
            }
          }
        })
      );
    }

    deckOverlayRef.current.setProps({ layers });
  }, [
    statesGeoJson,
    districtGeoJson,
    selectedLayer,
    normalizationMode,
    selectedState,
    selectedDistrict,
    stateAggregates,
    branches,
    showBranches,
    showBubbles,
    theme
  ]);

  return (
    <div className="relative w-full h-full min-h-[540px] lg:min-h-[620px] rounded-2xl overflow-hidden border border-border/80 shadow-glass bg-background">
      {/* MapLibre Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0" />

      {/* Breadcrumbs Navigation */}
      <MapBreadcrumbs />

      {/* Quantitative Legend */}
      <MapLegend />

      {/* Floating Interactive Tooltip */}
      <MapTooltip />
    </div>
  );
};
