import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FullscreenOverlayContainer, OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {FilePreviewOverlayComponent} from './file-preview-overlay.component';
import {FilePreviewOverlayService} from './file-preview-overlay.service';

@NgModule({
  declarations: [
    AppComponent,
    FilePreviewOverlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    OverlayModule
  ],
  providers: [
    FilePreviewOverlayService,
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FilePreviewOverlayComponent
  ]
})
export class AppModule { }
