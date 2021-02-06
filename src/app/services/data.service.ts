import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  userInfo: any

  saveUser(user: any) {
    this.userInfo = user;
    console.log('User', user)
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }

  getUser() {
    return this.userInfo || JSON.parse(localStorage.getItem('userInfo') || '{}');
  }

  eraseData() {
    this.userInfo = null;
    return localStorage.clear();
  }

}
