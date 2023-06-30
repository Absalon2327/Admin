import { inject, Injectable, NgZone } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Usuario } from "../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { RegistroUsuario } from "../interfaces/registrarUsuario.interface";
import { LoginUsuario } from "../interfaces/loginUsuario.interface";
import { tap, catchError, map } from "rxjs/operators";
import { throwError, Observable, of } from "rxjs";
import { CookieService } from "ngx-cookie-service";

const base_url = environment.baseURL;

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  storage: Storage = window.localStorage;
  public usuario!: Usuario;
  private http = inject(HttpClient);

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private cookies: CookieService
  ) {}

  get rol(): "ADMIN_ROLE" | "USER_ROLE" | string {
    return this.usuario.rol;
  }
  crearUsuario(forData: RegistroUsuario) {
    console.log();
    return this.http.post(`${base_url}/usuarios`, forData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  guardarLocalStorage(token: string, menu: any) {
    this.storage.setItem("token", token);
    this.storage.setItem("menu", JSON.stringify(menu));
  }

  get token(): string {
    return this.storage.getItem("token") || "";
  }

  login(formData: LoginUsuario) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
        //this.setTokenCookies(resp.token);
        const user = resp;
        return user;
      }),
      catchError((error) => {
        return throwError("Error inesperado");
      })
    );
  }
  logout() {
    /* this.storage.removeItem("token");
    this.storage.removeItem("menu"); */
    this.cookies.deleteAll();
    this.ngZone.run(() => {
      this.router.navigateByUrl("/account/login");
    });
  }

  private setTokenCookies(token: string) {
    this.cookies.set("token", token);
  }

  private get TokenCookies() {
    return this.cookies.get("token");
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          "x-token": this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, img, nombre, rol, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, "", img, google, rol, uid);
          this.guardarLocalStorage(resp.token, resp.menu);
          return true;
        }),
        catchError((err) => of(false))
      );
  }


  async actualizarFoto(archivo: File, tipo: "usuarios", id: string) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append("imagen", archivo);
      const resp = await fetch(url, {
        method: "PUT",
        headers: { "x-token": localStorage.getItem("token") || "" },
        body: formData,
      });
      const data = await resp.json();
      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
