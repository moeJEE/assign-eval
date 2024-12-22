// src/app/demo/components/pages/developers/developers-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopersComponent } from './developers.component';
import { DeveloperDetailsComponent } from './developers-details/developer-details.component';

const routes: Routes = [
  { path: '', component: DevelopersComponent },
  { path: ':id', component: DeveloperDetailsComponent } // Route for Developer Details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopersRoutingModule { }
