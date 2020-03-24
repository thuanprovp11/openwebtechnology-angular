import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { HeaderService } from './core/header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('snav', {static: true}) snav;

  constructor(private authService: AuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private headerService: HeaderService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('click', this.mobileQueryListener);
  }

  mobileQuery: MediaQueryList;


  private mobileQueryListener: () => void;

  title = 'BOOK MANAGEMENT';

  ngOnInit(): void {
    this.authService.autoLogin();
    this.headerService.openSidebar.subscribe(data => {
      this.snav.toggle();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('click', this.mobileQueryListener);
  }
}
