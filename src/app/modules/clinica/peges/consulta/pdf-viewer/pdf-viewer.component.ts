import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  url = 'http://localhost:8080/paciente/pdf/lineas'

  src = this.url;

  constructor() { }

  ngOnInit(): void {
  }

}
