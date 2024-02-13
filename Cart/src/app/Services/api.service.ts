import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLogin() {
    return this.http.get("http://localhost:28210/api/Login/Get");
  }

  postLogin(data: any) {
    return this.http.post<any>("http://localhost:28210/api/Login/Post", data);
  }
}
