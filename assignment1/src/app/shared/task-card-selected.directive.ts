import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appTaskCardSelected]'
})
export class TaskCardSelectedDirective {
  @HostBinding('class.card-selected') isSelected = false;

  @HostListener('document:click', ['$event']) clickOut(event) {
    this.isSelected = !!this.eRef.nativeElement.contains(event.target);
  }

  constructor(private eRef: ElementRef) {
  }

}
