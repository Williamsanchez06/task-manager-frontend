import {AfterViewChecked, ComponentRef, Directive, OnDestroy, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {merge, Subscription} from 'rxjs';
import {AbstractControl, NgControl} from '@angular/forms';
import {ListErrors} from "../errors/list-errors.interface";
import {TemplateErrorComponent} from "../template-error/template-error.component";


@Directive({
  selector: '[appValidateErrors]'
})
export class MessageErrorsDirective implements OnInit, OnDestroy, AfterViewChecked {
  private status: Subscription = new Subscription;
  private errors: any = ListErrors;
  private component!: ComponentRef<TemplateErrorComponent>;

  constructor(
    private renderer: Renderer2,
    private control: NgControl,
    private vcr: ViewContainerRef
  ) {
  }

  public get validateInitialState(): boolean {
    if (this.formControl) {
      return this.formControl.touched || this.formControl.dirty;
    }
    return false;
  }

  private get formControl(): AbstractControl | null {
    return this.control.control;
  }

  ngOnInit(): void {
    this.listenState();
  }

  ngAfterViewChecked(): void {
    this.validateErrors();
  }

  listenState(): void {
    this.status = merge(this.formControl?.valueChanges).subscribe(
      () => this.validateErrors()
    );
  }

  ngOnDestroy(): void {
    this.status.unsubscribe();
  }

  private validateErrors(): void {
    try {
      if (!this.formControl) return;

      const {value, errors, invalid} = this.formControl;

      if (this.validateInitialState && value === '') {
        this.formControl.markAsPristine();
        this.formControl.markAsTouched();
      }

      if (this.validateInitialState && invalid) {
        if (errors) {
          const [firstErrorKey] = Object.keys(errors);
          const getError = this.errors[firstErrorKey];
          const message = getError(errors[firstErrorKey]);
          this.renderInScreen(message);
          this.addClassError(true);
        }
      } else {
        this.renderInScreen();
        this.addClassError(false);
      }
    } catch (e) {
    }
  }

  private renderInScreen(message?: string): void {
    try {
      if (!this.component) {
        this.component = this.vcr.createComponent(TemplateErrorComponent);
      }
      this.component.instance.text = message;
    } catch (e) {
    }
  }

  private addClassError(className: boolean): void {
    if (this.component) {
      const element = this.vcr.element.nativeElement;
      if (className) {
        this.renderer.addClass(element.className.includes('container-ng-select') ? element : element.parentElement, 'input-error');
        element.className.includes('container-ng-select') && this.renderer.addClass(element.previousElementSibling, 'title-error');
      } else {
        this.renderer.removeClass(element.className.includes('container-ng-select') ? element : element.parentElement, 'input-error');
        element.className.includes('container-ng-select') && this.renderer.removeClass(element.previousElementSibling, 'title-error');
      }
    }
  }

}
