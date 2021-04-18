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
  @ViewChild('circle') circle!: ElementRef;
  @ViewChild('core') core!: ElementRef;
  @ViewChild('reactorCore') reactorCore!: ElementRef;
  @ViewChildren('svgPath', {read: ElementRef}) svgPath!: QueryList<ElementRef>;
  @ViewChildren('svgPath2', {read: ElementRef}) svgPath2!: QueryList<ElementRef>;
  @ViewChildren('svgPath3', {read: ElementRef}) svgPath3!: QueryList<ElementRef>;
  @ViewChildren('svgPath4', {read: ElementRef}) svgPath4!: QueryList<ElementRef>;
  @ViewChildren('grads', {read: ElementRef}) grads!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const svgPaths = this.svgPath.map((cir) => cir.nativeElement);
      const svgPaths2 = this.svgPath2.map((cir) => cir.nativeElement);
      const svgPaths3 = this.svgPath3.map((cir) => cir.nativeElement);
      const svgPaths4 = this.svgPath4.map((cir) => cir.nativeElement);

      gsap.from(this.reactorCore.nativeElement, {
        transformOrigin: '50% 50%',
        scale: 1.45,
        duration: 2,
        ease: 'back',
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
      });

      gsap.to(this.core.nativeElement, {
        attr: {
          offset: 0.11,
        },
        repeat: -1,
        ease: 'back',
        yoyo: true,
      });

      const rotator = gsap.timeline({
        defaults: {
          duration: 3,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
        },
      });

      rotator
        .to(this.circle.nativeElement, {
          rotate: 95,
        })
        .to(this.circle.nativeElement, {
          rotate: 0,
        })
        .to(this.circle.nativeElement, {
          rotate: -180,
        });

      const staggering = gsap.timeline({
        defaults: {
          transformOrigin: '50% 50%',
          ease: 'power2.inOut',
          duration: 0.75,
          repeat: -1,
          stagger: 0.0125,
          yoyo: true,
        },
      });

      staggering
        .to(svgPaths, {
          attr: {
            d: 'M350 241C350 300.923 301.423 349.5 241.5 349.5C181.577 349.5 133 300.923 133 241',
          },
        })
        .to(
          svgPaths4,
          {
            attr: {
              d: 'M426 241C426 343.173 343.173 426 241 426C138.827 426 56 343.173 56 241',
            },
          },
          0.25
        )
        .to(
          svgPaths2,
          {
            attr: {
              d: 'M350 240.5C350 180.577 301.423 132 241.5 132C181.577 132 133 180.577 133 240.5',
            },
          },
          0.025
        )
        .to(
          svgPaths3,
          {
            attr: {
              d: 'M426 241C426 138.827 343.173 56 241 56C138.827 56 56 138.827 56 241',
            },
          },
          0.275
        );
    });
  }
}
