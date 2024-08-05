// import { HttpClient } from '@angular/common/http';\
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList = environment.backend+"user/get";
  private allUsers = environment.backend+"user";
  private user = environment.backend+"user/";
  private rolewiseUser = environment.backend+"user/getUserByRole/";
  private adduser = environment.backend+"user/signup";
  private updateuser = environment.backend+"user/";
  private deleteUrl = environment.backend+'user/';
  constructor(private http: HttpClient) { }

  // getUser(params:any):Observable<any>{
  //   return this.http.get(this.userList,{params:params})
  // }
  getUser():Observable<any>{
    return this.http.get(this.allUsers)
  }

  getSingleUser(id:string):Observable<any>{
    return this.http.get(this.user+id);
  }
  getUserByRole(params:any):Observable<any>{
    return this.http.get(this.rolewiseUser,{params});  //http:localhost:5000/user/admin
  }

  RegisterUser(obj:any): Observable<any>{
    return this.http.post(this.adduser, obj)
  }

  UpdateUser(id:string,obj:any): Observable<any>{
    return this.http.put(this.updateuser+id, obj)
  }

  deleteUser(id:string){
    return this.http.delete(this.deleteUrl+id)
  }
}
