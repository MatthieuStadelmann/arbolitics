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
  
export interface ArboDataResponse {
    data: ArboDataPoint[];
    message: string;
}