// import { HttpClient } from '@angular/common/http';
import { httpClient } from './http-client.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private List = environment.backend+"vendor";
  private Vendor = environment.backend+"vendor/";
  private updateVendor = environment.backend+"vendor/";
  private uploadUrl = environment.backend+'vendor';
  private deleteUrl = environment.backend+'vendor/';
  constructor(private http: httpClient) { }

  getVendor():Observable<any>{
    return this.http.get(this.List)
  }

  getSingleVendor(id:string):Observable<any>{
    return this.http.get(this.Vendor+id);
  }

  RegisterVendor(obj:any): Observable<any>{
    return this.http.post(this.uploadUrl, obj)
  }

  UpdateVendor(id:string,obj:any): Observable<any>{
    return this.http.put(this.updateVendor+id, obj)
  }

  deleteVendor(id:string){
    return this.http.delete(this.deleteUrl+id)
  }
}
