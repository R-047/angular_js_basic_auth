import { Organization } from "./organization.model";

export interface DetailedUserInfo{
  organization: Organization;
  designation: string;
  birth_date: Date;
  city: string;
  pincode: number | null;
}
