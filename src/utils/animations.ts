import gsap from "gsap";

export function entryAnimation(element: any): void {
    console.log(element)
    console.log("animation")
    if (element) {
        const tl = gsap.timeline();
        const from = {
            x: "-100%",
            opacity: 0,
            ease: "ease-in-out",
        };
        const to = {
            x: 0,
            delay: 0.1,
            opacity: 1,
            ease: "ease-out",
            duration: 1,
        };

        tl.fromTo(element, from, to);
    }
}