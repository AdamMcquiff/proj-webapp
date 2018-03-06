import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../../environments/environment";

@Injectable()
export class HttpService {
  baseUrl = environment.api_url;
  httpOptions = {};

  constructor(private http: HttpClient) {
    this.refreshToken();
  }

  get(endpoint) {
    return this.http.get(this.baseUrl + endpoint, this.httpOptions);
  }

  post(endpoint, data) {
    return this.http.post(this.baseUrl + endpoint, data, this.httpOptions);
  }

  refreshToken() {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Bearer " + localStorage.getItem('token')
      })
    };
  }
}
