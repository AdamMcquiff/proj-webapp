import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../../environments/environment";

@Injectable()
export class HttpService {
  baseUrl = environment.api_url;
  httpOptions = {};

  constructor(private http: HttpClient) {
    this.refreshToken(localStorage.getItem('token'));
  }

  get(endpoint) {
    return this.http.get(this.baseUrl + endpoint, this.httpOptions);
  }

  post(endpoint, data) {
    return this.http.post(this.baseUrl + endpoint, data, this.httpOptions);
  }

  put(endpoint, data) {
    return this.http.put(this.baseUrl + endpoint, data, this.httpOptions);
  }

  delete(endpoint) {
    return this.http.delete(this.baseUrl + endpoint, this.httpOptions);
  }

  refreshToken(token) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Bearer " + token
      })
    };
  }
}
