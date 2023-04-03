import { gsap } from "gsap";

interface IPositionY {
  from?: string | number;
  to?: string | number;
}
/**
 * @param element {any} element reference
 * @param tl {number} timeline three
 * @param IPositionY from: string | number  - to: string | number
 * @param delay {number} delay to() method
 * @param durantion number
 */
export function animationSlider(
  element: any,
  tl: gsap.core.Timeline = null,
  y: IPositionY = {
    from: 0,
    to: 0,
  },
  delay: number = 0.4,
  durantion: number = 0.8
): any {
  if (element) {
    if (tl === null) {
      tl = gsap.timeline();
    }
    return tl.fromTo(
      element,
      {
        y: y.from,
        opacity: y.from === 0 ? 1 : 0,
      },
      {
        y: y.to,
        delay: delay,
        opacity: y.to === 0 ? 1 : 0,
        ease: "ease-out",
        duration: durantion,
        stagger: 2000,
      }
    );
  }
}

export function buttonAnimation(element: any, scale: number) {
  const to = {
    scale: scale,
    duration: 0.2,
    ease: "ease-in-out",
  };

  gsap.to(element, to);
}
