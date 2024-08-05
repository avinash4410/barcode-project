import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { BatchCodeService } from '../services/batch-code.service';

@Component({
  selector: 'app-batch-code',
  templateUrl: './batch-code.component.html',
  styleUrls: ['./batch-code.component.scss']
})
export class BatchCodeComponent implements OnInit {
// itemsPerPage: any;

page: any;
// data: any;

  batchCodes: any = []
  myReactiveForm!: FormGroup;
  id: any
  mySearchi: any
  q: number = 1
  count: number = 0
  itemsPerPage: number = 5;

  constructor(private service: BatchCodeService) { }


  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      batchCode: new FormControl(null, Validators.required),
    })

    this.getAll()
  }  //ngOnInit end

  getAll() {
    this.service.getBatchCodes().subscribe(res => {
      this.batchCodes = res
      // add sorting logic here if you want
      console.log("batchCodes", this.batchCodes)
      this.autoIncrement(res)
    }/* ,  //Reove comment if you want to show error from backend getBatchCode API
      err => {
        let errorMessage = "Something went wrong";
        if (err.error.sqlMessage)
          errorMessage = err.error.sqlMessage
        if (err)
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: errorMessage,
          })
      } */
      )
  }

  autoIncrement(res: any) {
    this.id = 0
    if (res && res[0] && res[0].ID && res[res.length - 1].ID != undefined) {
      this.id = +(res[res.length - 1].ID)  //Ascending 
      // this.id = + (res[0].ID)           //Descending
    }
    this.id++
    this.myReactiveForm.patchValue({ id: (this.id) })
  }


  //This function is used for pagination
  changePage(page: any) {
    this.page = page
    this.getAll()
  }


  //// remove comment If you want edit data
  edit(myid: any) {
    this.batchCodes.map((element: any) => {
      if (element.ID == myid) {
        this.myReactiveForm.patchValue({
          id: element.ID,
          batchCode: element.BATCH_CODE,
        })
      }
    })
    window.scrollTo(0, 0);  //scroll to top
  }


  // Remove this comment if you want to delete data
  delete(id: any) {
    this.service.delete(id).subscribe((res: any) => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Deleted Successfully...',
        timer: 2000
      })
      this.getAll()
    })
  }

  onSubmit() {
    console.log(this.myReactiveForm)
    this.myReactiveForm.markAllAsTouched()
    if (this.myReactiveForm.valid) {

      if (this.id == this.myReactiveForm.value.id) {
        this.service.addBatchCode(this.myReactiveForm.value).subscribe(res => {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Registered Successfully...',
            timer: 2000
          })
          this.myReactiveForm.reset();
          this.getAll()
        }/* ,err => {   //remove this comment If you want to show error message from registration api
            let errorMessage = "Something went wrong";
            if (err.error.sqlMessage)
              errorMessage = err.error.sqlMessage
            if (err)
              Swal.fire({
                icon: 'error',
                title: 'error',
                text: errorMessage,
                timer: 2000
              })
          } */
        )
      }

      else {  // used for update data
        this.service.update(this.myReactiveForm.value.id, this.myReactiveForm.value).subscribe((res:any) => {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Updated Successfully...',
            timer: 2000
          })
          this.myReactiveForm.reset();
          this.getAll()
        },
          err => {
            let errorMessage = "Something went wrong";
            if (err.error.sqlMessage)
              errorMessage = err.error.sqlMessage
            if (err)
              Swal.fire({
                icon: 'error',
                title: 'error',
                text: errorMessage,
                timer: 2000
              })
          })
      }
    }
  }
}



