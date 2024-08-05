import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

 

    private SupervisorList = environment.backend+"Supervisor/get";
    private Supervisor = environment.backend+"Supervisor/";
    private addSupervisor = environment.backend+"Supervisor/signup";
    private updateSupervisor = environment.backend+"Supervisor/";
    private deleteUrl = environment.backend+'Supervisor/';
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
