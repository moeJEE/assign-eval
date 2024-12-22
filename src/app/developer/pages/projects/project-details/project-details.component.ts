import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Developer } from '@app/models/project.model';
import { MessageService, MenuItem } from 'primeng/api';
import { ProjectService } from '@app/core/services/project.service';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    providers: [MessageService],
})
export class ProjectDetailsComponent implements OnInit {
    project: Project | undefined;
    events: any[] = [];
    evaluateDialog: boolean = false;
    selectedDeveloper: Developer | undefined;
    ranking: number = 0;
    feedback: string = '';
    items: MenuItem[] = [];

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private projectService: ProjectService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.projectService.getProjectById(id).then((proj) => {
                if (proj) {
                    this.project = proj;
                    this.initializeBreadcrumb();
                    this.initializeTimeline();
                } else {
                    // Handle project not found
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Project not found',
                        life: 3000,
                    });
                    this.router.navigate(['/demo/components/pages/projects']);
                }
            });
        }
    }

    initializeBreadcrumb() {
        this.items = [
            { label: 'Projects', url: '/demo/components/pages/projects' },
            { label: this.project?.title },
        ];
    }

    initializeTimeline() {
        this.events = [
            { status: 'Project Started', date: this.project?.startDate },
            {
                status: 'First Milestone Achieved',
                date: new Date((this.project?.startDate?.getTime() || 0) + 7 * 24 * 60 * 60 * 1000),
            },
            {
                status: 'Development Completed',
                date: new Date((this.project?.endDate?.getTime() || 0) - 7 * 24 * 60 * 60 * 1000),
            },
            { status: 'Project Review', date: this.project?.endDate },
        ];
    }

    openEvaluateDialog(developer: Developer) {
        this.selectedDeveloper = developer;
        this.ranking = 0;
        this.feedback = '';
        this.evaluateDialog = true;
    }

    submitEvaluation() {
        if (this.selectedDeveloper) {
            console.log('Evaluation submitted for:', this.selectedDeveloper.name);
            console.log('Ranking:', this.ranking);
            console.log('Feedback:', this.feedback);

            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `Evaluation submitted for ${this.selectedDeveloper.name}`,
                life: 3000,
            });

            this.evaluateDialog = false;
        }
    }

    cancelEvaluation() {
        this.evaluateDialog = false;
    }
}
