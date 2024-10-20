import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
@Injectable()
export class RegisterService {
  private registerUrl = 'http://localhost:5000/api/users/register';
  private adminUrl = 'http://localhost:5000/api/admins/register';

  constructor(private http: HttpClient) { }
  register(userData: any): Observable<any> {
    const { name, email, password, isAdmin } = userData;
    const user = { name, email, password };
    const url = isAdmin === true ? this.adminUrl : this.registerUrl;

    return this.http.post(url, user);
  }
}
