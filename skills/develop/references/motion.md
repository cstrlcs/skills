# Motion

Apply this guidance when adding or changing animation, transitions, or a custom pointer gesture (drag, swipe, custom slider). On iOS and Android, [native UI](native-ui.md) sets the platform motion; the reduced-motion, interruption, and cost rules here still apply. When the project defines duration or easing tokens or a motion library, use them and fill only the gaps from this file; when it has none, add the curves below as tokens. Take curves, durations, and springs from here or the project rather than memory, because a value that only looks familiar is usually weaker.

## Whether to animate

Decide by how often one person sees the motion, before choosing any value:

| How often | Motion |
|---|---|
| 100+ times a day: keyboard shortcuts, command palette, focus jumps | none |
| Tens of times a day: hover, list navigation, frequent toggles | none, or fast and barely visible |
| Occasionally: modals, drawers, toasts, menus | standard |
| Rarely or once: onboarding, a first success, a milestone | where delight belongs |

Anything started from a keyboard shortcut opens and closes instantly, because it repeats all day and any motion makes it feel slower than the keystroke.

Then name the purpose: feedback (the interface heard the action), spatial consistency (where something came from or went), state indication, preventing a jarring change (content that would otherwise teleport), explanation (showing how a feature works, on marketing or onboarding), or delight (rare moments only). Data the user is reading or acting on holds still. An element that fails either test gets an instant state change, and the report says why; producing no animation is a valid result.

The surface decides how much motion it carries:

- Operate and Read surfaces (apps, dashboards, settings, docs): the frequency table decides. A screen people open daily loads straight into the task, because they arrive to work and choreography reads as delay; a group they see only occasionally may stagger in.
- Persuade and Experience surfaces (landing pages, portfolios, campaigns): a visitor sees them rarely, so they hold the delight and explanation budget. Give the page an orchestrated first-load sequence built from this product's subject, carrying one material idea, ideally showing the product working. Sections may reveal on scroll, each firing once, because re-animating on every scroll-by fights the reader.

Match motion to the product's personality: a dashboard stays crisp and fast, a playful consumer product can run softer, and every component in one product draws on the same tokens.

## Timing and easing

| Motion | Curve |
|---|---|
| Entering or exiting, and the default | `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` |
| Moving or morphing while on screen | `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` |
| Drawers and sheets | `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` |
| Hover and color change | `ease` |
| Constant motion and progress (marquee, hold-to-confirm fill) | `linear` |

A strong ease-out covers most of the distance in the first frames, so 200 ms of it feels faster than 200 ms of a curve that starts slow, and the built-in `ease-out` is too weak to read as deliberate. Progress runs linear because progress should not ease.

| Element | Duration |
|---|---|
| Press feedback | 100–160 ms |
| Tooltip, small popover | 125–200 ms |
| Dropdown, select, menu | 150–250 ms |
| Modal, drawer, sheet | 200–500 ms |
| Layout change, view transition | 150–250 ms |
| Marketing and explanatory motion, the first-load sequence | longer, about 500–1000 ms |

Interface motion stays under 300 ms unless something gives it a reason: a 180 ms dropdown feels more responsive than a 400 ms one. The reasons are distance (a drawer crossing the screen) and a component's tuned personality (the toast below).

Use a spring for anything the user can grab, throw, or reverse mid-motion, and for decorative pointer-following, because a spring starts from the current value and keeps its velocity when retargeted. Default to critically damped, `{ type: "spring", duration: 0.4, bounce: 0 }` in Motion, setting `bounce` explicitly because Motion defaults to 0.25. Add bounce (0.1–0.3, such as `bounce: 0.2, duration: 0.5`) only after a gesture that carried momentum, such as a flick or drag release, or in a playful product. Menus, overlays, and content that simply appear settle without overshoot, because overshoot with no throw behind it reads as a wobble.

## Components

| Component | Motion |
|---|---|
| Anything pressable | `:active` to `scale(0.97)`, 160 ms `--ease-out`, applied on pointer-down |
| Popover, dropdown, menu | from `scale(0.95)` and opacity 0, 200 ms, from the trigger |
| Tooltip | from `scale(0.97)` and opacity 0, 125 ms, from the trigger; once one is open, neighbors open with no delay and no animation (`[data-instant]` in Base UI) |
| Modal | from `scale(0.96)` and opacity 0, 250 ms, centered; the backdrop fades on the same timing |
| Drawer, sheet | from `translateY(100%)`, 500 ms `--ease-drawer` |
| Toast | from `translateY(100%)` and opacity 0, 400 ms `ease`, by transition; it leaves through the edge it entered |
| Accordion | height and opacity, 200 ms, to a measured height (or the one the headless primitive supplies) |
| Hold to confirm | `clip-path` fill, 2 s `linear` while pressed, 200 ms `--ease-out` back on release |

