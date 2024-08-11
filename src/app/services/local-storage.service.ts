import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  APP_PREFIX = "angular_auth"

  constructor() { }

  setItem(key: string, value: unknown) {
    try {
      localStorage.setItem(
        `${this.APP_PREFIX}${key}`,
        JSON.stringify(value)
      );
    } catch (e) {
      console.log(e)
      localStorage.setItem(`${this.APP_PREFIX}${key}`, value as string);
    }
  }

  getItem(key: string): unknown {
    const value = localStorage.getItem(`${this.APP_PREFIX}${key}`);
    try {
      return JSON.parse(value as string);
    } catch (e) {
      return value;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(`${this.APP_PREFIX}${key}`);
  }
}
