import { Injectable,Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { loginModel } from './sign-up.model';
import { ApiService } from '../../Services/api.service';
import { LoginServiceService } from '../../Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

@Injectable()
export class SignUpComponent implements OnInit {

  formValue!: FormGroup;
  LoginModelObj: loginModel = new loginModel;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router, private loginService: LoginServiceService) { }
  
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  /* Add Data*/
  signUp() {
    debugger
    this.LoginModelObj.UserName = this.formValue.value.username;
    this.LoginModelObj.Password = this.formValue.value.password;


    let res = this.loginService.signUpDataCheck(this.LoginModelObj.UserName);

    if (res === 200) {
      this.api.postLogin(this.LoginModelObj).subscribe(res => {
        console.log(res);

        this.loginService.getLoginData();

        alert('Sign Up Complited successfully')

        this.loginService.getLoginData();

        this.formValue.reset();

        this.router.navigate(['login']);
      },
        err => {
          alert('Something went wrong!')
        })
    }
    if (res === 100) {
      alert("Username is already used")
      this.formValue.reset();
    }
    if (res === 50) {
      this.api.postLogin(this.LoginModelObj).subscribe(res => {
        console.log(res);

        this.loginService.getLoginData();

        alert('Sign Up Complited successfully')

        this.loginService.getLoginData();

        this.formValue.reset();


        this.router.navigate(['login']);
      },
        err => {
          alert('Something went wrong!')
        })
    }

  }


  /*for validation*/
  get username() {
    return this.formValue.get('username')
  }
  get password() {
    return this.formValue.get('password')
  }
}
