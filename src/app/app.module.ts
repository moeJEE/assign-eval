import { NgModule } from '@angular/core';
// Remove or comment out this import:
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { ProductService } from './core/services/product.service';
import { CountryService } from './core/services/country.service';
import { CustomerService } from './core/services/customer.service';
import { EventService } from './core/services/event.service';
import { IconService } from './core/services/icon.service';
import { NodeService } from './core/services/node.service';
import { PhotoService } from './core/services/photo.service';
import { MydashboardComponent } from './developer/pages/mydashboard/mydashboard.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ApiModule, Configuration } from './api';
import { HttpClientModule } from '@angular/common/http';

export function apiConfigFactory(): Configuration {
    return new Configuration({
      basePath: 'http://localhost:8088/api/v1',
      accessToken: () => localStorage.getItem('token') || '',
    });
}

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, MydashboardComponent
    ],
    imports: [
        HttpClientModule,
        ApiModule.forRoot(apiConfigFactory),
        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        CommonModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        FormsModule
    ],
    providers: [
        // Remove this line:
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, 
        CustomerService, 
        EventService, 
        IconService, 
        NodeService,
        PhotoService, 
        ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
