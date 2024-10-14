import { Component, OnInit } from '@angular/core';
import { User } from '../../models/usersModel';
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AdminSidebarComponent,CommonModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  title = 'Admin Panel';
  users: User[] = [];

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (users) => {
        this.users = users.filter(user => user.role === 'Citizen');
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.authService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  // Remove or comment out suspendUser() and unsuspendUser() methods
}