/** Lazily load GSAP + ScrollTrigger so they stay out of the initial bundle. */
export async function loadGsap() {
  const [gsapMod, stMod] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  const gsap = gsapMod.default ?? gsapMod;
  const ScrollTrigger = stMod.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}
