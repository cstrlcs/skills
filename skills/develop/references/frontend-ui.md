# Frontend and UI

The floor every change to a rendered interface meets. Build to it while writing; when the user's explicit direction conflicts with a rule here, follow the user and say which rule you set aside.

Judge a surface by what its visitor does there, not by the product: apps, dashboards, editors, admin, settings, and tools put scanability, consistency, stable density, and familiar controls ahead of expression; docs show readers where they stand and what comes next.

Before building a new surface, name its user, the job they come to do and under what pressure, the decisions the screen supports, and its primary action and reading order, then build the hierarchy around them: give each figure the context that makes it actionable (a baseline, threshold, or trend) and link summaries to the records behind them.

Also read, when the change includes:

- Creating or restyling a surface, including making part of it bolder or quieter, before writing its code: [visual direction](visual-direction.md).
- Implementing from a supplied mockup, design, or annotated screenshot: [mockups](mockups.md).
- Adding, changing, or deciding whether to add animation, transitions, or a custom pointer gesture (drag, swipe, custom slider): [motion](motion.md).
- iOS or Android views: [native UI](native-ui.md).
- Tailwind classes: [Tailwind](tailwind.md).

## Existing system

A missing `DESIGN.md` does not make a project greenfield: read the identity from custom properties, computed styles, and sibling components. When sources disagree, the user's explicit direction wins, then documented decisions, then consistent shipped patterns; a documented brand invariant holds against a request that merely conflicts with it until the user sets it aside. On a greenfield project with no framework, ask which stack to use, or choose one and state it when nobody can answer.

- Something added to an existing surface inherits its visual language; resolve only its content, hierarchy, states, and fit with neighbors. Replace the identity only when the current request asks for a redesign.
- Change only the named target, with the colors, fonts, radii, shadows, and primitives the surface already owns, and keep its conventions and action-driving behavior working. When they cannot express the request, ask, naming the addition and its job.
- Reuse tokens and components. A value without a token becomes a token or a deliberate local exception; flag an invented component as a candidate for the shared kit.
- Match neighboring flows' terminology and save behavior.

## Content

- Take claims, numbers, and configuration from supplied truth; ask before changing factual or legal meaning. Mark a missing metric, testimonial, customer, or price as a placeholder or labelled synthetic data, and list what the user must replace.
- Build with real labels and realistic values with units, across their minimum, typical, and maximum. Show unknown values as unknown, not as zero.
- Say each idea once; label actions with a verb and object naming the outcome.

## Accessibility

- Use `<button type="button">` for actions (a bare `<button>` submits its form) and `<a href>` for navigation, keep heading levels in order, write link text that stands alone, name icon-only controls, and keep each accessible name containing its visible label (WCAG 2.5.3), because voice control targets the visible words. Alt text carries an image's information in context; decorative images get `alt=""`.
- Give a styled visible focus indicator, tab order matching visual order (CSS reordering does not move focus), and a keyboard way out of every region (WCAG 2.1.2). Move focus into and back out of dialogs, to the new view's heading or main region after client-side navigation, and to the first invalid field or an error summary after a failed submit. Forced colors remove box shadows and replace author colors, so draw focus rings with `outline` and mark selection with a border or icon too.
- Give every drag or swipe a single-pointer alternative that needs no dragging (WCAG 2.5.7) and a keyboard path (WCAG 2.1.1); these are separate requirements, and neither satisfies the other. Keep real DOM content beneath canvas or WebGL.
- Measure contrast on computed colors, never by eye: 4.5:1 for body and placeholder text; 3:1 for large text, controls, icons, and focus indicators; in every state, over images, and in each theme. A bright accent that passes at display size can fail as link or label text; give small accent text a darker role token. On a colored surface derive secondary text from its hue as an explicit color, because gray washes out and alpha makes contrast depend on the layer beneath. Veil text set on photography or texture.
- Under `prefers-reduced-transparency: reduce`, make translucent surfaces solid (raise the background opacity, drop the blur); under `prefers-contrast: more`, give them a near-solid background and a contrasting border.
- Pair color with text, shape, or pattern for status and data; announce async status and errors through live regions.

## States

- Give controls loading, disabled, and error states alongside hover, focus, and active. Give every reachable flow state a design: partial data, permission denied, offline. First use, no results, filtered out, and failed to load each get an empty state saying why, with the next action. First use teaches inside the real product (a guided first task, sample data), stays skippable, and once completed or dismissed stays gone.
- Load with skeletons sized like their content; loading text names the operation, progress is determinate only when the system knows it, and every wait ends in a timeout and an error state.
- Errors say what failed, what is still safe, and how to recover (retry, undo, edit, an alternative), without claiming a cause the system cannot know. Keep internal codes and raw exceptions out of the primary message; isolate failures per region.
- Guard pending submissions (ten fast clicks send one request), ignore out-of-order responses and those for a view the user has left, roll back failed optimistic updates, and keep entered data through errors, refresh, and navigation.
- Destructive actions name the object and consequence, prefer undo when recovery is safe, and label confirm buttons with the action.
- Open a modal only for interruption or protected focus. Ask for browser permissions right after the action that needs them.

## Forms and localization

