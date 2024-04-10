import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { api as apiConfig } from '../configs/constants';
import { ServicesService } from './services.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host = `${apiConfig.baseUrl}`;
  loading = false;

  constructor(private http: HttpClient, private router: Router,private adminService: ServicesService, private notification: NotificationService){}
  

 

  public register(url: string, data: any): Observable<any> {
    const httpOptions: any = {
      observe: 'response',
      responseType: 'json'
    };
    return this.http.post<any[]>(this.host + url, data, httpOptions);
  }

  login(data: any): Observable<any> {

    const url = `${apiConfig.auth.login}`;

    const httpOptions = {
     // withCredentials: true,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // observe: 'response',
      // responseType: 'json'
    };

    return this.http
      .post<any>(this.host + url, data, httpOptions)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // console.log('USER: ', user);

          if (!user) {
            this.loading = false;
            this.router.navigate(['/login']);
          } else {
            console.log(user);
            
            // Setting token access and session variables
            sessionStorage.setItem('accessToken', user.access_token);
            sessionStorage.setItem('refreshToken', user.refresh_token);
            sessionStorage.setItem('role', user.role);
            sessionStorage.setItem('userId', user.id);
            
            return user;
          }
        })
      );
  }


  logout() {

    const authToken = sessionStorage.getItem('accessToken');
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };

    const url = `${apiConfig.auth.logout}`;

    return this.http
      .post<any>(this.host + url,{}, httpOptions)
  }

}
