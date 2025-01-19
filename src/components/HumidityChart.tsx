import ReactECharts from 'echarts-for-react';
import { ArboDataPoint } from '@/types/arbo';
import { useHumidityChart } from '@/hooks/useHumidityChart';

interface HumidityChartProps {
  data: ArboDataPoint[];
  selectedDevices: string[];
  timeRange: string;
}

export function HumidityChart({ data, selectedDevices, timeRange }: HumidityChartProps) {
  const { series, xAxisLabels, yAxisMin, yAxisMax } = useHumidityChart({ 
    data,
    selectedDevices,
    timeRange 
  });

  const options = {
    title: {
      text: 'Humidity Trends',
      left: 'center',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16
      }
    },
    legend: {
      show: true,
      top: "5%",
      right: "10%",
      textStyle: { fontSize: 12 },
      itemWidth: 15,
      itemHeight: 3
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      textStyle: {
        color: '#333'
      }
    },
    xAxis: {
      type: 'category',
      data: xAxisLabels,
      axisLabel: {
        color: '#666'
      },
      axisLine: {
        lineStyle: { color: '#ddd' }
      }
    },
    yAxis: {
      type: 'value',
      min: yAxisMin,
      max: yAxisMax,
      splitNumber: 8,
      axisLabel: { 
        formatter: (value: number) => `${value}%`,
        color: '#666'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#eee',
          type: 'dashed'
        }
      }
    },
    grid: { 
      left: "10%", 
      right: "5%", 
      bottom: "15%",
      top: "15%",
      height: "75%"
    },
    series
  };

  return (
    <div>
      <ReactECharts
        option={options}
        style={{ height: "600px" }}
        key={JSON.stringify(series)}
      />
    </div>
  );
} 