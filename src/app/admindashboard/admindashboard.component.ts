import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, Category, CategoryResponse, FinalOrder, Photo, PhotoResponse, Product, ProductResponse, User } from '../auth.service';

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
  directOrderCount: number = 0;
  indirectOrderCount: number = 0;

  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUsers();
      this.loadProducts(); // Ensure products are loaded first
      this.loadConfirmedOrders(); // Then load confirmed orders
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

  getOrderType(facilite: number[]): string {
    return facilite.some(f => f > 1) ? 'Indirect Order' : 'Direct Order';
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  addUser(): void {
    if (this.newUser.id_card_number && this.newUser.worker_number && this.newUser.name && this.newUser.email) {
      this.authService.addUser(this.newUser).subscribe(user => {
        this.users.push(user);
        this.newUser = { id: 0, id_card_number: '', worker_number: '', name: '', email: '', role: 'employee' };
        this.filteredUsers = this.users;
        this.displayAlert('User added successfully');
        this.showSection('userList');
      });
    } else {
      this.displayAlert('Please fill all required fields', 'error');
    }
  }

  editUser(user: User): void {
    this.editingUser = { ...user };
    this.showSection('editUser');
  }

  updateUser(): void {
    if (this.editingUser && this.editingUser.id_card_number && this.editingUser.worker_number && this.editingUser.name && this.editingUser.email) {
      this.authService.updateUser(this.editingUser).subscribe(updatedUser => {
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        this.users[index] = updatedUser;
        this.editingUser = null;
        this.displayAlert('User updated successfully');
        this.showSection('userList');
      });
    } else {
      this.displayAlert('Please fill all required fields', 'error');
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
      this.calculateOrderTypes();
    });
  }

  calculateMostFrequentProduct(): void {
    const productFrequency: { [sku: string]: number } = {};
    let maxFrequency = 0;
    let mostFrequentSku: string | null = null;

    console.log('Calculating most frequent product with orders:', this.orders);
    console.log('And products:', this.products);

    this.orders.forEach(order => {
      order.product_skus.forEach(sku => {
        const normalizedSku = sku.trim().toUpperCase();
        if (!productFrequency[normalizedSku]) {
          productFrequency[normalizedSku] = 0;
        }
        productFrequency[normalizedSku]++;
        if (productFrequency[normalizedSku] > maxFrequency) {
          maxFrequency = productFrequency[normalizedSku];
          mostFrequentSku = normalizedSku;
        }
      });
    });

    if (mostFrequentSku) {
      console.log('Most frequent SKU:', mostFrequentSku);

      // Manual search through products array
      for (let product of this.products) {
        if (product.sku.trim().toUpperCase() === mostFrequentSku) {
          this.mostFrequentProduct = product;
          break;
        }
      }
      console.log('Most frequent product:', this.mostFrequentProduct);
    }
  }

  calculateOrderTypes(): void {
    this.directOrderCount = 0;
    this.indirectOrderCount = 0;

    this.orders.forEach(order => {
      const isIndirectOrder = order.facilite.some(facilite => facilite > 1);
      if (isIndirectOrder) {
        this.indirectOrderCount++;
      } else {
        this.directOrderCount++;
      }
    });
  }

  addProduct(): void {
    if (this.newProduct.sku && this.newProduct.name && this.newProduct.price && this.newProduct.description && this.newProduct.category && this.newProduct.quantity) {
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
    } else {
      this.displayAlert('Please fill all required fields', 'error');
    }
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
    this.showSection('editProduct');
  }

  updateProduct(id: number): void {
    if (this.editingProduct && this.editingProduct.sku && this.editingProduct.name && this.editingProduct.price && this.editingProduct.description && this.editingProduct.category && this.editingProduct.quantity) {
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
    } else {
      this.displayAlert('Please fill all required fields', 'error');
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
    if (this.newCategory.title) {
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
    } else {
      this.displayAlert('Please fill all required fields', 'error');
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
