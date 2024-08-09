import { Injectable } from '@angular/core';
import { UserInfo } from '../user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserIdentificationService {
  private readonly localStorageKey = 'users';

  constructor() {}

  async checkIfUserExist(userIdentifiers: UserInfo): Promise<boolean> {
    let a = await this.delayForTwoSeconds(userIdentifiers)
    return a
  }

  async delayForTwoSeconds(userIdentifiers:UserInfo): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        const emailMatches = userIdentifiers.email ? userIdentifiers.email === "test@gmail.com" : false;
        const phoneMatches = userIdentifiers.phone_number ? userIdentifiers.phone_number === "9090909090" : false;
        resolve(emailMatches || phoneMatches);
      }, 2000);
    });
  }
}
