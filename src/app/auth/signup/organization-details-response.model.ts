import {Organization} from './organization.model'
import { Response } from '../../shared/models/response.model';
export interface OrganizationDetailsResponse extends Response{
  allowedOrganizations: Organization[];
  designations: string[]
}
