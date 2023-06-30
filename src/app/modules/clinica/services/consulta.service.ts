import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstructorDeclaration } from 'typescript';
import { IConsulta } from '../interfaces/consulta.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url = "http://localhost:8080/consulta";

  constructor(private htt:HttpClient) { }

  public getConsultas(): Observable<IConsulta>{
    return this.htt.get<IConsulta>(this.url);
  }
}
