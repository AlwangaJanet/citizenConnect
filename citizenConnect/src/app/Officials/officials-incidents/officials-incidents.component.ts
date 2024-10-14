import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OfficialSidebarComponent } from "../official-sidebar/official-sidebar.component";
import { Incident } from '../../models/incident.model';
import { IncidentsService } from '../../services/incidents.service';

@Component({
  selector: 'app-officials-incidents',
  standalone: true,
  imports: [CommonModule, OfficialSidebarComponent],
  templateUrl: './officials-incidents.component.html',
  styleUrl: './officials-incidents.component.css'
})
export class OfficialsIncidentsComponent implements OnInit {
  incidents: Incident[] = [];
  summary: string | null = null;

  constructor(private incidentsService: IncidentsService) { }

  ngOnInit(): void {
    this.fetchIncidents();
  }

  fetchIncidents(): void {
    this.incidentsService.getIncidents().subscribe({
      next: (incidents) => {
        this.incidents = incidents;
      },
      error: (error) => {
        console.error('Error fetching incidents:', error);
      }
    });
  }

  summarizeIncident(description: string): void {
    // Mock AI summarization function
    this.summary = description.split('.').slice(0, 2).join('.') + '.';
  }

  deleteIncident(incidentId: string): void {
    this.incidentsService.deleteIncident(incidentId).subscribe({
      next: () => {
        this.fetchIncidents(); // Reload incidents after deletion
      },
      error: (error) => {
        console.error('Error deleting incident:', error);
      }
    });
  }

  logout(): void {
    // Implement your logout logic here
  }
}