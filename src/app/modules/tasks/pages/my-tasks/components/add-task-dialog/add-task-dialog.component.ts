import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../../../../../core/services/alert/alert.service";
import {TasksStoreService} from "../../../../services/task-store.service";
import {TaskRequestCreate, TasksI} from "../../../../interfaces/tasks.interface";

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit {

  registerTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private tasksStore: TasksStoreService,
    private alertService: AlertService
  ) {
    this.registerTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveTask(): void {
    if (this.registerTaskForm.valid) {
      const taskData: TaskRequestCreate = this.registerTaskForm.value;

      this.tasksStore.createTask(taskData).subscribe({
        next: (task: TasksI) => {
          this.alertService.success('Tarea creada correctamente');
          this.dialogRef.close(task);
        }
      });
    }
  }
}
