import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  loginData: any;

  constructor(private loginService: LoginServiceService, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
  }

  errorMsg = "";

  login() {
    if (this.username.trim().length === 0) {
      this.errorMsg = "username is required";
    }
    else if (this.password.trim().length === 0) {
      this.errorMsg = "password is required";
    }
    else {
      this.errorMsg = "";
      let res = this.loginService.login(this.username, this.password);
      if (res === 200) {
        this.router.navigate(['homeCart'])
      }
      else if (res === 403) {
        this.errorMsg = "Invalid Credentials"
      }
      else {
        this.errorMsg="Invalidd Credentials"
      }
    }

    this.username = "";
    this.password = "";
  }

  signUp() {
    this.router.navigate(['sign_up']);
  }


}
  

