import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule,
  MatTreeModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListComponent as UserListComponent } from './users/list/list.component';
import { ListComponent as TaskListComponent } from './tasks/list/list.component';
import { DeleteDialogComponent } from './users/list/delete-dialog';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserListComponent }
];

@NgModule({
  entryComponents: [DeleteDialogComponent],
  declarations: [
    AppComponent,
    UserListComponent,
    TaskListComponent,
    DeleteDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
