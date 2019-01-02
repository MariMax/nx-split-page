import {Component} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NxSplitPageComponent, NxSplitPageWindowReferenceService} from './split-page.component';
import {NxSplitPageService} from './split-page.service';
import {DOCUMENT} from '@angular/common';

@Component({
  template: `
    <nx-split-page [storageSettingsKey]="splitViewStorageKey">
      <div main-area>
        <div class="main-area-slot"></div>
      </div>
      <div side-area>
        <div class="side-area-slot"></div>
      </div>
    </nx-split-page>
  `
})
class HostComponent {
  public splitViewStorageKey = 'key';
}

describe('SplitPageComponent', () => {
  let component: NxSplitPageComponent;
  let instance;
  let fixture: ComponentFixture<NxSplitPageComponent>;
  let splitPageService: NxSplitPageService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [NxSplitPageComponent, HostComponent],
      providers: [
        {
          provide: NxSplitPageService, useValue: {
            notify: () => null,
            getResizeObserver: () => null,
            restorePrevState: () => null,
          },
        },
        {provide: NxSplitPageWindowReferenceService, useValue: window},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NxSplitPageComponent);
    splitPageService = TestBed.get(NxSplitPageService);
    component = fixture.componentInstance;
    instance = component as any;
  });

  afterEach(() => fixture.destroy());

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(``, () => {

  });
});

describe('NxSplitPageComponent without SplitPageWindowReferenceService', () => {
  let component: NxSplitPageComponent;
  let instance;
  let fixture: ComponentFixture<NxSplitPageComponent>;
  let splitPageService: NxSplitPageService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [NxSplitPageComponent, HostComponent],
      providers: [
        {
          provide: NxSplitPageService, useValue: {
            notify: () => null,
            getResizeObserver: () => null,
            restorePrevState: () => null,
          },
        },
        {provide: DOCUMENT, useValue: document},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NxSplitPageComponent);
    splitPageService = TestBed.get(NxSplitPageService);
    component = fixture.componentInstance;
    instance = component as any;
  });

  afterEach(() => fixture.destroy());

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
