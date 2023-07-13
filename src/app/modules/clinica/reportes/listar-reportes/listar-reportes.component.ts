import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-reportes',
  templateUrl: './listar-reportes.component.html',
  styleUrls: ['./listar-reportes.component.scss']
})
export class ListarReportesComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Generar" },
      { label: "Reportes", active: true },
    ];
  }

}
