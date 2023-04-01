import gsap from "gsap";

/**
 *
 *
 *
 * @param element {any} element reference
 * @tl {number} timeline three
 * @delay {number} delay to() method
 * @y {string} position y in from() method
 *
 */

export function entryAnimation(
  element: any,
  tl: any = null,
  delay: number = 0,
  y: string = "100%"
): any {
  if (element) {
    const from = {
      y: y,
      opacity: 0,
    };
    const to = {
      y: 0,
      delay: delay,
      opacity: 1,
      ease: "ease-out",
      duration: 1.2,
    };

    if (tl === null) {
      tl = gsap.timeline();
    }

    return tl.fromTo(element, from, to);
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
