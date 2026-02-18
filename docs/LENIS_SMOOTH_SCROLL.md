# Lenis Smooth Scroll Integration

This doc describes how to enable **Lenis** smooth scrolling so it works with GSAP ScrollTrigger and Framer Motion on the landing page.

## Why Lenis?

- **Unified scroll**: One smooth scroll driver for both GSAP (ScrollTrigger) and Framer Motion (`useScroll` / `useTransform`).
- **Less jank**: Native-like easing and momentum; ScrollTrigger and MotionValues stay in sync when you call `ScrollTrigger.update()` on Lenis scroll.

## Enable in the app

1. **Wrap the tree that should smooth-scroll** with `SmoothScrollProvider`:

   **Option A – whole app** (e.g. in `App.tsx`):

   ```tsx
   import { SmoothScrollProvider } from './shared/providers/SmoothScrollProvider';

   function App() {
     return (
       <Router>
         <SmoothScrollProvider>
           <div className="min-h-screen flex flex-col text-white">
             <AppRoutes />
           </div>
         </SmoothScrollProvider>
       </Router>
     );
   }
   ```

   **Option B – only landing** (e.g. in `LandingLayout.tsx`):

   ```tsx
   import { SmoothScrollProvider } from '../../../shared/providers/SmoothScrollProvider';

   const LandingLayout = () => (
     <SmoothScrollProvider>
       <div className="min-h-screen flex flex-col text-white">
         <main className="flex-1 min-h-0 w-full">
           <Outlet />
         </main>
         <Footer minimal={false} />
       </div>
     </SmoothScrollProvider>
   );
   ```

2. **Optional**: Disable for reduced motion or testing native scroll:

   ```tsx
   <SmoothScrollProvider enabled={false}>
     {children}
   </SmoothScrollProvider>
   ```

## How it syncs

- **Lenis** runs with `autoRaf: true` and drives the document scroll position.
- **ScrollTrigger**: `SmoothScrollProvider` calls `ScrollTrigger.update()` on Lenis `scroll` so all scrub/scroll-linked GSAP animations stay correct.
- **Framer Motion**: `useScroll()` and `useTransform()` read document scroll; because Lenis updates that scroll position, MotionValues stay in sync without extra code.

## Dependencies

- `lenis` is already installed.
- GSAP and ScrollTrigger are used elsewhere; the provider registers ScrollTrigger and only calls `ScrollTrigger.update()` when Lenis scrolls.

## Performance notes

- Keep GSAP animations to **transform** (x, y, rotation, scale) and **opacity** with `force3D: true` where applicable.
- Use **scrub: true** (or a number) on ScrollTrigger so scroll and animation are interpolated smoothly.
- Prefer **useScroll + useTransform** in Framer Motion for scroll-driven effects so updates don’t go through React’s render cycle.
