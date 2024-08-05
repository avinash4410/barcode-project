// import { HttpClient } from '@angular/common/http';\
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class custmerService {

  private listUrl = environment.backend+"customer/get";
  private singleUrl = environment.backend+"customer/";
  private addUrl= environment.backend+"customer/add";
  private updateUrl = environment.backend+"customer/updateData";
  private deleteUrl = environment.backend+'customer/';
  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.listUrl)
    
  }

  getSingle(id:string):Observable<any>{
    return this.http.get(this.singleUrl+id);
  }

  register(obj:any): Observable<any>{
    return this.http.post(this.addUrl, obj)
  }

  update(id:string,obj:any): Observable<any>{
    return this.http.patch(this.updateUrl, obj)
  }

  delete(id:string){
    return this.http.delete(this.deleteUrl+id)
  }
}
