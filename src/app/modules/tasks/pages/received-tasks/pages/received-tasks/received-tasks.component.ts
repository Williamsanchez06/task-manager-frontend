import { Component, OnInit } from '@angular/core';
import { DataTableColumn } from '../../../../../../core/interfaces/data-table.interface';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TaskI } from '../../interfaces/received-tasks';
import { DeleteTaskDialogComponent } from '../../../../components/delete-task-dialog/delete-task-dialog.component';
import { UpdateTaskDialogComponent } from '../../../../components/update-task-dialog/update-task-dialog.component';
import {TasksStoreService} from "../../../../services/task-store.service";

@Component({
  selector: 'app-received-tasks',
  templateUrl: './received-tasks.component.html',
  styleUrls: ['./received-tasks.component.css']
})
export class ReceivedTasksComponent implements OnInit {

  columns: DataTableColumn[] = [
    { key: 'title', label: 'Título' },
    { key: 'status', label: 'Estado' },
    { key: 'description', label: 'Descripción' },
    { key: 'name', label: 'Quien mandó la tarea' },
    { key: 'email', label: 'Email de quien la mandó' },
  ];

  data: TaskI[] = [];

  // Parámetros de paginación.
  totalRecords = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];

  // No se muestran controles de búsqueda o registro en este componente
  showSearch = false;
  showRegister = false;

  constructor(
    private tasksStore: TasksStoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Suscribirse al observable de tareas compartidas
    this.tasksStore.sharedTasks$.subscribe(tasks => {
      this.data = tasks;
    });
    // Suscribirse al total de registros de tareas compartidas
    this.tasksStore.totalSharedRecords$.subscribe(total => {
      this.totalRecords = total;
    });
    this.loadTasks();
  }

  // Cargar la lista de tareas compartidas usando el store
  loadTasks(): void {
    this.tasksStore.loadSharedTasks(this.pageIndex + 1, this.pageSize);
  }

  // Cambiar de página
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  // Abre el modal para editar una tarea
  onEdit(item: TaskI): void {
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
  onDelete(item: TaskI): void {
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
