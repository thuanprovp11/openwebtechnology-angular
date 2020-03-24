import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  openSidebar = new Subject();

  constructor() {
  }

  onOpenSideBar() {
    this.openSidebar.next('');
  }
}
