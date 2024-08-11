import { BasicUserInfo } from "./basic-user-info.model"
import { DetailedUserInfo } from "./detailed-user-info.model";

export interface UserInfo{
  basic_user_info: BasicUserInfo;
  detailed_user_info: DetailedUserInfo
}
