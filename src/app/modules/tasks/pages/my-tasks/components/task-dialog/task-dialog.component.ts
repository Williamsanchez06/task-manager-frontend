import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Task, UserResponse} from '../../../../interfaces/tasks.interface';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  taskForm: FormGroup;
  isEditMode: boolean = false;

  users: UserResponse[] = [
    { id: 'u1', name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 'u2', name: 'María López', email: 'maria@example.com' },
    { id: 'u3', name: 'Carlos Sánchez', email: 'carlos@example.com' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null
  ) {
    this.isEditMode = !!data;
    this.taskForm = this.fb.group({
      title: [data ? data.title : '', Validators.required],
      description: [data ? data.description : '', Validators.required],
      status: [data ? data.status : 'PENDIENTE', Validators.required],
      transfer: ['no'],
      transferUser: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {

    this.taskForm.get('transfer')?.valueChanges.subscribe(value => {
      const transferUserControl = this.taskForm.get('transferUser');
      if (value === 'yes') {
        transferUserControl?.enable();
        transferUserControl?.setValidators(Validators.required);

        this.taskForm.get('title')?.disable();
        this.taskForm.get('description')?.disable();
        this.taskForm.get('status')?.disable();
      } else {
        transferUserControl?.disable();
        transferUserControl?.clearValidators();

        this.taskForm.get('title')?.enable();
        this.taskForm.get('description')?.enable();
        this.taskForm.get('status')?.enable();
      }
      transferUserControl?.updateValueAndValidity();
    });
  }

  onSaveTask(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
