import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '' },
  { path: '/icons', title: 'Icons', icon: 'education_atom', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_map-big', class: '' },
  {
    path: '/notifications',
    title: 'Notifications',
    icon: 'ui-1_bell-53',
    class: ''
  },
  {
    path: '/user-profile',
    title: 'User Profile',
    icon: 'users_single-02',
    class: ''
  },
  {
    path: '/table-list',
    title: 'Table List',
    icon: 'design_bullet-list-67',
    class: ''
  },
  {
    path: '/typography',
    title: 'Typography',
    icon: 'text_caps-small',
    class: ''
  },
  { path: '/sqliteexample', title: 'SQLite', icon: 'design_app', class: '' },
  { path: '/states', title: 'States', icon: 'design_app', class: '' },
  { path: '/bill-types', title: 'Bill Types', icon: 'design_app', class: '' },
  {
    path: '/bank-accounts',
    title: 'Bank Accounts',
    icon: 'design_app',
    class: ''
  },
  {
    path: '/company-profiles',
    title: 'Company Profiles',
    icon: 'design_app',
    class: ''
  },
  { path: '/buyers', title: 'Buyers', icon: 'design_app', class: '' },
  { path: '/invoices', title: 'Invoices', icon: 'design_app', class: '' },
  {
    path: '/purchase-entries',
    title: 'Purchase Entries',
    icon: 'design_app',
    class: ''
  },
  {
    path: '/invoice-summaries',
    title: 'Invoice Summaries',
    icon: 'design_app',
    class: ''
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
