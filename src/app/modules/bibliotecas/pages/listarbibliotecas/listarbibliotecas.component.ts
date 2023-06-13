import { Component, OnInit } from "@angular/core";
import { BibliotecaService } from "../../services/biblioteca.service";
import { Biblioteca } from "../../models/biblioteca.models";
import { Libro } from "../../models/libro.model";
import { LibroService } from "../../services/libro.service";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NAME_VALIDATE } from "../../constants/constants";

@Component({
  selector: "app-listarbibliotecas",
  templateUrl: "./listarbibliotecas.component.html",
  styleUrls: ["./listarbibliotecas.component.scss"],
})
export class ListarbibliotecasComponent implements OnInit {
  formLibro!: FormGroup;
  private isLetras: string = NAME_VALIDATE;
  bibliotecas: Array<any> = [];
  libros: Array<any>[] = [];
  submitted: boolean;
  bibliotecaSeleccionada: Biblioteca = null;
  libroSeleccionado: Libro = null;
  cambiarBiblioteca: Biblioteca = null; //para cambiar libros a otra biclioteca
  ix: number;
  checked: boolean = false;
  //para la paginación
  page = 0;
  size = 10;
  totalElement: number = 0;
  isFirt: boolean = false;
  isLast: boolean = false;
  totalPages: Array<number> = [];
  hideme: boolean[] = [];
  breadCrumbItems: Array<{}>;
  constructor(
    private biblioService: BibliotecaService,
    private libroService: LibroService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Biblioteca" },
      { label: "Listar", active: true },
    ];
    this.mostrarBiblioteca();
    this.initForm();
  }

  initForm() {
    this.formLibro = this.fb.group({
      nombre: ["", [Validators.required, Validators.pattern(this.isLetras)]],
    });
  }

  mostrarBiblioteca() {
    this.biblioService.bibliotecas(this.page, this.size).subscribe({
      next: (response) => {
        console.log(response.content);

        this.bibliotecas = response.content;

        this.bibliotecas.forEach((x) => {
          this.hideme.push(true);
        });
      },
    });
  }

  changeValue(i: any) {
    this.hideme[i] = !this.hideme[i];
  }

  llenarHideme() {
    this.bibliotecas.forEach((x) => {
      this.hideme.push(true);
    });
  }

  mostrarLibros(biblioteca: Biblioteca, i: number) {
    this.mostrarBiblioteca();
    this.changeValue(i);
    this.libros[i] = [];
    this.biblioService.bibliotecaById(biblioteca).subscribe({
      next: (response) => {
        this.libros[i] = response.libros;
        console.log("libros: ", this.libros);
      },
    });
  }

  cambiarAotraBiblioteca(biblioteca: Biblioteca) {
    this.cambiarBiblioteca = biblioteca;
  }

  borrar(librito: Libro, i: number) {
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `No guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.deleteLibro(librito).subscribe({
          next: (resp) => {
            if (!resp) {
              this.changeValue(i);
              Swal.fire("Eliminalo!", "El Libro ha sido eliminado", "success");
            } else {
              Swal.fire("Error!", "Hable con el administrador", "warning");
            }
          },
        });
      } else if (result.isDenied) {
        Swal.fire("Cambios no aplicados", "", "info");
      }
    });
  }

  setSize(size: number) {
    this.size = size;
    this.mostrarBiblioteca();
  }

  paraAgregar(content: any, biblioteca: Biblioteca, i: number) {
    this.initForm();
    this.submitted = false;
    this.bibliotecaSeleccionada = biblioteca;
    this.libroSeleccionado = null;
    this.ix = i;
    this.modalService.open(content);
  }
  paraEditar(content: any, biblioteca: Biblioteca, libro: Libro, i: number) {
    this.bibliotecaSeleccionada = biblioteca;
    this.libroSeleccionado = libro;
    this.submitted = false;
    this.formLibro.patchValue(libro);
    this.modalService.open(content);
  }

  guardarLibro() {
    if (this.formLibro.valid) {
      if (this.libroSeleccionado == null) {
        this.registrarLibro();
      } else {
        this.editarLibro();
      }
      this.modalService.dismissAll();
      this.submitted = true;
    } else {
      Swal.fire({
        position: "center",
        title: "Faltan datos en el formulario",
        text: "submit disparado, formulario No valido",
        icon: "warning",
      });
    }
    return Object.values(this.formLibro.controls).forEach((control) =>
      control.markAsTouched()
    );

  }

  setPage(page: number): void {
    this.page = page;
    this.mostrarBiblioteca();
  }

  retroceder() {
    if (!this.isFirt) {
      this.page--;
      this.mostrarBiblioteca();
    }
  }

  adelante() {
    if (!this.isLast) {
      this.page++;
      this.mostrarBiblioteca();
    }
  }

  registrarLibro() {
    const nombre = this.formLibro.get("nombre").value;
    const librito: Libro = new Libro(nombre, this.bibliotecaSeleccionada);
    console.log("librito", librito);
    //aqui guardar
    this.libroService.agregarLibro(librito).subscribe({
      next: (resp) => {
        if (!resp) {
          Swal.fire({
            position: "center",
            title: "Buen Trabajo!",
            icon: "success",
            text: "Datos Guardados con Éxito!",
          });
          this.changeValue(this.ix);
        }
      },
      error: () => {
        Swal.fire({
          position: "center",
          title: "Error",
          icon: "error",
          text: "Error al registrar hable con el Administrador",
        });
      },
    });
  }

  editarLibro() {
    const nombre = this.formLibro.get("nombre").value;
    this.libroSeleccionado = nombre;
    this.libroSeleccionado.biblioteca = this.bibliotecaSeleccionada;
    //aqui guardar
    this.libroService.editarLibro(this.libroSeleccionado).subscribe({
      next: (resp) => {
        if (resp) {
          Swal.fire({
            position: "center",
            title: "Buen Trabajo!",
            icon: "success",
            text: "Datos Modificados con Éxito!",
          });
          this.changeValue(this.ix);
        }
      },
      error: () => {
        Swal.fire({
          position: "center",
          title: "Error",
          icon: "error",
          text: "Error al modificar hable con el Administrador",
        });
      },
    });
  }

  trasladarBiblioteca(biblioteca: Biblioteca) {
    let librosACambiar: Libro[] = [];
    for (let x of biblioteca["libros"]) {
      let element = <HTMLInputElement>(
        document.getElementById(x["id"].toString())
      );
      if (element.checked) {
        let obj: Libro = new Libro(
          x.nombre_libro,
          this.cambiarBiblioteca,
          x.id
        );
        librosACambiar.push(obj);
        this.libroService.editarLibro(obj).subscribe({
          next: (resp) => {
            Swal.fire({
              position: "center",
              title: "Buen Trabajo!",
              icon: "success",
              text: "Datos Modificados con Éxito!",
            });
          },
          error: () => {
            Swal.fire({
              position: "center",
              title: "Error",
              icon: "error",
              text: "Error al modificar hable con el Administrador",
            });
          },
        });
      }
    }
    this.changeValue(this.ix);
    this.llenarHideme();
    this.mostrarBiblioteca();
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formLibro.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }
}
