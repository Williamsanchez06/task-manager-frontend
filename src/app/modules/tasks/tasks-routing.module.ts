import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TaskListComponent} from "./pages/my-tasks/pages/task-list/task-list.component";
import {SharedTasksComponent} from "./pages/shared-tasks/pages/shared-tasks/shared-tasks.component";
import {ReceivedTasksComponent} from "./pages/received-tasks/pages/received-tasks/received-tasks.component";
import {TasksLayoutComponent} from "./layouts/tasks-layout/tasks-layout.component";

const routes: Routes = [
  {
    path: '',
    component: TasksLayoutComponent,
    children: [
      { path: '', redirectTo: 'my', pathMatch: 'full' },
      { path: 'my', component: TaskListComponent },
      { path: 'received', component: ReceivedTasksComponent },
      { path: 'shared', component: SharedTasksComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule { }
