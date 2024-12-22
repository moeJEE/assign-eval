// src/app/demo/components/pages/developers/developers.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopersRoutingModule } from './developers-routing.module';
import { DevelopersComponent } from './developers.component';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { DeveloperDetailsComponent } from './developers-details/developer-details.component';
import { ChipModule } from 'primeng/chip';
import { TimelineModule } from 'primeng/timeline';

@NgModule({
  declarations: [
    DevelopersComponent,
    DeveloperDetailsComponent
  ],
  imports: [
    CommonModule,
    DevelopersRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    MultiSelectModule,
    AvatarModule,
    AvatarGroupModule,
    TooltipModule,
    BreadcrumbModule,
    RatingModule,
    InputTextareaModule,
    ChipModule,
    TimelineModule,
    
  ],
  providers: [MessageService]
})
export class DevelopersModule { }
