import { Component } from '@angular/core';
import { SupervisorService } from '../services/supervisor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rejector-work-list',
  templateUrl: './rejector-work-list.component.html',
  styleUrls: ['./rejector-work-list.component.scss']
})
export class RejectorWorkListComponent {

  data: any;
  page: number = 1
  count: number = 0
  itemsPerPage: number = 5;
  colName: any
  dateFrom: any;
  dateTo: any;
  searchTerm : any;
  constructor(private service: SupervisorService, private router: Router) { }
  
  ngOnInit(): void {
    this.getAll()
    let id = localStorage.getItem('id')
    if (id){
    console.log("id",id);
      this.service.getAllTaskByRejectorId(id).subscribe(taskList => {
        this.data = taskList;
        console.log("data",this.data);
      })
    }
    
    else {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        timer: 2000
      })
      localStorage.removeItem('id'),
      localStorage.removeItem('role'),
      this.router.navigate(['/login'])
    }
    
  }
  changePage(page: any) {
    this.page = page
    this.getAll()
    }
    getAll() {
      {
        this.service.getAll().subscribe(res => {
          this.data = res;
          this.data.sort((a:any,b:any) =>(a.cardNo<b.cardNo) ? 1: -1); // sortings are in ascending order
       
        this.data.sort((num1:any, num2:any) =>{
          if(num1.cardNo < num2.cardNo)
            return 1  //true
          else
            return -1 //false
        })
          
          console.log("Data :",this.data);
        })
      }
    }
  

  delete(id: string) {

  }

}