When the task needs a component (a toast, drawer, command menu, or dropdown) and the project has a component library, build on it rather than hand-rolling one, because a hand-rolled one also loses focus management. Enter a native `<dialog>` or popover with `@starting-style`, placed after the open-state rule, and keep it rendered through its exit by transitioning `display` and `overlay` with `allow-discrete`; Base UI's `data-starting-style` and `data-ending-style` do the same job. Gate hover-triggered motion behind `@media (hover: hover) and (pointer: fine)`, because touch fires a hover on tap and leaves it stuck; Tailwind's `hover:` variant already applies the `hover` half.

## Enter and exit

- Scale entrances start near full size, as in the table, because nothing real appears from a point. An in-place entrance such as a list item travels about 8px.
- Something entering from an edge moves by its own size with a percentage, such as `translateY(100%)`, so content of unknown height needs no measuring.
- Anchor popovers, menus, and tooltips to their trigger with `transform-origin` (`var(--transform-origin)` in Base UI), so the panel visibly comes out of what was clicked. Modals are not anchored and stay centered.
- Exit along the path of entry: a toast that rose from the bottom leaves through the bottom, which makes the dismiss direction obvious.
- Make timing asymmetric where the user is deciding: slow on the deliberate phase (a hold), snappy on the system's response (the release). A system-triggered entrance and exit can share one timing.

Stagger only items entering together as a group the user sees occasionally, 30–80 ms apart, with the last starting within about 300 ms of the first, and keep every item interactive while it plays. Scrolled sections are not a group.

## Entry states

Content is visible at rest without script: the hidden starting point lives only inside the CSS that plays the entrance, so a page whose script fails or has not run yet, a crawler, print, and a full-page capture all show everything. Build entrances in CSS rather than script:

- Enter on mount with `@starting-style`.
- A scroll reveal, on marketing surfaces only, is a scroll-driven animation inside `@supports (animation-timeline: view())`: keyframes from `clip-path: inset(0 0 100% 0)` to `inset(0 0 0 0)` with `--ease-in-out`, `animation-fill-mode: both`, `animation-timeline: view()`, and `animation-range: entry 0% entry 60%`. Browsers without scroll-driven animations (Firefox, as of 2026) show the section static, which is the intended fallback. It replays in reverse when the reader scrolls back, the price of needing no script.
- A first-load sequence or a staggered group is a CSS animation with `animation-fill-mode: both` and per-item `animation-delay`, starting at opacity 0 and about 8px down, and finishing within about 1 s so nothing in the first viewport waits on it.

Hiding content with a class that script later removes, or revealing it from an `IntersectionObserver`, leaves it invisible whenever the script fails or never fires; use script only for motion CSS cannot express, never to make content visible.

## Properties and cost

Animate `transform` and `opacity`; anything else needs a reason they cannot provide, because paint properties (`box-shadow`, `border-radius`, `color`) redraw every frame and layout properties (size, padding, margin, offsets) re-measure the page. When a cheaper property gives the same picture, use it even if the expensive one looks smooth on a fast machine: `scale()` for size, `translate()` for offsets and margins, `opacity` for visibility swaps, `filter: drop-shadow()` for a shadow. Layout animation also shoves its neighbors, so a sidebar animating its margin re-lays out the page beside it every frame; the short accordion is the exception. Use `clip-path` for reveals (tab indicators, hold-to-confirm, image reveals). Keep animated blur under 20px, 2–5px when masking a crossfade that shows both states at once, and keep blur, `backdrop-filter`, canvas, and shader work on small, isolated regions. Name each transitioned property, because a catch-all transition also animates layout properties that change later.

CSS and the Web Animations API can run off the main thread; `requestAnimationFrame` animation, including Motion components, cannot. Put motion that plays while the page is busy (a route change, data fetching, hydration) in CSS or the Web Animations API, and in Motion switch the `x`, `y`, and `scale` shorthands, which run through CSS variables, to a full `transform` string there.

Write per-frame values to the moving element's own `transform`, through its style or a motion value: a CSS variable on a parent recalculates style for every descendant, slowing as content grows, and component state re-renders every frame.

Add `will-change: transform` only on the animating element, after seeing a one-pixel shift at the start or end of a motion or measuring dropped frames, or on a large blurred element; browsers already promote `transform` and `opacity` animations, and each extra layer costs GPU memory.

Use the cheapest tool that works: a CSS transition, `@starting-style` for entry, a CSS animation for predetermined motion under load, the Web Animations API for programmatic control, then the project's motion library for springs, layout animation, exits of unmounted elements, and gestures. For continuity between states or views, use shared-element motion, FLIP, or View Transitions. Add a dependency only when none of these can express the effect.

