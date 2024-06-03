import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User, FinalOrder, Product, Category, Photo, ProductResponse, CategoryResponse, PhotoResponse } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchCardNumber: string = '';
  newUser: User = { id: 0, id_card_number: '', worker_number: '', name: '', email: '', role: 'employee' };
  editingUser: User | null = null;
  orders: FinalOrder[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchSku: string = '';
  newProduct: Product = { id: 0, sku: '', name: '', price: 0, description: '', category: '', image_base64: '', review: '', seller: '', colors: [], rate: 0, quantity: 0, available: false, title: '', Key_Words: '' };
  editingProduct: Product | null = null;
  newCategory: Category = { title: '', image_base64: '' };
  newPhoto: Photo = { id: 0, image_base64: '' };
  selectedFile: File | null = null;
  categories: Category[] = [];
  photos: Photo[] = [];
  activeSection: string = 'confirmedOrders';
  loggedInUser: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  totalConfirmedOrders: number = 0;
  totalPriceOfConfirmedOrders: number = 0;
  mostFrequentProduct: Product | null = null;

  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUsers();
      this.loadConfirmedOrders();
      this.loadProducts();
      this.loadCategories();
      this.loadPhotos();
      this.loggedInUser = this.authService.getUserName();
    }
  }

  displayAlert(message: string, type: 'success' | 'error' = 'success'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  addUser(): void {
    this.authService.addUser(this.newUser).subscribe(user => {
      this.users.push(user);
      this.newUser = { id: 0, id_card_number: '', worker_number: '', name: '', email: '', role: 'employee' };
      this.filteredUsers = this.users;
      this.displayAlert('User added successfully');
      this.showSection('userList');
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
        this.displayAlert('User updated successfully');
        this.showSection('userList');
      });
    }
  }

  deleteUser(id: number): void {
    this.authService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
      this.displayAlert('User deleted successfully');
      this.showSection('userList');
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

  loadConfirmedOrders(): void {
    this.authService.getConfirmedOrdersForAdmin().subscribe(orders => {
      this.orders = orders;
      this.totalConfirmedOrders = orders.length;
      this.totalPriceOfConfirmedOrders = orders.reduce((total, order) => total + order.total_price, 0);
      this.calculateMostFrequentProduct();
    });
  }

  calculateMostFrequentProduct(): void {
    const productFrequency: { [sku: string]: number } = {};
    let maxFrequency = 0;
    let mostFrequentSku: string | null = null;

    this.orders.forEach(order => {
      order.product_skus.forEach(sku => {
        if (!productFrequency[sku]) {
          productFrequency[sku] = 0;
        }
        productFrequency[sku]++;
        if (productFrequency[sku] > maxFrequency) {
          maxFrequency = productFrequency[sku];
          mostFrequentSku = sku;
        }
      });
    });

    if (mostFrequentSku) {
      this.mostFrequentProduct = this.products.find(product => product.sku === mostFrequentSku) || null;
    }
  }

  addProduct(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newProduct.image_base64 = (e.target?.result as string).split(',')[1];
        this.authService.addProduct(this.newProduct).subscribe(() => {
          this.loadProducts();
          this.resetNewProduct();
          this.displayAlert('Product added successfully');
          this.showSection('products');
        });
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.authService.addProduct(this.newProduct).subscribe(() => {
        this.loadProducts();
        this.resetNewProduct();
        this.displayAlert('Product added successfully');
        this.showSection('products');
      });
    }
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
    this.showSection('editProduct');
  }

  updateProduct(id: number): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editingProduct!.image_base64 = (e.target?.result as string).split(',')[1];
        this.authService.updateProduct(id, this.editingProduct!).subscribe(updatedProduct => {
          const index = this.products.findIndex(product => product.id === updatedProduct.id);
          this.products[index] = updatedProduct;
          this.editingProduct = null;
          this.displayAlert('Product updated successfully');
          this.showSection('products');
        });
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.authService.updateProduct(id, this.editingProduct!).subscribe(updatedProduct => {
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        this.products[index] = updatedProduct;
        this.editingProduct = null;
        this.displayAlert('Product updated successfully');
        this.showSection('products');
      });
    }
  }

  deleteProduct(id: number): void {
    this.authService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
      this.displayAlert('Product deleted successfully');
    });
  }

  resetNewProduct(): void {
    this.newProduct = { id: 0, sku: '', name: '', price: 0, description: '', category: '', image_base64: '', review: '', seller: '', colors: [], rate: 0, quantity: 0, available: false, title: '', Key_Words: '' };
    this.selectedFile = null;
  }

  addCategory(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newCategory.image_base64 = (e.target?.result as string).split(',')[1];
        this.authService.addCategory(this.newCategory).subscribe(() => {
          this.loadCategories();
          this.resetNewCategory();
          this.displayAlert('Category added successfully');
          this.showSection('categories');
        });
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.authService.addCategory(this.newCategory).subscribe(() => {
        this.loadCategories();
        this.resetNewCategory();
        this.displayAlert('Category added successfully');
        this.showSection('categories');
      });
    }
  }

  resetNewCategory(): void {
    this.newCategory = { title: '', image_base64: '' };
    this.selectedFile = null;
  }

  addPhoto(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newPhoto.image_base64 = (e.target?.result as string).split(',')[1];
        this.authService.addPhoto(this.newPhoto).subscribe(() => {
          this.loadPhotos();
          this.resetNewPhoto();
          this.displayAlert('Photo added successfully');
          this.showSection('photos');
        });
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.authService.addPhoto(this.newPhoto).subscribe(() => {
        this.loadPhotos();
        this.resetNewPhoto();
        this.displayAlert('Photo added successfully');
        this.showSection('photos');
      });
    }
  }

  resetNewPhoto(): void {
    this.newPhoto = { id: 0, image_base64: '' };
    this.selectedFile = null;
  }

  loadProducts(): void {
    this.authService.getProducts().subscribe((response: ProductResponse) => {
      this.products = response.products;
      this.filteredProducts = response.products;
    });
  }

  searchProducts(): void {
    if (this.searchSku) {
      this.filteredProducts = this.products.filter(product => product.sku.includes(this.searchSku));
    } else {
      this.filteredProducts = this.products;
    }
  }

  getTotalProducts(): number {
    return this.products.length;
  }

  loadCategories(): void {
    this.authService.getCategories().subscribe((response: CategoryResponse) => {
      this.categories = response.categories;
    });
  }

  loadPhotos(): void {
    this.authService.getPhotos().subscribe((response: PhotoResponse) => {
      this.photos = response.photos;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  showSection(section: string): void {
    this.activeSection = section;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  deleteCategory(categoryTitle: string): void {
    this.authService.deleteCategory(categoryTitle).subscribe(() => {
      this.loadCategories();
      this.displayAlert('Category deleted successfully');
    });
  }

  deletePhoto(photoId: number): void {
    this.authService.deletePhoto(photoId).subscribe(() => {
      this.loadPhotos();
      this.displayAlert('Photo deleted successfully');
    });
  }
}
