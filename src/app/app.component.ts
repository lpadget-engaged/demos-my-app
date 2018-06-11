import {Component, ElementRef, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {SlideoutService} from './slideout.service';
import { ProductCatalogComponent } from './product-catalog.component';
import {OtherThingComponent} from './other-thing.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('content') content: ElementRef;
  private index = 0;

  constructor(private breakpointObserver: BreakpointObserver, private slideoutService: SlideoutService) {}

  open1() {
    this.slideoutService.open(this.content, {type: ProductCatalogComponent, index: this.index});
  }

  open2() {
    this.slideoutService.open(this.content,{type: OtherThingComponent, index: this.index});
  }
}
