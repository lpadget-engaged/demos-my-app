import { Component, Input, Inject } from '@angular/core';

import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';

@Component({
  selector: 'app-file-preview-overlay',
  template: `
    <div class="overlay-content">
      <img src="https://openclipart.org/image/90px/svg_to_png/216413/coniglio_rabbit_small.png">
    </div>
  `,
  styles: [`

    img {
      width: 100%;
      max-width: 500px;
    }

    .overlay-content {
      background-color: orange;
      border: 1px red solid;
      margin:0;
      padding:0;
      height:100%;
    }
  `]
})
export class FilePreviewOverlayComponent {

  constructor(
    public dialogRef: FilePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public image: any) { }
}
