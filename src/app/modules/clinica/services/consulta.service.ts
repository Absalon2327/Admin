import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstructorDeclaration } from "typescript";
import {
  IConsulta,
  IEspecialidades,
  IPacientes,
} from "../interfaces/consulta.interface";
import { Observable } from "rxjs";
import {
  IConsultaExcelTabla,
  ITablaConsulta,
} from "../interfaces/excel.interface";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: "root",
})
export class ConsultaService {
  url = "http://localhost:8080/consulta";
  url_esp = "http://localhost:8080/especialidad";
  urlG = "http://localhost:8080";

  constructor(private htt: HttpClient) {}

  public getConsultas(): Observable<IConsulta[]> {
    return this.htt.get<IConsulta[]>(this.url);
  }

  public getEspecialidades(): Observable<IEspecialidades[]> {
    return this.htt.get<IEspecialidades[]>(this.url_esp);
  }

  generarConsultaPdf() {
    //responseType, se utiliza para especificar el tipo de respuesta que se espera
    const httOptions = { responseType: "arraybuffer" as "json" }; //convertir la resouesta en formato json
    return this.htt.get<Blob>(this.url + `/pdf`, httOptions);
  }

  exportExcel(): Observable<Blob> {
    const endpoint = `${this.urlG}/paciente/excel`;
    return this.htt.get(endpoint, {
      responseType: "blob",
    });
  }

  getConsultaExporExcel(): Observable<IConsultaExcelTabla> {
    return this.htt.get<IPacientes[]>(this.urlG + `/paciente/listar`).pipe(
      map((resp: IPacientes[]) => {
        resp.length = 5;
        const dataExcel: IConsultaExcelTabla = {
          tablaConsulta: this.getConsultaTabla(resp),
        };
        return dataExcel;
      })
    );
  }

  private getConsultaTabla(response: IPacientes[]): ITablaConsulta[] {
    return response.map((item: IPacientes) => ({
      idPaciente: `${item.idPaciente}`,
      duiPaciente: `${item.duiPaciente}`,
      nombreCompletoPaciente: `${item.nombreCompletoPaciente}`,
      emailPaciente: `${item.emailPaciente}`,
      telefonoPaciente: `${item.telefonoPaciente}`,
      direccionPaciente: `${item.direccionPaciente}`,
    }));
  }
}
