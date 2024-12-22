/**
 * OpenApi Specification - Kachmar
 *
 * Contact: contact@kachmar.ma
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Project } from './project';
import { User } from './user';


export interface Evaluation { 
    id?: number;
    createdAt?: string;
    modifiedAt?: string;
    project?: Project;
    projectManager?: User;
    developer?: User;
    rating?: number;
    feedback?: string;
}
