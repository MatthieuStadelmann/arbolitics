"use client";
import { AgGridReact } from "ag-grid-react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { ArboDataPoint } from "@/types/arbo";

ModuleRegistry.registerModules([AllCommunityModule]);

const WeatherTable = ({ weatherData }: { weatherData: ArboDataPoint[] }) => {
  const columns: ColDef<ArboDataPoint>[] = [
    { headerName: "Device ID", field: "DID", sortable: true, filter: true },
    { headerName: "Temp (°C)", field: "tem1", sortable: true, filter: true },
    { headerName: "Humidity (%)", field: "hum1", sortable: true, filter: true },
    {
      headerName: "Solar Radiation",
      field: "solr",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Precipitation",
      field: "prec",
      sortable: true,
      filter: true,
    },
    { headerName: "Wind Speed", field: "wind", sortable: true, filter: true },
    { headerName: "Leaf Wetness", field: "lwet", sortable: true, filter: true },
    {
      headerName: "Battery Voltage",
      field: "bvol",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Timestamp",
      field: "TMS",
      sortable: true,
      filter: true,
      valueFormatter: (params: { value: number }) =>
        new Date(params.value * 1000).toLocaleString(),
    },
  ];

  return (
    <div className="h-[500px] rounded-lg bg-white p-6 shadow-lg">
      <AgGridReact
        rowData={weatherData}
        columnDefs={columns}
        pagination={true}
        rowModelType="clientSide"
      />
    </div>
  );
};

export default WeatherTable;
