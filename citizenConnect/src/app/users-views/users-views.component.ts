import { Component, OnInit} from '@angular/core';
import { View } from '../models/viewsModel';
import { ViewsService } from '../services/views.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users-views',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-views.component.html',
  styleUrl: './users-views.component.css'
})
export class UsersViewsComponent implements OnInit {
  views: View[] = [];

  constructor(private viewsService: ViewsService) { }

  ngOnInit(): void {
    this.viewsService.getViews().subscribe(
      (data: View[]) => {
        this.views = data;
      },
      (error) => {
        console.error('Error fetching views:', error);
      }
    );
  }
}
