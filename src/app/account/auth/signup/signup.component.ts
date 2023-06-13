import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "../../../core/services/auth.service";
import { environment } from "../../../../environments/environment";
import { first } from "rxjs/operators";
import { UserProfileService } from "../../../core/services/user.service";
import { IS_CLAVE, IS_EMAIL, IS_NAME } from "../constants/validaciones";
import Swal from "sweetalert2";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  error = "";
  successmsg = false;
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
    private userService: UserProfileService
  ) {}

  ngOnInit() {
    this.iniciarFormulario();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  iniciarFormulario(): FormGroup {
    return (this.signupForm = this.formBuilder.group({
      nombre_usuario: [
        "",
        [Validators.required, Validators.pattern(this.isNombre)],
      ],
      email: ["", [Validators.required, Validators.pattern(this.isEmail)]],
      password: [
        "",
        [Validators.required, Validators.pattern(this.isPassword)],
      ],
      repassword: [
        "",
        [Validators.required, Validators.pattern(this.isPassword)],
      ],
    }));
  }
  /**
   * On submit form
   */

  esCampoValido(campo: string) {
    const validarCampo = this.signupForm.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }

  onSubmit() {
    this.submitted = true;
    let contra = this.signupForm.get("password").value;
    let recontra = this.signupForm.get("repassword").value;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      Swal.fire({
        position: "center",
        title: "Ingrese sus credenciales",
        text: "submit disparado, formulario No valido",
        icon: "warning",
      });
      return Object.values(this.signupForm.controls).forEach((control) =>
        control.markAsTouched()
      );
    } else if (contra != recontra) {
      Swal.fire({
        position: "center",
        title: "Atención",
        text: "Las Contraseñas no coinciden",
        icon: "info",
      });
    } else {
      if (environment.defaultauth === "firebase") {
        this.authenticationService
          .register(this.f.email.value, this.f.password.value)
          .then((res: any) => {
            this.successmsg = true;
            if (this.successmsg) {
              Swal.fire({
                position: "center",
                title: "Bienvenido!",
                text: "Registro Exitoso!",
                icon: "success",
              });
              //this.router.navigate(["/dashboard"]);
            }
          })
          .catch((error) => {
            this.error = error ? error : "";
          });
      } else {
        this.userService
          .register(this.signupForm.value)
          .pipe(first())
          .subscribe(
            (data) => {
              this.successmsg = true;
              if (this.successmsg) {
                //this.router.navigate(["/account/login"]);
              }
              Swal.fire({
                position: "center",
                title: "Bienvenido!",
                text: "Registro Exitoso!",
                icon: "success",
              });
            },
            (error) => {
              this.error = error ? error : "";
            }
          );
      }
    }
  }
}
