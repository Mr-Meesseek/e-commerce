import { Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ProfileComponent } from './profil/profil.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' }, 
  { path: 'signin', component: SigninComponent, data: { title: 'Signin' } },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdmindashboardComponent, data: { title: 'Admin' } }
];
