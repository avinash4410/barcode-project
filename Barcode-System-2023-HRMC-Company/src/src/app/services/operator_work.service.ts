// import { HttpClient } from '@angular/common/http';\
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperatorWorkService {

  private listUrl = environment.backend+"supervisor/get";
  private getAllOperatorTaskByIdUrl = environment.backend+"supervisor/getAllOperatorTaskById/";
  private listAllById = environment.backend+"supervisor/getAllById/";
  private barcode = environment.backend+"supervisor/getBarcodes/";
  private singleUrl = environment.backend+"supervisor/";
  private addUrl= environment.backend+"supervisor/add";
  private updateUrl = environment.backend+"supervisor/updateOperatorTask";
  private deleteUrl = environment.backend+'supervisor/';
  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.listUrl)
  }

  getAllbyId(id:any):Observable<any>{
    return this.http.get(this.listAllById+id);
  }
  getAllOperatorTaskById(id:any):Observable<any>{
    return this.http.get(this.getAllOperatorTaskByIdUrl+id);
  }

  getSingle(id:any):Observable<any>{
    return this.http.get(this.singleUrl+id);
  }
  getBarcodeByCardNo(cardNo:any):Observable<any>{
    return this.http.get(this.barcode+cardNo);
  }

  register(obj:any): Observable<any>{
    return this.http.post(this.addUrl, obj)
  }

  updateOperator(obj:any): Observable<any>{
    // return this.http.patch(this.updateUrl, obj)
    return this.http.patch(this.updateUrl, obj)
  }

  delete(id:string){
    return this.http.delete(this.deleteUrl+id)
  }
}
