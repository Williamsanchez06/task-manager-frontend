import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateErrorComponent } from './template-error.component';

describe('TemplateErrorComponent', () => {
  let component: TemplateErrorComponent;
  let fixture: ComponentFixture<TemplateErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateErrorComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
