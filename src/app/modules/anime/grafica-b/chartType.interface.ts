import {
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexAxisChartSeries,
} from "ng-apexcharts";
export type ChartOption = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
