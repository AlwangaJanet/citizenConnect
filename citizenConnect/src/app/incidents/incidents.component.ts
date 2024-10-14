import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IncidentCreateModel } from '../models/incident.model';
import { IncidentsService } from '../services/incidents.service';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css'
})
export class IncidentsComponent implements OnInit {
  incidentForm!: FormGroup;

  constructor(private incidentService: IncidentsService, private router: Router) { }

  ngOnInit(): void {
    this.incidentForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      media: new FormControl('', Validators.required)
    });
  }

  submitIncident(): void {
    if (this.incidentForm.valid) {
      const incident: IncidentCreateModel = {
        UserID: '', // UserID will be decoded from the token in the service
        Title: this.incidentForm.get('title')?.value,
        Description: this.incidentForm.get('description')?.value,
        MediaUrl: this.incidentForm.get('media')?.value
      };
      this.incidentService.addIncident(incident).subscribe(
        response => {
          console.log(response.message);
          this.router.navigate(['/users-incidents']);
        },
        error => {
          console.error('Error adding incident:', error);
        }
      );
    }
  }
}