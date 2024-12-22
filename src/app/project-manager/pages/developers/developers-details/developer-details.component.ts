// src/app/demo/components/pages/developers/developer-details/developer-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Developer, Project } from '@app/models/project.model';
import { MessageService, MenuItem } from 'primeng/api';
import { DeveloperService } from '@app/core/services/developer.service';

@Component({
  selector: 'app-developer-details',
  templateUrl: './developer-details.component.html',
  styleUrls: ['./developer-details.component.css'],
  providers: [MessageService],
})
export class DeveloperDetailsComponent implements OnInit {
  developer: Developer | undefined;
  events: any[] = [];
  evaluateDialog: boolean = false;
  selectedDeveloper: Developer | undefined;
  ranking: number = 0;
  feedback: string = '';
  items: MenuItem[] = [];

  // Dummy Projects associated with the developer
  associatedProjects: Project[] = [
    {
      id: 'PRJ-001',
      code: '#PRJ-001',
      title: 'Website Redesign',
      status: 'In Progress',
      description: 'Redesigning the corporate website to improve user experience and accessibility.',
      developers: [],
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-06-30'),
      skills: ['Angular', 'UI/UX']
    },
    {
      id: 'PRJ-002',
      code: '#PRJ-002',
      title: 'Mobile App Development',
      status: 'Completed',
      description: 'Developing a cross-platform mobile application for e-commerce.',
      developers: [],
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-12-31'),
      skills: ['React Native', 'Node.js']
    },
    // Add more projects as needed
  ];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private developerService: DeveloperService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.developerService.getDeveloperById(id).then((dev) => {
        if (dev) {
          this.developer = dev;
          this.initializeBreadcrumb();
          this.initializeTimeline();
        } else {
          // Handle developer not found
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Developer not found',
            life: 3000,
          });
          this.router.navigate(['/demo/components/pages/developers']);
        }
      });
    }
  }

  initializeBreadcrumb() {
    this.items = [
      { label: 'Developers', url: '/demo/components/pages/developers' },
      { label: this.developer?.name }
    ];
  }

  initializeTimeline() {
    // Example events, customize based on your developer data
    this.events = [
      { status: 'Joined Company', date: this.developer?.createdAt },
      { status: 'First Project Assigned', date: new Date(this.developer?.createdAt?.getTime()! + 14 * 24 * 60 * 60 * 1000) },
      { status: 'Promoted to Senior Developer', date: new Date(this.developer?.createdAt?.getTime()! + 365 * 24 * 60 * 60 * 1000) },
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
      // Here, you would typically send the evaluation to the backend
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
