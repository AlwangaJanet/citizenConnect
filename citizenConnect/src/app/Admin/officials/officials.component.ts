import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Official, User } from '../../models/usersModel';

@Component({
  selector: 'app-officials',
  standalone: true,
  imports: [AdminSidebarComponent,CommonModule,FormsModule],
  templateUrl: './officials.component.html',
  styleUrl: './officials.component.css'
})
export class OfficialsComponent implements OnInit {
  officials: User[] = [];

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadOfficials();
  }

  loadOfficials(): void {
    this.authService.getUsers().subscribe(
      (users) => {
        this.officials = users.filter(user => user.role === 'Official');
      },
      (error) => {
        console.error('Error fetching officials:', error);
      }
    );
  }

  approveOfficial(id: string): void {
    this.authService.approveOfficial(id).subscribe(
      () => {
        this.loadOfficials();
      },
      (error) => {
        console.error('Error approving official:', error);
      }
    );
  }

  deleteOfficial(id: string): void {
    this.authService.deleteUser(id).subscribe(
      () => {
        this.loadOfficials();
      },
      (error) => {
        console.error('Error deleting official:', error);
      }
    );
  }
}