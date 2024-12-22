// src/app/demo/components/pages/projects/projects.component.ts

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProjectService } from '@app/core/services/project.service';
import { Developer, Project } from '@app/models/project.model';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
    providers: [MessageService],
})
export class ProjectsComponent implements OnInit {
    projectDialog: boolean = false;
    deleteProjectDialog: boolean = false;
    deleteProjectsDialog: boolean = false;

    projects: Project[] = [];
    project: Project = {};
    selectedProjects: Project[] = [];
    submitted: boolean = false;

    cols: any[] = [];
    statuses: any[] = [];
    skillsOptions: any[] = [];
    developersOptions: Developer[] = [];

    selectedSkills: string[] = [];
    selectedDevelopers: Developer[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private projectService: ProjectService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        // Load projects data
        this.projectService
            .getProjects()
            .then((data: Project[]) => (this.projects = data));

        // Column definitions
        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'title', header: 'Title' },
            { field: 'status', header: 'Status' },
            { field: 'developers', header: 'Developers' },
            { field: 'startDate', header: 'Start Date' },
            { field: 'endDate', header: 'End Date' },
            { field: 'actions', header: 'Actions' },
        ];

        // Status options
        this.statuses = [
            { label: 'In Progress', value: 'In Progress' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Review', value: 'Review' },
        ];

        // Skills options
        this.skillsOptions = [
            { label: 'Angular', value: 'Angular' },
            { label: 'React', value: 'React' },
            { label: 'Vue', value: 'Vue' },
            { label: 'Node.js', value: 'Node.js' },
            { label: 'Python', value: 'Python' },
        ];

        // Developer options
        this.developersOptions = [
            { id: 'dev1', name: 'Amy Elsner', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png' },
            { id: 'dev2', name: 'Asiya Javayant', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png' },
            { id: 'dev3', name: 'Onyama Limba', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png' },
            { id: 'dev4', name: 'Ioni Bowcher', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png' },
            { id: 'dev5', name: 'Xu Xuefeng', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png' },
        ];
    }

    openNew() {
        this.project = {};
        this.selectedSkills = [];
        this.selectedDevelopers = [];
        this.submitted = false;
        this.projectDialog = true;
    }

    deleteSelectedProjects() {
        this.deleteProjectsDialog = true;
    }

    editProject(project: Project) {
        this.project = { ...project };
        this.selectedSkills = this.project.skills || [];
        this.selectedDevelopers = this.project.developers || [];
        this.projectDialog = true;
    }

    deleteProject(project: Project) {
        this.deleteProjectDialog = true;
        this.project = { ...project };
    }

    confirmDeleteSelected() {
        this.deleteProjectsDialog = false;
        this.projects = this.projects.filter(
            (val) => !this.selectedProjects.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Projects Deleted',
            life: 3000,
        });
        this.selectedProjects = [];
    }

    confirmDelete() {
        this.deleteProjectDialog = false;
        this.projects = this.projects.filter((val) => val.id !== this.project.id);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Project Deleted',
            life: 3000,
        });
        this.project = {};
    }

    hideDialog() {
        this.projectDialog = false;
        this.submitted = false;
    }

    saveProject() {
        this.submitted = true;

        if (this.project.title?.trim()) {
            if (this.project.id) {
                // Update existing project
                this.project.skills = this.selectedSkills;
                this.project.developers = this.selectedDevelopers;
                const index = this.findIndexById(this.project.id);
                if (index !== -1) {
                    this.projects[index] = this.project;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Project Updated',
                        life: 3000,
                    });
                }
            } else {
                // Create a new project
                this.project.id = this.createId();
                this.project.code = this.generateProjectCode();
                this.project.skills = this.selectedSkills;
                this.project.developers = this.selectedDevelopers;
                this.projects.push(this.project);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Project Created',
                    life: 3000,
                });
            }

            // Refresh data and close dialog
            this.projects = [...this.projects];
            this.projectDialog = false;
            this.resetProjectForm();
        }
    }

    resetProjectForm() {
        this.project = {};
        this.selectedSkills = [];
        this.selectedDevelopers = [];
    }

    findIndexById(id: string): number {
        return this.projects.findIndex((project) => project.id === id);
    }

    createId(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length: 5 })
            .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
            .join('');
    }

    generateProjectCode(): string {
        const lastProject = this.projects[this.projects.length - 1];
        const lastCode = lastProject?.code ? parseInt(lastProject.code.split('-')[1]) : 0;
        const newCodeNumber = (lastCode + 1).toString().padStart(3, '0');
        return `#PRJ-${newCodeNumber}`;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
