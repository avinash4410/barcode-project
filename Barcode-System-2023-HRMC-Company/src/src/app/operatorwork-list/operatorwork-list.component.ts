import { Component, OnInit } from '@angular/core';
import { OperatorWorkService } from '../services/operator_work.service';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';

@Component({
  selector: 'app-operatorwork-list',
  templateUrl: './operatorwork-list.component.html',
  styleUrls: ['./operatorwork-list.component.scss']
})
export class OperatorworkListComponent implements OnInit {
  data: any;
  users: any
  page:number = 1 //pagination 
  limit : number = 10 //pagination
  totalRecords : number = 0 //pagination
  changePage: any
  role:any
  searchKeyword:any
 
  constructor(private service: OperatorWorkService, private router: Router) { }

  ngOnInit(): void {
    let id = localStorage.getItem('id')
    if (id){
    console.log("id",id);
      this.service.getAllOperatorTaskById(id).subscribe(taskList => {
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

  delete(id: string) {

  }

}