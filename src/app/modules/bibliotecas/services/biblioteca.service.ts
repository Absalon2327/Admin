import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Biblioteca } from "../models/biblioteca.models";

@Injectable({
  providedIn: "root",
})
export class BibliotecaService {
  url = "http://localhost:8080/api/biblioteca";
  //?page=0&size=5&order=id,asc

  constructor(private http: HttpClient) {}

  public bibliotecas(page: number, size: number): Observable<any> {
    return this.http.get(
      this.url + '?' + `page=${page}&size=${size}`
    );
  }

  public bibliotecaById(biblioteca: Biblioteca): Observable<Biblioteca> {
    return this.http.get<Biblioteca>(this.url + '/' + `${biblioteca.id}`);
  }
}
