import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksRoutingModule} from "./tasks-routing.module";
import {TaskListComponent} from "./pages/my-tasks/pages/task-list/task-list.component";
import { TaskDialogComponent } from './pages/my-tasks/components/task-dialog/task-dialog.component';

import {SharedModule} from "../../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ReceivedTasksComponent } from './pages/received-tasks/pages/received-tasks/received-tasks.component';
import { SharedTasksComponent } from './pages/shared-tasks/pages/shared-tasks/shared-tasks.component';
import { TasksLayoutComponent } from './layouts/tasks-layout/tasks-layout.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { TasksMenuComponent } from './layouts/components/tasks-menu/tasks-menu.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskDialogComponent,
    ReceivedTasksComponent,
    SharedTasksComponent,
    TasksLayoutComponent,
    TasksMenuComponent
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
    MatIconModule,
    MatToolbarModule
  ]
})
export class TasksModule { }
