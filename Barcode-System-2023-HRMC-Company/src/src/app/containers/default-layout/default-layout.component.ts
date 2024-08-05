import { Component } from '@angular/core';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  // public navItems:any //= navItems;
  public sideItems: any;
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  // aa=['Dashboard','Barcode-system','Operation','Users','Items','Supervisor', 'Inspector','Rejecter']
  adminOnlyArr = ['Operation', 'INSPECTOR', 'REJECTOR']; //add name to hide from admin only
  supervisorArr = ['USERS', 'Operation', 'Operation-work']; //add name from _nav.ts to hide from superwisor only
  managerOnly = ['Members', 'Franchisee REPORTS', 'BATCHCODE'];
  InspectorOnly = ['Operation', 'USERS', 'ITEM', 'JOB CARD', 'REJECTOR', 'REPORTS', 'BATCHCODE'];
  rejectorArr = ['Barcode-system', 'Operation', 'USERS', 'ITEM', 'JOB CARD', 'INSPECTOR', 'REPORTS', 'BATCHCODE'];
  operatorArr = ['Barcode-system', 'USERS', 'ITEM', 'JOB CARD', 'INSPECTOR', 'Rejecter', 'REPORTS', 'BATCHCODE']
  constructor() {
    let role = localStorage.getItem('role')

    if (role == 'admin') {
      this.sideItems = navItems.filter((item: any) =>
        !this.adminOnlyArr.includes(item.name))
    }
    if (role == 'supervisor') {
      this.sideItems = navItems.filter((item: any) =>
        !this.supervisorArr.includes(item.name))
    }

    if (role == 'manager') {
      this.sideItems = navItems.filter((item: any) =>
        !this.managerOnly.includes(item.name))
    }
    if (role == 'inspector') {
      this.sideItems = navItems.filter((item: any) =>
        !this.InspectorOnly.includes(item.name))
    }
    if (role == 'rejector') {
      // console.log("Inside Rejcor");
      this.sideItems = navItems.filter((item: any) =>
        !this.rejectorArr.includes(item.name))
    }
    if (role == 'operator') {
      // console.log("Inside Rejcor");
      this.sideItems = navItems.filter((item: any) =>
        !this.operatorArr.includes(item.name))
    }
  }
}