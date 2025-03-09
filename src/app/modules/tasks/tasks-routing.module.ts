import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TaskListComponent} from "./pages/task-list/task-list.component";

const routes: Routes = [
  { path: '', component: TaskListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule { }
