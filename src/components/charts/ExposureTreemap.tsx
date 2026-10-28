import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatPercent } from '../../lib/formatters';

export const ExposureTreemap: React.FC = () => {
  const { productTreemap, selectedProductCategory, setSelectedProductCategory, theme } = useAppStore();
  const isLight = theme === 'light';

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(16, 31, 48, 0.95)',
      borderColor: isLight ? '#0D9488' : '#54D7C7',
      borderWidth: 1,
      extraCssText: isLight ? 'box-shadow: 0 8px 24px -2px rgba(0,0,0,0.1); border-radius: 8px;' : '',
      textStyle: { color: isLight ? '#0F172A' : '#EDF5F7', fontSize: 12 },
      formatter: (params: any) => {
        const val = params.value;
        const name = params.name;
        const data = params.data;
        const primaryColor = isLight ? '#1D4ED8' : '#60A5FA';
        const mutedColor = isLight ? '#64748B' : '#94A3B8';
        return `
          <div style="font-family: sans-serif; padding: 4px;">
            <div style="font-weight: 700; color: ${primaryColor}; font-size: 13px;">${name}</div>
            <div style="margin-top: 4px;">Exposure: <b>₹${Number(val).toFixed(2)} Cr</b></div>
            ${data?.accounts ? `<div>Accounts: <b>${data.accounts}</b></div>` : ''}
            ${data?.share ? `<div>Portfolio Share: <b>${data.share}%</b></div>` : ''}
            <div style="font-size: 10px; color: ${mutedColor}; margin-top: 4px;">* Click block to filter portfolio views</div>
          </div>
        `;
      }
    },
    series: [
      {
        type: 'treemap',
        data: productTreemap,
        leafDepth: 2,
        roam: false,
        nodeClick: 'link',
        breadcrumb: {
          show: true,
          bottom: 0,
          itemStyle: {
            color: isLight ? '#F1F5F9' : '#1C2541',
            borderColor: isLight ? '#CBD5E1' : '#2E4068',
            textStyle: { color: isLight ? '#1D4ED8' : '#60A5FA', fontSize: 11 }
          }
        },
        label: {
          show: true,
          formatter: '{b}\n₹{c} Cr',
          fontSize: 11,
          color: '#FFFFFF',
          fontWeight: 600
        },
        itemStyle: {
          borderColor: isLight ? '#FFFFFF' : '#0B132B',
          borderWidth: 2,
          gapWidth: 2
        },
        levels: [
          {
            itemStyle: {
              borderColor: isLight ? '#FFFFFF' : '#0B132B',
              borderWidth: 3,
              gapWidth: 3
            }
          },
          {
            color: isLight
              ? ['#1D4ED8', '#EA580C', '#2563EB', '#F97316', '#3B82F6', '#FB923C', '#60A5FA', '#FDBA74']
              : ['#1E3A8A', '#9A3412', '#1D4ED8', '#C2410C', '#2563EB', '#EA580C', '#3B82F6', '#F97316'],
            colorMappingBy: 'id',
            itemStyle: {
              borderColor: isLight ? '#FFFFFF' : '#1C2541',
              borderWidth: 2,
              gapWidth: 2
            }
          },
          {
            colorSaturation: [0.35, 0.65],
            itemStyle: {
              borderColorSaturation: 0.7,
              gapWidth: 1
            }
          }
        ]
      }
    ]
  };

  const onEvents = {
    click: (params: any) => {
      const prodName = params.name;
      if (prodName) {
        setSelectedProductCategory(
          selectedProductCategory === prodName ? 'ALL' : prodName
        );
      }
    }
  };

  return (
    <div className="w-full h-full min-h-[340px] flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-border/70 mb-2">
        <div>
          <h4 className="text-xs font-bold text-text-bright uppercase tracking-wider font-mono">
            Product Concentration Hierarchy
          </h4>
          <p className="text-[11px] text-text-muted">
            ECharts interactive decomposition across asset categories and sub-lines
          </p>
        </div>
        {selectedProductCategory !== 'ALL' && (
          <button
            onClick={() => setSelectedProductCategory('ALL')}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal/20 text-teal border border-teal/40"
          >
            Filtered: {selectedProductCategory} (Reset)
          </button>
        )}
      </div>

      <div className="flex-1 w-full min-h-[280px]">
        <ReactECharts
          option={option}
          onEvents={onEvents}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
};
