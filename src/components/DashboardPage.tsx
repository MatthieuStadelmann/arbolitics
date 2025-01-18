"use client";
import { useState } from 'react';
import { TimeRange, Device } from '@/types/dashboard';
import { useArboData } from '@/hooks/useArboData';

export function DashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('daily');
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const { data, isLoading, error } = useArboData(10, 1);

  const timeRanges: TimeRange[] = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Last 7 days' },
    { id: 'monthly', label: 'Last 4 weeks' },
  ];

  const devices: Device[] = [
    { id: '25_225', name: 'Device 25_225', isActive: true },
    { id: '25_226', name: 'Device 25_226', isActive: true },
  ];

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

    if (!data || !Array.isArray(data.data)) {
      console.log('Received data:', data);
      return <div className="flex h-64 items-center justify-center">No data available</div>;
    }

    return (
      <pre className="h-64 overflow-auto text-sm">
        {JSON.stringify(
          data.data.map(d => ({
            device: d.DID,
            temperature: d.tem1,
            time: new Date(d.TMS).toLocaleString()
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

      <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div>
            <h2 className="mb-4 text-lg font-normal">Select time Range:</h2>
            <div className="flex gap-4">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedTimeRange(range.id)}
                  className={`rounded-lg px-6 py-2 ${
                    selectedTimeRange === range.id
                      ? 'bg-[#2B4C15] text-white'
                      : 'bg-[#2B4C15]/10 text-[#2B4C15]'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-normal">Select Device(s):</h2>
            <div className="space-y-3">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center gap-3">
                  <span>{device.name}</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={selectedDevices.includes(device.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDevices([...selectedDevices, device.id]);
                        } else {
                          setSelectedDevices(selectedDevices.filter(id => id !== device.id));
                        }
                      }}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2B4C15] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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