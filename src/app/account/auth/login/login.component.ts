import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthenticationService } from "../../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../../core/services/authfake.service";

import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

import { environment } from "../../../../environments/environment";
import { IS_CLAVE, IS_EMAIL, IS_NAME } from "../constants/validaciones";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
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
    private authFackservice: AuthfakeauthenticationService
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
        [Validators.minLength]
      ],
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
  onSubmit() {
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
    } else {
      if (environment.defaultauth === "firebase") {
        this.authenticationService
          .login(this.f.email.value, this.f.password.value)
          .then((res: any) => {
            this.router.navigate(["/dashboard"]);
          })
          .catch((error) => {
            this.error = error ? error : "";
          });
      } else {
        this.authFackservice
          .login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            (data) => {
              this.router.navigate(["/dashboard"]);
            },
            (error) => {
              this.error = error ? error : "";
            }
          );
      }
    }

  }
}
