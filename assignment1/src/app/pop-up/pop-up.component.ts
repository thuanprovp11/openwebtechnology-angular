import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Input() message: string;
  @Output() closeMessage = new Subject<void>();

  constructor() {
  }

  onCloseMessage() {
    this.closeMessage.next();
  }

  ngOnInit() {
  }

}
