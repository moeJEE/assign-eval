export interface Developer {
  id?: string;
  name?: string;
  avatar?: string;
  email?: string;
  portfolio?: string;
  status?: 'Available' | 'Not Available';
  createdAt?: Date;
  skills?: string[];
  evaluationHistory?: Evaluation[];

}


export interface Project {
  id?: string;
  code?: string;
  title?: string;
  description?: string;
  status?: 'In Progress' | 'Completed' | 'Review';
  developers?: Developer[];
  startDate?: Date;
  endDate?: Date;
  skills?: string[];
}

export interface Evaluation {
  date: Date;
  ranking: number; // Assuming a ranking out of 5
  feedback?: string;
  evaluator?: string;
}
