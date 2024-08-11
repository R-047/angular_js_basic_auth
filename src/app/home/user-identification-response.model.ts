import { Response } from "../shared/models/response.model";
export interface UserIdentificationResponse extends Response{
  userExist: boolean,
}
