import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  fullName: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,private authService: AuthService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activatedRoute.data.subscribe((data: any) => {
        const title = data.title || 'Titre par défaut';
        document.title = ` ${title}`;
      });
    }
  }}
//   register(): void {
//     if (this.password !== this.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     this.authService.register(this.username, this.fullName, this.password
//        , this.email
//     )
//       .subscribe({
//         next: () => {
//           this.router.navigate(['/signin']);
//         },
//         error: (err) => {
//           console.error('Registration failed', err);
//         }
//       });
//   }
// }
