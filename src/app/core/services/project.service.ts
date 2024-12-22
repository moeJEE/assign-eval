// src/app/demo/service/project.service.ts

import { Injectable } from '@angular/core';
import { Project } from '@app/models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private projects: Project[] = [
        {
            id: 'PRJ-001',
            code: '#PRJ-001',
            title: 'Website Redesign',
            status: 'In Progress',
            description: 'Redesigning the corporate website to improve user experience and accessibility.',
            developers: [
                { id: 'dev1', name: 'Amy Elsner', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png' },
                { id: 'dev2', name: 'Asiya Javayant', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png' },
                { id: 'dev3', name: 'Onyama Limba', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png' },
                { id: 'dev4', name: 'Ioni Bowcher', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png' },
                { id: 'dev5', name: 'Xu Xuefeng', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png' }
            ],
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
            developers: [
                { id: 'dev1', name: 'Amy Elsner', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png' },
                { id: 'dev3', name: 'Onyama Limba', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png' },
                { id: 'dev4', name: 'Ioni Bowcher', avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png' }
            ],
            startDate: new Date('2023-06-01'),
            endDate: new Date('2023-12-31'),
            skills: ['React Native', 'Node.js']
        }
    ];

    constructor() { }

    getProjects(): Promise<Project[]> {
        return Promise.resolve(this.projects);
    }

    getProjectById(id: string): Promise<Project | undefined> {
        return Promise.resolve(this.projects.find(project => project.id === id));
    }

    // Add other methods like create, update, delete if needed
}
