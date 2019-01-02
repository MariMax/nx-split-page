## Project setup

```
npm i nx-split-page
```

## Basic usage example

### Add module into your app

```
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxSplitPageModule,
  ],
})
export class AppModule {
}

```

### Add murkup to the template file

```
<nx-split-page>
  <div main-area>
    main content goes here
  </div>
  <div side-area>
    page sige content goes here
  </div>
</nx-split-page>
```

### Tempalte for this example looks like code below

```
<style>
.long-content {
  background-color: #D13A32;
  min-height: 500px;
  width: 100%;
}
.short-content {
  background-color: #0460a9;
  height: 100px;
  width: 100%;
}
</style>
<nx-split-page [mainMinSize]="100" [sideMinSize]="50">
  <div main-area class="long-content">
  </div>
  <div side-area class="short-content">
  </div>
</nx-split-page>

```
