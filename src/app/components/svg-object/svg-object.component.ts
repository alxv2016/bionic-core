import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

@Component({
  selector: 'c-svg-object',
  templateUrl: './svg-object.component.html',
  styleUrls: ['./svg-object.component.scss'],
})
export class SvgObjectComponent implements AfterViewInit {
  @HostBinding('class') class = 'c-svg-object';
  @ViewChild('glimmer') glimmer!: ElementRef;
  @ViewChild('core') core!: ElementRef;
  @ViewChildren('slice1', {read: ElementRef}) slice1!: QueryList<ElementRef>;
  @ViewChildren('slice2', {read: ElementRef}) slice2!: QueryList<ElementRef>;
  @ViewChildren('glitch', {read: ElementRef}) glitch!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {
    gsap.registerPlugin(ScrollTrigger);
  }

  private initGsap(): void {
    const slices1 = this.slice1.map((el) => el.nativeElement);
    const slices2 = this.slice2.map((el) => el.nativeElement);
    const glitch = this.glitch.map((el) => el.nativeElement);

    const core = gsap.timeline({
      defaults: {
        repeat: -1,
        yoyo: true,
      },
    });

    core
      .to(this.glimmer.nativeElement, {
        attr: {
          offset: 0.5,
        },
        duration: 0.95,
      })
      .to(
        this.core.nativeElement,
        {
          scale: 1.45,
          transformOrigin: 'center',
          ease: 'elastic',
          duration: 2.25,
        },
        0.125
      )
      .fromTo(
        glitch,
        {
          transformOrigin: 'center center',
          scaleX: 0.95,
          scaleY: 0.98,
          opacity: 0,
        },
        {
          transformOrigin: 'center center',
          scaleX: 1.0125,
          scaleY: 0.99,
          stagger: 0.175,
          opacity: 1,
          ease: 'elastic',
          duration: 2.25,
        },
        0
      );

    const slices = gsap.timeline({
      defaults: {
        ease: 'power2.inOut',
        duration: 1.95,
        repeat: -1,
      },
    });

    slices
      .to(slices1, {
        attr: {
          d: 'M230 393C139.978 393 67 320.022 67 230C67 139.978 139.978 67 230 67',
        },
        stagger: 0.175,
      })
      .to(
        slices2,
        {
          attr: {
            d: 'M230 393C320.022 393 393 320.022 393 230C393 139.978 320.022 67 230 67',
          },
          stagger: 0.175,
        },
        0
      );
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initGsap();
    });
  }
}
