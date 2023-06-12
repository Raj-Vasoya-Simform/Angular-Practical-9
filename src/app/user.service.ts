import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  department: string;
  password: string;
  designation: string;
  salary: number;
}


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  getUsers(): User[] {
    return this.users;
  }
  getUsersSubject(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }
  addUser(user: User): void {
    const updatedUsers = [...this.users, user];
    this.users = updatedUsers;
    this.usersSubject.next(updatedUsers);
  }
}
