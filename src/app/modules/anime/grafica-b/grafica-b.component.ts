import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ChartType } from "./grafica-b";
import { ApexAnnotations, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from "ng-apexcharts";
import { ChartOption } from "./chartType.interface";

@Component({
  selector: "app-grafica-b",
  templateUrl: "./grafica-b.component.html",
  styleUrls: ["./grafica-b.component.scss"],
})
export class GraficaBComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;



  @Input("data") chartOptions: Partial<ChartOption> = {
    series: [
      {
        name: "My-series",
        data: [10, 41, 35],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    title: {
      text: "My first Angular Chart",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };

  constructor() {}

  ngOnInit(): void {
    // this.graficaBarra();
  }
  /*
  private graficaBarra() {
    this.barChart = barChart;
  } */
}
