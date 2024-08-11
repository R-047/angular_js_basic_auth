import {DetailedUserInfo} from '../signup/detailed-user-info.model'
import { Response } from "../../shared/models/response.model";
export interface AuthResponseModel extends Response{
  basic_user_info?: {
    email? : string,
    phone_number?: string,
    user_name: string
  },
  detailed_user_info?: DetailedUserInfo
}
