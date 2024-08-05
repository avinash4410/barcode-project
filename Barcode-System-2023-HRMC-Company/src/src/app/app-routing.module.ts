import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ItemOperationsComponent } from './components/item-operations/item-operations.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { TaskListComponent } from './task-list/task-list.component';
import { InspectorComponent } from './inspector/inspector.component';
import { OperatorComponent } from './operator/operator.component';
import { OperatorworkListComponent } from './operatorwork-list/operatorwork-list.component';
import { CustmerComponent } from './custmer/custmer.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { InspectorWorkListComponent } from './inspector-work-list/inspector-work-list.component';
import { RejectorWorkListComponent } from './rejector-work-list/rejector-work-list.component';
import { ReportComponent } from './report/report.component';
import { SingleReportComponent } from './report/single-report/single-report.component';
import { ItemReportComponent } from './report/item-report/item-report.component';
import { RejectorReportComponent } from './report/rejector-report/rejector-report.component';
import { InspectorReportComponent } from './report/inspector-report/inspector-report.component';
import { SingleInspectorReportComponent } from './report/single-inspector-report/single-inspector-report.component';
import { SingleRejectorReportComponent } from './report/single-rejector-report/single-rejector-report.component';
import { RejecteritemComponent } from './rejecteritem/rejecteritem.component';
import { BatchCodeComponent } from './batch-code/batch-code.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'Operator/work', component:OperatorComponent
      },
      {
        path: 'Operator/work/:id', component:OperatorComponent
      },
      {
        path: 'barcode/:id', component:BarcodeComponent
      },
      {
        path: 'Operator/work-list', component:OperatorworkListComponent
      },

      {
        path: 'users/new', component:RegistrationComponent
      },
      {
        path: 'users/new/:id', component:RegistrationComponent
      },
      {
        path: 'users/list', component:ListUsersComponent
      },
      {
        path: 'users/customer-list', component:CustmerComponent
      },
      {
        path: 'users/customer', component:CustmerComponent
      },
      {
        path: 'item/operation', component:ItemOperationsComponent
      },
      {
        path: 'item/list', component:ListItemsComponent
      },
      {
        path: 'item/operation/:id', component:ItemOperationsComponent
      },
      // http://localhost:4200/#/item/operation
      {
        path: 'Supervisor/Assign work', component:SupervisorComponent
      },

      // --------------------------
      {
        path: 'Supervisor/AssingWork/:id', component:SupervisorComponent
      },

      // ----------------
      {
        path: 'Supervisor/Assing-work-list', component:TaskListComponent
      },
      {
        path: 'Inspector', component:InspectorComponent
      },
     
      {
        path: 'Inspector/work/:id', component:InspectorComponent
      },
      {
        path: 'Inspector/list', component:InspectorWorkListComponent
      },
      {
        path: 'rejector/list', component:RejectorWorkListComponent
      },
      {
        path: 'rejector/work/:id', component:RejecteritemComponent
      },
      {
        path: 'report', component:ReportComponent
      },
      {
        path: 'report/item', component:ItemReportComponent
      },
      {
        path: 'report/inspector', component:InspectorReportComponent
      },
      {
        path: 'report/inspector/:id', component:SingleInspectorReportComponent
      },
      {
        path: 'report/rejector', component:RejectorReportComponent
      },
      {
        path: 'report/rejector/:id', component:SingleRejectorReportComponent
      },
      {
        path: 'report/summery/:id', component:SingleReportComponent
      },
      {
        path: 'report/Item', component:ItemReportComponent
      },
      {
        path: 'batchCode', component:BatchCodeComponent
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  // {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
