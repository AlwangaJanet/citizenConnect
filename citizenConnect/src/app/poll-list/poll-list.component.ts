import { Component, OnInit } from '@angular/core';
import { Poll, PollsService } from '../services/polls.service';
import { CommonModule } from '@angular/common';
import { PollsComponent } from "../polls/polls.component";

@Component({
  selector: 'app-poll-list',
  standalone: true,
  imports: [CommonModule, PollsComponent],
  templateUrl: './poll-list.component.html',
  styleUrl: './poll-list.component.css'
})
export class PollListComponent implements OnInit {
  polls: Poll[] = [];
  loading: boolean = true;

  constructor(private pollsService: PollsService) {}

  ngOnInit(): void {
    this.pollsService.getAllPolls().subscribe(
      polls => {
        console.log('Polls fetched:', polls);
        this.polls = polls;
        this.loading = false;
      },
      error => {
        console.error('Error fetching polls:', error);
        this.loading = false;
      }
    );
  }  
}