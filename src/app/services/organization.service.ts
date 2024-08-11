import { Injectable } from '@angular/core';
import { Organization } from '../auth/signup/models/organization.model';
import { Observable, of } from 'rxjs';
import { OrganizationDetailsResponse } from '../auth/signup/models/organization-details-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private organizations: Organization[] = [
    { organization_id: 1, organization_name: 'Company A' },
    { organization_id: 2, organization_name: 'Company B' },
  ];

  private designations: string[] = [
    'Developer',
    'Designer',
    'Manager',
    'Analyst'
  ];
  constructor() { }

  getOrganizationData(): Observable<OrganizationDetailsResponse> {
    const response: OrganizationDetailsResponse = {
      allowedOrganizations: this.organizations,
      designations: this.designations,
      success: true,
      error: ""
    };
    return of(response);
  }


}
