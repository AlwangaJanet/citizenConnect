import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['Citizen', Validators.required], // Add role field
      terms: [false, Validators.requiredTrue]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.authService.registerUser(this.signupForm.value).subscribe(
        (response: any) => {
          if (response.message === 'User successfully registered...') {
            // Handle successful registration
            this.router.navigate(['/login']);
          } else {
            // Handle registration error
            console.error('Registration failed:', response.message);
          }
        },
        (error) => {
          console.error('Registration error:', error);
        }
      );
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
