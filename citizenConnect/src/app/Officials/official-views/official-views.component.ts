import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OfficialSidebarComponent } from "../official-sidebar/official-sidebar.component";
import { View } from '../../models/viewsModel';
import { ViewsService } from '../../services/views.service';

@Component({
  selector: 'app-official-views',
  standalone: true,
  imports: [CommonModule, OfficialSidebarComponent],
  templateUrl: './official-views.component.html',
  styleUrl: './official-views.component.css'
})
export class OfficialViewsComponent implements OnInit {
  views: View[] = [];
  summary: string | null = null;

  constructor(private viewsService: ViewsService) { }

  ngOnInit(): void {
    this.loadViews();
  }

  loadViews(): void {
    this.viewsService.getViews().subscribe({
      next: (views) => {
        this.views = views;
      },
      error: (error) => console.error('Error loading views', error)
    });
  }

  summarizeView(view: View) {
    // Implement your AI-powered summarization logic here.
    // For example:
    // this.aiService.summarize(view.Description).subscribe({
    //   next: (summary) => this.summary = summary,
    //   error: (error) => console.error('Error summarizing view', error)
    // });
  }

  deleteView(viewId: string) {
    this.viewsService.deleteView(viewId).subscribe({
      next: () => {
        this.loadViews(); // Reload views after deletion
      },
      error: (error) => console.error('Error deleting view', error)
    });
  }
}