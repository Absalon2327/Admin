import { Biblioteca } from "./biblioteca.models";
export class Libro {
  constructor(
    public nombre_libro: string,
    public biblioteca?: Biblioteca,
    public id?: number
  ) {}
}
