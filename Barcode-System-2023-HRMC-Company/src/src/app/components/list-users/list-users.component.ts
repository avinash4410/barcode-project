import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: any
  page:number = 1 //pagination 
  limit : number = 5 //pagination
  itemsPerPage : number = 5
  totalRecords : number = 0 //pagination
  count = 0
  role:any
  term:any
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getAllUser()
  }

  changePage(page:any){
    this.page = page
    // this.getAllUser()
  }
  getAllUser() {
    // let page = this.page * this.limit -this.limit
    // let params:any ={}
    // params['limit']=this.limit
    // params['offset']=page
    // if(this.role)
    // params['role']=this.role
    this.service.getUser().subscribe(res => {
      this.users = res
      this.users = res;
      this.users.sort((a:any,b:any) =>(a.oid<b.oid) ? 1: -1); // sortings are in ascending order
     
      this.users.sort((num1:any, num2:any) =>{
        if(num1.oid < num2.oid)
          return 1  //true
        else
          return -1 //false
      })
      console.log(this.users);
      // this.totalRecords=res.count[0].totalusers
      // this.totalRecords=res.result.length
    })

    // let page = this.page * this.limit -this.limit
    // let params:any ={}
    // params['limit']=this.limit
    // params['offset']=page
    // if(this.role)
    // params['role']=this.role
    // this.service.getUser(params).subscribe(res => {
    //   console.log(res);
    //   this.users = res.result
    //   // this.totalRecords=res.count[0].totalusers
    //   this.totalRecords=res.result.length
    // })
  }
  getUserByRole(role: string){
    this.role=role
    // this.page=1
    // let page = this.page * this.limit -this.limit
    let params:any ={}
    // params['limit']=this.limit
    // params['offset']=page
    params['role']=role
    this.service.getUserByRole(params).subscribe(res => {
      console.log(res);
      this.users = res
      // this.users = res.result
      // this.totalRecords=res.count[0].totalusers
    })
  }
  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete User?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.service.deleteUser(id).subscribe(res => {
          console.log(res);
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'User Deleted Successfully...!',
            })
            this.getAllUser()
          }
        })
      }
    })
  }

}
