import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private listUrl = environment.backend+"report/get";
  private getByCardNoUrl = environment.backend+"report/";
  private filtereUrl = environment.backend+"report/filter";
  private getBarcode = environment.backend+"supervisor/getBarcodes/";
  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.listUrl)
  }

  getSingle(id:string):Observable<any>{
    return this.http.get(this.getByCardNoUrl+id);
  }

  filters(params:any):Observable<any>{
    return this.http.post(this.filtereUrl,params)
  }

  getBarcodeByCardNo(cardNo:any):Observable<any>{
    return this.http.get(this.getBarcode+cardNo);
  }
}