import { Libro } from "./libro.model";

export class Biblioteca {
  constructor(
    public nombre_biblio: string,
    public id?: number,
    public libros?: Libro[]
  ) {}
}
