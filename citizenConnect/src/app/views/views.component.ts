// views.component.ts

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ViewsService } from '../../app/services/views.service';
import { ViewCreateModel } from '../../app/models/viewsModel';

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './views.component.html',
  styleUrl: './views.component.css'
})
export class ViewsComponent implements OnInit {
  viewForm!: FormGroup;

  constructor(
    private viewService: ViewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  submitView(): void {
    if (this.viewForm.valid) {
      const view: ViewCreateModel = {
        UserID: '', // UserID will be decoded from the token in the service
        Title: this.viewForm.get('title')?.value,
        Description: this.viewForm.get('description')?.value
      };

      this.viewService.addView(view).subscribe(
        response => {
          console.log(response.message);
          this.router.navigate(['/users-views']);
        },
        error => {
          console.error('Error adding view:', error);
        }
      );
    }
  }
}