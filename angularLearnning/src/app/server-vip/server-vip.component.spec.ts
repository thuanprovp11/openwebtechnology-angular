import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerVipComponent } from './server-vip.component';

describe('ServerVipComponent', () => {
  let component: ServerVipComponent;
  let fixture: ComponentFixture<ServerVipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerVipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerVipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
