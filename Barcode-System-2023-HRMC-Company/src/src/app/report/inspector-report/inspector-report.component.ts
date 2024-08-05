import { Component } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ExportService } from 'src/app/services/export.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
import ('jspdf-autotable');

@Component({
  selector: 'app-inspector-report',
  templateUrl: './inspector-report.component.html',
  styleUrls: ['./inspector-report.component.scss']
})
export class InspectorReportComponent {
  data:any
  barcodeData:any
  page: number = 1
  count: number = 0
  itemsPerPage: number = 5;
  colName: any
  dateFrom: any;
  dateTo: any;
  searchTerm : any;
  
  constructor(private service: ReportService,private exportSerrive : ExportService,public datepipe: DatePipe) { }
  ngOnInit(): void {
    this.getAll()
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

  resetFilters() {
    this.colName = null;
    this.dateFrom = null;
    this.dateTo = null;
    this.searchTerm = null;
    this.getAll()
  }

  getColName(e: any) {
    this.colName = e?.target.value
  }

  getDateFrom(event: any) {
    this.dateFrom = event.target.value
    console.log(this.dateFrom);
  }
  getDateTo(event: any) {
    this.dateTo = event.target.value
    console.log(this.dateTo);
  }

  searchInDates() {
    console.log(this.colName);
    let params = {
      colName: this.colName,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    }
    if (this.colName) {
      if (this.dateFrom && this.dateFrom != '') {
        if (this.dateTo && this.dateTo != '') {
          this.service.filters(params).subscribe(res => {
            this.data = res
            console.log("Data", this.data);
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "To Date required",
          })
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "From Date required",
        })
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Please select column name",
      })
    }
  }

  getCount(d1:any,d2:any){
    var startDate = new Date(d1);
    var endDate = new Date(d2);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0)
       hours = hours + 24;

    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
  }

  printBarcodeInfo(){
    let pdf  = new jsPDF();
    pdf.text('Barcode Report',11,8);
    pdf.setFontSize(20)
    // let testcolumns = ["TestCol1", "TestCol2"];
    // let testrows = [["test item 1", "test item 2"]];
    let tableHeader = ['Job Card','Inspector Name', 'Barcode','Scanned Date']
    let tableBody = this.barcodeData.map((d:any) => {
      let arr = ([d.cardNo,d.inspectorName,d.barcode,this.datepipe.transform(d.SCAN_DATE, 'dd MMM yyyy hh:mm:ss')])
      return arr;
    })
    console.log("PDF Data",tableBody);
    (pdf as any).autoTable(tableHeader,tableBody);

    pdf.output('dataurlnewwindow'); //open pdf in new window
    pdf.save('Barcode Report.pdf');
  }

  exportPDF(): void {

    let pdf  = new jsPDF();
    pdf.text('INSPECTOR REPORT',11,8);
    pdf.setFontSize(20)
    // let testcolumns = ["TestCol1", "TestCol2"];
    // let testrows = [["test item 1", "test item 2"]];
    let tableHeader = ['JOB CARD','TASK WORK QUANTITY','START TIME','END TIME']
    let tableBody = this.data.map((d:any) => {
      let arr = ([d.cardNo,d.mouldingQty,this.datepipe.transform(d.inspectorStartDate, 'dd-MMM-yyyy hh:mm:ss'),this.datepipe.transform(d.inspectorEndDate, 'dd-MMM-yyyy hh:mm:ss')])
      return arr;
    })
    console.log("PDF Data",tableBody);
    (pdf as any).autoTable(tableHeader,tableBody);

    pdf.output('dataurlnewwindow'); //open pdf in new window
    pdf.save('Report.pdf');

    // let data = document.getElementById('exportTable');
    // this.exportSerrive.exportPDF(data)
  }
  exportexcel(): void {
    this.exportSerrive.exportexcel(this.data)
  }

  modalData(item: any) {
    this.service.getBarcodeByCardNo(item.cardNo).subscribe((res: any) => {
      console.log("Bar5code Response :", res);
      let allBarcodes = res;
      let inspectedBarcodes = allBarcodes.filter((barData: any) => {
        if (barData.status == 'inspectorVerified')  /* && barData.SCAN_DATE!=null */
          return barData
      })
      this.barcodeData = inspectedBarcodes
    })
  }
  
}
