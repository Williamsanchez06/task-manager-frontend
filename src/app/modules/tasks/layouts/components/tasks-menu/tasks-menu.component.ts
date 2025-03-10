import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../core/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasks-menu',
  templateUrl: './tasks-menu.component.html',
  styleUrls: ['./tasks-menu.component.css']
})
export class TasksMenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
