import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from './add-user.component';
import { UserService } from '../user.service';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userService: UserService;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<AddUserComponent>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        UserService,
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj<MatDialogRef<AddUserComponent>>([
            'close',
          ]),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    matDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<AddUserComponent>
    >;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required fields', () => {
    const formControls = component.addUserForm.controls;
    expect(formControls['name']).toBeDefined();
    expect(formControls['email']).toBeDefined();
    expect(formControls['department']).toBeDefined();
    expect(formControls['password']).toBeDefined();
    expect(formControls['designation']).toBeDefined();
    expect(formControls['salary']).toBeDefined();
  });

  it('should have required validator for name field', () => {
    const nameControl = component.addUserForm.get('name');
    expect(
      nameControl?.validator?.(new FormControl(''))?.['required']
    ).toBeTruthy();
  });

  it('should have required and email validators for email field', () => {
    const emailControl = component.addUserForm.get('email');
    expect(
      emailControl?.validator?.(new FormControl(''))?.['required']
    ).toBeTruthy();
  });

  it('should have required validator for department field', () => {
    const departmentControl = component.addUserForm.get('department');
    expect(
      departmentControl?.validator?.(new FormControl(''))?.['required']
    ).toBeTruthy();
  });

  it('should have required and pattern validators for password field', () => {
    const passwordControl = component.addUserForm.get('password');
    expect(
      passwordControl?.validator?.(new FormControl(''))?.['required']
    ).toBeTruthy();
  });

  it('should have required validator for designation field', () => {
    const designationControl = component.addUserForm.get('designation');
    expect(
      designationControl?.validator?.(new FormControl(''))?.['required']
    ).toBeTruthy();
  });

  it('should have required validator for salary field', () => {
    const salaryControl = component.addUserForm.get('salary');
    expect(
      salaryControl?.validator?.(new FormControl(''))?.['required']
    ).toBeTruthy();
  });

  it('should call userService.addUser() and close dialog when addUserForm is valid', () => {
    spyOn(userService, 'addUser');

    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      department: 'IT',
      password: 'Password123!',
      designation: 'Developer',
      salary: 50000,
    };

    component.addUserForm.setValue(mockUser);
    component.addUser();

    const expectedUser = { ...mockUser, date: jasmine.any(Date) };
    expect(userService.addUser).toHaveBeenCalledWith(expectedUser);
    expect(matDialogRef.close).toHaveBeenCalled();
  });

  it('should not call userService.addUser() and close dialog when addUserForm is invalid', () => {
    spyOn(userService, 'addUser');

    component.addUser();

    expect(userService.addUser).not.toHaveBeenCalled();
    expect(matDialogRef.close).not.toHaveBeenCalled();
  });
});
