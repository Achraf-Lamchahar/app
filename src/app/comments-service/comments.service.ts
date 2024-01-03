import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = 'http://localhost:8080'; // replace with your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  getComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments`);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments`, comment);
  }


}

