import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Bearer " + localStorage.getItem('token')
  })
};

@Injectable()
export class HttpService {
  baseUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  get(endpoint) {
    return this.http.get(this.baseUrl + endpoint, httpOptions);
  }

  post(endpoint, data) {
    return this.http.post(this.baseUrl + endpoint, data, httpOptions);
  }
}
