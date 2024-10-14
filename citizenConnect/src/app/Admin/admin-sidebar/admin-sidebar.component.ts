import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  constructor(private router: Router) {}

  logout() {
    // Logic for logging out
    console.log('Logging out...');
    this.router.navigate(['/login']); // Navigate to login page
  }
}