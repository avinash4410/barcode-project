import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'DASHBOARD',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'HYPERVISOR RUBBER MFG.CO SYSTEM',
  },
  {
    name: 'Operation',
    url: '/Operation',
    iconComponent: { name: 'cil-star' },
    children: [
      // {
      //   name: 'Operation-work',
      //   url: '/Operator/work'
      // },
      {
        name: 'List',
        url: '/Operator/work-list'
      }
    ]
  },
  {
    name: 'USERS',
    url: '/users',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'ADD NEW USER',
        url: '/users/new'
      },
      {
        name: 'NEW USER LIST',
        url: '/users/list'
      },
      {
        name: 'CUSTOMER RECORD',
        url: '/users/customer-list'
      }
    ]
  },
  {
    name: 'ITEM',
    url: '/item',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'NEW ITEM ADD',
        url: '/item/operation'
      },
      {
        name: 'ITEM RECORD LIST',
        url: '/item/list'
      }
    ]
  },
  {
    name: 'JOB CARD',
    url: '/Assign work',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'ASSING JOB CARD ',
        url: 'Supervisor/Assign work'
      },
      {
      name: 'JOB CARD RECORD LIST',
        url: 'Supervisor/Assing-work-list'
      }
    ]
  },
  {
    name: 'INSPECTOR',
    url: '/Inspector',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'INSPECTOR DASHBOARD',
        url: 'Inspector/work'
      },
      {
        name: 'INSPECTOR TASK LIST',
        url: 'Inspector/list'
      }
    ]
  },
  {
    name: 'REJECTOR',
    url: '/rejector',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'REJECTOR DASHBOARD',
        url: 'rejector/work'
      },
      {
        name: 'REJECTOR TASK LIST',
        url: 'rejector/list'
      }
    ]
  },
  {
    name: 'REPORTS',
    url: '/files/report',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'SUMMERY REPORT',
        url: 'report'
      },
      {
        name: 'INSPECTOR REPORT',
        url: 'report/inspector'
      },
      {
        name: 'REJECTOR REPORT',
        url: 'report/rejector'
      },
      {
        name: 'ITEM REPORT',
        url: '/report/Item'
      },
      // {
      //   name: 'InsterReport',
      //   url: '/report/Inster/report'
      // },
      // {
      //   name: 'Report SummaryReport',
      //   url: '/report/Summary/report'
      // }
    ]
  },
  {
    name: 'BATCHCODE',
    url: '/batchCode',
    iconComponent: { name: 'cil-star' },
    // children: [
    //   {
    //     name: 'SUMMERY REPORT',
    //     url: 'report'
    //   },
 
    // ]
  },









  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'someAnchor' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  // {
  //   name: 'Components',
  //   title: true
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Accordion',
  //       url: '/base/accordion'
  //     },
  //     {
  //       name: 'Breadcrumbs',
  //       url: '/base/breadcrumbs'
  //     },
  //     {
  //       name: 'Cards',
  //       url: '/base/cards'
  //     },
  //     {
  //       name: 'Carousel',
  //       url: '/base/carousel'
  //     },
  //     {
  //       name: 'Collapse',
  //       url: '/base/collapse'
  //     },
  //     {
  //       name: 'List Group',
  //       url: '/base/list-group'
  //     },
  //     {
  //       name: 'Navs & Tabs',
  //       url: '/base/navs'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/pagination'
  //     },
  //     {
  //       name: 'Placeholder',
  //       url: '/base/placeholder'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress'
  //     },
  //     {
  //       name: 'Spinners',
  //       url: '/base/spinners'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   iconComponent: { name: 'cil-cursor' },
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons'
  //     },
  //     {
  //       name: 'Button groups',
  //       url: '/buttons/button-groups'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns'
  //     },
  //   ]
  // },
  // {
  //   name: 'Forms',
  //   url: '/forms',
  //   iconComponent: { name: 'cil-notes' },
  //   children: [
  //     {
  //       name: 'Form Control',
  //       url: '/forms/form-control'
  //     },
  //     {
  //       name: 'Select',
  //       url: '/forms/select'
  //     },
  //     {
  //       name: 'Checks & Radios',
  //       url: '/forms/checks-radios'
  //     },
  //     {
  //       name: 'Range',
  //       url: '/forms/range'
  //     },
  //     {
  //       name: 'Input Group',
  //       url: '/forms/input-group'
  //     },
  //     {
  //       name: 'Floating Labels',
  //       url: '/forms/floating-labels'
  //     },
  //     {
  //       name: 'Layout',
  //       url: '/forms/layout'
  //     },
  //     {
  //       name: 'Validation',
  //       url: '/forms/validation'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   iconComponent: { name: 'cil-chart-pie' }
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500'
  //     }
  //   ]
//   },
 ];