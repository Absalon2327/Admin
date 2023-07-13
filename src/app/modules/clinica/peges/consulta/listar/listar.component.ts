import { Component, Input, OnInit } from "@angular/core";
import { ConsultaService } from "../../../services/consulta.service";
import { HttpClient } from "@angular/common/http";
import {
  IConsulta,
  IEspecialidades,
} from "../../../interfaces/consulta.interface";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.scss"],
})
export class ListarComponent implements OnInit {
  iConsultas: IConsulta[];
  iEspecialidaes: IEspecialidades[];
  allConsultas: IConsulta[];

  @Input() queryString: string;
  p: any;
  constructor(
    private consultaService: ConsultaService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getConsultas();
    this.getEspecialidades();
  }

  getConsultas() {
    this.consultaService.getConsultas().subscribe({
      next: (response) => {
        console.log("datos:", response);
        this.iConsultas = response;
      },
    });
  }

  getEspecialidades() {
    this.consultaService.getEspecialidades().subscribe({
      next: (resp) => {
        console.log("esp:", resp);
        this.iEspecialidaes = resp;
      },
    });
  }

  descargarPdf() {
    this.consultaService.generarConsultaPdf().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "consultaMedicaByEspecialidad.pdf";
      link.click();
    });
  }

  generarConsultaPdf() {
    this.consultaService.generarConsultaPdf().subscribe((resp: Blob) => {
      const file = new Blob([resp], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl);
    });
  }

  crearPdf(){
    const data = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');//p= vertical, pt=unidades en puntos, a4= formato
    const content =
    `PACIENTES Y MÉDICOS CONSULTADOS
    -------------------------------------------------------------------`;
    const options = {
      background: 'white',
      scale: 3
    } ;
    html2canvas(data, options).then((resp) => {
      const img = resp.toDataURL('image/PNG');
      const bufferX = 60;
      const bufferY = 60;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX; //para el margen de 30 puntos
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, '', 'FAST');
      return doc;
    }).then((docResult) =>{
      docResult.text(content,10,10);
      docResult.save(`${new Date().toISOString()}_consultasG.pdf`);
    });
  }


  pdfMake() {
    this.consultaService.generarPdfMake(
      "PDFMAKE ---- ANGULAR",
      this.iConsultas
    );
  }
}
