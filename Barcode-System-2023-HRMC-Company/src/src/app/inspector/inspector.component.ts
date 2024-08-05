
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { OperatorWorkService } from '../services/operator_work.service';
import { ActivatedRoute } from '@angular/router';
import { SupervisorService } from '../services/supervisor.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss']
})
export class InspectorComponent implements OnInit {
  scannedProducts: number = 0;
  rejectedQty: number = 1;
  data: any;
  id: any
  myReactiveForm!: FormGroup;
  inspectorStartDate: any
  inspectorEndDate: any
  scannedBarcode:any=[]
  // constructor(private route: ActivatedRoute, private service: ItemService, private router: Router) {}
  constructor(private service: SupervisorService, private route: ActivatedRoute,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      cardNo: new FormControl(null),
      // partNo: new FormControl(null),
      cid: new FormControl(null),
      oid: new FormControl(null),
      custName: new FormControl(null),
      itemDesc: new FormControl(null),
      batchCode: new FormControl(null),
      batchWeighed: new FormControl(null),
      batchMadeBy: new FormControl(null),
      modulingdate: new FormControl(null),
      moulderName: new FormControl(null),
      inspectorName: new FormControl(null),
      rejectorNme: new FormControl(null),
      shift: new FormControl(),
      mcNo: new FormControl(null),
      mouldingQty: new FormControl(1),

      otsDate: new FormControl(null), //Operator submission Date //modulingDate
      finishingQty: new FormControl(0),
      sortQty: new FormControl(0),
      remark: new FormControl(null),

      inspectedDate: new FormControl(0),
      inspectedQty: new FormControl(0),
      inspectorRejectedQty: new FormControl(null),
      barcode: new FormControl(null),


      // cardNo: new FormControl(null),
      // oid: new FormControl(null),
      // oname: new FormControl(null),
      // custName: new FormControl(null),
      // itemDesc: new FormControl(null),
      //// batchCode: new FormControl(null),
      //// batchWeighed: new FormControl(null),
      // batchMadeBy: new FormControl(null),
      // modulingDate: new FormControl(null),
      ////moulderName: new FormControl(null),                 
      // shift: new FormControl(null),
      // mcNo: new FormControl(null),
      // mouldingQty: new FormControl(null),
      // otsDate: new FormControl(null),
      // finishingQty: new FormControl(0),
      // sortQty: new FormControl(null),
      // remark: new FormControl(null),
    });

    // let d = new Date()
    // let date = d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear()
    let date = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
    this.route.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        console.log(this.id);
        this.service.getSingle(this.id).subscribe(res => {
          this.data = res;
          console.log("Inspector Res", res);
          this.myReactiveForm.patchValue(res[0])
          this.myReactiveForm.patchValue({ otsDate: date })
          this.myReactiveForm.patchValue({ inspectedDate: date })
          this.myReactiveForm.patchValue({ sortQty: this.myReactiveForm.value.sortQty })  //
          if(this.myReactiveForm.value.inspectedQty)
          this.scannedProducts = this.myReactiveForm.value.inspectedQty
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
    // this.service.getBarcodeByCardNo(this.id).subscribe((res:any)=>{
    //   console.log("All barcodes",res);
    //   // this.scannedBarcode = res
    // })
  }
  handleScan(): void {
    
    this.inspectorStartDate = new Date()
    // Increment the counter when a product is scanned
    let data = {
      barcode :this.myReactiveForm.value.barcode,
      status:"inspectorVerified",
      scanDate:new Date()
    }
    this.service.updateBarcodeStatus(data).subscribe(res => {
      if (res) {
        this.scannedBarcode.push(this.myReactiveForm.value.barcode)
        this.scannedProducts++;
        let mouldingQty = this.myReactiveForm.value.mouldingQty
        this.rejectedQty = mouldingQty - this.scannedProducts
        this.myReactiveForm.patchValue({
          inspectedQty: this.scannedProducts,
          inspectorRejectedQty: this.rejectedQty
        })
        if (this.rejectedQty > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Scanned successfully..',
            timer: 2000
          })
          this.myReactiveForm.get('barcode')?.reset();
        }
      }
      // else{
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Error',
      //     text: 'Invalid Barcode...',
      //     timer: 2000
      //   })
      // }
    },
    err=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message,
          timer: 2000
        })
        this.myReactiveForm.get('barcode')?.reset();
      }
    )
  }

  updateQty(e: any) {
    console.log(e.target.value);
    let finishingQty = e.target.value
    let mouldingQty = this.myReactiveForm.value.mouldingQty
    let sortQty = mouldingQty - finishingQty
    // if(finishingQty<mouldingQty)
    // sortQty = mouldingQty-finishingQty
    this.myReactiveForm.patchValue({ sortQty: sortQty })
    this.myReactiveForm.patchValue({ finishingQty: this.myReactiveForm.value.sortQty })
    this.myReactiveForm.patchValue({ rejectedQty: this.myReactiveForm.value.inspectedQty })
  }

  onSubmit() {

    let obj = {
      cardNo: this.id,
      barcode: this.myReactiveForm.value.barcode,
      inspectedQty: this.myReactiveForm.value.inspectedQty,
      inspectorRejectedQty: this.myReactiveForm.value.inspectorRejectedQty,
      inspectedDate: this.myReactiveForm.value.inspectedDate,
      otsDate: this.myReactiveForm.value.otsDate,
      inspectorStartDate: this.inspectorStartDate,
      inspectorEndDate: new Date()
      // remark:this.myReactiveForm.value.remark,
    }
    this.service.updateInspector(obj).subscribe(res => {
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

