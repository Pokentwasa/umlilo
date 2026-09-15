"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
}

/** Media-query key used consistently with gsap.matchMedia() across
 * components so motion-heavy timelines only ever run for visitors
 * who haven't asked for reduced motion, and pinned/horizontal
 * ScrollTriggers only ever run above the mobile breakpoint. */
export const MQ = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px)",
} as const;

export { gsap, ScrollTrigger, Draggable };
