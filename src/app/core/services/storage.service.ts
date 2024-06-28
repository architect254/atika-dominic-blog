import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorage = this.document.defaultView?.localStorage;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setItem(key: string, value: string) {
    this.localStorage?.setItem(key, value);
  }

  getItem(key: string) {
    return this.localStorage?.getItem(key);
  }

  removeItem(key: string) {
    this.localStorage?.removeItem(key);
  }

  clear() {
    this.localStorage?.clear();
  }
}
