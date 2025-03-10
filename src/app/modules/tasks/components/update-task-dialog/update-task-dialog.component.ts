import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskRequestUpdate, TasksI, User } from "../../interfaces/tasks.interface";
import { UserService } from "../../services/user.service";
import { AlertService } from "../../../../core/services/alert/alert.service";
import {TasksStoreService} from "../../services/task-store.service";

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
    @Inject(MAT_DIALOG_DATA) public data: TasksI,
    private tasksStore: TasksStoreService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.updateTaskForm = this.fb.group({
      id: [data ? data.id : ''],
      title: [data ? data.title : '', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      description: [data ? data.description : '', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      status: [data ? data.status : 'PENDIENTE', Validators.required],
      transfer: ['no'],
      transferUser: [{ value: '', disabled: true }, [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Suscribirse a los cambios en el campo "transfer" para habilitar/deshabilitar controles
    this.updateTaskForm.get('transfer')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        const transferUserControl = this.updateTaskForm.get('transferUser');
        if (value === 'yes') {
          this.isTransferUser = true;
          transferUserControl?.enable();
          transferUserControl?.setValidators(Validators.required);
          // Deshabilitar campos que no se usan al transferir
          this.updateTaskForm.get('title')?.disable();
          this.updateTaskForm.get('description')?.disable();
          this.updateTaskForm.get('status')?.disable();
        } else {
          this.isTransferUser = false;
          transferUserControl?.disable();
          transferUserControl?.clearValidators();
          // Habilitar de nuevo los controles
          this.updateTaskForm.get('title')?.enable();
          this.updateTaskForm.get('description')?.enable();
          this.updateTaskForm.get('status')?.enable();
        }
        transferUserControl?.updateValueAndValidity();
      });

    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.users = data;
        }
      });
  }

  // Maneja la acción según si se actualiza o se transfiere la tarea
  handleTaskAction(): void {
    if (this.isTransferUser) {
      this.onTransferTask();
    } else {
      this.onUpdateTask();
    }
  }

  // Actualizar la tarea usando el store
  onUpdateTask(): void {
    if (this.updateTaskForm.invalid) {
      return;
    }
    const { id, title, description, status } = this.updateTaskForm.getRawValue();
    const taskData: TaskRequestUpdate = { title, description, status };

    this.tasksStore.updateTask(id, taskData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.alertService.success('Tarea actualizada exitosamente');
          this.dialogRef.close(true);
        }
      });
  }

  // Transferir (compartir) la tarea usando el store
  onTransferTask(): void {
    const transferUserControl = this.updateTaskForm.get('transferUser');
    if (transferUserControl?.invalid) {
      transferUserControl.markAsTouched();
      return;
    }
    const { id, transferUser } = this.updateTaskForm.getRawValue();

    this.tasksStore.shareTask(id, transferUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
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
