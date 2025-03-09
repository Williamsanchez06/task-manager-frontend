import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import {AlertService} from "../../../../../../core/services/alert/alert.service";
import {TasksI} from "../../interfaces/tasks.interface";

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css']
})
export class DeleteTaskDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: TasksI,
    private taskService: TaskService,
    private alertService: AlertService
  ) {}

  onDelete(): void {
    this.taskService.deleteTask(this.task.id).subscribe({
      next: () => {
        this.alertService.success('Tarea eliminada correctamente');
        this.dialogRef.close(true);
      },
      error: () => {
        this.alertService.error('Error al eliminar la tarea');
        this.dialogRef.close(false);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
