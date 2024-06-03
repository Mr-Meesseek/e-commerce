import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  worker_number: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activatedRoute.data.subscribe((data: any) => {
        const title = data.title || 'Default Title';
        document.title = `${title}`;
      });
    }
  }

  signIn(): void {
    this.authService.login(this.email, this.worker_number)
      .subscribe({
        next: (response) => {
          if (response.role) {
            console.log('Login successful');
            const role = this.authService.getUserRole();
            if (role === 'admin') {
              this.router.navigate(['/admin']);
            } else if (role === 'SuperEmployee') {
              this.router.navigate(['/profile']);
            }
          } else {
            this.errorMessage = 'Login failed. Please check your credentials and try again.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      });
  }
}
