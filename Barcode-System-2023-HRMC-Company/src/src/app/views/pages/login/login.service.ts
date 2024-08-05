import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  SignIn(username:String,password:String):Observable<any>{
    console.log(username,password);
    return this.http.post(environment.backend+'user/login',{
      username: username,
      password: password
    })
  }

  SignUp(name: String,contactNumber:String,username: String, password: String) {
    return this.http.post(environment.backend + 'user/signup', {
      name: name,
      contactNumber: contactNumber,
      username: username,
      password: password,
    })
    // .pipe(
    //   tap(res => {
    //     this.authenticatedUser(res._id, res.firstName, res.username, res.token, +res.expiresIn, res.password, res.role)
    //   }))
  }

}
