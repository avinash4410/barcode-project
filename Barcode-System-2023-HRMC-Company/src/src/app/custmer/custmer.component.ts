import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { custmerService } from '../services/custmer.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-custmer',
  templateUrl: './custmer.component.html',
  styleUrls: ['./custmer.component.scss']
})
export class CustmerComponent implements OnInit {
  // allUsers:any
  customers: any = []
  myReactiveForm!: FormGroup;
  mySearchi: any
  cid: any

  page: number = 1
  count: number = 0
  itemsPerPage: number = 5;
  // constructor(private route: ActivatedRoute, private service: ItemService, private router: Router) {}
  constructor(private service: custmerService) { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      cid: new FormControl(null, Validators.required),
      customerName: new FormControl(null, Validators.required),
      moblieNo: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
    })

    this.getAll()
  }

  getAll() {
    this.service.getAll().subscribe(res => {
      this.customers = res
      console.log("Customers", this.customers)
        this.autoIncrement(res)
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
          })
      })
  }

  autoIncrement(res:any){
    this.cid = 0
      if (res && res[0] && res[0].C_ID && res[res.length - 1].C_ID != undefined)
        // this.cid = +(res[res.length - 1].C_ID)
        this.cid =+ (res[0].C_ID)
      this.cid++
      this.myReactiveForm.patchValue({ cid: (this.cid) })
  }

  changePage(page: any) {
    this.page = page
    this.getAll()
  }

  edit(cid: any) {
    this.customers.map((element: any) => {
      element.C_ID == cid ? this.myReactiveForm.patchValue({
        cid:element.C_ID,
        customerName:element.CUSTOMER_NAME,
        moblieNo:element.MOBILE_NUMBER,
        email:element.EMAIL,
        city:element.CITY,
      }) : null;
    })
    window.scrollTo(0, 0);
  }

  delete(cid: any) {
    this.service.delete(cid).subscribe((res: any) => {
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

      if (this.cid == this.myReactiveForm.value.cid) {
        this.service.register(this.myReactiveForm.value).subscribe(res => {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Registered Successfully...',
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

      else {
        this.service.update(this.myReactiveForm.value.cid, this.myReactiveForm.value).subscribe(res => {
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


