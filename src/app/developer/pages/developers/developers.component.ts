import { Component, OnInit } from '@angular/core';
import { Developer } from '@app/models/project.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DeveloperService } from '@app/core/services/developer.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css'],
  providers: [MessageService],
})
export class DevelopersComponent implements OnInit {
  developerDialog: boolean = false;
  deleteDeveloperDialog: boolean = false;
  deleteDevelopersDialog: boolean = false;

  developers: Developer[] = [];
  developer: Developer = {}; // Added missing type initialization
  selectedDevelopers: Developer[] = [];
  submitted: boolean = false;

  cols: any[] = [];
  statuses: any[] = [];
  skillsOptions: any[] = [];

  selectedSkills: string[] = [];
  selectedStatus: string | null = null; // Added missing declaration

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private developerService: DeveloperService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Load developers data
    this.developerService
      .getDevelopers()
      .then((data: Developer[]) => (this.developers = data));

    // Column definitions
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'portfolio', header: 'Portfolio' },
      { field: 'status', header: 'Status' },
      { field: 'createdAt', header: 'Created At' },
    ];

    // Status options
    this.statuses = [
      { label: 'Available', value: 'Available' },
      { label: 'Not Available', value: 'Not Available' },
    ];

    // Skills options
    this.skillsOptions = [
      { label: 'Angular', value: 'Angular' },
      { label: 'React', value: 'React' },
      { label: 'Vue', value: 'Vue' },
      { label: 'Node.js', value: 'Node.js' },
      { label: 'Python', value: 'Python' },
    ];
  }

  // Filtering logic
  applyFilters(table: Table) {
    if (this.selectedStatus) {
      table.filter(this.selectedStatus, 'status', 'equals');
    }
    if (this.selectedSkills.length) {
      table.filter(this.selectedSkills, 'skills', 'in');
    }
  }

  clearFilters(table: Table) {
    this.selectedStatus = null;
    this.selectedSkills = [];
    table.clear();
  }

  // Dialog controls
  openNew() {
    this.developer = {};
    this.selectedSkills = [];
    this.submitted = false;
    this.developerDialog = true;
  }

  deleteSelectedDevelopers() {
    this.deleteDevelopersDialog = true;
  }

  editDeveloper(developer: Developer) {
    this.developer = { ...developer };
    this.developerDialog = true;
  }

  deleteDeveloper(developer: Developer) {
    this.deleteDeveloperDialog = true;
    this.developer = { ...developer };
  }

  confirmDeleteSelected() {
    this.deleteDevelopersDialog = false;
    this.developers = this.developers.filter(
      (val) => !this.selectedDevelopers.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Developers Deleted',
      life: 3000,
    });
    this.selectedDevelopers = [];
  }

  confirmDelete() {
    if (this.developer?.id) {
      this.deleteDeveloperDialog = false;
      this.developers = this.developers.filter(
        (val) => val.id !== this.developer.id
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Developer Deleted',
        life: 3000,
      });
      this.developer = {};
    }
  }

  hideDialog() {
    this.developerDialog = false;
    this.submitted = false;
  }

  saveDeveloper() {
    this.submitted = true;

    if (this.developer.name?.trim() && this.selectedSkills.length > 0) {
        if (this.developer.id) {
            // Update existing developer
            const index = this.findIndexById(this.developer.id);
            this.developers[index] = {
                ...this.developer,
                skills: [...this.selectedSkills],
            };
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Developer Updated',
                life: 3000,
            });
        } else {
            // Add new developer
            this.developer.id = this.createId();
            const newDeveloper = {
                ...this.developer,
                skills: [...this.selectedSkills],
                status: this.developer.status, // Ensure status is set correctly
                createdAt: new Date(), // Add a created date
            };
            this.developers.push(newDeveloper);

            // Automatically check the new row
            this.selectedDevelopers = [...this.selectedDevelopers, newDeveloper];

            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Developer Created',
                life: 3000,
            });
        }
        this.developers = [...this.developers]; // Trigger table update
        this.developerDialog = false;
        this.developer = {};
        this.selectedSkills = [];
    } else {
        if (!this.developer.name?.trim()) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Name is required.',
                life: 3000,
            });
        }
        if (this.selectedSkills.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'At least one skill is required.',
                life: 3000,
            });
        }
    }
}


  resetDeveloperForm() {
    this.developer = {};
  }

  findIndexById(id: string): number {
    return this.developers.findIndex((developer) => developer.id === id);
  }

  createId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 6 })
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('');
  }

  onGlobalFilter(table: Table, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    table.filterGlobal(filterValue, 'contains');
  }
}
