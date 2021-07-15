import { OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getBiconomy } from './07.Services/web3Service';

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
    const biconomy = getBiconomy();
    biconomy.onEvent(biconomy.READY, () => {
      console.log("Biconomy initialized");
    }).onEvent(biconomy.ERROR, (error, message) => {
      console.log("Error init Biconomy: ", message);
    });
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


