// import { HttpClient } from '@angular/common/http';\
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private listUrl = environment.backend+"item/get";
  private singleUrl = environment.backend+"item/";
  private addUrl= environment.backend+"item/add";
  private updateUrl = environment.backend+"item/";
  private deleteUrl = environment.backend+'item/';


  private item = environment.backend+"item/itemNameSingel";
  // private apiUrl =  environment.backend+"item/checkDuplicateItem"; 
  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.listUrl)
  }

  getSingleItem(id:string):Observable<any>{
    return this.http.get(this.singleUrl+id);
  }

  register(obj:any): Observable<any>{
    return this.http.post(this.addUrl, obj)
  }

  update(id:string,obj:any): Observable<any>{
    return this.http.patch(this.updateUrl+id, obj)
  }

  delete(id:string){
    return this.http.delete(this.deleteUrl+id)
  }
 fetchItemNames() {
  return this.http.get(this.item );
}
}
