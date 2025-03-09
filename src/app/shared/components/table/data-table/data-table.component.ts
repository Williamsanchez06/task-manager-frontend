import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import {DataTableColumn} from "../../../../core/interfaces/data-table.interface";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {
  /**
   * Título de la tabla (opcional).
   */
  @Input() tableTitle?: string;

  /**
   * Configuración de columnas
   */
  @Input() columns: DataTableColumn[] = [];

  /**
   * Datos a mostrar en la tabla. Cada elemento debe tener las propiedades definidas en columns.
   */
  @Input() data: any[] = [];

  /**
   * Parámetros de paginación.
   */
  @Input() totalRecords = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  /**
   * Controlar la búsqueda.
   */
  @Input() showSearch = true;
  @Input() searchPlaceholder = 'Buscar';
  @Input() searchQuery = '';

  /**
   * Controlar botón "Registrar".
   */
  @Input() showRegister = true;
  registerLabel = 'Registrar';

  /**
   * Controlar "acciones".
   */
  @Input() delete?:boolean = true;
  @Input() edit?:boolean = true;

  /**
   * Mensaje e imagen cuando no hay datos.
   */
  noDataMessage = 'No hay datos que mostrar';
  noDataImage = '../assets/images/table/no-data.svg';

  /**
   * Eventos para comunicar al componente padre.
   */
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() search = new EventEmitter<string>();
  @Output() registerClick = new EventEmitter<void>();
  @Output() editClick = new EventEmitter<any>();
  @Output() deleteClick = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.initTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambian los datos, se actualiza la tabla.
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
    // Si cambian las columnas o las acciones, se recalcula displayedColumns.
    if (changes['columns'] || changes['edit'] || changes['delete']) {
      this.updateDisplayedColumns();
    }
  }

  private initTable(): void {
    this.dataSource.data = this.data;
    this.updateDisplayedColumns();
  }

  private updateDisplayedColumns(): void {
    // Tomamos las columnas normales
    this.displayedColumns = this.columns.map(col => col.key);

    // Agregamos "actions" solo si `edit` o `delete` están en `true`
    if (this.edit || this.delete) {
      this.displayedColumns.push('actions');
    }
  }


  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }

  onRegister(): void {
    this.registerClick.emit();
  }

  onEdit(item: any): void {
    this.editClick.emit(item);
  }

  onDelete(item: any): void {
    this.deleteClick.emit(item);
  }
}
