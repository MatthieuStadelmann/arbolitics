import { ColDef } from "ag-grid-community";
import { ArboDataPoint } from "@/types/arbo";

export const WEATHER_TABLE_COLUMNS: ColDef<ArboDataPoint>[] = [
  {
    headerName: "Device ID",
    field: "DID",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Firmware",
    field: "FMW",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Date",
    field: "TMS",
    sortable: true,
    filter: true,
    valueFormatter: (params: { value: number }) => {
      const date = new Date(params.value * 1000);
      return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Berlin",
      });
    },
  },
  {
    headerName: "Battery Voltage",
    field: "bvol",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Temp (°C)",
    field: "tem1",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Humidity (%)",
    field: "hum1",
    sortable: true,
    filter: true,
    cellStyle: (params) => {
      if (params.value < 0) {
        return { color: "red", fontWeight: "bold" };
      }
      return null;
    },
  },
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
  {
    headerName: "Wind Speed",
    field: "wind",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Wind Speed 2",
    field: "wins",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Leaf Wetness",
    field: "lwet",
    sortable: true,
    filter: true,
  },
];
