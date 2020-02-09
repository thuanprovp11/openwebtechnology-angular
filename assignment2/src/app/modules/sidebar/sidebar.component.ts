import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  messages = [1, 2, 3, 4, 5, 6];

  constructor() {
  }

  ngOnInit(): void {
  }

}
