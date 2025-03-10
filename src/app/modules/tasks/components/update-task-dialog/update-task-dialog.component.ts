import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "../../../../core/services/alert/alert.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {TaskRequestUpdate, TasksI, User} from "../../interfaces/tasks.interface";
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";

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
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.updateTaskForm = this.fb.group({
      id: [data ? data.id : ''],
      title: [data ? data.title : '',  [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      description: [data ? data.description : '',  [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      status: [data ? data.status : 'PENDIENTE', Validators.required],
      transfer: ['no'],
      transferUser: [{ value: '', disabled: true }, [Validators.required]]
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
    this.userService.getUser().subscribe({
      next: ({ data }) => {
        this.users = data;
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
      next: () => {
        this.alertService.success('Tarea actualizada exitosamente');
        this.dialogRef.close(true);
      }
    });
  }


  onTransferTask(): void {
    const transferUserControl = this.updateTaskForm.get('transferUser');

    if (transferUserControl?.invalid) {
      transferUserControl.markAsTouched();
      return;
    }

    const { id, transferUser } = this.updateTaskForm.getRawValue();

    this.taskService.shareTask(id, transferUser).subscribe({
      next: () => {
        this.alertService.success('Tarea transferida exitosamente');
        this.dialogRef.close(true);
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

