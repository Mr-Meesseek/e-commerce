import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private apiUrl = 'http://localhost:8000/submit-form/'; // URL to web api

  constructor(private http: HttpClient) { }

  submitForm(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }}
  // private readonly API_URL = 'http://127.0.0.1:8000';

  // constructor(private http: HttpClient) {}

  // submitFormData(formData: any): Observable<any> {
  //   return this.http.post(`${this.API_URL}/submit-form`, formData);
  // }}
