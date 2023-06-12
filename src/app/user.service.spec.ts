import { TestBed } from '@angular/core/testing';
import { User, UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should initially return an empty array of users', () => {
    const users = userService.getUsers();
    expect(users).toEqual([]);
  });

  it('should return the same users array when getUsersSubject() is called', () => {
    const usersSubject = userService.getUsersSubject();
    let users: User[] = [];

    usersSubject.subscribe((data) => {
      users = data;
    });

    expect(users).toEqual([]);

    const newUser: User = {
      name: 'John Doe',
      email: '',
      department: '',
      password: '',
      designation: '',
      salary: 0,
    };
    userService.addUser(newUser);

    expect(users).toEqual([newUser]);
  });

  it('should add a user to the list when addUser() is called', () => {
    const newUser: User = {
      name: 'John Doe',
      email: '',
      department: '',
      password: '',
      designation: '',
      salary: 0,
    };
    userService.addUser(newUser);

    const users = userService.getUsers();
    expect(users).toEqual([newUser]);
  });
});
