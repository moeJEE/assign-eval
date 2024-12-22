// src/app/demo/components/pages/developers/developers.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevelopersComponent } from './developers.component';
import { DeveloperService } from '../../../../core/services/developer.service';
import { MessageService } from 'primeng/api';

describe('DevelopersComponent', () => {
  let component: DevelopersComponent;
  let fixture: ComponentFixture<DevelopersComponent>;
  let mockDeveloperService: any;

  beforeEach(async () => {
    mockDeveloperService = {
      getDevelopers: jasmine.createSpy('getDevelopers').and.returnValue(Promise.resolve([])),
    };

    await TestBed.configureTestingModule({
      declarations: [ DevelopersComponent ],
      providers: [
        { provide: DeveloperService, useValue: mockDeveloperService },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DevelopersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load developers on init', async () => {
    const developers = [
      { id: 'USR-001', name: 'John Doe', status: 'Available' },
      { id: 'USR-002', name: 'Jane Smith', status: 'Not Available' }
    ];
    mockDeveloperService.getDevelopers.and.returnValue(Promise.resolve(developers));
    component.ngOnInit();
    await fixture.whenStable();
    expect(component.developers).toEqual(developers);
  });
});
