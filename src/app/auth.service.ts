import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface User {
  id: number;
  id_card_number: string;
  worker_number: string;
  name: string;
  email: string;
  role: string;
}

export interface CategoryInput {
  title: string;
  image_base64?: string;
}

export interface ProductInput {
  sku: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  quantity?: number;
  available?: boolean;
  Key_Words?: string;
  image_base64?: string;
}

export interface Photo {
  id: number;
  image_base64: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_base64: string;
  review: string;
  seller: string;
  colors: string[];
  rate: number;
  quantity: number;
  available: boolean;
  title: string;
  Key_Words: string;
}

export interface FinalOrder {
  id: number;
  name: string;
  address: string;
  city: string;
  postal_code: string;
  phone_number: string;
  user_id_card: string;
  product_skus: string[];
  product_quantities: number[];
  product_categories: string[];
  facilite: number[];
  total_price: number;
  confirmation: boolean;
}

export interface AuthResponse {
  message: string;
  role?: string;
}

export interface ProductResponse {
  products: Product[];
}

export interface Category {
  title: string;
  image_base64: string;
}

export interface CategoryResponse {
  categories: Category[];
}

export interface PhotoResponse {
  photos: Photo[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://192.168.1.3:8000';  // Replace with your FastAPI base URL

  constructor(private http: HttpClient) {}

  // Authentication methods
  login(email: string, worker_number: string): Observable<AuthResponse> {
    const body = { email, worker_number };
    return this.http.post<AuthResponse>(`${this.API_URL}/loginDashboard`, body).pipe(
      tap(response => {
        if (response.role) {
          localStorage.setItem('user_role', response.role);
          localStorage.setItem('user_name', email);  // Assuming the email is the username
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of({ message: 'Login failed' });
      })
    );
  }

  getUserRole(): string {
    return localStorage.getItem('user_role') || 'client';
  }

  getUserName(): string {
    return localStorage.getItem('user_name') || '';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user_role');
  }

  logout(): void {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
  }

  // CRUD methods for users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`)
      .pipe(
        map(users => users.filter(user => user.role !== 'admin')), // Filter out admin users
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/addUser`, user)
      .pipe(catchError(this.handleError<User>('addUser')));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/users/${user.id}`, user)
      .pipe(catchError(this.handleError<User>('updateUser')));
  }

  deleteUser(id: number): Observable<{}> {
    return this.http.delete(`${this.API_URL}/users/${id}`)
      .pipe(catchError(this.handleError<{}>('deleteUser')));
  }

  getUnconfirmedOrders(): Observable<FinalOrder[]> {
    return this.http.get<FinalOrder[]>(`${this.API_URL}/orders`)
      .pipe(
        map(orders => orders.filter(order => !order.confirmation)),
        catchError(this.handleError<FinalOrder[]>('getUnconfirmedOrders', []))
      );
  }

  getConfirmedOrdersForAdmin(): Observable<FinalOrder[]> {
    return this.http.get<FinalOrder[]>(`${this.API_URL}/orderss`)
      .pipe(
        catchError(this.handleError<FinalOrder[]>('getConfirmedOrdersForAdmin', []))
      );
  }

  confirmOrder(orderId: number): Observable<{}> {
    return this.http.put(`${this.API_URL}/orders/confirm/${orderId}`, {})
      .pipe(
        catchError(this.handleError<{}>('confirmOrder'))
      );
  }

  declineOrder(orderId: number): Observable<{}> {
    return this.http.delete(`${this.API_URL}/orders/decline/${orderId}`)
      .pipe(
        catchError(this.handleError<{}>('declineOrder'))
      );
  }

  // CRUD methods for products
  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.API_URL}/product`)
      .pipe(catchError(this.handleError<ProductResponse>('getProducts', { products: [] })));
  }
  addProduct(product: ProductInput): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/products`, product)
      .pipe(catchError(this.handleError<any>('addProduct')));
  }

  updateProduct(id: number, product: ProductInput): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/products/${id}`, product)
      .pipe(catchError(this.handleError<Product>('updateProduct')));
  }

  deleteProduct(id: number): Observable<{}> {
    return this.http.delete(`${this.API_URL}/products/${id}`)
      .pipe(catchError(this.handleError<{}>('deleteProduct')));
  }

  // CRUD methods for categories
  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.API_URL}/categories`)
      .pipe(catchError(this.handleError<CategoryResponse>('getCategories', { categories: [] })));
  }

  addCategory(category: CategoryInput): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/categories`, category)
      .pipe(catchError(this.handleError<any>('addCategory')));
  }

  deleteCategory(title: string): Observable<{}> {
    return this.http.delete(`${this.API_URL}/categories/${title}`)
      .pipe(catchError(this.handleError<{}>('deleteCategory')));
  }

  // CRUD methods for photos
  getPhotos(): Observable<PhotoResponse> {
    return this.http.get<PhotoResponse>(`${this.API_URL}/photos`)
      .pipe(catchError(this.handleError<PhotoResponse>('getPhotos', { photos: [] })));
  }

  addPhoto(photo: Photo): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/photos`, photo)
      .pipe(catchError(this.handleError<any>('addPhoto')));
  }

  deletePhoto(id: number): Observable<{}> {
    return this.http.delete(`${this.API_URL}/photos/${id}`)
      .pipe(catchError(this.handleError<{}>('deletePhoto')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
