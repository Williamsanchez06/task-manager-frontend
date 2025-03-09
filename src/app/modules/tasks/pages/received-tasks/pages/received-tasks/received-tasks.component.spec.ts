import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedTasksComponent } from './received-tasks.component';

describe('ReceivedTasksComponent', () => {
  let component: ReceivedTasksComponent;
  let fixture: ComponentFixture<ReceivedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
