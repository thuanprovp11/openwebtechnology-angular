import {Directive, ElementRef, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') showMenu = false;

  // bật/tắt dropdown menu khi click từ bất cứ đâu trong trang
  // @HostListener('document:click', ['$event']) onShowDropdown() {
  @HostListener('click') onShowDropdown() {
    this.showMenu = !this.showMenu;
  }

  constructor() {
  }
}
