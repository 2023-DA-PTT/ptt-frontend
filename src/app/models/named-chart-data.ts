import {ChartConfiguration} from "chart.js";

export interface NamedChartData {
  name: string;
  data: ChartConfiguration<'line'>['data'];
}
