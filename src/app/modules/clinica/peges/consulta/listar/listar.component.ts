import { Component, Input, OnInit } from '@angular/core';
import { ConsultaService } from '../../../services/consulta.service';
import { HttpClient } from '@angular/common/http';
import { IConsulta } from '../../../interfaces/consulta.interface';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  iConsultas: IConsulta[];

  @Input() queryString: string;
  p: any;
  constructor(private consultaService: ConsultaService, private http:HttpClient) { }

  ngOnInit(): void {
    this.getConsultas();
  }

  getConsultas(){
    this.consultaService.getConsultas().subscribe({
      next: (response) =>{
        console.log("datos:", response);
        this.iConsultas = response;
      }
    })
  }

}
