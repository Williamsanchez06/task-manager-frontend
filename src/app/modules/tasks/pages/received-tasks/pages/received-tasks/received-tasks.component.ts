import { Component, OnInit } from '@angular/core';
import {DataTableColumn} from "../../../../../../core/interfaces/data-table.interface";
import {MatDialog} from "@angular/material/dialog";
import {ReceivedTaskService} from "../../services/received-task.service";
import {TaskI} from "../../interfaces/received-tasks";
import {PageEvent} from "@angular/material/paginator";
import {TasksI} from "../../../../interfaces/tasks.interface";
import {DeleteTaskDialogComponent} from "../../../../components/delete-task-dialog/delete-task-dialog.component";
import {UpdateTaskDialogComponent} from "../../../../components/update-task-dialog/update-task-dialog.component";

@Component({
  selector: 'app-received-tasks',
  templateUrl: './received-tasks.component.html',
  styleUrls: ['./received-tasks.component.css']
})
export class ReceivedTasksComponent implements OnInit {

  columns: DataTableColumn[] = [
    { key: 'title', label: 'Título' },
    { key: 'status', label: 'Estado' },
    { key : 'description', label: 'Descripción' },
    { key : 'name', label: 'Quien mando la tarea' },
    { key : 'email', label: 'email de quien la mando' },
  ];

  data: TaskI[] = [];

  // Parámetros de paginación.
  totalRecords = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];

  // Control de búsqueda.
  showSearch = false;
  showRegister = false;

  constructor(
    private receivedTaskService: ReceivedTaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Carga la lista de tareas con paginación y búsqueda
  loadTasks(): void {
    this.receivedTaskService.getSharedTasks(this.pageIndex + 1, this.pageSize)
      .subscribe(response => {
        console.log(response)
        this.data = response.tasks;
        this.totalRecords = response.total;
      });
  }

  // Cambia de página en la tabla
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
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
