// import { HttpClient } from '@angular/common/http';\
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  private listUrl = environment.backend+"report/get";
  private genBarcode = environment.backend+"supervisor/generateBarcode";
  private singleUrl = environment.backend+"supervisor/";
  private listAllById = environment.backend+"supervisor/getAllById/";
  private getAllTaskByInspectorIdUrl = environment.backend+"supervisor/getAllTaskByInspectorId/";
  private getAllTaskByRejectorIdUrl = environment.backend+"supervisor/getAllTaskByRejectorId/";
  private addUrl= environment.backend+"supervisor/add";
  private updateUrl = environment.backend+"supervisor/UpdateData/";
  private updateCheckUrl = environment.backend+"supervisor/updateCheck/";
  private updateInspectorUrl = environment.backend+"supervisor/updateInspectorTask";
  private updateRejectorUrl = environment.backend+"supervisor/updateRejectorTask";
  private deleteUrl = environment.backend+'supervisor/';
  private updateBarcode = environment.backend+'supervisor/updateBarcodeStatus';
  private getBarcode = environment.backend+"supervisor/getBarcodes/";
  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.listUrl)
  }

  getSingle(id:string):Observable<any>{
    return this.http.get(this.singleUrl+id);
  }

  getAllbyId(id:any):Observable<any>{
    return this.http.get(this.listAllById+id);
  }
  getAllTaskByInspectorId(id:any):Observable<any>{
    return this.http.get(this.getAllTaskByInspectorIdUrl+id);
  }
  getAllTaskByRejectorId(id:any):Observable<any>{
    return this.http.get(this.getAllTaskByRejectorIdUrl+id);
  }

  register(obj:any): Observable<any>{
    return this.http.post(this.addUrl, obj)
  }

  update(id:string,obj:any): Observable<any>{
    return this.http.patch(this.updateUrl+id, obj)
  }

  updateCheck(id:string,obj:any): Observable<any>{
    return this.http.patch(this.updateCheckUrl+id, obj)
  }

  // updateOperator(obj:any): Observable<any>{
  //   // return this.http.patch(this.updateUrl, obj)
  //   return this.http.post(this.updateUrl, obj)
  // }

  updateInspector(obj:any): Observable<any>{
    return this.http.patch(this.updateInspectorUrl, obj)
  }
  updateRejector(obj:any): Observable<any>{
    return this.http.patch(this.updateRejectorUrl, obj)
  }

  delete(id:string){
    return this.http.delete(this.deleteUrl+id)
  }

  generateBarcode(data:any):Observable<any>{
    return this.http.post(this.genBarcode,data)
  }

  getBarcodeByCardNo(cardNo:any):Observable<any>{
    return this.http.get(this.getBarcode+cardNo);
  }
  
  updateBarcodeStatus(data:any):Observable<any>{
    return this.http.patch(this.updateBarcode,data)
  }
}
