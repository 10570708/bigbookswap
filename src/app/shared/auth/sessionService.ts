/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* SessionStorage - client-side session managment
*
*/
import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({ providedIn: 'root' })

export class SessionService {
 
  constructor() { }
  
  clean(): void {
    window.sessionStorage.clear();
  }
  
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
   
    if (user) {
      return true;
    }
    return false;
  }
}