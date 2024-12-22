import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/project-manager-dashboard.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'projects', loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule) },
        { path: 'developers', loadChildren: () => import('./pages/developers/developers.module').then(m => m.DevelopersModule) },
        { path: 'empty', loadChildren: () => import('./pages/empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./pages/timeline/timelinedemo.module').then(m => m.TimelineDemoModule) }
    ])],
    exports: [RouterModule]
})
export class ProjectManagerRoutingModule { }
