import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'developer-dashboard',
        loadChildren: () =>
            import('./developer/dashboard/dashboard.module').then(
                (m) => m.DeveloperModule
            ),
        canActivate: [AuthGuard],
        data: { roles: ['developer'] },
      },
      {
        path: 'project-manager-dashboard',
        loadChildren: () =>
          import(
            './project-manager/dashboard/dashboard.module'
          ).then((m) => m.ProjectManagerDashboardModule),
        canActivate: [AuthGuard],
        data: { roles: ['project_manager'] },
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
