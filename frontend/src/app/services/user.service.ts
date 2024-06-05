import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.baseUrl + 'api/users';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getHttpOptions() {
    return {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
  }

  index(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error retrieving users', err);
        return throwError(() => new Error('UserService.findAllUsers(): error retrieving users: ' + err));
      })
    );
  }

  findUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${userId}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error retrieving user', err);
        return throwError(() => new Error('UserService.findUserById(): error retrieving user: ' + err));
      })
    );
  }

  update(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${userId}`, user, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error updating user', err);
        return throwError(() => new Error('UserService.updateUser(): error updating user: ' + err));
      })
    );
  }

  destroy(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${userId}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error deleting user', err);
        return throwError(() => new Error('UserService.deleteUser(): error deleting user: ' + err));
      })
    );
  }

  activateUser(userId: number): Observable<User> {
    return this.http.put<User>(`${this.url}/${userId}/enable`, {}, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error enabling user account', err);
        return throwError(() => new Error('UserService.activateUser(): error activating user account: ' + err));
      })
    );
  }

  deactivateUser(userId: number): Observable<User> {
    return this.http.put<User>(`${this.url}/${userId}/disable`, {}, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error disabling user account', err);
        return throwError(() => new Error('UserService.deactivateUser(): error deactivating user account: ' + err));
      })
    );
  }

  resetPassword(userId: number, newPassword: string): Observable<any> {
    return this.http.post(`${this.url}/${userId}/resetPassword`, newPassword, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('UserService.resetPassword(): error resetting password', err);
        return throwError(() => new Error('UserService.resetPassword(): error resetting password: ' + err));
      })
    );
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);

  }

  searchUsers(term: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/search?term=${term}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('Error searching for users', err);
        return throwError(() => new Error('Error searching for users: ' + err));
      })
    );
  }
}
