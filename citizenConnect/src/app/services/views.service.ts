import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { ViewCreateModel, View, ViewUpdateModel } from '../models/viewsModel';

interface DecodedToken {
  id: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class ViewsService {
  private apiUrl = 'http://localhost:4000/view';

  constructor(private http: HttpClient) {}

  // Add View
  addView(view: ViewCreateModel): Observable<{ message: string; viewID: string }> {
    view.UserID = this.getUserId(); // Set UserID from the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post<{ message: string; viewID: string }>(this.apiUrl, view, { headers });
  }

  // Get Views
  getViews(): Observable<View[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<View[]>(this.apiUrl, { headers });
  }

  // Get View by ID
  getViewById(viewId: string): Observable<View> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<View>(`${this.apiUrl}/${viewId}`, { headers });
  }

  // Update View
  updateView(viewId: string, view: ViewUpdateModel): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.put<{ message: string }>(`${this.apiUrl}/${viewId}`, view, { headers });
  }

  // Delete View
  deleteView(viewId: string): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.delete<{ message: string }>(`${this.apiUrl}/${viewId}`, { headers });
  }

  // Get the user ID from the token
  private getUserId(): string {
    const token = this.getToken();
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.id;
    }
    return '';
  }

  // Get the token from local storage
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }
}





