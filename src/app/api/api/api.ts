export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './evaluationController.service';
import { EvaluationControllerService } from './evaluationController.service';
export * from './projectController.service';
import { ProjectControllerService } from './projectController.service';
export * from './roleController.service';
import { RoleControllerService } from './roleController.service';
export * from './skillController.service';
import { SkillControllerService } from './skillController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [AuthenticationService, EvaluationControllerService, ProjectControllerService, RoleControllerService, SkillControllerService, UserControllerService];