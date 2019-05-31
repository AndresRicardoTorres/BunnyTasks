import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

class TaskRow {
  task: Task;
  editing: boolean;
  check: boolean;
  constructor(t: Task) {
    this.task = t;
    this.editing = false;
    this.check = t.state === 'DONE';
  }
}

@Component({
  selector: 'app-tasks-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  private userId: string;
  tasks: TaskRow[];
  displayedColumns = ['description', 'actions'];
  createForm: FormGroup;
  updateForm: FormGroup;

  constructor(
    private taskService: TasksService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createForm = this.fb.group({
      description: ['', Validators.required]
    });
    this.updateForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit() {}

  fetchTasks() {
    this.taskService.list(this.userId).subscribe((data: Task[]) => {
      data.sort((a, b) => {
        if (a.description > b.description) {
          return 1;
        }
        if (a.description < b.description) {
          return -1;
        }
        return 0;
      });
      this.tasks = data.map(t => {
        const r = new TaskRow(t);

        return r;
      });
    });
  }

  editTask(t: TaskRow) {
    const next = !t.editing;
    this.tasks.forEach(row => {
      row.editing = false;
    });
    t.editing = next;
  }

  updateTask(element, desc) {
    element.editing = false;
    element.task.description = desc;
    this.taskService.updateDesc(element.task._id, desc).subscribe(() => {
      this.snackBar.open('Task updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

  checkTask(element) {
    element.editing = false;
    const state = element.check ? 'DONE' : 'TODO';
    this.taskService.updateState(element.task._id, state).subscribe(() => {
      this.snackBar.open('Task updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

  createTask(desc: string) {
    this.taskService.add(this.userId, desc).subscribe(() => {
      this.fetchTasks();
      this.createForm.reset();
    });
  }

  @Input()
  set userIn(user: string) {
    this.userId = user;
    this.router.navigate([`/${this.userId}`]);
    this.fetchTasks();
  }
  get userIn(): string {
    return this.userId;
  }
}
