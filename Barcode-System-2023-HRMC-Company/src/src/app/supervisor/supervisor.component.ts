import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupervisorService } from '../services/supervisor.service';
import Swal from 'sweetalert2';
import { custmerService } from '../services/custmer.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { BatchCodeService } from '../services/batch-code.service';
import { LoaderServiceService } from '../services/loader-service.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

  // allUsers:any
  id: any;
  loading = false;
  supervisors: any = []
  customers: any = []
  batchCodes: any = [];
  // batchCodes: Array<string> = ['AA-01','AA-02','AA-03','123']
  operators: any = []
  inspectors: any = []
  rejectors: any = []
  users: any = []
  items: any = []
  filteredItems: any = []
  isBarcodeGenerated: boolean = false;
  myReactiveForm!: FormGroup;
  constructor(
    private service: SupervisorService,
    private custmerService: custmerService,
    private itemService: ItemService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private batchCodeService: BatchCodeService,
    private LoaderServiceService: LoaderServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {  //Set value to form using URL ID
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        this.service.getSingle(this.id).subscribe(res => {
          console.log("Single task resp", res[0]);
          this.filteredItems.push({ ITEM_NAME: res[0].itemName, ITEM_DESCRIPTION: res[0].itemDesc });
          this.operators.push({ oid: res[0].operatorId, name: res[0].moulderName });
          this.inspectors.push({ inspectorName: res[0].inspectorName });
          this.rejectors.push({ oid: res[0].rejectorId });
          this.myReactiveForm.patchValue(res[0]);
        })
      }
    })


    this.myReactiveForm = new FormGroup({
      oid: new FormControl(null),
      // partNo: new FormControl(null,Validators.required),
      cardNo: new FormControl(null, Validators.required),
      cid: new FormControl(null),
      // oid: new FormControl(null),
      custName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      itemName: new FormControl(null, Validators.required),
      itemDesc: new FormControl(null, Validators.required),
      batchCode: new FormControl(null, Validators.required),
      batchWeighed: new FormControl(null, Validators.required),
      batchMadeBy: new FormControl(null, Validators.required),
      modulingDate: new FormControl(null, Validators.required),
      operatorId: new FormControl(null, Validators.required),
      moulderName: new FormControl(null, Validators.required),
      inspectorId: new FormControl(null, Validators.required),
      inspectorName: new FormControl(null, Validators.required),
      rejectorId: new FormControl(null, Validators.required),
      rejectorName: new FormControl(null, Validators.required),
      shift: new FormControl(null, Validators.required),
      mcNo: new FormControl(null, Validators.required),
      mouldingQty: new FormControl(1, Validators.required),
      boxQty: new FormControl(null, Validators.required),

    })




    if (!this.id)
      this.getAllSupervisors()

    this.custmerService.getAll().subscribe((res: any) => {
      this.customers = res
      console.log("Customers", this.customers)
      // this.allUsers = res;
      // let operator =[]
      // res.map((user:any)=>{
      //   if(user.role=='operator')
      //     this.operators.push(user)
      // })
    })

    let perems = { role: 'operator' }
    this.userService.getUserByRole(perems).subscribe((res: any) => {
      this.operators = res
      console.log("operators :", this.operators)
    })
    let perems2 = { role: 'inspector' }
    this.userService.getUserByRole(perems2).subscribe((res: any) => {
      this.inspectors = res
      console.log("inspectors :", this.inspectors)
    })

    let perems3 = { role: 'rejector' }
    this.userService.getUserByRole(perems3).subscribe((res: any) => {
      this.rejectors = res
      console.log("rejector :", this.rejectors)
    })

    this.itemService.getAll().subscribe(res => {
      this.items = res
      console.log("Items", this.items);
    })

    this.getBatchCodes();
  }

  getBatchCodes() {
    this.batchCodeService.getBatchCodes().subscribe((res: any) => {
      this.batchCodes = res
      console.log("BatchCode Response :", res);
    })
    // this.batchCodes = ['AA-01','AA-02','AA-03','123','Ajay']
  }

  getAllSupervisors() {
    this.service.getAll().subscribe(res => {
      this.supervisors = res
      console.log(this.supervisors)
      let cardNo = 0
      if (res && res[0] && res[0].cardNo && res[res.length - 1].cardNo != undefined)
        cardNo = +(res[res.length - 1].cardNo)
      this.myReactiveForm.patchValue({ cardNo: (cardNo + 1) })
    })
  }

  setItemName(e: any) {
    console.log(e);
    this.items.forEach((item: any) => {
      if (item.ITEM_NAME == e.target.value || item.ITEM_DESCRIPTION == e.target.value) {
        console.log("c", item);
        // this.myReactiveForm.patchValue({ cid: element.cid })
        this.myReactiveForm.patchValue({ itemName: item.ITEM_NAME })
        this.myReactiveForm.patchValue({ boxQty: item.BOX_QTY })
        this.myReactiveForm.patchValue({ itemDesc: item.ITEM_DESCRIPTION })
      }
    })

  }
  setCustName(e: any) {
    this.filteredItems = []
    console.log("EVENT", e.target.value);
    this.customers.forEach((element: any) => {
      console.log("Element.......", element);
      if (element.CUSTOMER_NAME == e.target.value) {
        this.myReactiveForm.patchValue({ city: element.CITY })
        console.log("c", element);
        this.items.map((res: any) => {
          if (res.CUSTOMER_NAME === element.CUSTOMER_NAME) {
            this.filteredItems.push(res)
          }
        })
      }
    })

  }

  getOprName(e: any) {
    console.log(e);
    this.operators.forEach((element: any) => {
      if (element.oid == e?.target.value) {
        console.log("e", element);
        this.myReactiveForm.patchValue({ operatorId: element.oid })
        this.myReactiveForm.patchValue({ moulderName: element.name })
      }
    })
  }
  getInspectorName(e: any) {
    console.log(e);
    this.inspectors.forEach((element: any) => {
      if (element.oid == e?.target.value) {
        console.log("e", element);
        this.myReactiveForm.patchValue({ inspectorId: element.oid })
        this.myReactiveForm.patchValue({ inspectorName: element.name })
      }
    })
  }
  getRejectorName(e: any) {
    console.log(e);
    this.rejectors.forEach((element: any) => {
      if (element.oid == e?.target.value) {
        console.log("e", element);
        this.myReactiveForm.patchValue({ rejectorId: element.oid })
        this.myReactiveForm.patchValue({ rejectorName: element.name })
      }
    })

  }

  // generateBarcode() {
  //   let barcode;
  //   let params = {
  //     qty: this.myReactiveForm.value.mouldingQty,
  //     cardNo: this.myReactiveForm.value.cardNo,
  //     oid: this.myReactiveForm.value.oid
  //   };
  
  //   this.service.generateBarcode(params).subscribe(
  //     (res: any) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Success',
  //         text: 'Barcode generated Successfully...',
  //         // showConfirmButton: true // Show "OK" button
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           // User clicked "OK"
  //           this.isBarcodeGenerated = true;
  //         }
  //       });
  //     },
  //     (err) => {
  //       let errorMessage = 'Something went wrong';
  //       if (err.error.sqlMessage) errorMessage = err.error.sqlMessage;
  //       if (err)
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: errorMessage
  //         });
  //     }
  //   );
  // }

  generateBarcode(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      let params = {
        qty: this.myReactiveForm.value.mouldingQty,
        cardNo: this.myReactiveForm.value.cardNo,
        oid: this.myReactiveForm.value.oid
      };
  
      this.service.generateBarcode(params).subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Barcode generated Successfully...',
          });
          resolve(); // Resolve the Promise when barcode generation is done
        },
        (err) => {
          let errorMessage = 'Something went wrong';
          if (err.error.sqlMessage) errorMessage = err.error.sqlMessage;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage
          });
          reject(err); // Reject the Promise if an error occurs
        }
      );
    });
  }
  
  

  viewBarcode() {
    let cardNo = this.myReactiveForm.value.cardNo
    this.router.navigate(['/barcode/' + cardNo])
  }

  onSubmit() {
    // Mark all form controls as touched to trigger validation messages
    this.myReactiveForm.markAllAsTouched();
  
    // Check if the form is valid
    if (this.myReactiveForm.valid) {
      // Show confirmation alert before submitting
      Swal.fire({
        icon: 'question',
        title: 'Confirmation',
        text: 'Are you sure you want to submit the form?',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // User clicked "Yes, submit"
          // Show loader
          // this.LoaderServiceService.showLoader();
          // this.loading = true;
  
          const formData = this.myReactiveForm.value;
  
          if (this.id) {
            this.service.update(this.id, formData).subscribe(
              () => {
                this.generateBarcode().then(() => {
                  this.handleSuccess('Updated Successfully...', '/Supervisor/Assign-work-list');
                });
              },
              (err) => this.handleError(err)
            );
          } else {
            this.service.register(formData).subscribe(
              () => {
                this.generateBarcode().then(() => {
                  this.handleSuccess('Registered Successfully...', '/Supervisor/Assign-work-list');
                });
              },
              (err) => this.handleError(err)
            );
          }
          
        }
      });
    } else {
      // Invalid form, show error alert
      Swal.fire({
        icon: 'error',
        title: 'Fill Up All',
        text: 'Please fill in all required fields correctly.',
        timer: 5000
      });
      this.hideLoader();
    }
  }
  

  private handleSuccess(message: string, redirectUrl: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      // timer: 9000
    });

    // Reset the form and navigate to the specified URL
    this.myReactiveForm.reset();
    this.getAllSupervisors();
    this.router.navigate([redirectUrl]);

    // Hide loader and reset loading state
    this.hideLoader();
  }

  private handleError(error: any): void {
    let errorMessage = 'Something went wrong';
    if (error.error.sqlMessage) {
      errorMessage = error.error.sqlMessage;
    }

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage
    });

    // Hide loader and reset loading state
    this.hideLoader();
  }

  private hideLoader(): void {
    setTimeout(() => {
      this.LoaderServiceService.hideLoader();
      this.loading = false;
    }, 4000);
  }



}