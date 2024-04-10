import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, share, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { api as apiConfig } from '../configs/constants';
import { read, utils } from 'xlsx';

import { Router, ActivatedRoute } from '@angular/router';
import { PVCoursRequest } from '../models/pv-request';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  public host = `${apiConfig.baseUrl}`;
  json: any = [];


  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  private getToken() {
    if (typeof sessionStorage !== 'undefined') {
      const accessToken = sessionStorage.getItem('accessToken');
      return accessToken ? accessToken : "";
    } else {
      // Handle the scenario where sessionStorage is not available
      return "";
    }
  }

  // region abdel
  public getResourceMany(url: string, params: any): Observable<any> {
    const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'BEARER ' + authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    
    const urlWithParams = this.buildUrlWithParams(url, params);

    return this.http.get<any[]>(urlWithParams, httpOptions);
  }

  private buildUrlWithParams(url: string, params: any): string {
    let urlWithParams = this.host + url;

    if (params) {
      // Append parameters to the URL
      const keys = Object.keys(params);
      if (keys.length > 0) {
        urlWithParams += '?';

        keys.forEach((key, index) => {
          urlWithParams += `${key}=${params[key]}`;

          if (index < keys.length - 1) {
            urlWithParams += '&';
          }
        });
      }
    }

    return urlWithParams;
  }


  public getResource(url: string, id: any): Observable<any> {
    const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'BEARER ' + authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    return this.http.get<any[]>(this.host + url + '/' + id, httpOptions);
  }

  //-------------------------header httpOptions----------------------
  public saveResource(url: string, data: any): Observable<any> {
    const authToken = this.getToken();
    console.log(authToken);
    
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    return this.http.post<any[]>(this.host + url, data, httpOptions);
  }

  
  public saveResourceFile(url: string, data: any): Observable<any> {
     const authToken = this.getToken();
    // console.log(authToken);
    
    const httpOptions: any = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
         Authorization: 'Bearer ' + authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    return this.http.post<any[]>(this.host + url, data,  httpOptions);
  }


  public getResources(url: string): Observable<any> {
    const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    // return this.http.get<any[]>(this.host + url);
    return this.http.get<any[]>(this.host + url, httpOptions);

  }


  public updateResource(url: string, data: any): Observable<any> {
    const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      }),
      observe: 'response',
      responseType: 'json',
    };
    return this.http.put<any[]>(this.host + url, data, httpOptions);
  }


  public deleteResource(url: string, id: any) {
    const authToken = this.getToken();
    const httpOptions: any = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
      }),
    };

    return this.http.delete(this.host + url + id, httpOptions);
  }

  
  public readUploadFile = (e: any) => {
    e.preventDefault();
    let json: any = [];
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      console.log(e.target.files[0]);
      
    }

    console.log('hors', json);
    return json
    console.log(json);
    //this.json = json;
  };

  
}



