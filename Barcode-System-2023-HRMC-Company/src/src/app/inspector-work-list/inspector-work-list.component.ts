import { Component } from '@angular/core';
import { OperatorWorkService } from '../services/operator_work.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SupervisorService } from '../services/supervisor.service';

@Component({
  selector: 'app-inspector-work-list',
  templateUrl: './inspector-work-list.component.html',
  styleUrls: ['./inspector-work-list.component.scss']
})
export class InspectorWorkListComponent {
  // scannedProducts: number = 0;
  // handleScan(): void {
  //   // Increment the counter when a product is scanned
  //   this.scannedProducts++;
  // }
  
  data: any;
  page: number = 1
  count: number = 0
  itemsPerPage: number = 5;
  colName: any
  // dateFrom: any;
  // dateTo: any;
  searchTerm : any;
  constructor(private service: SupervisorService, private router: Router) { }

  ngOnInit(): void {
    let id = localStorage.getItem('id')
    if (id){
    console.log("id",id);
      this.service.getAllTaskByInspectorId(id).subscribe(taskList => {
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

  onCheckboxChange(event: Event, data: any) {
    // Prevent the checkbox from being unchecked
    // event.preventDefault();

    // Alternatively, you can use the following line to ensure the checkbox remains checked:
    data.isChecked = true;
    // data.isChecked = true;

    let obj ={isChecked : true}
    this.service.updateCheck(data.cardNo,obj).subscribe()
  }
  // getAll(): void {
  //   {
  //     this.service.getAll().subscribe(res => {
  //       this.data = res;
  //       this.data.sort((a:any,b:any) =>(a.cardNo<b.cardNo) ? 1: -1); // sortings are in ascending order
       
  //       this.data.sort((num1:any, num2:any) =>{
  //         if(num1.cardNo < num2.cardNo)
  //           return 1  //true
  //         else
  //           return -1 //false
  //       })
  //        console.log(this.data);
  //     })
  //   }
  // }

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
