import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewChild,
  PLATFORM_ID,
} from '@angular/core';
import {ResizeParams, NxSplitPageService} from './split-page.service';
import {fromEvent, Subscription} from 'rxjs';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

export const NxSplitPageWindowReferenceService = new InjectionToken<Window>(
  'SplitPageWindowReferenceService',
);

@Component({
  selector: 'nx-split-page',
  templateUrl: './split-page.component.html',
  styleUrls: ['./split-page.component.scss'],
})
export class NxSplitPageComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('outer') outerContainer: ElementRef<HTMLDivElement>;
  @ViewChild('splitSeparator') splitSeparator: ElementRef<HTMLDivElement>;
  @ViewChild('primaryComponent') primaryComponent: ElementRef<HTMLDivElement>;
  @ViewChild('secondaryComponent') secondaryComponent: ElementRef<
    HTMLDivElement
  >;

  @Input() mainMinSize = 280;
  @Input() sideMinSize = 480;
  @Input() sideSize = '480px';
  @Input() hideSidebar: boolean;
  @Input() storageSettingsKey = '';

  /**
   * SliderMode is enabled if mainMinSize + sideMinSize more then container width
   */
  private sliderMode = false;
  private mainSlideActive = true;
  private dividerSize = 8;
  private subscription: Subscription;
  private windowResizeSubscription: Subscription;

  public get isSidePaneActive(): boolean {
    return this.sliderMode && this.mainSlideActive === false;
  }

  public get isSliderMode(): boolean {
    return this.sliderMode;
  }

  public get isSlpitHidden(): boolean {
    return this.sliderMode || this.hideSidebar;
  }

  public get isToggleHidden(): boolean {
    return !this.sliderMode || this.hideSidebar;
  }

  public get mainMinWidth(): string {
    return this.sliderMode ? '100%' : `${this.mainMinSize}px` || '280px';
  }

  public get sideMinWidth(): string {
    return this.sliderMode
      ? '100%'
      : this.hideSidebar
      ? '0'
      : `${this.sideMinSize}px`;
  }

  constructor(
    @Optional()
    @Inject(NxSplitPageWindowReferenceService)
    private readonly windowRef,
    @Inject(DOCUMENT) private documentRef,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private splitPageService: NxSplitPageService,
    private changeDetector: ChangeDetectorRef,
  ) {
    if (!this.windowRef) {
      this.windowRef =
        (isPlatformBrowser(this.platformId) && window) || ([] as any);
    }

    this.removeSelectionClass = this.removeSelectionClass.bind(this);
  }

  ngOnInit() {
    this.applySizeChange(this.initialSize());
    this.checkMode();
    this.subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.windowResizeSubscription) {
      this.windowResizeSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hideSidebar && !changes.hideSidebar.isFirstChange()) {
      this.applySizeChange(this.initialSize());
      if (this.sliderMode) {
        // Open sidebar in sliderMode hideSidebar has changed
        this.mainSlideActive = this.hideSidebar;
      }
    }
  }

  /**
   * returns left offset for side pane(i.e width of main section)
   */
  private initialSize(): number {
    const sideSize = parseInt(this.sideSize, 10);
    const total = this.totalSize;
    const sizeFromStorage = this.splitPageService.restorePrevState(
      this.storageSettingsKey,
    );

    if (sizeFromStorage) {
      return sizeFromStorage.main;
    }

    return this.sideSize.includes('%')
      ? total - (total * sideSize) / 100
      : total - sideSize;
  }

  private subscribe() {
    const mouseup = fromEvent(this.documentRef, 'mouseup').pipe(
      tap(this.removeSelectionClass),
    );
    const mousemove = fromEvent(this.documentRef, 'mousemove').pipe(
      takeUntil(mouseup),
    );
    this.subscription = fromEvent(
      this.splitSeparator.nativeElement,
      'mousedown',
    )
      .pipe(switchMap(() => mousemove))
      .subscribe((event: MouseEvent) => {
        this.addSelectionClass();
        this.applySizeChange(event.pageX - this.getLeftCoordinate());
      });

    this.windowResizeSubscription = fromEvent(
      this.windowRef,
      'resize',
    ).subscribe(() => this.checkMode());
  }

  private checkMode() {
    const newMode = this.totalSize <= this.mainMinSize + this.sideMinSize;
    if (this.sliderMode === newMode) {
      return;
    }
    this.sliderMode = newMode;
    this.applySizeChange(newMode ? 0 : this.initialSize());
    this.changeDetector.detectChanges();
  }

  private removeSelectionClass() {
    this.outerContainer.nativeElement.classList.remove('disable-selection');
  }

  private addSelectionClass() {
    this.outerContainer.nativeElement.classList.add('disable-selection');
  }

  private getAvailableSize(): number {
    return this.totalSize - this.dividerSize;
  }

  private applySizeChange(size: number) {
    const primarySize = this.checkValidBounds(
      size,
      this.mainMinSize,
      this.getAvailableSize() - this.sideMinSize,
    );
    this.dividerPosition(primarySize);
    const resizeParams: ResizeParams = {
      main: this.primarySize,
      side: this.secondarySize,
    };
    this.splitPageService.notify(resizeParams, this.storageSettingsKey);
  }

  public toggleSlide() {
    this.mainSlideActive = !this.mainSlideActive;
  }

  private checkValidBounds(
    newSize: number,
    minSize: number,
    maxSize: number,
  ): number {
    return newSize >= minSize
      ? newSize <= maxSize
        ? newSize
        : maxSize
      : minSize;
  }

  private get totalSize(): number {
    return this.outerContainer.nativeElement.offsetWidth;
  }

  private get primarySize(): number {
    return this.primaryComponent.nativeElement.offsetWidth;
  }

  private get secondarySize(): number {
    return this.secondaryComponent.nativeElement.offsetWidth;
  }

  private dividerPosition(size: number) {
    if (this.hideSidebar) {
      this.primaryComponent.nativeElement.style.flexBasis = '100%';
      this.secondaryComponent.nativeElement.style.flexBasis = '0%';
      return;
    }
    if (this.sliderMode) {
      this.primaryComponent.nativeElement.style.flexBasis = '100%';
      this.secondaryComponent.nativeElement.style.flexBasis = '100%';
      return;
    }
    const total = this.totalSize;
    const sizePct = (size / total) * 100;
    this.primaryComponent.nativeElement.style.flexBasis = `${sizePct}%`;
    this.secondaryComponent.nativeElement.style.flexBasis = `${((total -
      size -
      this.dividerSize) /
      total) *
      100}%`; // calc(${100 - sizePct}% - ${this.dividerSize}px)`;
  }

  private getLeftCoordinate(): number {
    const boundingClientRect = this.primaryComponent.nativeElement.getBoundingClientRect();
    return (
      boundingClientRect.left +
      (this.windowRef.pageXOffset ||
        this.documentRef.documentElement.scrollLeft)
    );
  }
}
