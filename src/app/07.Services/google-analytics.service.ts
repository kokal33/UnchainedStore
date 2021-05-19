import { Injectable } from '@angular/core';
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})

export class GoogleAnalyticsService {

  constructor() { }

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventLabel: string = '',
    itemId: string) {
    gtag('event', eventName, {
      'event_category': eventCategory,
      'event_label': eventLabel,
      'item_id': itemId
    });
  }
}
