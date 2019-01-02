import {Inject, Injectable, InjectionToken, Optional, PLATFORM_ID} from '@angular/core';
import {Subject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

export const NxSplitPageLocalStorageService = new InjectionToken('SplitPageLocalStorageService');

export interface ResizeParams {
  main: number;
  side: number;
}

@Injectable({
  providedIn: 'root'
})
export class NxSplitPageService {
  private resizeSubject$ = new Subject<ResizeParams>();

  constructor(@Optional() @Inject(NxSplitPageLocalStorageService) private readonly localStorageService,
              @Inject(PLATFORM_ID) private readonly platformId: Object) {
    if (!this.localStorageService && isPlatformBrowser(this.platformId)) {
      this.localStorageService = localStorage;
    }
  }

  public notify(data: ResizeParams, key: string) {
    this.resizeSubject$.next(data);
    if (key) {
      try {
        this.localStorageService.setItem(key, `${data.main}|${data.side}`);
      } catch (e) {
      }
    }
  }

  public getResizeObserver() {
    return this.resizeSubject$.asObservable();
  }

  public restorePrevState(key: string): ResizeParams | null {
    if (key) {
      try {
        const data = this.localStorageService.getItem(key);
        if (data && typeof data === 'string' && data.split('|').length === 2) {
          return {main: parseInt(data.split('|')[0], 10), side: parseInt(data.split('|')[1], 10)};
        }
      } catch (e) {
      }
    }
    return null;
  }
}
