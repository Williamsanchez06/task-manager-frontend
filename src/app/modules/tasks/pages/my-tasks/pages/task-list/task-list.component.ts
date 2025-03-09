import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import {DataTableColumn} from "../../../../../../core/interfaces/data-table.interface";
import {Task} from "../../../../interfaces/tasks.interface";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  columns: DataTableColumn[] = [
    { key: 'title', label: 'Título' },
    { key: 'status', label: 'Estado' },
    { key: 'createdAt', label: 'Fecha de Creación' }
  ];

  data: Task[] = [];

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

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks(this.pageIndex + 1, this.pageSize, this.searchQuery)
      .subscribe(response => {
        this.data = response.tasks;
        this.totalRecords = response.total;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.pageIndex = 0; // Resetea a la primera página
    this.loadTasks();
  }

  // Método para crear una tarea
  onRegisterClick(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Llama al servicio para crear la tarea y recarga la lista.
        this.taskService.createTask(result).subscribe(() => {
          this.loadTasks();
        });
      }
    });
  }

  // Método para editar una tarea
  onEdit(item: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Llama al servicio para actualizar la tarea y recarga la lista.
        this.taskService.updateTask(item.id, result).subscribe(() => {
          this.loadTasks();
        });
      }
    });
  }

  // Método para eliminar una tarea
  onDelete(item: Task): void {
    console.log('Eliminar', item);
  }
}
