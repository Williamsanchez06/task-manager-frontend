import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataTableColumn } from '../../../../../../core/interfaces/data-table.interface';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TaskI } from '../../interfaces/received-tasks.interface';
import { DeleteTaskDialogComponent } from '../../../../dialogs/delete-task-dialog/delete-task-dialog.component';
import { UpdateTaskDialogComponent } from '../../../../dialogs/update-task-dialog/update-task-dialog.component';
import { TasksStoreService } from "../../../../services/task-store.service";

@Component({
  selector: 'app-received-tasks',
  templateUrl: './received-tasks.component.html',
  styleUrls: ['./received-tasks.component.css']
})
export class ReceivedTasksComponent implements OnInit, OnDestroy {

  columns: DataTableColumn[] = [
    { key: 'title', label: 'Título' },
    { key: 'status', label: 'Estado' },
    { key: 'description', label: 'Descripción' },
    { key: 'name', label: 'Quien creo la tarea' },
    { key: 'email', label: 'Email de quien creo la tarea' },
  ];

  data: TaskI[] = [];
  totalRecords = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];

  showSearch = false;
  showRegister = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private tasksStore: TasksStoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tasksStore.sharedTasks$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(tasks => {
        this.data = tasks;
      });

    this.tasksStore.totalSharedRecords$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(total => {
        this.totalRecords = total;
      });

    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksStore.loadSharedTasks(this.pageIndex + 1, this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  onEdit(item: TaskI): void {
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          this.loadTasks();
        }
      });
  }

  onDelete(item: TaskI): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          this.loadTasks();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
