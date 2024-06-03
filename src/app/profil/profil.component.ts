import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User, FinalOrder } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfileComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchCardNumber: string = '';
  newUser: User = { id: 0, id_card_number: '', worker_number: '', name: '', email: '', role: 'employee' }; // Set default role to 'employee'
  editingUser: User | null = null;
  orders: FinalOrder[] = [];
  activeSection: string = 'unconfirmedOrders'; // Set default section to unconfirmedOrders
  loggedInUser: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadUnconfirmedOrders();
    this.loggedInUser = this.authService.getUserName();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  addUser(): void {
    this.newUser.role = 'employee'; // Ensure the role is set to 'employee'
    this.authService.addUser(this.newUser).subscribe(user => {
      this.users.push(user);
      this.newUser = { id: 0, id_card_number: '', worker_number: '', name: '', email: '', role: 'employee' }; // Reset form with default role
      this.filteredUsers = this.users;
    });
  }

  editUser(user: User): void {
    this.editingUser = { ...user };
    this.showSection('editUser');
  }

  updateUser(): void {
    if (this.editingUser) {
      this.authService.updateUser(this.editingUser).subscribe(updatedUser => {
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        this.users[index] = updatedUser;
        this.editingUser = null;
        this.showSection('userList');
      });
    }
  }

  deleteUser(id: number): void {
    this.authService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
    });
  }

  searchUsers(): void {
    if (this.searchCardNumber) {
      this.filteredUsers = this.users.filter(user => user.id_card_number.includes(this.searchCardNumber));
    } else {
      this.filteredUsers = this.users;
    }
  }

  getTotalUsers(): number {
    return this.users.length;
  }

  loadUnconfirmedOrders(): void {
    this.authService.getUnconfirmedOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  confirmOrder(orderId: number): void {
    this.authService.confirmOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== orderId);
    });
  }

  declineOrder(orderId: number): void {
    this.authService.declineOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== orderId);
    });
  }

  showSection(section: string): void {
    this.activeSection = section;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
