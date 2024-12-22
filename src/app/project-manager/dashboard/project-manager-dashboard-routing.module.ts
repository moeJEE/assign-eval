// src/app/project-manager/dashboard/dashboard-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './project-manager-dashboard.component';


const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'project-manager-dashboard', component: DashboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}