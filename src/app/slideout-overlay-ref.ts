import { OverlayRef } from '@angular/cdk/overlay';

export class SlideoutOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
