import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Libro } from "../models/libro.model";

@Injectable({
  providedIn: "root",
})
export class LibroService {
  url = "http://localhost:8080/api/libro";
  constructor(private http: HttpClient) {}

  agregarLibro(librito: Libro) {
    const url = `${this.url}`;
    return this.http.post(url, librito);
  }

  editarLibro(librito: Libro) {
    const url = `${this.url}/${librito.id}`;
    return this.http.put(url, librito);
  }

  deleteLibro(librito: Libro) {
    const url = `${this.url}/${librito.id}`;
    return this.http.delete(url);
  }
}
