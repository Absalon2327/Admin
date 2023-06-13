import { Component, Input, OnInit } from "@angular/core";
import { Color, Label, MultiDataSet } from "ng2-charts";

@Component({
  selector: "app-grafica-a",
  templateUrl: "./grafica-a.component.html",
  styleUrls: ["./grafica-a.component.scss"],
})
export class GraficaAComponent implements OnInit {
  @Input() title: string = "Sin título";
  @Input('labels') donutLabels: Label[] = ["label1", "label2"];
  @Input('data') donutData: MultiDataSet= [ [350,4501] ];
  @Input('colors') colores: Color[] = [{ backgroundColor: ['#46FF33','#08D0DA'] }];

  constructor() {}

  ngOnInit(): void {}
}
