import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-error',
  templateUrl: './template-error.component.html',
  styleUrls: ['./template-error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateErrorComponent implements OnInit {

  errorMessage?: string;
  hidden: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {
    this.errorMessage = '';
  }

  @Input()
  set text(value: any) {
    if (value !== this.errorMessage) {
      this.errorMessage = value;
      this.hidden = !value;
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
  }

}
