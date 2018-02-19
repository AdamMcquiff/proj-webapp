import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Bearer " + localStorage.getItem('token')
  })
};

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  get(url) {
    return this.http.get(url, httpOptions);
  }
}
