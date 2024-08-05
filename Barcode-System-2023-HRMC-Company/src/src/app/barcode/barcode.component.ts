import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperatorWorkService } from '../services/operator_work.service';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  value = 'anything'
  id: any
  data: any
  barcodeData: any;

  constructor(private route: ActivatedRoute, private service: OperatorWorkService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        console.log(this.id);
        this.service.getBarcodeByCardNo(this.id).subscribe(res => {
          console.log("Barcode Res .....", res);
          this.data = res;
          // this.barcodeData = JSON.parse(res[0].barcode)
          this.barcodeData = res
          console.log(this.barcodeData);
          console.log("barcode res:", res);
        })
      }
    })

  }

  // printBarcode() {
  // const barcodeValue = '1234567890'; // The value for the barcode
  // JsBarcode("#barcode", barcodeValue); // Generate the barcode

  // // Print the barcode
  // const printWindow:any = window.open('', '_blank', 'width=600,height=400');
  // printWindow.document.open();
  // printWindow.document.write('<html><head><title>Print Barcode</title></head><body>');
  // // printWindow.document.write('<img src="' + document.getElementById('barcode')!.getElementsByTagName('svg')[0] + '"/>');
  // printWindow.document.write('</body></html>');
  // printWindow.document.close();
  // printWindow.print();


  // let urls:any
  // this.barcodeData.forEach((element:any) => {
  //     urls.push(this.generateBarcodeImage(element))
  //     window.print()
  // })

  // }

  generateBarcodeImage(barcodeValue: string): string {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeValue);
    return canvas.toDataURL();
  }

  printBarcode() {
    window.print();
  }


  currentPage = 1;
  totalPages = 0;
  showPrint = false

  printPages() {
    debugger
    this.showPrint = true
    this.totalPages = this.barcodeData.length
    this.printNextPage();
  }

  printNextPage() {
    if (this.currentPage <= this.totalPages) {
      let src = this.generateBarcodeImage(this.barcodeData[this.currentPage-1].barcode)
      var pageContent = `<div class='barcode-page'>
      <center><img src="`+src+`" alt="Barcode"width="120px" height="50px" margin-bottom="99%" ></img></center>

 
            
          </div>`;
      document.getElementById("printDiv")!.innerHTML += pageContent;

      this.currentPage++;
      setTimeout(() => {
        this.printNextPage();
      }, 100);
    } else {
      window.print();
    }
  }

}



// import {
//   Component,
//   AfterViewInit,
//   ElementRef,
//   ViewChild,
//   OnInit,
// } from '@angular/core';
// import JsBarcode = require('jsbarcode');

// @Component({
//   selector: 'my-app',
//   template: ` <button (click)="generateBarcode()">Generate Barcode</button>
//   <br />
//   <svg #barcodeSvg id="barcode"></svg>
//   <br />
//   <button (click)="generatePRN()">Generate Barcode PRN</button>
//   <br />`,
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent implements AfterViewInit, OnInit {
//   name = 'Angular';
//   isShow = false;
//   px2mmFactor: number;
//   public prnContent = '';

//   ngOnInit() {
//     this.px2mmFactor = this.calcPx2MmFactor();
//     this.isShow = true;
//     this.generateBarcode();
//   }

//   generateBarcode() {
//     const barcodeData = '9876543210'; // Sample barcode data

//     // Replace the barcode data here with your desired barcode content
//     // Generate and display the barcode using JsBarcode
//     JsBarcode('#barcode', barcodeData, {
//       format: 'code128', // default
//       height: 10 * this.px2mmFactor, // 10mm
//       width: 2.3,
//       // displayValue: false,
//       text: '-' + barcodeData + '-',
//       background: 'rgba(0,0,0,0.1)',
//       font: 'monospace',
//       fontOptions: 'bold',
//       fontSize: 16,
//       lineColor: 'darkblue',
//       margin: 5 * this.px2mmFactor, // 5mm
//       textMargin: 2 * this.px2mmFactor, // 2mm
//       // textAlign: 'right',
//       // textPosition: 'top',
//     });
//   }

//   generatePRN() {
//     // Replace the barcode data here with your desired barcode content
//     const barcodeData = '!105987654321'; // Sample barcode data
//     const pID = '3456768'; // Sample pID
//     const jobCard = '43322';

//     // Construct the PRN content dynamically
//     this.prnContent =
//       `SIZE 57.5 mm, 40 mm\r\n` +
//       `DIRECTION 0,0\r\n` +
//       `REFERENCE 0,0\r\n` +
//       `OFFSET 0 mm\r\n` +
//       `SET PEEL OFF\r\n` +
//       `SET CUTTER OFF\r\n` +
//       `SET TEAR ON\r\n` +
//       `CLS\r\n` +
//       `BARCODE 321,280,"128M",102,0,180,3,6,"${barcodeData}"\r\n` +
//       `CODEPAGE 1252\r\n` +
//       `TEXT 270,173,"ROMAN.TTF",180,1,12,"${barcodeData}"\r\n` + // Sample barcode text
//       `TEXT 409,132,"ROMAN.TTF",180,1,12,"P.ID     "\r\n` +
//       `TEXT 181,132,"ROMAN.TTF",180,1,12,"${pID}"\r\n` +
//       `TEXT 415,77,"ROMAN.TTF",180,1,12,"Job Card No. "\r\n` +
//       `TEXT 164,77,"ROMAN.TTF",180,1,12,"${jobCard}"\r\n` +
//       `PRINT 1,1`;

//     // Create a Blob with the PRN content
//     const prnBlob = new Blob([this.prnContent], { type: 'text/plain' });

//     // Create a URL for the Blob
//     const prnURL = URL.createObjectURL(prnBlob);

//     // Create an anchor element to initiate the download
//     const downloadLink = document.createElement('a');
//     downloadLink.href = prnURL;
//     downloadLink.download = 'barcode' + jobCard + '.prn'; // Set the filename for the downloaded PRN file

//     // Append the anchor element to the DOM
//     document.body.appendChild(downloadLink);

//     // Initiate the download
//     downloadLink.click();

//     // Clean up: remove the anchor element and revoke the URL
//     document.body.removeChild(downloadLink);
//     URL.revokeObjectURL(prnURL);
//   }

//   private calcPx2MmFactor() {
//     let e = document.createElement('div');
//     e.style.position = 'absolute';
//     e.style.width = '100mm';
//     document.body.appendChild(e);
//     let rect = e.getBoundingClientRect();
//     document.body.removeChild(e);
//     return rect.width / 100;
//   }
