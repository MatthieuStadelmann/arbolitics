"use client";
import { useDashboard } from "@/hooks/useDashboard";
import { DashboardFilters } from "@/components/DashboardFilters";
import { HumidityChart } from "./HumidityChart";
import { TemperatureChart } from "./TemperatureChart";
import { TimeRange } from "@/types/arbo";
import WeatherTable from "./WeatherTable";
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
    error,
  } = useDashboard();

  const renderData = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">Loading...</div>
      );
    }

    if (error) {
      return (
        <div className="flex h-64 items-center justify-center text-red-500">
          Error: {error.message}
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex h-64 items-center justify-center">
          No data available
        </div>
      );
    }
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <TemperatureChart
            data={data || []}
            timeRange={selectedTimeRange as TimeRange}
          />
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <HumidityChart
            data={data || []}
            selectedDevices={selectedDevices}
            timeRange={selectedTimeRange}
          />
        </div>
        <div className="col-span-2 mt-10">
          <h1 className="mb-4 text-2xl">Sensors Data Overview</h1>
          <WeatherTable weatherData={data} />
        </div>
      </div>
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
        onDeviceChange={(value) => setSelectedDevices(value ? [value] : [])}
      />

      {renderData()}
    </div>
  );
}
