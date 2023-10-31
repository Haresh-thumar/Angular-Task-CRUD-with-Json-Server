import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _route: Router, private loginService: LoginServiceService, private _fb: FormBuilder) { }
  loginForm: FormGroup | any;
  signuser: any;
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
    });
  }

  /****** login Method ******/
  logindata(singup: FormGroup) {
    this.loginService.getLoginUserdata().subscribe({
      next: (res: any) => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        });
        if (user) {
          this.loginForm.reset();
          this._route.navigate(['dashboard']);
        } else {
          alert('Please Enter Valid Email & Password !!!');
          this._route.navigate(['login']);
        }
        console.log(this.loginForm.value);
      },
      error: () => {
        alert('Somthing went wrong');
      },
      complete: () => {
        this._route.navigate(['dashboard']);
      }
    });
  }


}
