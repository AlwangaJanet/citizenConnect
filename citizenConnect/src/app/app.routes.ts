import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupComponent } from './auth/sign up/signup/signup.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { OfficialHomeComponent } from './Officials/official-home/official-home.component';
import { EducateComponent } from './educate/educate.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { PollsComponent } from './polls/polls.component';
import { ViewsComponent } from './views/views.component';
import { OfficialPollsComponent } from './Officials/official-polls/official-polls.component';
import { OfficialViewsComponent } from './Officials/official-views/official-views.component';
import { OfficialsIncidentsComponent } from './Officials/officials-incidents/officials-incidents.component';
import { OfficialsComponent } from './Admin/officials/officials.component';
import { UsersComponent } from './Admin/users/users.component';
import { UsersIncidentsComponent } from './users-incidents/users-incidents.component';
import { authGuard } from './auth/auth.guard';
import { UsersViewsComponent } from './users-views/users-views.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent},
  { path: 'educate', component: EducateComponent},
  { path: 'views', component: ViewsComponent},
  { path: 'incidents', component: IncidentsComponent},
  { path: 'polls', component: PollsComponent},
  { path: 'official-home', component: OfficialHomeComponent},
  { path: 'official-views', component: OfficialViewsComponent},
  { path: 'official-incidents', component: OfficialsIncidentsComponent},
  { path: 'official-polls', component: OfficialPollsComponent},
  { path: 'admin-home', component: AdminHomeComponent},
  { path: 'manage-users', component: UsersComponent},
  { path: 'manage-officials', component: OfficialsComponent},
  { path: 'users-incidents', component: UsersIncidentsComponent},
  { path: 'users-views', component: UsersViewsComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

