import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLayoutComponent } from './tasks-layout.component';

describe('TasksLayoutComponent', () => {
  let component: TasksLayoutComponent;
  let fixture: ComponentFixture<TasksLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
