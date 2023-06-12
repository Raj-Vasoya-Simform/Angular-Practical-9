import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AddUserComponent } from '../add-user/add-user.component';
import { User, UserService } from '../user.service';
import { UserListComponent } from './user-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(async () => {
    const userServiceStub = {
      getUsersSubject: () => new BehaviorSubject([]),
      addUser: jasmine.createSpy('addUser'),
    };

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to add-user when addUser method is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.addUser();
    expect(navigateSpy).toHaveBeenCalledWith(['/add-user']);
  });

  it('should open dialog when openDialog method is called', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', [
      'afterClosed',
    ]);
    dialogRefSpyObj.afterClosed = () => of({ name: 'John' });
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.openDialog();

    expect(dialog.open).toHaveBeenCalledWith(AddUserComponent, {
      width: '400px',
    });
  });

  it('should add user when dialog is closed with user data', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', [
      'afterClosed',
    ]);
    const user: User = {
      name: 'John',
      email: '',
      department: '',
      password: '',
      designation: '',
      salary: 0,
    };
    dialogRefSpyObj.afterClosed.and.returnValue(of(user));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.openDialog();

    dialogRefSpyObj.afterClosed().subscribe((user: User) => {
      expect(dialog.open).toHaveBeenCalled();
      expect(userService.addUser).toHaveBeenCalledWith(user);
    });
  });
});
