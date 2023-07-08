import { HttpClient } from "@angular/common/http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { ImagePosition, Workbook } from "exceljs";
import * as fs from "file-saver";
import { LOGO } from "../constants/logo";
import {
  IConsultaExcelTabla,
  ITablaConsulta,
} from "../interfaces/excel.interface";

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  url = "http://localhost:8080";

  constructor(private htt: HttpClient) {}
  private workbook!: Workbook;

  async downloadExcel(dataExcel: IConsultaExcelTabla) {
    this.workbook = new Workbook();
    this.workbook.creator = "cursoAngular";
    //this.workbook.addWorksheet('PACIENTES');
    await this.crearTablaConsulta(dataExcel.tablaConsulta);

    this.workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data]);
      fs(blob, "pacientes.xlsx");
    });
  }

  private async crearTablaConsulta(dataPacienteTabla: ITablaConsulta[]) {
    const sheet = this.workbook.addWorksheet("PACIENTES");

    sheet.getColumn("E").width = 5;
    sheet.getColumn("F").width = 15;
    sheet.getColumn("G").width = 25;
    sheet.getColumn("H").width = 25;
    sheet.getColumn("I").width = 15;
    sheet.getColumn("J").width = 50;

    sheet.columns.forEach((column) => {
      column.alignment = {
        vertical: "middle",
        wrapText: true,
      };
    });

    const logoID = this.workbook.addImage({
      base64: LOGO,
      extension: "png",
    });

    const position: ImagePosition = {
      tl: { col: 1.4, row: 1.2 },
      ext: { width: 128, height: 128 },
    };
    sheet.addImage(logoID, position);

    sheet.mergeCells("E3", "J3");
    const titulo = sheet.getCell("E3");
    titulo.value = "CLÍNICA MÉDICA BIENESTAR UNIVERSATORIO";
    sheet.mergeCells("F5", "J5");
    const subtitulo = sheet.getCell("F5");
    subtitulo.value = "Reporte de Pacientes";

    subtitulo.style.font = {
      bold: true,
      size: 15,
      name: "Antique Olive",
      underline: "single",
      color: {
        argb: "000000",
      },
    };

    subtitulo.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: false,
    };

    titulo.style.font = {
      bold: true,
      size: 25,
      name: "Antique Olive",
      underline: "single",
      color: {
        argb: "000000",
      },
    };

    titulo.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: false,
    };

    const date = new Date();
    sheet.mergeCells("F6", "J6");
    const cedaFecha = sheet.getCell("G6");
    const fechaFormato = `${date.getDate()} / ${
      date.getMonth() + 1
    } / ${date.getFullYear()}`;
    cedaFecha.value = fechaFormato;

    cedaFecha.font = {
      name: "Arial Nova",
      size: 12,
      bold: true,
    };

    cedaFecha.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: false,
    };

    const headerR = sheet.getRow(9);
    headerR.values = [
      " ", // A
      " ", // B
      " ", // C
      " ", // D
      "ID", // E
      "DUI", // F
      "NOMBRE", // G
      "E-MAIL", // H
      "TELEFONO", // I
      "DIRECCIÓN", // J
    ];


    headerR.alignment = {
      vertical: "middle",
      wrapText: false,
    };
    ["E", "F", "G", "H", "I", "J", "K"].forEach((columnkey) => {
      sheet.getCell(`${columnkey}9`).font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 15,
        italic: true,
      };
      sheet.getCell(`${columnkey}9`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "9B9B9B" },
        bgColor: { argb: "" },
      };
    });
    const filasInsertar = sheet.getRows(10, dataPacienteTabla.length)!;
    for (let index = 0; index < filasInsertar.length; index++) {
      const itemData = dataPacienteTabla[index];
      const row = filasInsertar[index];
      row.values = [
        "",
        "",
        "",
        "",
        `${index + 1}`,
        `${itemData.duiPaciente}`,
        `${itemData.nombreCompletoPaciente}`,
        `${itemData.emailPaciente}`,
        `${itemData.telefonoPaciente}`,
        `${itemData.direccionPaciente}`,
      ];

      let fila = 10 + index;
      ["E", "F", "G", "H", "I", "J", "K"].forEach((columnkey) => {
        sheet.getCell(`${columnkey}${fila}`).border = {
          top: {style:'double', color: {argb: '00000000'}},
          left:  {style:'double', color: {argb: '00000000'}},
          bottom:  {style:'double', color: {argb: '00000000'}},
          right:  {style:'double', color: {argb: '00000000'}},
        };
      });

      const idImage = await this.getIdImage("../assets/images/no-image.png");
      sheet.addImage(idImage, {
        tl: { col: 10.2, row: row.number - 0.8 },
        ext: { width: 30, height: 30 },

      });
      row.height = 35;
    }
  }

  private async getIdImage(url: string): Promise<number> {
    const response = await fetch(url);
    const image = this.workbook.addImage({
      buffer: await response.arrayBuffer(),
      extension: "png",
    });
    return image;
  }
}
