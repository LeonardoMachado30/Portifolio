import gsap from "gsap";

export function buttonAnimation(element: any, scale: number) {
  const to = {
    scale: scale,
    duration: 0.2,
    ease: "ease-in-out",
  };

  gsap.to(element, to);
}
