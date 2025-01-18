interface StatsOverlayProps {
  data: number[];
  unit: string;
  label: string;
}

export function StatsOverlay({ data, unit, label }: StatsOverlayProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const avg = data.reduce((a, b) => a + b, 0) / data.length;

  return (
    <div className="mb-4 flex justify-between text-sm">
      <div className="text-gray-600">{label} Stats:</div>
      <div className="flex gap-4">
        <span className="text-blue-500">Min: {min.toFixed(1)}°{unit}</span>
        <span className="text-green-500">Avg: {avg.toFixed(1)}°{unit}</span>
        <span className="text-red-500">Max: {max.toFixed(1)}°{unit}</span>
      </div>
    </div>
  );
} 