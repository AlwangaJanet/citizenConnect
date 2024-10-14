import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { LoginResponse } from '../../../models/usersModel';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterOutlet,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (response: LoginResponse) => {
          this.authService.storeUserData(response);
          const role = this.authService.getUserRole();
          console.log('User role:', role); // Add this for debugging
          
          switch(role) {
            case 'Admin':
              console.log('Navigating to admin home');
              this.router.navigate(['/admin-home']);
              break;
            case 'Official':
              console.log('Navigating to official home');
              this.router.navigate(['official-home']);
              break;
            case 'Citizen':
              console.log('Navigating to home');
              this.router.navigate(['/home']);
              break;
            default:
              console.error('Unexpected role:', role);
              this.router.navigate(['/unauthorized']);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          // Handle error (e.g., show error message to user)
        }
      });
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  forgotPassword() {
    // Implement forgot password functionality
  }
}