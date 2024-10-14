import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-official-sidebar',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './official-sidebar.component.html',
  styleUrl: './official-sidebar.component.css'
})
export class OfficialSidebarComponent {
  viewsSummary = [
    { name: 'Views Summary', count: 10, route: '/official-views' },
    { name: 'Incidents Summary', count: 5, route: '/official-incidents' },
    { name: 'Polls', count: 2, route: '/official-polls' },
  ];
  constructor(private router: Router) { }

  logout() {
    // Logic for logging out
    console.log('Logging out...');
    this.router.navigate(['/login']); // Navigate to login page
  }
}
