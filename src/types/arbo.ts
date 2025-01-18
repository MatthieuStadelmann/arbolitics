export interface ArboDataPoint {
    DID: string;
    FMW: number;
    TMS: number;
    bvol: number;
    tem1: number;
    hum1: number;
    solr: number;
    prec: number;
    wind: number;
    wins: number;
    lwet: number;
}

export interface ArboApiResponse {
    data: ArboDataPoint[];
    message?: string;
}

export interface ArboDataResponse {
    [key: `device_${string}`]: ArboDataPoint[];
}