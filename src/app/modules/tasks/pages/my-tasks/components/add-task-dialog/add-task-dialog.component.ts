import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {AlertService} from "../../../../../../core/services/alert/alert.service";
import {TaskRequestCreate, TasksI} from "../../interfaces/tasks.interface";

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
    private taskService: TaskService,
    private alertService: AlertService
  ) {
    this.registerTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['PENDIENTE', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveTask(): void {
    if (this.registerTaskForm.valid) {
      const taskData: TaskRequestCreate = this.registerTaskForm.value;

      this.taskService.createTask(taskData).subscribe({
          next: (task: Task) => {
            this.alertService.success('Tarea creada correctamente');
            this.dialogRef.close(task);
          },
          error: (error) => {
            this.alertService.error('Error al crear la tarea');
          }
        });
    }
  }
}

