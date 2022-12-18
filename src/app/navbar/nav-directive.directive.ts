import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appNavDirective]',
})
export class NavDirectiveDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostBinding('style.width') width: string = '0px';

  @HostListener('mouseenter') mpuseenter() {
    this.width = '250px';
  }
  @HostListener('mouseleave') mouseleave() {
    this.width = '0px';
  }
}
