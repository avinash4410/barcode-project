import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupervisorService } from '../services/supervisor.service';
import { OperatorWorkService } from '../services/operator_work.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  data: any;
  id: any
  myReactiveForm!: FormGroup;
  // constructor(private route: ActivatedRoute, private service: ItemService, private router: Router) {}
  constructor(private service: OperatorWorkService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      oid: new FormControl(null),
      oname: new FormControl(null),
      cardNo: new FormControl(null),
      custName: new FormControl(null),
      itemDesc: new FormControl(null),
      batchCode: new FormControl(null),
      batchWeighed: new FormControl(null),
      batchMadeBy: new FormControl(null),
      modulingDate: new FormControl(null),
      moulderName: new FormControl(null),
      shift: new FormControl(null),
      mcNo: new FormControl(null),
      mouldingQty: new FormControl(null),
      otsDate: new FormControl(null),
      finishingQty: new FormControl(0),
      sortQty: new FormControl(null),
      remark: new FormControl(null),
    });

    let d = new Date()
    let date = d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear()
    this.route.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        console.log(this.id);
        this.service.getSingle(this.id).subscribe(res => {
          this.data = res;
          console.log(res);
          this.myReactiveForm.patchValue(res[0])
          this.myReactiveForm.patchValue({ otsDate: date })
          // this.myReactiveForm.patchValue({ sortQty: this.myReactiveForm.value.mouldingQty })
        })
      }
      //  else
      //   if (userData != null) {
      //     const parseObj = JSON.parse(userData)
      //     this.role = parseObj.role[0]
      //     if (parseObj.role[0] != 'admin')
      //       this.id = parseObj._id
      //   }
      //   else
      //     this.id = '';
    })
  }

  updateQty(e: any) {
    console.log(e.target.value);
    let finishingQty = e.target.value
    let mouldingQty = this.myReactiveForm.value.mouldingQty
    let sortQty = mouldingQty - finishingQty
    // if(finishingQty<mouldingQty)
    // sortQty = mouldingQty-finishingQty
    this.myReactiveForm.patchValue({ sortQty: sortQty })
  }

  onSubmit() {

    let obj = {
      cardNo: this.id,
      otsDate: this.myReactiveForm.value.otsDate,
      finishingQty: this.myReactiveForm.value.finishingQty,
      sortQty: this.myReactiveForm.value.sortQty,
      remark: this.myReactiveForm.value.remark,
    }
    this.service.updateOperator(obj).subscribe(res => {
      // this.service.getSingle(this.id).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data updated successfully..',
        timer: 2000
      })
    }, err => {
      console.log("errorrror", err);
      let errorMessage = "Something went wrong...";
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

}
