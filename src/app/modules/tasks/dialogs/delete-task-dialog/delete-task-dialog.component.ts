import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from "../../../../core/services/alert/alert.service";
import { TasksI } from "../../interfaces/tasks.interface";
import {TasksStoreService} from "../../services/task-store.service";

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css']
})
export class DeleteTaskDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: TasksI,
    private tasksStore: TasksStoreService,
    private alertService: AlertService
  ) {}

  onDelete(): void {
    this.tasksStore.deleteTask(this.task.id).subscribe({
      next: () => {
        this.alertService.success('Tarea eliminada correctamente');
        this.dialogRef.close(true);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
