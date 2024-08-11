import { Injectable } from '@angular/core';

import { UserInfo } from '../auth/signup/user-info.model';
import { Response } from '../shared/models/response.model';
import { LocalStorageService } from './local-storage.service';
import { of, delay, map, Observable } from 'rxjs';
import { UserIdentifier } from '../home/user-identifier.model';
import { UserIdentificationResponse } from '../home/user-identification-response.model';
import { userExist } from '../state/user-identification/user-identification.actions';
import { AuthUser } from '../auth/auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static readonly userDB = 'users';
  constructor(private storageService: LocalStorageService) { }


  loginUser(authUser: AuthUser):Observable<Response>{
    const users = JSON.parse(localStorage.getItem(`${UserService.userDB}`) as string || '[]')
    const user = users.find((user: UserInfo) => (user.basic_user_info.email && user.basic_user_info.email === authUser.email)
      || (user.basic_user_info.phone_number && user.basic_user_info.phone_number === authUser.phone_number));
    if(!user){
      return of({success: false, error: "user already exist"}).pipe(delay(2000))
    }
    if(user.basic_user_info.password === authUser.password){
      return of({success: true, error: ""}).pipe(delay(2000))
    }else{
      return of({success: true, error: "", message: "Incorrect password, please try again"}).pipe(delay(2000))
    }

  }

  registerUser(userInfo: UserInfo):Observable<Response> {
    // const users = JSON.parse(this.storageService.getItem(UserService.userDB) as string || '[]');
    const users = JSON.parse(localStorage.getItem(`${UserService.userDB}`) as string || '[]')
    const user = users.find((user: UserInfo) => (user.basic_user_info.email && user.basic_user_info.email === userInfo.basic_user_info.email)
      || (user.basic_user_info.phone_number && user.basic_user_info.phone_number === userInfo.basic_user_info.phone_number));
    if(user){
      return of({success: false, error: "user already exist"}).pipe(delay(2000))
    }
    return of(this.saveUserToLocalStorage(userInfo)).pipe(
      delay(2000), // Fake delay to simulate an API call
      map(() => ({success: true, error: ''}))
    );
  }


  checkIfUserExist(userIdentifiers: UserIdentifier): Observable<UserIdentificationResponse> {
        if(userIdentifiers.email == null && userIdentifiers.phone_number == null) {
          return of({success: false, error: "error occured, provide email or phone", userExist:false }).pipe(delay(2000))
        }
        const users = JSON.parse(localStorage.getItem(`${UserService.userDB}`) as string || '[]')
        const user = users.find((user: UserInfo) => (user.basic_user_info.email && user.basic_user_info.email === userIdentifiers.email)
      || (user.basic_user_info.phone_number && user.basic_user_info.phone_number === userIdentifiers.phone_number));


        if(user){
          return of({success: true, error: "", userExist: true}).pipe(delay(2000))
        }else{
          return of({success: true, error: "", userExist:false }).pipe(delay(2000))
        }
  }

  private saveUserToLocalStorage(userInfo: UserInfo): void {
    const users = JSON.parse(localStorage.getItem(`${UserService.userDB}`) as string || '[]')
    users.push(userInfo);
    localStorage.setItem(`${UserService.userDB}`,JSON.stringify(users));
  }



}
