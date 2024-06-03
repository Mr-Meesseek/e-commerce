import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // public sendMessage(message: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/chat/`, { message });
  // }

  // getMessages(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/messages`);
  // }
  
  public sendMessage(message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat/`, { message: message });
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages`);
  }
  
senddMessage(message: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  });
  return this.http.post(`${this.baseUrl}/chat`, { message }, { headers });
}

gettMessages(): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  });
  return this.http.get(`${this.baseUrl}/messages`, { headers });
}
}
