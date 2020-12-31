import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/users-list', title: 'Users List', icon: 'people',       class: '' },
  { path: '/sites-list', title: 'Sites List', icon: 'add_business', class: '' },
  // { path: '/entities', title:   'Entities',   icon: 'add_business', class: '' },
];
export const SEPARATEDROUTES: RouteInfo[] = [
  { path: '/chat',     title: 'chat',         icon: 'chat',            class: '' },
  { path: '/settings', title: 'Settings',     icon: 'settings',        class: '' }
];

export const ENTITES: RouteInfo[] = [
  { path: '/places',               title: 'places',                icon: 'place',       class: '' },
  { path: '/activities',           title: 'activities',            icon: 'support', class: '' },
  { path: '/companies',            title: 'companies',             icon: 'integration_instructions', class: '' },
  { path: '/departments',          title: 'departments',           icon: 'subject', class: '' },
  { path: '/divisions',            title: 'divisions',             icon: 'table_rows', class: '' },
  { path: '/positions',            title: 'titles',                icon: 'shop_two', class: '' },
  { path: '/roles', title: 'roles',                 icon: 'gps_fixed', class: '' },
  { path: '/siteTypes',            title: 'site Types',            icon: 'sync_alt', class: '' },
  { path: '/timeGroups',           title: 'time Groups',           icon: 'av_timer', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  entitesItems: any[];
  speratedItems: any [];
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.entitesItems = ENTITES.filter(entityItem => entityItem);
    this.speratedItems = SEPARATEDROUTES.filter(speratedItem => speratedItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
