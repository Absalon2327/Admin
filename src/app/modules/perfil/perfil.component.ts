import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/account/services/usuario.service';
import { Usuario } from '../../account/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Perfil" },
      { label: "Editar", active: true },
    ];
  }

  get perfil() {
    return this.usuarioService.usuario;
  }
}
