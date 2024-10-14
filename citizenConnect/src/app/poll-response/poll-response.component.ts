import { Component, Input, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { CommonModule } from '@angular/common';
import { PollResponse } from '../models/pollModel';

@Component({
  selector: 'app-poll-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poll-response.component.html',
  styleUrl: './poll-response.component.css'
})
export class PollResponseComponent implements OnInit {
  @Input() pollId!: string;
  pollResults: { option: string, percentage: number }[] = [];

  constructor(private pollsService: PollsService) {}

  ngOnInit(): void {
    if (this.pollId) {
      this.loadPollResponses();
    } else {
      console.error('pollId is undefined');
    }
  }

  loadPollResponses(): void {
    this.pollsService.getPollResponses(this.pollId).subscribe(
      responses => {
        this.calculateResults(responses);
      },
      error => console.error('Error loading poll responses:', error)
    );
  }

  calculateResults(responses: PollResponse[]): void {
    const totalVotes = responses.length;
    const optionCounts: { [key: string]: number } = {};

    responses.forEach(response => {
      optionCounts[response.SelectedOption] = (optionCounts[response.SelectedOption] || 0) + 1;
    });

    this.pollResults = Object.keys(optionCounts).map(option => ({
      option,
      percentage: (optionCounts[option] / totalVotes) * 100
    }));
  }
}