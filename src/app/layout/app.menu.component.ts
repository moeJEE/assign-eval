import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '@app/layout/service/app.layout.service'; // Updated path

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { 
            label: 'Dashboard', 
            icon: 'pi pi-fw pi-home', 
            routerLink: ['/project-manager-dashboard'] 
          },
        ],
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Projects',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: ['/project-manager/pages/projects'],
          },
          {
            label: 'Developers',
            icon: 'pi pi-fw pi-code',
            routerLink: ['/project-manager/pages/developers'],
          },
        ],
      },
    ];
  }
}
