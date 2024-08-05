import { NgModule } from '@angular/core';
import { DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { ItemOperationsComponent } from './components/item-operations/item-operations.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { InspectorComponent } from './inspector/inspector.component';
import { RejecteritemComponent } from './rejecteritem/rejecteritem.component';
import { TaskListComponent } from './task-list/task-list.component';
import { OperatorComponent } from './operator/operator.component';
import { OperatorworkListComponent } from './operatorwork-list/operatorwork-list.component';
import { CustmerComponent } from './custmer/custmer.component';
import { PaginationModule } from './pagination/pagination.module';
import { BarcodeComponent } from './barcode/barcode.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { InspectorWorkListComponent } from './inspector-work-list/inspector-work-list.component';
import { RejectorWorkListComponent } from './rejector-work-list/rejector-work-list.component';
import { ReportComponent } from './report/report.component';
import { SingleReportComponent } from './report/single-report/single-report.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemReportComponent } from './report/item-report/item-report.component';
import { OpreterReportComponent } from './opreter-report/opreter-report.component';
import { RejectorReportComponent } from './report/rejector-report/rejector-report.component';
import { InspectorReportComponent } from './report/inspector-report/inspector-report.component';
import { SingleInspectorReportComponent } from './report/single-inspector-report/single-inspector-report.component';
import { SingleRejectorReportComponent } from './report/single-rejector-report/single-rejector-report.component';
import { CustomFilterPipe } from './pipe/custom-filter-pipe.pipe';
import { CustListComponent } from './cust-list/cust-list.component';
import { BatchCodeComponent } from './batch-code/batch-code.component';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    RegistrationComponent,
    ListUsersComponent,
    ListItemsComponent,
    ItemOperationsComponent,
    SupervisorComponent,
    InspectorComponent,
    RejecteritemComponent,
    TaskListComponent,
    OperatorComponent,
    OperatorworkListComponent,
    CustmerComponent,
    BarcodeComponent,
    InspectorWorkListComponent,
    RejectorWorkListComponent,
    ReportComponent,
    SingleReportComponent,
    ItemReportComponent,
    OpreterReportComponent,
    RejectorReportComponent,
    InspectorReportComponent,
    SingleInspectorReportComponent,
    SingleRejectorReportComponent,
    CustomFilterPipe,
    CustListComponent,
    BatchCodeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    HttpClientModule,
    PaginationModule,
    NgxBarcode6Module,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    DatePipe,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
