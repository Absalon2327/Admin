import { Component, Input, OnInit } from "@angular/core";
import { ConsultaService } from "../../../services/consulta.service";
import { HttpClient } from "@angular/common/http";
import {
  IConsulta,
  IEspecialidades,
} from "../../../interfaces/consulta.interface";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.scss"],
})
export class ListarComponent implements OnInit {
  iConsultas: IConsulta[];
  iEspecialidaes: IEspecialidades[];

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

  descargarPdf(){
    this.consultaService.generarConsultaPdf().subscribe((data: Blob) =>{
      const blob = new Blob([data], {type: 'application/pdf'});
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'consultaMedicaByEspecialidad.pdf';
      link.click();
    })
  }

  generarConsultaPdf(){
    this.consultaService.generarConsultaPdf().subscribe((resp:Blob)=>{
      const file = new Blob([resp], {type: 'application/pdf'});
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl);
    })
  }

  crearPdf(){

  }

  pdfMake(){

  }
}
