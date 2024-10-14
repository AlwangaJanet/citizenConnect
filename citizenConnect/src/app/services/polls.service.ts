import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PollCreateModel, PollResponse, PollResponseCreateModel } from '../models/pollModel';

export interface Poll {
Question: any;
Option1: any;
Option2: any;
PollID: string;
  id: number
  question: string
  options: string[]
  votes: number[]
}

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  private apiUrl = 'http://localhost:4000/polls';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addPoll(poll: PollCreateModel): Observable<{ message: string, PollID: string }> {
    return this.http.post<{ message: string, PollID: string }>(this.apiUrl, poll, { headers: this.getHeaders() });
  }

  getAllPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getPollById(id: string): Observable<Poll> {
    return this.http.get<Poll>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  deletePoll(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addPollResponse(response: PollResponseCreateModel): Observable<{ message: string, ResponseID: string }> {
    return this.http.post<{ message: string, ResponseID: string }>(`${this.apiUrl}/pollResponses`, response, { headers: this.getHeaders() });
  }

  getPollResponses(pollId: string): Observable<PollResponse[]> {
    return this.http.get<PollResponse[]>(`${this.apiUrl}/pollResponses/${pollId}`, { headers: this.getHeaders() });
  }
}