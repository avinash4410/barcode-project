import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private router: Router) {
    super();
  }

  logout() {
    Swal.fire({
      icon: 'question',
      title: 'Log Out',
      text: 'Are you sure ?',
      showCancelButton: true,
      showConfirmButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem('id'),
          localStorage.removeItem('role'),
          this.router.navigate(['/login'])
      }
    })
  }
}
