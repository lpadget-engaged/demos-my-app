import { Component } from '@angular/core';
import {SlideoutObjectOut} from './slideout.service';

@Component({
  selector: 'et-product-catalog',
  template: `
    <div class="overlay-content">
      I'm a product catalog component!<br>
      <img src="https://openclipart.org/image/90px/svg_to_png/216413/coniglio_rabbit_small.png">
    </div>
  `,
  styles: [`
    .overlay-content {
      border: 1px red solid;
      margin:0;
      padding:0;
    }
  `]
})
export class ProductCatalogComponent implements SlideoutObjectOut {

  constructor() { }

  public index = 0;

  getObject(): any {
    return {};
  }
}
