import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchCodeService {

  private getBatchCodesUrl = environment.backend + 'batchCode/getAllBatchCodes'
  private addBatchCodesUrl = environment.backend + 'batchCode/addBatchCode'
  private updateBatchCodesUrl = environment.backend + 'batchCode/updateBatchCode'
  private deleteBatchCodeUrl = environment.backend + 'batchCode/deleteBatchCode/'

  constructor(private http : HttpClient) {}

  getBatchCodes():Observable<any>{
    return this.http.get(this.getBatchCodesUrl)
  }

  addBatchCode(data:any):Observable<any>{
    return this.http.post(this.addBatchCodesUrl,data)
  }
  update(id:string,obj:any): Observable<any>{
    console.log(obj);
    return this.http.patch(this.updateBatchCodesUrl, obj)
  }

  delete(id:string){
    return this.http.delete(this.deleteBatchCodeUrl+id)
  }

}
