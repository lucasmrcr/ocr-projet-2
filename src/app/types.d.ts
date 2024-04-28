interface ChartData {
  name: string | number;
  value: number;
}

interface LineChartData {
  name: string;
  series: ChartData[]
}