import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from "./components/table/data-table/data-table.component";
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MessageErrorsDirective} from "./directives/field-errors/directive/message-errors.directive";
import {TemplateErrorComponent} from "./directives/field-errors/template-error/template-error.component";


@NgModule({
  declarations: [
    DataTableComponent,
    MessageErrorsDirective,
    TemplateErrorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    DataTableComponent,
    MessageErrorsDirective
  ]
})
export class SharedModule {
}
