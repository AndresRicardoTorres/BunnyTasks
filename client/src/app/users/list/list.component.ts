import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog';

class UserRow {
  user: User;
  editing: boolean;
  constructor(u: User) {
    this.user = u;
    this.editing = false;
  }
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  users: UserRow[];
  idToDelete: string;
  selectedUser: string;
  displayedColumns = ['name', 'actions'];
  createForm: FormGroup;
  updateForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.updateForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchUsers();

    this.route.params.subscribe(params => {
      this.selectedUser = params.id;
    });
  }

  editUser(t: UserRow) {
    const next = !t.editing;
    this.users.forEach(row => {
      row.editing = false;
    });
    t.editing = next;
  }

  openDeleteDialog(user) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { name: user.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }

  fetchUsers() {
    this.usersService.list().subscribe(
      (data: User[]) => {
        data.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.users = data.map(u => {
          const r = new UserRow(u);
          return r;
        });
      },
      error => this.errorMessage(error)
    );
  }

  addUser(newName) {
    this.usersService.add(newName).subscribe(
      (r: any) => {
        this.fetchUsers();
        this.createForm.reset();
        this.selectedUser = r.id;
      },
      error => this.errorMessage(error)
    );
  }

  deleteUser(id) {
    this.usersService.delete(id).subscribe(
      () => {
        this.fetchUsers();
        this.selectedUser = '';
      },
      error => this.errorMessage(error)
    );
  }

  updateUser(element, name) {
    this.usersService.update(element.user.id, name).subscribe(
      () => {
        this.snackBar.open('User updated successfully', 'OK', {
          duration: 3000
        });
        this.fetchUsers();
      },
      error => this.errorMessage(error)
    );
  }

  errorMessage(error) {
    let message = 'Error';
    if (error) {
      message = error;
      if (error.error) {
        message = error.error.message;
      }
    }

    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
}
