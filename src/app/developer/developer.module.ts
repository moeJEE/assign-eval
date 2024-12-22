// src/app/demo/components/pages/pages.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './developer-routing.module';
// Removed: import { ProjectDetailsComponent } from './project-details/project-details.component';
// Removed: import { DeveloperDetailsComponent } from './developers/developer-details/developer-details.component';

@NgModule({
    declarations: [
        // Other components if any
    ],
    imports: [
        CommonModule,
        PagesRoutingModule
    ]
})
export class PagesModule { }
