import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DataTableColumn } from '../../../../../../core/interfaces/data-table.interface';
import { TasksI } from '../../../../interfaces/tasks.interface';
import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';
import { UpdateTaskDialogComponent } from '../../../../dialogs/update-task-dialog/update-task-dialog.component';
import { DeleteTaskDialogComponent } from '../../../../dialogs/delete-task-dialog/delete-task-dialog.component';
import { TasksStoreService } from "../../../../services/task-store.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  columns: DataTableColumn[] = [
    { key: 'title', label: 'Título' },
    { key: 'status', label: 'Estado' },
    { key: 'description', label: 'Descripción' },
    { key: 'createdAt', label: 'Fecha de Creación' },
  ];

  data: TasksI[] = [];
  totalRecords = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  showSearch = true;
  searchQuery = '';
  showRegister = true;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private tasksStore: TasksStoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tasksStore.tasks$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(tasks => this.data = tasks);

    this.tasksStore.totalRecords$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(total => this.totalRecords = total);

    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksStore.loadUserTasks(this.pageIndex + 1, this.pageSize, this.searchQuery);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.pageIndex = 0;
    this.loadTasks();
  }

  onRegisterClick(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, { width: '600px' });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) this.loadTasks();
      });
  }

  onEdit(item: TasksI): void {
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent, { width: '600px', data: item });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) this.loadTasks();
      });
  }

  onDelete(item: TasksI): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, { width: '400px', data: item });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) this.loadTasks();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
