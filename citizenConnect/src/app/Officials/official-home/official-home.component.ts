import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OfficialSidebarComponent } from "../official-sidebar/official-sidebar.component";

@Component({
  selector: 'app-official-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, OfficialSidebarComponent],
  templateUrl: './official-home.component.html',
  styleUrl: './official-home.component.css'
})
export class OfficialHomeComponent implements OnInit {
  polls = [
    {
      id: 1,
      question: 'Do you support the ongoing protests in Kenya?',
      responses: 23,
      averageResponse: 27.57,
      scores: [
        { place: '1st', score: 13, participants: 14 },
        { place: '2nd', score: 8, participants: 10 }
      ],
      participants: 24,
      averageScore: 0.8
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  createNewPoll() {
    this.router.navigate(['/official-polls']);
  }
}