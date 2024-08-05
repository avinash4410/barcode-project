/* import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ItemOprService {

 

    private SupervisorList = environment.backend+"opr_item/get";
    private Supervisor = environment.backend+"opr_item/";
    private addSupervisor = environment.backend+"opr_item/add";
    private updateSupervisor = environment.backend+"opr_item/";
    private deleteUrl = environment.backend+'opr_item/';
    constructor(private http: HttpClient) { }
  
    getSupervisor():Observable<any>{
      return this.http.get(this.SupervisorList)
    }
  
    getSingleSupervisor(id:string):Observable<any>{
      return this.http.get(this.Supervisor+id);
    }
  
    RegisterSupervisor(obj:any): Observable<any>{
      return this.http.post(this.addSupervisor, obj)
    }
  
    UpdateSupervisor(id:string,obj:any): Observable<any>{
      return this.http.put(this.updateSupervisor+id, obj)
    }
  
    deleteSupervisor(id:string){
      return this.http.delete(this.deleteUrl+id)
    }
  }
 */