"use client";
import { AgGridReact } from "ag-grid-react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { ArboDataPoint } from "@/types/arbo";
import { themeAlpine } from "ag-grid-community";
import { GRID_THEME_CONFIG } from '@/config/tableTheme';
import { WEATHER_TABLE_COLUMNS } from '@/config/tableColumns';

ModuleRegistry.registerModules([AllCommunityModule]);

const WeatherTable = ({ weatherData }: { weatherData: ArboDataPoint[] }) => {
  const customTheme = themeAlpine.withParams(GRID_THEME_CONFIG);

  return (
    <div className="h-[500px] rounded-lg bg-white p-6 shadow-lg">
      <AgGridReact
        theme={customTheme}
        rowData={weatherData}
        columnDefs={WEATHER_TABLE_COLUMNS}
        pagination={true}
        rowModelType="clientSide"
      />
    </div>
  );
};

export default WeatherTable;