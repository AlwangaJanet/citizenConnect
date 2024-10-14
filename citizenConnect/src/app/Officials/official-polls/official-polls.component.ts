import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OfficialSidebarComponent } from "../official-sidebar/official-sidebar.component";
import { Poll, PollsService } from '../../services/polls.service';
import { jwtDecode } from 'jwt-decode';
import { PollCreateModel } from '../../models/pollModel';

@Component({
  selector: 'app-official-polls',
  standalone: true,
  imports: [CommonModule, FormsModule, OfficialSidebarComponent],
  templateUrl: './official-polls.component.html',
  styleUrl: './official-polls.component.css'
})
export class OfficialPollsComponent implements OnInit {
  newPoll: PollCreateModel = {
    OfficialID: '',
    Question: '',
    Option1: 'Yes',
    Option2: 'No'
  };
  activePolls: Poll[] = [];

  constructor(private pollsService: PollsService) {}

  ngOnInit(): void {
    this.loadPolls();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.newPoll.OfficialID = decodedToken.id;
    }
  }

  loadPolls(): void {
    this.pollsService.getAllPolls().subscribe(
      polls => this.activePolls = polls,
      error => console.error('Error loading polls:', error)
    );
  }

  addPoll(): void {
    this.pollsService.addPoll(this.newPoll).subscribe(
      response => {
        console.log('Poll added:', response);
        this.loadPolls();
        this.newPoll.Question = '';
      },
      error => console.error('Error adding poll:', error)
    );
  }

  deletePoll(pollId: string): void {
    this.pollsService.deletePoll(pollId).subscribe(
      response => {
        console.log('Poll deleted:', response);
        this.loadPolls();
      },
      error => console.error('Error deleting poll:', error)
    );
  }
}