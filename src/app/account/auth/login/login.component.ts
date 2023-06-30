import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthenticationService } from "../../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../../core/services/authfake.service";

import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

import { environment } from "../../../../environments/environment";
import { IS_CLAVE, IS_EMAIL, IS_NAME } from "../../constants/validaciones";
import Swal from "sweetalert2";
import { UsuarioService } from "../../services/usuario.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  storage: Storage = window.localStorage;
  loginForm!: FormGroup;
  submitted = false;
  error = "";
  returnUrl: string;

  private isPassword: string = IS_CLAVE;
  private isNombre: string = IS_NAME;
  private isEmail: string = IS_EMAIL;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private usuarioServicio: UsuarioService
  ) {}

  ngOnInit() {
    this.iniciarFormulario();
    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  private iniciarFormulario(): FormGroup {
    return (this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(this.isEmail)]],
      password: [
        "",
        [Validators.required, Validators.pattern(this.isPassword)],
      ],
      remenber: [false],
    }));
  }

  verContra() {
    const contra: any = document.getElementById("contrasenia");
    if (contra.type == "password") {
      contra.type = "text";
    } else {
      contra.type = "password";
    }
  }

  esCampoValido(campo: string) {
    const validarCampo = this.loginForm.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  /**
   * Form submit
   */
  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      Swal.fire({
        position: "center",
        title: "Ingrese sus credenciales",
        text: "submit disparado, formulario No valido",
        icon: "warning",
      });
      return Object.values(this.loginForm.controls).forEach((control) =>
        control.markAsTouched()
      );
    }

    this.usuarioServicio.login(this.loginForm.value).subscribe({
      next: (resp) => {
        if (this.loginForm.get("remenber")?.value) {
          this.storage.setItem("email", this.loginForm.get("email")?.value);
        } else {
          this.storage.removeItem("email");
        }
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
        });
      },
    });
  }
}
