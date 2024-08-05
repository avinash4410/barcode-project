// import { HttpClient } from '@angular/common/http';\
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private allCountUrl = environment.backend+"dashboard/allCounts";
  private allInspectorCountUrl = environment.backend+"dashboard/allInspectorCount/";
  private allRejectorCountUrl = environment.backend+"dashboard/allRejectorCount/";
  // private singleUrl = environment.backend+"item/";
  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.allCountUrl)
  }

  getAllInspectorCount(id:any):Observable<any>{
    return this.http.get(this.allInspectorCountUrl+id)
  }
  getAllRejectorCount(id:any):Observable<any>{
    return this.http.get(this.allRejectorCountUrl+id)
  }

  // getSingle(id:string):Observable<any>{
  //   return this.http.get(this.singleUrl+id);
  // }

}

