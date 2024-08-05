import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../services/supervisor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  data: any;

  page: number = 1
  count: number = 0
  itemsPerPage: number = 5;
  searchKeyword:any;

  constructor(private service: SupervisorService) { }

  ngOnInit(): void {
    this.getAll();
    
  }
  getAll() {
    {
      this.service.getAll().subscribe(taskList => {
        this.data = taskList;
        this.data.sort((a:any,b:any) =>(a.cardNo<b.cardNo) ? 1: -1); // sortings are in ascending order
       
        this.data.sort((num1:any, num2:any) =>{
          if(num1.cardNo < num2.cardNo)
            return 1  //true
          else
            return -1 //false
        })
        console.log(this.data);
      })
    }
  }

  onCheckboxChange(event: Event, data: any) {
    // Prevent the checkbox from being unchecked
    // event.preventDefault();

    // Alternatively, you can use the following line to ensure the checkbox remains checked:
    data.isChecked = true;
    // data.isChecked = true;

    let obj ={isChecked : true}
    this.service.updateCheck(data.cardNo,obj).subscribe()
  }

  delete(cardNo: any) {
    this.service.delete(cardNo).subscribe((res: any) => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Deleted Successfully...',
        timer: 2000
      })
      this.getAll()
    })
  }
  

  changePage(page: any) {
    this.page = page
    this.getAll()
  }
}
