import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DataTableColumn } from '../../../../../../core/interfaces/data-table.interface';
import { TasksI } from '../../../../interfaces/tasks.interface';
import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';
import { UpdateTaskDialogComponent } from '../../../../components/update-task-dialog/update-task-dialog.component';
import { DeleteTaskDialogComponent } from '../../../../components/delete-task-dialog/delete-task-dialog.component';
import {TasksStoreService} from "../../../../services/task-store.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  columns: DataTableColumn[] = [
    { key: 'title', label: 'Título' },
    { key: 'status', label: 'Estado' },
    { key: 'description', label: 'Descripción' },
    { key: 'createdAt', label: 'Fecha de Creación' },
  ];

  data: TasksI[] = [];

  // Parámetros de paginación.
  totalRecords = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];

  // Control de búsqueda.
  showSearch = true;
  searchQuery = '';

  // Control del botón "Registrar" para crear tarea.
  showRegister = true;

  constructor(
    private tasksStore: TasksStoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Suscribirse al observable del listado de tareas
    this.tasksStore.tasks$.subscribe(tasks => {
      this.data = tasks;
    });

    // Suscribirse al observable del total de registros
    this.tasksStore.totalRecords$.subscribe(total => {
      this.totalRecords = total;
    });

    this.loadTasks();
  }

  // Carga la lista de tareas usando el store
  loadTasks(): void {
    this.tasksStore.loadUserTasks(this.pageIndex + 1, this.pageSize, this.searchQuery);
  }

  // Cambia de página en la tabla
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  // Maneja la búsqueda
  onSearch(query: string): void {
    this.searchQuery = query;
    this.pageIndex = 0;
    this.loadTasks();
  }

  // Abre el modal para crear una tarea
  onRegisterClick(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  // Abre el modal para editar una tarea
  onEdit(item: TasksI): void {
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  // Abre el modal para eliminar una tarea
  onDelete(item: TasksI): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }
}
