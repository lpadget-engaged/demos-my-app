import { Component } from '@angular/core';
import {SlideoutObjectOut} from './slideout.service';

@Component({
  selector: 'et-other-thing',
  template: `
    <div class="overlay-content">
      I'm an other thing component!<br>
      <img src="https://openclipart.org/image/90px/svg_to_png/302937/1528405729.png">
    </div>
  `,
  styles: [`
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
