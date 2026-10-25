import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useAppStore } from '../../store/useAppStore';
import { AlertCircle, GitFork } from 'lucide-react';

export const ExposureSankey: React.FC = () => {
  const { sankeyData, selectedState } = useAppStore();

  if (!sankeyData || !sankeyData.nodes || sankeyData.nodes.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-text-muted text-xs font-mono">
        Loading decomposition pathways...
      </div>
    );
  }

  // Filter links if a state is selected to keep diagram crisp and highly focused
  const filteredLinks = selectedState
    ? sankeyData.links.filter(
        (l) => l.source === selectedState || l.target === selectedState || true // keep connected flows
      )
    : sankeyData.links;

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      backgroundColor: 'rgba(16, 31, 48, 0.95)',
      borderColor: '#54D7C7',
      borderWidth: 1,
      textStyle: { color: '#EDF5F7', fontSize: 12 },
      formatter: (params: any) => {
        if (params.dataType === 'edge') {
          return `
            <div style="font-family: sans-serif; padding: 4px;">
              <span style="color: #91A9BA;">Flow Pathway:</span><br/>
              <b>${params.data.source}</b> → <b>${params.data.target}</b><br/>
              Exposure: <b style="color: #54D7C7;">₹${Number(params.data.value).toFixed(2)} Cr</b>
            </div>
          `;
        }
        return `
          <div style="font-family: sans-serif; padding: 4px;">
            <b style="color: #54D7C7;">${params.name}</b><br/>
            Category: ${params.data?.category || 'Node'}
          </div>
        `;
      }
    },
    series: [
      {
        type: 'sankey',
        data: sankeyData.nodes,
        links: filteredLinks,
        emphasis: {
          focus: 'adjacency'
        },
        nodeAlign: 'justify',
        orient: 'horizontal',
        draggable: false,
        lineStyle: {
          color: 'gradient',
          curveness: 0.5,
          opacity: 0.45
        },
        label: {
          color: '#EDF5F7',
          fontFamily: 'sans-serif',
          fontSize: 10,
          fontWeight: 600
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#101F30'
        }
      }
    ]
  };

  return (
    <div className="w-full h-full min-h-[360px] flex flex-col justify-between">
      {/* Header & Compliance Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-border/70 mb-2">
        <div>
          <div className="flex items-center space-x-2">
            <GitFork className="w-4 h-4 text-teal" />
            <h4 className="text-xs font-bold text-text-bright uppercase tracking-wider font-mono">
              Exposure Anatomy Decomposition
            </h4>
          </div>
          <p className="text-[11px] text-text-muted">
            State → Product Line → Delinquency Bucket → Operational Allocation Workflow
          </p>
        </div>

        {/* Mandatory Hackathon Compliance Notice */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-accent-blue/10 border border-accent-blue/30 text-[10px] text-accent-blue">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Cross-sectional snapshot (not loans transitioning over time)</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[290px]">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
};
