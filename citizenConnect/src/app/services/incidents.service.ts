import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident, IncidentCreateModel, IncidentUpdateModel } from '../models/incident.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private apiUrl = 'http://localhost:4000/incident';

  constructor(private http: HttpClient) { }

  private getUserIDFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.id; // Assuming the user ID is stored in the 'id' field
    }
    return '';
  }
  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.apiUrl);
  }

  getIncident(id: string): Observable<Incident> {
    return this.http.get<Incident>(`${this.apiUrl}/${id}`);
  }

  addIncident(incident: IncidentCreateModel): Observable<{ message: string; incidentID: string }> {
    incident.UserID = this.getUserIDFromToken(); // Set UserID from the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<{ message: string; incidentID: string }>(this.apiUrl, incident, { headers });
  }

  updateIncident(id: string, incident: IncidentUpdateModel): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, incident, { headers });
  }

  deleteIncident(id: string): Observable<{ message: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers });
  }
}
