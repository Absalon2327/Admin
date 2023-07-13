import { Component, OnInit } from '@angular/core';
import { UploadServiceService } from '../services/upload-service.service';

@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.scss']
})
export class SubirArchivosComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  myFiles: string[] = [];
  file!: File;
  constructor(private archivoService: UploadServiceService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Archivos" },
      { label: "Subir", active: true },
    ];
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
  }

  subir() {
    this.archivoService.upload(this.file).subscribe((resp) => {
      console.log("respuesta", resp);
    });
  }

  onFileChange(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  multiple() {
    this.archivoService.multiple(this.myFiles).subscribe((resp) => {
      console.log("respuesta mult", resp);
    });
  }

}
