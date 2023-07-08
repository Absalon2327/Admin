import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { ConsultaService } from '../../../services/consulta.service';
import { ExcelService } from '../../../services/excel.service';
import { IConsultaExcelTabla } from '../../../interfaces/excel.interface';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.scss']
})
export class ListarPacienteComponent implements OnInit {

  myimage!: string;
  codigoBase64!: string;
  breadCrumbItems: Array<{}>;
  constructor(private consultaService:ConsultaService, private excelService: ExcelService) { }


  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Excel" },
      { label: "Pacientes", active: true },
    ];
  }

  onChange($event: any){
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const observable = new Observable((suscribir: Subscriber<any>) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () =>{
        suscribir.next(fileReader.result);
        suscribir.complete();
      }
      fileReader.onerror = (error) =>{
        suscribir.error(error);
        suscribir.complete();
      }
    });

    observable.subscribe((resp:string) =>{
      this.myimage = resp;
      this.codigoBase64 = resp;
    })
  }

  exportExcelEndpoint(){
    this.consultaService.exportExcel().subscribe((data:any) => {
      let file = new Blob([data],
        {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        let fileUrl = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.download = 'paciente.xls';
        link.href=fileUrl;
        link.click();
    })
  }

  download(): void{
    this.consultaService.getConsultaExporExcel().subscribe((response:IConsultaExcelTabla) => {
      this.excelService.downloadExcel(response);
    })
  }

}
