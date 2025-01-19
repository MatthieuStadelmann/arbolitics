interface StatsOverlayProps {
  data: number[];
  label: string;
}

export function StatsOverlay({ data, label }: StatsOverlayProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const avg = data.reduce((a, b) => a + b, 0) / data.length;

  return (
    <div className="mb-4 flex justify-between text-sm">
      <div className="text-gray-600">{label} Stats:</div>
      <div className="flex gap-4">
        <span className="text-blue-500">Min: {min.toFixed(1)}</span>
        <span className="text-green-500">Avg: {avg.toFixed(1)}</span>
        <span className="text-red-500">Max: {max.toFixed(1)}</span>
      </div>
    </div>
  );
} 