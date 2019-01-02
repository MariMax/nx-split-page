import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NxSplitPageModule} from 'nx-split-page';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NxSplitPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
