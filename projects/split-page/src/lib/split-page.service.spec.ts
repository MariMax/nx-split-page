import {async, TestBed} from '@angular/core/testing';
import {
  ResizeParams,
  NxSplitPageLocalStorageService,
  NxSplitPageService,
} from './split-page.service';

describe('Service: Split Page', () => {
  let storageService: Storage;
  let serviceForTests: NxSplitPageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NxSplitPageLocalStorageService,
          useValue: {getItem: () => null, setItem: () => null},
        },
      ],
    });
  }));

  beforeEach(() => {
    storageService = TestBed.get(NxSplitPageLocalStorageService);
    serviceForTests = TestBed.get(NxSplitPageService);
  });

  it('should be initialized', () => {
    expect(serviceForTests).toBeDefined();
  });

  it('it should be possible to subscribe on changes', () => {
    const s = serviceForTests.getResizeObserver().subscribe(() => null);
    expect(s.unsubscribe).toBeDefined();
  });

  it(`on changes service should notify all subscribers ans attempt to store changes into LS, if key provided`, () => {
    const expectedResizeParams: ResizeParams = {main: 250, side: 300};
    let realResizeParams: ResizeParams = null;
    const handler = (changes: ResizeParams) => (realResizeParams = changes);
    serviceForTests.getResizeObserver().subscribe(handler);
    serviceForTests.notify(expectedResizeParams, '');
    expect(realResizeParams).toEqual(expectedResizeParams);

    spyOn(storageService, 'setItem');
    serviceForTests.notify(expectedResizeParams, 'key');
    expect(realResizeParams).toEqual(expectedResizeParams);
    expect(storageService.setItem).toHaveBeenCalledWith(
      'key',
      `${expectedResizeParams.main}|${expectedResizeParams.side}`,
    );
  });

  it(`restore prev state should return state from LS or null if key is not provided`, () => {
    const expectedResizeParams: ResizeParams = {main: 250, side: 300};
    let realResizeParams: ResizeParams;

    const getKeyValueSpy = spyOn(storageService, 'getItem').and.returnValue(
      null,
    );
    realResizeParams = serviceForTests.restorePrevState('key');
    expect(realResizeParams).toBeNull();
    getKeyValueSpy.and.returnValue(
      `${expectedResizeParams.main}|${expectedResizeParams.side}`,
    );
    realResizeParams = serviceForTests.restorePrevState('key');
    expect(realResizeParams).toEqual(expectedResizeParams);
    realResizeParams = serviceForTests.restorePrevState('');
    expect(realResizeParams).toBeNull();
  });

  it(`should not fail the app on attempt to write with error`, () => {
    const expectedResizeParams: ResizeParams = {main: 250, side: 300};
    spyOn(storageService, 'setItem').and.throwError('fail');
    const test = () => serviceForTests.notify(expectedResizeParams, 'key');
    expect(test).not.toThrow();
  });

  it(`should not fail the app on attempt to read with error`, () => {
    const getKeyValueSpy = spyOn(storageService, 'getItem').and.throwError(
      'fail',
    );
    const realResizeParams = serviceForTests.restorePrevState('key');
    expect(getKeyValueSpy).toHaveBeenCalled();
    expect(realResizeParams).toBeNull();
  });
});

describe('Service: Split Page without LocalStorage dependency', () => {
  let serviceForTests: NxSplitPageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: NxSplitPageLocalStorageService, useValue: null}],
    });
  }));

  beforeEach(() => {
    serviceForTests = TestBed.get(NxSplitPageService);
  });

  it('should be initialized', () => {
    expect(serviceForTests).toBeDefined();
    const instance = serviceForTests as any;
    expect(instance.localStorageService).toBe(localStorage);
  });
});
