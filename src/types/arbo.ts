export interface ArboDataPoint {
    DID: string;     // Device ID (e.g. "25_225", "25_226")
    FMW: number;     // Firmware version
    TMS: number;     // Timestamp
    bvol: number;    // Battery voltage
    tem1: number;    // Temperature
    hum1: number;    // Humidity
    solr: number;    // Solar radiation
    prec: number;    // Precipitation
    wind: number;    // Wind speed
    wins: number;    // Wind direction
    lwet: number;    // Leaf wetness
  }
  
  export interface ArboDataResponse {
    data: ArboDataPoint[];
    message: string;
  }