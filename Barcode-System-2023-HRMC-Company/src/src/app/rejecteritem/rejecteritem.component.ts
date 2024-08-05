import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupervisorService } from '../services/supervisor.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rejecteritem',
  templateUrl: './rejecteritem.component.html',
  styleUrls: ['./rejecteritem.component.scss']
})
export class RejecteritemComponent implements OnInit {
  scannedProducts: number = 0;
  rejectedQty: number = 1;
  showPrint = false
  data: any;
  id: any
  myReactiveForm!: FormGroup;
  date: any
  RejectorStartTime: any
  RejectorEndTime: any

  constructor(private service: SupervisorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      cardNo: new FormControl(null),
      partNo: new FormControl(null),
      cid: new FormControl(null),
      oid: new FormControl(null),
      custName: new FormControl(null),
      itemDesc: new FormControl(null),
      batchCode: new FormControl(null),
      batchWeighed: new FormControl(null),
      batchMadeBy: new FormControl(null),
      modulingDate: new FormControl(null),
      moulderName: new FormControl(null),
      inspectorName: new FormControl(null),
      rejectorNme: new FormControl(null),
      shift: new FormControl(),
      mcNo: new FormControl(null),
      mouldingQty: new FormControl(1),

      otsDate: new FormControl(null), //Operator submission Date //modulingDate
      finishingQty: new FormControl(0),
      sortQty: new FormControl(null),
      remark: new FormControl(null),

      inspectedDate: new FormControl(null),
      inspectedQty: new FormControl(0),
      inspectorRejectedQty: new FormControl(null),
      barcode: new FormControl(null),

      totalOkQty: new FormControl(null),
      totalRejectedQty: new FormControl(null),
      RejectorRemark: new FormControl(null),
      totalSortedQty: new FormControl(null),
      RejectorReson: new FormControl(null),
      RejectorSubmitDate: new FormControl(null),



    });

    let d = new Date()
    let totalRejectedQty = 0;
    this.date = new Date(d.getMonth() + '-' + d.getDay() + '-' + d.getFullYear())
    this.route.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        console.log(this.id);
        this.service.getSingle(this.id).subscribe(res => {
          this.data = res[0];
          console.log("Rejector Res", res[0]);

          this.myReactiveForm.patchValue(res[0])
          this.myReactiveForm.patchValue({ RejectorSubmitDate: this.date })
          if (this.myReactiveForm.value.totalRejectedQty)
            this.scannedProducts = this.myReactiveForm.value.totalRejectedQty
          // if(this.myReactiveForm.value.totalRejectedQty )
          //   totalRejectedQty = this.myReactiveForm.value.totalRejectedQty 
          // let finishingQty= this.myReactiveForm.value.inspectedQty
          this.myReactiveForm.patchValue({ finishingQty: this.myReactiveForm.value.inspectedQty })
        })
      }
    })

    // let finishingQty=this.myReactiveForm.value.finishingQty-this.myReactiveForm.value.inspectedQty
    // this.myReactiveForm.patchValue({
    //   finishingQty:  finishingQty

    //   // totalSortedQty: this.myReactiveForm.value.finishingQty
    // })
  }



  // updateQty(e: any) {
  //   console.log(e.target.value);
  //   let totalOkQty = e.target.value
  //   let inspectorRejectedQty = this.myReactiveForm.value.inspectorRejectedQty
  //   let totalRejectedQty = inspectorRejectedQty - totalOkQty
  //   // if(finishingQty<mouldingQty)
  //   // sortQty = mouldingQty-finishingQty
  //   this.myReactiveForm.patchValue({
  //     totalRejectedQty: totalRejectedQty,
  //     totalSortedQty: this.myReactiveForm.value.sortQty
  //   })
  // }

  onSubmit() {
    let obj = {
      cardNo: this.id,

      finishingQty: this.myReactiveForm.value.finishingQty,
      totalOkQty: this.myReactiveForm.value.totalOkQty,
      totalRejectedQty: this.myReactiveForm.value.totalRejectedQty,
      RejectorRemark: this.myReactiveForm.value.RejectorRemark,
      totalSortedQty: this.myReactiveForm.value.totalSortedQty,
      RejectorReson: this.myReactiveForm.value.RejectorReson,
      RejectorSubmitDate: this.myReactiveForm.value.RejectorSubmitDate,
      RejectorStartTime: this.RejectorStartTime,
      RejectorEndTime: new Date()
    }
    this.service.updateRejector(obj).subscribe(res => {
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

  handleScan(): void {
    if (!this.RejectorStartTime) {
      this.RejectorStartTime = new Date()
    }
    let data = {
      barcode: this.myReactiveForm.value.barcode,
      status: "rejectorVerified",
      scanDate: new Date()
    }
    this.service.updateBarcodeStatus(data).subscribe(res => {
      if (res) {
        // Increment the counter when a product is scanned
        this.scannedProducts++;
        let totalQty = this.myReactiveForm.value.inspectorRejectedQty
        let updatedTotalQty = totalQty - this.scannedProducts
        // let finishingQty = this.myReactiveForm.value.finishingQty
        // this.rejectedQty = finishingQty - this.scannedProducts
        this.myReactiveForm.patchValue({
          totalSortedQty: updatedTotalQty,
          totalRejectedQty: this.scannedProducts,
          totalOkQty: this.scannedProducts,
          finishingQty: this.scannedProducts + +this.myReactiveForm.value.inspectedQty

        })
        if (this.rejectedQty > 0) {

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: ' successfully..',
            timer: 2000
          })
          this.myReactiveForm.get('barcode')?.reset();
        }
      }
    },
      err => {
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



  currentPage: Number = 1;
  totalPages: Number = 0;
  printNextPage() {
    // this.showPrint = true
    if (this.currentPage <= this.totalPages) {
      // var pageContent = "<div class='page'><h1>Page " + this.currentPage + "</h1><p>Content of Page " + this.currentPage + "</p></div>";
      var pageContent = `
      <div class='box-print'><br>
        <div class='box-title'>HYPRESS RUBBER MFG.CO.</div>
        <div class='box-sub-title'>SHIRWAL SHINDEWADI, GAT NO.323,<br>TAL-KHANDALA, DIST-SATARA</div>
        <table>
          <tr>
            <td><b>PARTY NAME : </b>`+ this.data.custName + `</td>
            </tr>
            
            <tr>
            <td><b> DESTINATION : </b>`+ this.data?.city + `</td>
          </tr>
          <tr>
            <td><b> DESCRIPTION : </b>`+ this.data?.itemDesc + `</td>
            </tr><tr>
            <td><b> CARD NO :</b>`+ this.id + `</td>
            </tr><tr>
            <td></td>
          </tr>
          <tr>

            <td><b>QUANTITY : </b>`+ this.data?.boxQty + `</td>
            </tr><tr>
            <td><b>INVOICE NO :</b></td>
            </tr>
            <tr>
            <td><b>DATE :</b></td>
            </tr>
        </table>
      </div>`;
      document.getElementById("printDiv")!.innerHTML += pageContent;

      // this.currentPage++;
      this.currentPage = +this.currentPage + 1;

      setTimeout(() => {
        this.printNextPage();
      }, 100);
    } else {
      window.print();
    }
  }

  printPages() {
    this.showPrint = true
    // var qty = document.getElementById("qtyInput")!.value;
    let insQty = this.myReactiveForm.value.inspectedQty
    // if (insQty > this.data.boxQty) {
    this.totalPages = Math.trunc(parseInt(this.myReactiveForm.value.inspectedQty) / parseInt(this.data.boxQty));
    let remainingItems = parseInt(this.myReactiveForm.value.inspectedQty) % parseInt(this.data.boxQty)
    if (remainingItems != 0) {
      // this.totalPages++;
      this.totalPages = +this.totalPages + 1;
    }
    // }
    // else {
    // this.totalPages = 1
    // }
    this.printNextPage();
  }

}
