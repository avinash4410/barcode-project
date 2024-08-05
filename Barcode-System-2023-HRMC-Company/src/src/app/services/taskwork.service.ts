/* // import { HttpClient } from '@angular/common/http';\
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class taskworkService {

  private listUrl = environment.backend+"taskworkService/get";
  private singleUrl = environment.backend+"taskworkService/";
  private addUrl= environment.backend+"taskworkService/add";
  private updateUrl = environment.backend+"taskworkService/";
  private deleteUrl = environment.backend+'taskworkService/';
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
    return this.http.put(this.updateUrl+id, obj)
  }

  delete(id:string){
    return this.http.delete(this.deleteUrl+id)
  }
}
 */