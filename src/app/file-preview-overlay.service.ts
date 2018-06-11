import {Injectable, Inject, OnInit, Injector, ComponentRef, ElementRef} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { FilePreviewOverlayComponent } from './file-preview-overlay.component';

import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';

export interface Image {
  name: string;
  url: string;
}

interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  image?: Image;
}

@Injectable()
export class FilePreviewOverlayService {

  constructor(
    private injector: Injector,
    private overlay: Overlay) { }

    open(originElement: ElementRef) {
      // Override default configuration
      let dialogConfig: FilePreviewDialogConfig;
      dialogConfig = {
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        panelClass: 'tm-file-preview-dialog-panel',
        image: null
      }

      // Returns an OverlayRef which is a PortalHost
      const overlayRef = this.createOverlay(originElement, dialogConfig);

      // Instantiate remote control
      const dialogRef = new FilePreviewOverlayRef(overlayRef);

      const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

      overlayRef.backdropClick().subscribe(_ => dialogRef.close());

      return dialogRef;
    }

  private createOverlay(originElement: ElementRef, config: FilePreviewDialogConfig) {
      const overlayConfig = this.getOverlayConfig(originElement, config);
      return this.overlay.create(overlayConfig);
    }

  private attachDialogContainer(overlayRef: OverlayRef, config: FilePreviewDialogConfig, dialogRef: FilePreviewOverlayRef) {
      const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(FilePreviewOverlayComponent, null, injector);
    const containerRef: ComponentRef<FilePreviewOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(config: FilePreviewDialogConfig, dialogRef: FilePreviewOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(FilePreviewOverlayRef, dialogRef);
    injectionTokens.set(FILE_PREVIEW_DIALOG_DATA, config.image);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(originElement: ElementRef, config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(originElement)
      .withPositions([{
        overlayX: 'start',
        overlayY: 'top',
        originX: 'start',
        originY: 'top'
      }]);

    // console.log(positionStrategy['_overlayRect']);

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
