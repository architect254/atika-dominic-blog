import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { environment } from '../../environments/environment';

import { Location } from './location';

@Injectable({
  providedIn: 'root',
})
export class LocationService implements OnDestroy {
  BASE_URL: string = `${environment.apiUrl}`;

  $location: BehaviorSubject<Location | null> =
    new BehaviorSubject<Location | null>(null);

  $subscriptions$: Subscription = new Subscription();

  constructor(public http: HttpClient) {}

  get selectedLocation$(): Observable<Location | null> {
    return this.$location.asObservable();
  }

  set selectedLocation(location: Location) {
    this.$location.next(location);
  }

  ngOnDestroy(): void {
    if (this.$subscriptions$) {
      this.$subscriptions$.unsubscribe();
    }
  }
}
