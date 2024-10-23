import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class LoginService {
  private userUrl = "http://localhost:5000/api/users/login";
  private adminUrl = "http://localhost:5000/api/admins/login";

  constructor(private http: HttpClient) { }
  login(userData: any): Observable<any> {
    const { email, password, isAdmin } = userData;
    const user = { email, password };
    const url = isAdmin === true ? this.adminUrl : this.userUrl;
    return this.http.post(url, user)
  }
}
