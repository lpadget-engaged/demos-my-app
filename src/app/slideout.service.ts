import {Type, Injectable, Injector, ComponentRef, ElementRef} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { SlideoutOverlayRef } from './slideout-overlay-ref';

export abstract class SlideoutObjectOut {
  public index: number;
  public abstract getObject(): any;
}
// export const slideoutClosedEventEmitter = new EventEmitter<SlideoutObjectOut>();

// export const slideoutOpenedEventEmitter = new EventEmitter<SlideoutObjectIn>();

export interface SlideoutObjectIn {
  index: number;
  type: Type<SlideoutObjectOut>;
}

interface SlideoutConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

@Injectable()
export class SlideoutService {

  constructor(
    private injector: Injector,
    private overlay: Overlay) { }

    public open(originElement: ElementRef, slideoutObjectIn: SlideoutObjectIn) {
      // Returns an OverlayRef which is a PortalHost
      const overlayRef = this.createOverlay(originElement);

      // Instantiate remote control
      const dialogRef = new SlideoutOverlayRef(overlayRef);

      const overlayComponent = this.attachDialogContainer(overlayRef, dialogRef, slideoutObjectIn);

      overlayRef.backdropClick().subscribe(_ => dialogRef.close());

      return dialogRef;
    }

  private createOverlay(originElement: ElementRef) {
    const config = this.getOverlayConfig(originElement, {
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      panelClass: 'dialog-panel'
    })
    return this.overlay.create(config);
  }

  private attachDialogContainer(overlayRef: OverlayRef, dialogRef: SlideoutOverlayRef, slideoutObjectIn: SlideoutObjectIn) {
    const injector = this.createInjector(dialogRef);

    const containerPortal = new ComponentPortal(slideoutObjectIn.type, null, injector);
    const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(dialogRef: SlideoutOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(SlideoutOverlayRef, dialogRef);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(originElement: ElementRef, config: SlideoutConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(originElement)
      .withPush(false)
      .withPositions([{
        overlayX: 'end',
        overlayY: 'top',
        originX: 'end',
        originY: 'top'
      }]);

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
