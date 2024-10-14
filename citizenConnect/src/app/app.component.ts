import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SignupComponent } from './auth/sign up/signup/signup.component';
import { LoginComponent } from './auth/login/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './home/home.component';
import { EducateComponent } from "./educate/educate.component";
import { ViewsComponent } from "./views/views.component";
import { IncidentsComponent } from "./incidents/incidents.component";
import { PollsComponent } from "./polls/polls.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from "./header/header.component";
import { OfficialHomeComponent } from "./Officials/official-home/official-home.component";
import { OfficialViewsComponent } from "./Officials/official-views/official-views.component";
import { OfficialsIncidentsComponent } from "./Officials/officials-incidents/officials-incidents.component";
import { OfficialPollsComponent } from "./Officials/official-polls/official-polls.component";
import { AdminHomeComponent } from "./Admin/admin-home/admin-home.component";
import { UsersComponent } from "./Admin/users/users.component";
import { OfficialsComponent } from "./Admin/officials/officials.component";
import { OfficialSidebarComponent } from "./Officials/official-sidebar/official-sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, LoginComponent, HomeComponent, EducateComponent, ViewsComponent, IncidentsComponent, PollsComponent, CommonModule, FormsModule, HeaderComponent,
    RouterLink, RouterModule, OfficialHomeComponent, OfficialViewsComponent, OfficialsIncidentsComponent, OfficialPollsComponent, AdminHomeComponent, UsersComponent, OfficialsComponent, OfficialSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'citizenConnect';
}
