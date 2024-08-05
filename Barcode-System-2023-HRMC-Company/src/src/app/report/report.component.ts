import { Component } from '@angular/core';
import { SupervisorService } from '../services/supervisor.service';
import { ReportService } from '../services/report.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { ExportService } from '../services/export.service';
import ('jspdf-autotable');

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  data: any;
  page: number = 1
  count: number = 0
  itemsPerPage: number = 5;
  
  colName: any
  dateFrom: any;
  dateTo: any;
  searchTerm: any
  customDate: boolean = false
  constructor(private service: ReportService,private exportSerrive : ExportService,private supervisorService : SupervisorService) { }

  ngOnInit(): void {
    this.getAll()
  }
//   changeStatus(event:Event){
//     const isChecked = (<HTMLInputElement>event.target).checked;
//     console.log(isChecked)
// }

onCheckboxChange(event: Event, data: any) {
  // Prevent the checkbox from being unchecked
  // event.preventDefault();

  // Alternatively, you can use the following line to ensure the checkbox remains checked:
  data.isChecked = true;
  // data.isChecked = true;

  let obj ={isChecked : true}
  this.supervisorService.updateCheck(data.cardNo,obj).subscribe()
}
  getAll() {
    {
      this.service.getAll().subscribe(res => {
        this.data = res;
        this.data.sort((a:any,b:any) =>(a.cardNo<b.cardNo) ? 1: -1); // sortings are in ascending order
       
        // this.data.sort((num1:any, num2:any) =>{
        //   if(num1.cardNo < num2.cardNo)
        //     return 1  //true
        //   else
        //     return -1 //false
        // })
         console.log(this.data);
      })
    }
  }

  delete(id: string) { }
  resetFilters() {
    this.colName = null;
    this.dateFrom = null;
    this.dateTo = null;
    this.searchTerm = null;
    this.getAll()
  }

  getDatewise(e: any) {
    let value = e.target.value
    let today = new Date();
    switch (value) {
      case 'today': {
        this.dateFrom = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
        this.customDate = false
      }; break
      case 'lastWeak': {
        this.dateFrom = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        this.customDate = false
      }; break
      case 'lastMonth': {
        this.dateFrom = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        this.customDate = false
      }; break
      case 'last2Months': {
        this.dateFrom = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
        this.customDate = false
      }; break
      case 'last3Months': {
        this.dateFrom = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        this.customDate = false
      }; break
      case 'last4Months': {
        this.dateFrom = new Date(today.getFullYear(), today.getMonth() - 4, today.getDate());
        this.customDate = false
      }; break
      case 'custom': {
        this.customDate = true
      }; break
      default: {

      }; break
    }
    this.dateTo = today
  }

  changePage(page: any) {
    this.page = page
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
    console.log(params);
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

  exportPDF(): void {
    let pdf  = new jsPDF();
    pdf.text('Summery Report',11,8);
    pdf.setFontSize(20)
    // let testcolumns = ["TestCol1", "TestCol2"];
    // let testrows = [["test item 1", "test item 2"]];
    let tableHeader = ['JOB CARD','CUSTOMER NAME','ITEM CODE','MOULDING QTY',' MOULDER NAME','INSPECTOR NAME','REJECTED NAME',]
    let tableBody = this.data.map((d:any) => {
      let arr = ([d.cardNo,d.custName,d.itemName,d.mouldingQty,d.moulderName, d.inspectorName,])
      return arr;
    })
    console.log("PDF Data",tableBody);
    (pdf as any).autoTable(tableHeader,tableBody);

    pdf.output('dataurlnewwindow'); //open pdf in new window
    pdf.save('Report.pdf');

    // let data = document.getElementById('tblOldDb1');
    // this.exportSerrive.exportPDF(data)
  }
  exportexcel(): void {
    this.exportSerrive.exportexcel(this.data)
  }
  
}
function sort(arg0: (a: any, b: any) => 1 | -1) {
  throw new Error('Function not implemented.');
}

