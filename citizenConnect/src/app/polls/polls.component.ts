import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Poll, PollsService } from '../services/polls.service';
import { CommonModule } from '@angular/common';
import { PollResponseComponent } from "../poll-response/poll-response.component";
import { FormsModule } from '@angular/forms';
import {jwtDecode} from 'jwt-decode';
import { PollResponseCreateModel } from '../models/pollModel';

@Component({
  selector: 'app-polls',
  standalone: true,
  imports: [CommonModule, PollResponseComponent, FormsModule],
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  @Input() poll: Poll | undefined;
  selectedOption: string | null = null;
  userId: string = '';

  constructor(private pollsService: PollsService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userId = decodedToken.id;
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle the error appropriately (e.g., redirect to login)
      }
    }
  }

  castVote(): void {
    if (this.selectedOption && this.poll && this.userId) {
      const response: PollResponseCreateModel = {
        PollID: this.poll.PollID,
        UserID: this.userId,
        SelectedOption: this.selectedOption
      };
      this.pollsService.addPollResponse(response).subscribe(
        result => console.log('Vote cast successfully', result),
        error => console.error('Error casting vote', error)
      );
    }
  }
}