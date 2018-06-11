import { Component } from '@angular/core';
import {SlideoutObjectOut} from './slideout.service';

@Component({
  selector: 'et-other-thing',
  template: `
    <div class="overlay-content">
      <img src="https://openclipart.org/image/90px/svg_to_png/302937/1528405729.png">
    </div>
  `,
  styles: [`

    img {
      width: 100%;
      max-width: 500px;
    }

    .overlay-content {
      border: 1px deepskyblue solid;
      margin:0;
      padding:0;
    }
  `]
})
export class OtherThingComponent implements SlideoutObjectOut {

  constructor() { }

  public index = 0;

  getObject(): any {
    return {};
  }
}
