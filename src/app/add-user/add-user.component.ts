import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddUserComponent>,
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/),
        ],
      ],
      designation: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  get formControls() {
    return this.addUserForm.controls;
  }

  addUser(): void {
    try {
      if (this.addUserForm.valid) {
        const user = { ...this.addUserForm.value, date: new Date() };
        this.userService.addUser(user);
        this.addUserForm.markAsPristine();
        this.dialogRef.close();
      }
    } catch (error) {
      console.error('An error occurred while adding the user:', error);
    }
  }
}
