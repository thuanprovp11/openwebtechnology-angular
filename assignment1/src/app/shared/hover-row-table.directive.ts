import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {ListTasks} from './task.model';

@Directive({
  selector: '[appHoverRowTable]'
})
export class HoverRowTableDirective {
  @Input() dataTask: ListTasks;

  @HostListener('click') onClick(event: Event) {
    console.log(this.dataTask);
  }

  constructor() {
  }

}
