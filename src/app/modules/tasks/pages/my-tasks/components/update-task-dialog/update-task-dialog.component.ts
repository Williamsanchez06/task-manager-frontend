import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {TaskRequestCreate, TaskRequestUpdate, TasksI, User} from "../../interfaces/tasks.interface";
import { TaskService } from "../../services/task.service";
import { AlertService } from "../../../../../../core/services/alert/alert.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrls: ['./update-task-dialog.component.css']
})
export class UpdateTaskDialogComponent implements OnInit, OnDestroy {

  updateTaskForm: FormGroup;
  users: User[] = [];
  isTransferUser = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : TasksI,
    private taskService: TaskService,
    private alertService: AlertService
  ) {
    this.updateTaskForm = this.fb.group({
      id: [data ? data.id : ''],
      title: [data ? data.title : '', Validators.required],
      description: [data ? data.description : '', Validators.required],
      status: [data ? data.status : 'PENDIENTE', Validators.required],
      transfer: ['no'],
      transferUser: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.updateTaskForm.get('transfer')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        const transferUserControl = this.updateTaskForm.get('transferUser');
        if (value === 'yes') {
          this.isTransferUser = true;
          transferUserControl?.enable();
          transferUserControl?.setValidators(Validators.required);
          // Deshabilitamos los controles que no se usarán en la transferencia
          this.updateTaskForm.get('title')?.disable();
          this.updateTaskForm.get('description')?.disable();
          this.updateTaskForm.get('status')?.disable();
        } else {
          this.isTransferUser = false;
          transferUserControl?.disable();
          transferUserControl?.clearValidators();
          // Habilitamos nuevamente los controles al volver al modo edición normal
          this.updateTaskForm.get('title')?.enable();
          this.updateTaskForm.get('description')?.enable();
          this.updateTaskForm.get('status')?.enable();
        }
        transferUserControl?.updateValueAndValidity();
      });

    this.loadUsers();
  }

  loadUsers(): void {
    this.taskService.getUser().subscribe({
      next: ({ data }) => {
        this.users = data;
      },
      error: () => {
        this.alertService.error('Error al obtener usuarios');
      }
    });
  }

  handleTaskAction (): void {
    if (this.isTransferUser) {
      this.onTransferTask();
    } else {
      this.onUpdateTask();
    }
  }

  onUpdateTask(): void {
    if (this.updateTaskForm.invalid) {
      return;
    }

    const { id, title, description, status } = this.updateTaskForm.getRawValue();
    const taskData : TaskRequestUpdate = { title, description, status };

    this.taskService.updateTask(id, taskData).subscribe({
      next: (response) => {
        this.alertService.success('Tarea actualizada exitosamente');
        this.dialogRef.close(response);
      },
      error: (err) => {
        this.alertService.error('Error al actualizar la tarea');
      }
    });
  }


  onTransferTask(): void {

    const { id, transferUser } = this.updateTaskForm.getRawValue();

    this.taskService.shareTask(id, transferUser).subscribe({
      next: (response) => {
        this.alertService.success('Tarea trasnferida exitosamente');
        this.dialogRef.close(response);
      },
      error: (err) => {
        this.alertService.error('Error al actualizar la tarea');
      }
    });

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

