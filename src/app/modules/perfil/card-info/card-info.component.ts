import { Component, Input, OnInit } from "@angular/core";
import { Usuario } from "../../../account/models/usuario.model";
import { UsuarioService } from "../../../account/services/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-card-info",
  templateUrl: "./card-info.component.html",
  styleUrls: ["./card-info.component.scss"],
})
export class CardInfoComponent implements OnInit {
  public imagenSubir!: File;
  public imgTemp: string | ArrayBuffer = null;

  constructor(private usuarioService: UsuarioService) {}
  ngOnInit(): void {
    //
  }

  get perfil() {
    return this.usuarioService.usuario;
  }

  preVisualizarImagen(event: any) {
    this.imagenSubir = event.target.files[0];
    //cambia a imagen previa
    if (!this.imagenSubir) {
      this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }
  subirImagen() {
    this.usuarioService
      .actualizarFoto(this.imagenSubir, "usuarios", this.perfil.uid || "")
      .then((img: string) => {
        this.perfil.img = img;
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Se cambió la imagen con éxito",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo subir la imagen",
        });
      });
  }
}
