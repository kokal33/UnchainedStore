import { OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  private routerSubscription!: Subscription;

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  ngAfterViewInit(): void {
    // subscribe to router events and send page views to Google Analytics
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        gtag('config', 'UA-343565455–1', { 'page_path': event.urlAfterRedirects });
      });
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}


