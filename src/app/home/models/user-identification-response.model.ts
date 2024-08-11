import { Response } from "../../shared/models/response.model";
export interface UserIdentificationResponse extends Response{
  user_exist: boolean,
  user_name?: string | null,
}