- Labels stay visible; placeholders are examples. State format before submission via `aria-describedby` with matching constraint attributes, set `autocomplete` on personal data (WCAG 1.3.5), validate beside the field without discarding input, and keep submit enabled so it can point to what is missing. Mobile form controls use 16px text or more, because iOS Safari zooms on focus below that.
- Write whole translatable messages with reorderable placeholders; pluralize with `Intl.PluralRules` or the i18n library, and format and sort with `Intl` (`Intl.Collator` for user-visible strings). Leave 30–40% room for translation rather than fixed widths. With RTL, use logical properties and mirror directional icons (back, forward, disclosure), not ones with real-world orientation (play, clocks, checkmarks).

## Layout and typography

- Run extremes at every width: 100+ character names, emoji, RTL and CJK, numbers in the billions, 1,000+ items, 50+ options, zero, one, stale, deleted, or concurrently changed records, the flow open in two tabs, missing media. Wrap before truncating, keep truncated values reachable, and give flex and grid children holding long content `min-width: 0`. Paginate or virtualize collections that can reach thousands of items, keeping the full count announced (`aria-rowcount` and `aria-rowindex`, or `aria-setsize` and `aria-posinset`).
- Check 320 CSS px without horizontal scroll (WCAG 1.4.10), intermediate widths, wide screens with capped content width, and 200% zoom. Break where content breaks, and use container queries for components shown at several widths. On small screens re-present features and data rather than removing them, in the same markup, because a duplicate hidden with `display: none` still downloads its images.
- Detect input with `(hover)` and `(pointer)` queries, not width; hover-revealed actions need a touch and keyboard path. Targets are 24×24 CSS px or more (WCAG 2.5.8), 44×44 for primary touch controls, and primary phone actions sit within thumb reach, not only at the top.
- Keep body text 16px from the viewport edge (12px at 480px wide or less) and 8px or more (usually 12–16px) from a bordered or filled edge. Horizontal scrollers get equal end insets and a visible cue that more lies beyond the edge. Pad edge chrome with `max(<base padding>, env(safe-area-inset-*))` and `viewport-fit=cover`; keep focused inputs and bottom-fixed bars above the on-screen keyboard.
- Let dropdowns escape `overflow` ancestors via `<dialog>`, the popover API, or a portal; `position: fixed` escapes only when no ancestor sets `transform`, `perspective`, or `filter`.
- Give media `width`/`height` or `aspect-ratio`, and reserve space for late content rather than inserting it above the reader. Use `srcset` with `sizes`; lazy-load only below the fold, never the LCP image; long offscreen sections get `content-visibility: auto` with `contain-intrinsic-size: auto <estimated height>`.
- Web body text is 16px at a unitless line height of 1.5–1.7, never below 12px (11px for functional labels) whatever a token says; prose measure 45–75ch. Build hierarchy from size, weight, space, and tone together. Headings get `text-wrap: balance` and more space above than below; heading tracking stays at -0.04em or looser, because models default to -0.05 to -0.085em, which makes letters touch; display type stops at 6rem; data uses `tabular-nums`. Product UI keeps a fixed rem scale rather than fluid type. Load only the weights in use, with metric-compatible fallbacks and `font-display: swap`.
- Space from one 4px-based scale, tight within groups and generous between. Use one icon library or authored SVG set, not text glyphs or emoji.

## Verify

- Work in the user's running dev server and browser tab, leaving them running and starting no second one. Fix console errors and failed requests (images, fonts, scripts) before judging visuals.
- Verify in bounded rounds: with the build complete, inspect desktop and mobile (plus the user's own width when known) with keyboard, loading, empty, error, and long-content states in one batch, fix everything in one batch, confirm once, and stop. The two rounds cover screenshots, defect scans, micro-edits, and rebuilds alike. If a visual target still misses, show the user instead of iterating. An edit after the last check voids it.
- Before trusting a screenshot, settle entrance animation, scroll each scroll reveal into view once, and open the file: it shows what it claims, with no blank, black, or half-loaded region, and full pages start at the document top; a missing capture fails like a broken one. When the app cannot run, compare against committed visual-regression goldens once they match the current tokens, CSS, components, assets, themes, and variants.
- Run automated accessibility checks such as axe alongside semantic inspection; inspect diffs before accepting screenshot baselines.
- When performance is part of the task, measure the same scenario before and after on a production build under CPU and network throttling (DevTools 4x CPU, slow 4G), and report the median of several runs with device, network, and build, or unknown where you could not measure. Raise a score only by making the real content faster, not by replacing it with a placeholder.
- When you cannot render the page (no browser available), say so in the report and build layouts whose result the code predicts: normal flow rather than absolute positioning or fixed heights around dynamic content, the `min-width: 0` rule above, and every computed value in sample data (times, counts) checked by hand, because unrendered landing pages have shipped collapsed columns, a negative time readout, and headlines overflowing at 390px.
- Name what produced each piece of evidence (emulated viewport, synthesized touch, device): a screenshot proves layout, not a gesture.
- Review your own build in a fresh subagent given the request, screenshots, and references, not the build transcript.

## Reviewing interface changes

A rule in this file or a branch file it links, broken in reachable changed code, is a Correctness finding; a hard-coded value where a token exists is Standards. Also check that time limits can be extended (WCAG 2.2.1) and the dark theme has passing variants of its own. For iOS or Android, check accessibility labels and traits, screen-reader order, virtualized long lists with stable keys, and thumbnails decoded at display size with caching, citing the HIG or Material rule. Taste is not a finding unless a project document bans it. An accessibility failure blocking an important flow is High. State each verdict at its actual scope.
