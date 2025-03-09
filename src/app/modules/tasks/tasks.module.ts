import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksRoutingModule} from "./tasks-routing.module";
import {TaskListComponent} from "./pages/task-list/task-list.component";
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';

import {SharedModule} from "../../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    TaskListComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatDialogModule,
    SharedModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TasksModule { }
