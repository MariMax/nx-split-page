### Slider can save divider's position into any storage you wish

you will only need to tell it where you wish to store it via providers
```
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxSplitPageModule,
  ],
  providers: [
    {
      provide: NxSplitPageLocalStorageService,
      useValue: sessionStorage,
    },
  ]
})
export class AppModule {
}

```

after that nx-split-page will store divider's position into session storage, there could any other storage instead of session storage or local storage, it should simply implement `Storage` interface

```
interface Storage {
  readonly length: number
  clear(): void
  getItem(key: string): string | null
  key(index: number): string | null
  removeItem(key: string): void
  setItem(key: string, data: string): void
  [key: string]: any
  [index: number]: string
}

```

#### Tempalte for this example looks like code below

```
<style>
  .red {
    background-color: #D13A32;
    color: white;
    padding: 1em;
    border-left: 1px solid gray;
  }
  .blue {
    background-color: #0460a9;
    color: white;
    padding: 1em;
    border-right: 1px solid gray;
  }
</style>
<nx-split-page storageSettingsKey="sessionStorageKey" [mainMinSize]="100" [sideMinSize]="50">
  <div main-area class="blue">
    content for main section
  </div>
  <div side-area class="red">
    content for side pane
  </div>
</nx-split-page>

```
