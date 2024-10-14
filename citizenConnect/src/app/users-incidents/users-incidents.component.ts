import { Component, OnInit } from '@angular/core';
import { Incident } from '../models/incident.model';
import { IncidentsService } from '../services/incidents.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-incidents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-incidents.component.html',
  styleUrl: './users-incidents.component.css'
})
export class UsersIncidentsComponent implements OnInit {
  incidents: Incident[] = [];

  constructor(private incidentsService: IncidentsService) { }

  ngOnInit(): void {
    this.incidentsService.getIncidents().subscribe(
      (data: Incident[]) => {
        this.incidents = data;
      },
      (error) => {
        console.error('Error fetching incidents:', error);
      }
    );
  }
}
