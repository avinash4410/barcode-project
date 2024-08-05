import { Observable } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginMode = true;
  Form: FormGroup | any;
  usernameError: any;
  passwordError: any;

  constructor(
    private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    this.Form = new FormGroup({
      'name': new FormControl(null),
      'contactNumber': new FormControl(null),
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, Validators.required),
    })
  }

  // MyCustomValidator(control: AbstractControl){  

  //   console.log("Controls : ",control);
  //   // check if value is valid or not  
  //   let isValid:any //= // ...some logic here


  //   isValid = false
  //   // returns null if value is valid, or an error message otherwise  
  //   return isValid ? null : { 'myCustomError': 'This value is invalid' };  
  // }

  onModeSwitch() {
    this.loginMode = !this.loginMode
  }

  valueChange(){
    this.usernameError = false
    this.passwordError = false
  }

  onLogin() {
    // console.log(this.Form);
    const name = this.Form.value.name;
    const contactNumber = this.Form.value.contactNumber;
    const username = this.Form.value.username;
    const password = this.Form.value.password;
    this.Form.markAllAsTouched()
    if (this.Form.valid) {

      // let authObservavle:Observable<AuthResponse>

      if (this.loginMode) {
        this.loginService.SignIn(username, password).subscribe(res => {
          console.log(res);
          console.log(res.user.role);
          Swal.fire({
            icon: 'success',
            title: res.message,  //Login Successfully
            showConfirmButton: false,
            timer: 1500
          })
          // debugger
          localStorage.setItem('role', res.user.role)
          localStorage.setItem('id', res.user.oid)
          this.router.navigate(['/dashboard']);
        }, err => {
          debugger
          console.log(err);
          if (err && err.error) {
            if (err.error.isUsernameError) {
              this.usernameError = true
            }
            else if (err.error.isPasswordError) {
              this.usernameError = false
              this.passwordError = true
            }
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Error..!',
              text: err.error?.message,
            })
          }

        })
      } else {
        this.loginService.SignUp(name, contactNumber, username, password).subscribe(res => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: "Registerde Successfully!",
            showConfirmButton: false,
            timer: 1500
          })
          //  this.router.navigate(['/dashboard']);
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error..!',
            text: err.error?.message,
          })

        })
      }
      //   if (this.loginMode) {
      //     authObservavle = this.loginService.SignIn(username, password)
      //   } else {
      //     authObservavle = this.loginService.SignUp(name,contactNumber,username , password)
      //   }
      //   authObservavle.subscribe( res => {
      //      if(res?.error?.code==401){
      //         Swal.fire({
      //           icon:'error',
      //           title: 'Error..!',
      //           text: res.error?.message,
      //        })
      //      }
      //      else{
      //     Swal.fire({
      //       icon: 'success',
      //       title: "Login Successfully!",
      //       showConfirmButton: false,
      //       timer: 1500
      //     })
      //     this.router.navigate(['/dashboard']);
      //   }},
      //   err => {
      //     Swal.fire({
      //       icon: 'error',
      //       title: "Invalid User..!",
      //       text:err.error.message,
      //     })
      //   })
    }
  }

  forget() {
    Swal.fire({
      icon: 'warning',
      title: "Warning",
      text: "Contact your Admin to forget your password"
      //showConfirmButton: false,
      //timer: 2000
    })
  }
}
