export interface ChartData {
  labels: string[];
  datasets: [{ values: number[] }];
}

export enum ChartDataType {
  ByCategories,
  ByUsers,
  ByTemperature,
}