For an ambitious effect (WebGL, WebGPU, shaders, scroll-driven animation, heavy canvas), choose the smallest technique that produces it, check current browser support in the docs rather than memory, ship it behind feature detection with a fallback that leaves the experience complete, and initialize heavy resources only near the viewport. Exercise the real interaction, capture its representative states, profile the expensive path, and fix what you find in one batch.

Judge cost on a mid-range phone, where 120 Hz leaves 8 ms per frame; a fast laptop hides most problems, and CPU throttling models a slow CPU, not a weak GPU. Confirm with a Performance recording, and say which findings come from code and which need a device.

Pause loops, canvases, video, animation frames, and auto-dismiss timers such as a toast's when they are offscreen or the page is hidden, and release their listeners, observers, timers, and frame callbacks on unmount.

## Interruption

When a state reverses mid-flight, the animation retargets from its current value instead of restarting or queuing, and input stays live throughout. Use CSS transitions for anything a user can fire twice in a second (toasts, toggles, hover, open and close), because they retarget from the current value while keyframes restart from zero; keep keyframe animations for one-way sequences. Drive gestures with springs, because a transition retargets but drops the velocity. Check by triggering a hover, toggle, or open and close repeatedly and fast.

## Reduced motion and control

Ship the reduced-motion variant with each animation. Under `prefers-reduced-motion: reduce`, replace movement (translation, scaling, parallax, zoom, scroll-linked motion, smooth scrolling, overshoot) with a short opacity crossfade, about 200 ms, and keep the color and opacity transitions that aid comprehension. Reduced motion means fewer and gentler animations, not none, so a global rule that collapses every duration to zero misreads it.

Nothing flashes more than three times per second (WCAG 2.3.1), and no animation delays focus, reading, or completing the task. Anything that starts on its own beside other content and either moves, blinks, or scrolls for more than five seconds or auto-updates gets a pause, stop, or hide control; an auto-update may instead let the user set its frequency (WCAG 2.2.2). Play sound only after the user opts in, fire it on the same frame as the visual it accompanies, honor mute and autoplay settings, and keep the muted path complete.

## Gestures

For custom sliders, drag surfaces, swipe carousels, and scrollable control strips built on pointer events. A carousel that can be native scroll uses `scroll-snap-type` instead, because the browser's own physics beat a hand-rolled spring.

- Listen to pointer events, not mouse-only events. Set `touch-action` to what the browser may still do: `pan-y` on a horizontal carousel, `pan-x` on a vertical sheet handle, `none` on a surface whose gesture owns every axis, such as a drag-to-dismiss sheet or a slider. Anything the user needs to scroll past keeps `pan-x` or `pan-y`.
- On `pointerdown`, capture the pointer, record its `pointerId`, and ignore any second pointer that lands during the drag. Record where the pointer grabbed the element so it does not jump to the pointer, and keep the last few positions and timestamps for the release velocity.
- Commit to a direction after about 10px of movement, then follow the pointer 1:1, writing `transform` straight to the element on each move.
- Past a boundary, let the element follow with rising resistance instead of stopping it hard.
- On release, commit or return by velocity as well as distance: a flick faster than about 0.11 px/ms dismisses even when short. To pick a snap point, project the resting position as `current + (v / 1000) * d / (1 - d)`, with `v` in px/s and `d` about 0.998, snap to the target nearest that projection, and pass the release velocity to the settling spring. Move X and Y on separate springs.
- End the drag the same way on `pointerup`, `pointercancel`, `lostpointercapture`, and window `blur`: clear the drag state and release capture. The browser cancels a touch drag when it takes over scrolling or a system gesture fires, and a control that only listens for `pointerup` stays stuck until reload.
- Give every drag both alternatives the [accessibility floor](frontend-ui.md#accessibility) requires: a single-pointer path that needs no dragging, such as buttons or tapping the track to set a value, and a keyboard path, such as arrow keys or a native input.

Gestures are verified on a real phone, because emulation reproduces neither touch feel, rubber-banding, nor the browser taking over a drag. Before that, run synthesized touch when the browser tool supports it: tap the control, drag along its axis until the drag completes, then swipe across it along the page's scroll axis; neither failure throws an error, so try both. Report which fixes you verified from code or emulation and which still need a device, and add a regression test for each gesture fix.

## Checking and fixing

Play each animation at 2–5 times its duration or in the DevTools Animations panel, and step it frame by frame: the origin is right, the curve does not stop abruptly, coordinated properties stay in sync, and a crossfade never shows both states at once. When the result depends on feel the code cannot settle (a crossfade, a spring's bounce, opacity against height in a list that reflows), say so in the report and name that check.

Report each animation in a line: its frequency tier and purpose, then its tool, properties, curve, and duration or spring. When fixing motion, prefer the earlier move: remove what fails the frequency or purpose test, then shorten it or animate fewer properties, fix the curve, fix the origin, make it interruptible, move it to cheaper properties, and make deliberate phases asymmetric.
