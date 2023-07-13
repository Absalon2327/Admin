import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UploadServiceService {
  url = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<Object> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.url}/file/upload`, formData);
  }

  multiple(myFiles: string[]) {
    const formData = new FormData();
    for (var i = 0; i < myFiles.length; i++) {
      formData.append("files", myFiles[i]);
    }
    return this.http.post(`${this.url}/file/multiple`, formData);
  }
}
