import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportPDF(DATA:any): void {
    debugger
    // let DATA: any = document.getElementById('tblOldDb1');
    // DATA.querySelector("th:last-child").remove(); //removing view Button
    let a :any = document.querySelectorAll('.viewbtn')
    for (let el of a) el.style.display = 'none';
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4'); 
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Report.pdf');
      for (let el of a) el.style.display = 'block';
    });
  }
  exportexcel(data:any): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Report.xlsx');
  }
}

