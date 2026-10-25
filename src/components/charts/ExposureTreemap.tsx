import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '../../store/useAppStore';
import { formatPosCrs, formatPercent } from '../../lib/formatters';

export const ExposureTreemap: React.FC = () => {
  const { productTreemap, selectedProductCategory, setSelectedProductCategory } = useAppStore();

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(16, 31, 48, 0.95)',
      borderColor: '#54D7C7',
      borderWidth: 1,
      textStyle: { color: '#EDF5F7', fontSize: 12 },
      formatter: (params: any) => {
        const val = params.value;
        const name = params.name;
        const data = params.data;
        return `
          <div style="font-family: sans-serif; padding: 4px;">
            <div style="font-weight: 700; color: #54D7C7; font-size: 13px;">${name}</div>
            <div style="margin-top: 4px;">Exposure: <b>₹${Number(val).toFixed(2)} Cr</b></div>
            ${data?.accounts ? `<div>Accounts: <b>${data.accounts}</b></div>` : ''}
            ${data?.share ? `<div>Portfolio Share: <b>${data.share}%</b></div>` : ''}
            <div style="font-size: 10px; color: #91A9BA; margin-top: 4px;">* Click block to filter portfolio views</div>
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
            color: '#101F30',
            borderColor: '#1E354D',
            textStyle: { color: '#54D7C7', fontSize: 11 }
          }
        },
        label: {
          show: true,
          formatter: '{b}\n₹{c} Cr',
          fontSize: 11,
          color: '#EDF5F7',
          fontWeight: 600
        },
        itemStyle: {
          borderColor: '#08131F',
          borderWidth: 2,
          gapWidth: 2
        },
        levels: [
          {
            itemStyle: {
              borderColor: '#08131F',
              borderWidth: 3,
              gapWidth: 3
            }
          },
          {
            color: ['#1C5D64', '#1E4B6E', '#2A4365', '#245E56', '#4A3B69', '#5E3B4D'],
            colorMappingBy: 'id',
            itemStyle: {
              borderColor: '#101F30',
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
