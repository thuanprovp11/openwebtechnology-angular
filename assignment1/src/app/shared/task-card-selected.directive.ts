import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appTaskCardSelected]'
})
export class TaskCardSelectedDirective {
  @HostBinding('class.card-selected') isSelected = false;

  // @HostListener('click') onClick(event: Event) {
  //   console.log('test');
  //   this.isSelected = true;
  // }

  @HostListener('document:click', ['$event']) clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }

  constructor(private eRef: ElementRef) {
  }

}
