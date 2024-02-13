import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  loginData: any;
  res: any;
  signUpRes: any;

  constructor(private router: Router, private api: ApiService) {
    this.getLoginData();
  }


  login(uname: string, pword: string) {
    debugger
    for (let data of this.loginData) {
      if (uname === data.UserName && pword === data.Password) {
        this.res = 200;
        break;
      }
      else {
        this.res = 403;
      }
    }
    return this.res;
  }


  logout() {
    this.router.navigate(['login']);
  }


  /* View Data*/
  getLoginData() {
    this.api.getLogin().subscribe(res => {
      this.loginData = res;
      console.error(res);
    })
  }

  signUpDataCheck(uname: string) {

    this.getLoginData();

    if (this.loginData.length === 0) {
      this.signUpRes = 50;
    }
    else {
      for (let data of this.loginData) {
        if (uname === data.UserName) {
          this.signUpRes = 100;
          break;
        }
        else {
          this.signUpRes = 200;
        }
      }
    }
    
    return this.signUpRes;
  }
}
