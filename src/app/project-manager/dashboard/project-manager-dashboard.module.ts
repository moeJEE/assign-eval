// project-manager.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from '@app/developer/dashboard/dashboard-routing.module';
import { DashboardComponent } from './project-manager-dashboard.component';


@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        ButtonModule,
        StyleClassModule,
        PanelMenuModule,
        DashboardsRoutingModule
    ],
})
export class ProjectManagerDashboardModule {}