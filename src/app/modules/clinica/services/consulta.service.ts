import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  IConsultaExcelTabla,
  ITablaConsulta,
  ITablaMedico,
} from "../interfaces/excel.interface";
import { map } from "rxjs/internal/operators/map";
import { Img, PdfMakeWrapper, Table, Txt } from "pdfmake-wrapper";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { IMedicos } from "../interfaces/consulta.interface";
import {
  IConsulta,
  IEspecialidades,
  IPacientes,
} from "../interfaces/consulta.interface";
PdfMakeWrapper.setFonts(pdfFonts);

@Injectable({
  providedIn: "root",
})
export class ConsultaService {
  url = "http://localhost:8080/consulta";
  url_esp = "http://localhost:8080/especialidad";
  urlG = "http://localhost:8080";

  responseMedicos: IMedicos[];

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

  getMedicosExcel():Observable<IMedicos[]> {
    return this.htt.get<IMedicos[]>(this.urlG + `/medico`);
  }

  getConsultaExporExcel(): Observable<IConsultaExcelTabla> {

    /* this.htt.get<IMedicos[]>(this.urlG + `/medico`).pipe(
      map((response: IMedicos[]) => {
        this.responseMedicos = response;
      })
    ); */
    this.getMedicosExcel().subscribe({
      next: (response) => {
        this.responseMedicos = response;
      }
    });
    console.log("medic in service:", this.responseMedicos);

    return this.htt.get<IPacientes[]>(this.urlG + `/paciente/listar`).pipe(
      map((resp: IPacientes[]) => {
        resp.length = 5;
        const dataExcel: IConsultaExcelTabla = {
          tablaConsulta: this.getConsultaTabla(resp),
          tablaMedico: this.responseMedicos
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

  /* private getMedicoTabla(response: IMedicos[]): ITablaMedico[] {
    return response.map((item: IMedicos) => ({
      id_medico: `${item.id_medico}`,
      duiMedico: `${item.duiMedico}`,
      nombreMedico: `${item.nombreMedico}`,
      apellidoMedico: `${item.apellidoMedico}`,
      correoMedico: `${item.correoMedico}`,
      telefonoMedico: `${item.telefonoMedico}`,
      direccionMedico: `${item.direccionMedico}`,
      jvpm: `${item.jvpm}`,
      nombreCompletoMedico: `${item.nombreCompletoMedico}`,
    }));
  } */
  async generarPdfMake(titulo: string, data: IConsulta[]) {
    const pdf = new PdfMakeWrapper();
    pdf.header(
      new Txt(`${titulo}`).alignment("right").italics().margin(10).end
    );
    pdf.add(
      new Txt("REPORTE DE CONSULTAS")
        .color("blue")
        .fontSize(18)
        .bold()
        .alignment("center").end
    );
    pdf.add(new Txt("").margin(15).end);
    pdf.add(
      await new Img("assets/images/no-image.png")
        .height(50)
        .width(50)
        .absolutePosition(60, 40)
        .build()
    );
    pdf.add(new Txt("").margin(15).end);
    pdf.add(
      new Txt("CONSULTAS:").margin(15).bold().decoration("underline").end
    );
    pdf.add(new Txt("").margin(15).end);
    pdf.add(
      new Table([["", "Paciente", "Médico", "Especialidad", "Fecha"]])
        .alignment("center")
        .widths([20, 200, 200, 150, 100])
        .fontSize(12)
        .italics()
        .bold()
        .layout("lightHorizontalLines").end
    );
    console.log(data);

    for (let x of data) {
      pdf.add(
        new Table([
          ["", "", "", "", ""],
          [
            "",
            `${x.nombrePaciente}`,
            `${x.nombrePaciente}`,
            `${x.nombreEspecialidad}`,
            `${x.fechaConsulta}`,
          ],
        ])
          .widths([20, 200, 200, 150, 100])
          .fontSize(10)
          .layout("lightHorizontalLines").end
      );
    }
    pdf.add(new Txt("").margin(20).end);
    pdf.add(new Txt("F.______________________").alignment("right").end);
    pdf.footer(
      new Txt("" + new Date()).alignment("left").italics().margin(10).end
    );
    pdf.pageOrientation("landscape");
    pdf.create().open();
  }
}
