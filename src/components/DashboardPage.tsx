"use client";
import { useDashboard } from '@/hooks/useDashboard';
import { DashboardFilters } from '@/components/DashboardFilters';
import { DEVICE_IDS } from '@/constants/arbo';

export function DashboardPage() {
  const {
    selectedTimeRange,
    setSelectedTimeRange,
    selectedDevices,
    setSelectedDevices,
    timeRanges,
    devices,
    data,
    isLoading,
    error
  } = useDashboard();

  const renderData = () => {
    if (isLoading) {
      return <div className="flex h-64 items-center justify-center">Loading...</div>;
    }

    if (error) {
      return (
        <div className="flex h-64 items-center justify-center text-red-500">
          Error: {error.message}
        </div>
      );
    }

    if (!data || (!data[`device_${DEVICE_IDS.DEVICE_1}`] && !data[`device_${DEVICE_IDS.DEVICE_2}`])) {
      return <div className="flex h-64 items-center justify-center">No data available</div>;
    }

    return (
      <pre className="h-auto text-sm">
        {JSON.stringify(
          [...(data[`device_${DEVICE_IDS.DEVICE_1}`] || []), ...(data[`device_${DEVICE_IDS.DEVICE_2}`] || [])].map(d => ({
            device: d.DID,
            timestamp: new Date(d.TMS).toLocaleString(),
            firmware: d.FMW,
            battery: d.bvol,
            temperature: d.tem1,
            humidity: d.hum1,
            solarRadiation: d.solr,
            precipitation: d.prec,
            windSpeed: d.wind,
            windDirection: d.wins,
            leafWetness: d.lwet
          })),
          null,
          2
        )}
      </pre>
    );
  };

  return (
    <div className="p-8">
      <h1 className="mb-8 text-4xl font-normal">Insights</h1>
      
      <DashboardFilters
        timeRanges={timeRanges}
        devices={devices}
        selectedTimeRange={selectedTimeRange}
        selectedDevices={selectedDevices}
        onTimeRangeChange={setSelectedTimeRange}
        onDeviceChange={(value) => setSelectedDevices([value])}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-normal">Temperature Trends</h2>
          {renderData()}
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-normal">Humidity & Anomalies</h2>
          {renderData()}
        </div>
      </div>
    </div>
  );
} 