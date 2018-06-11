import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FullscreenOverlayContainer, OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {ProductCatalogComponent} from './product-catalog.component';
import {SlideoutService} from './slideout.service';
import {OtherThingComponent} from './other-thing.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCatalogComponent,
    OtherThingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    OverlayModule
  ],
  providers: [
    SlideoutService,
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProductCatalogComponent,
    OtherThingComponent
  ]
})
export class AppModule { }
