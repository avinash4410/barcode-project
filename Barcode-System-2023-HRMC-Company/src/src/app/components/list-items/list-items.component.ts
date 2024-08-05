import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  items: any;

  page: number = 1
  count: number = 0
  itemsPerPage: number = 5;
  searchKeyword: any
  myReactiveForm: any;
  itemNo: any

  constructor(private service: ItemService) { }

  ngOnInit(): void {

    this.getAll()
  }
  getAll() {
    {
    this.service.getAll().subscribe(res => {
      this.items = res;
      this.items.sort((a:any,b:any) =>(a.ITEM_NO<b.ITEM_NO) ? 1: -1); // sortings are in ascending order
     
      this.items.sort((num1:any, num2:any) =>{
        if(num1.ITEM_NO < num2.ITEM_NO)
          return 1  //true
        else
          return -1 //false
      })
      console.log(this.items);
      // this.items = res
    })
  }
}

  autoIncrement(res: any) {
    this.itemNo = 0
    if (res && res[0] && res[0].ITEM_NO && res[res.length - 1].ITEM_NO != undefined)
      // this.cid = +(res[res.length - 1].C_ID)
      this.itemNo =+ (res[0].ITEM_NO)
    this.itemNo++
    this.myReactiveForm.patchValue({ itemNo: (this.itemNo) })
  }

  changePage(page: any) {
    this.page = page
    this.getAll()
  }

  // update(itemNo: any) {
  //   this.items.map((itemNo: any) => {
  //     this.items.itemNo === itemNo ? this.myReactiveForm.patchValue(this.items) : null;
  //   })
  // }

  delete(itemNo: any) {
    this.service.delete(itemNo).subscribe((res: any) => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Deleted Successfully...',
        timer: 2000
      })
      this.getAll()
    })
  }


}
