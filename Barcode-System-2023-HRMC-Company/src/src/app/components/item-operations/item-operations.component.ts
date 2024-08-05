import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { custmerService } from 'src/app/services/custmer.service';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-operations',
  templateUrl: './item-operations.component.html',
  styleUrls: ['./item-operations.component.scss']
})

export class ItemOperationsComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  batchCodes: number = 5;
  myReactiveForm!: FormGroup;
  id: any;
  customers: any;
  itemNames: string[] = [];
  duplicateItemError: boolean = false;

  constructor(private route: ActivatedRoute, private service: ItemService, private customerService: custmerService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        this.service.getSingleItem(this.id).subscribe(res => {
          this.myReactiveForm.patchValue({
            itemNo: res[0].ITEM_NO,
            itemName: res[0].ITEM_NAME,
            itemDesc: res[0].ITEM_DESCRIPTION,
            boxQty: res[0].BOX_QTY,
            customerName: res[0].CUSTOMER_NAME
          })
        })
      }
    })

    this.myReactiveForm = new FormGroup({
      itemNo: new FormControl(null, [Validators.required]),
      itemName: new FormControl(null, [Validators.required]),
      itemDesc: new FormControl(null, [Validators.required]),
      boxQty: new FormControl(null, [Validators.required]),
      cid: new FormControl(null),
      customerName: new FormControl(null, [Validators.required]),
    });

    // Fetch item names
    this.fetchItemNames().subscribe((response: any) => {
      if (response.status) {
        this.itemNames = response.data;
      }
    });

    this.getAllCustomers();

    if (!this.id) {
      this.autoIncrement();
    }
  }

  getAllCustomers() {
    this.customerService.getAll().subscribe((res: any) => {
      this.customers = res;
    });
  }

  autoIncrement() {
    this.service.getAll().subscribe(
      (res) => {
        if (res && res.length > 0 && res[res.length - 1].ITEM_NO) {
          let maxId = res[res.length - 1].ITEM_NO;
          this.myReactiveForm.patchValue({ itemNo: maxId + 1 });
        } else {
          this.myReactiveForm.patchValue({ itemNo: 1 });
        }
      },
      (err) => {
        let errorMessage = 'Something went wrong';
        if (err.error.sqlMessage) {
          errorMessage = err.error.sqlMessage;
        }
        if (err) {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: errorMessage,
          });
        }
      }
    );
  }

  onSubmit() {
    const itemName = this.myReactiveForm.get('itemName')!.value;

    if (this.itemNames.includes(itemName)) {
      this.duplicateItemError = true; // Display an error message and prevent submission
    } else {
      this.duplicateItemError = false; // Reset the duplicate error flag

      this.myReactiveForm.markAllAsTouched();
      if (this.myReactiveForm.valid) {
        if (!this.id) {
          this.service.register(this.myReactiveForm.value).subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Item Added Successfully...!',
                timer: 2000,
              });
              this.myReactiveForm.reset();
              this.autoIncrement();
            },
            (err) => {
              let errorMessage = 'Something went wrong';
              if (err.error.sqlMessage) {
                errorMessage = err.error.sqlMessage;
              }
              if (err) {
                Swal.fire({
                  icon: 'error',
                  title: 'error',
                  text: errorMessage,
                });
              }
            }
          );
        } else {
          this.service.update(this.id, this.myReactiveForm.value).subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Item Updated Successfully...!',
                timer: 2000,
              });
              this.myReactiveForm.reset();
              this.router.navigate(['/item/list']);
            },
            (err) => {
              let errorMessage = 'Something went wrong';
              if (err.error.sqlMessage) {
                errorMessage = err.error.sqlMessage;
              }
              if (err) {
                Swal.fire({
                  icon: 'error',
                  title: 'error',
                  text: errorMessage,
                });
              }
            }
          );
        }
      }
    }
  }

  fetchItemNames() {
    // Implement your HTTP request to fetch item names here
    return this.service.fetchItemNames();
  }
}
