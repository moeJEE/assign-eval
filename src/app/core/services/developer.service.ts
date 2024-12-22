import { Injectable } from '@angular/core';
import { Developer, Evaluation, Project } from '@app/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private developers: Developer[] = [
    {
      id: 'USR-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      portfolio: 'https://johndoe.com',
      status: 'Available',
      createdAt: new Date('2023-01-15'),
      avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
      skills: ['Angular', 'React'],
      evaluationHistory: []
    },
    {
      id: 'USR-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      portfolio: 'https://janesmith.com',
      status: 'Not Available',
      createdAt: new Date('2023-03-22'),
      avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
      skills: ['Vue', 'Node.js'],
      evaluationHistory: []
    },
  ];

  constructor() {}

  /**
   * Fetch all developers
   */
  getDevelopers(): Promise<Developer[]> {
    return Promise.resolve(this.developers);
  }

  /**
   * Fetch a developer by ID
   * @param id Developer's ID
   */
  getDeveloperById(id: string): Promise<Developer | undefined> {
    return Promise.resolve(this.developers.find(dev => dev.id === id));
  }

  /**
   * Add an evaluation to a developer
   * @param id Developer's ID
   * @param evaluation Evaluation object to add
   */
  addEvaluation(id: string, evaluation: Evaluation): Promise<Developer | undefined> {
    const developer = this.developers.find(dev => dev.id === id);
    if (developer) {
      developer.evaluationHistory = developer.evaluationHistory || [];
      developer.evaluationHistory.push(evaluation);
      return Promise.resolve(developer);
    } else {
      return Promise.reject(`Developer with ID ${id} not found.`);
    }
  }
}
