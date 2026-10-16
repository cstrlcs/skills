# Tailwind

Read when writing or rewriting classes in a Tailwind 4 project. The project's lint checks class names against the theme; this file covers what a linter reading one class list at a time cannot judge.

When lint reports two classes in conflict, keep the one the current render shows, because stylesheet order, not class order, decides the winner. Lint checks contrast only between text and background colors in the same class list; measure inherited colors and colors defined through `:root` variables yourself.

## Writing classes

- `hover:` matches only under `@media (hover: hover)`, while `[&:hover]:` also fires on touch; keep the arbitrary form unless touch behavior should change.
- Give a variable that is not a color a type hint, `text-(length:--size)`, because bare `text-(--size)` emits `color`.
- `grid-cols-2` is `repeat(2, minmax(0, 1fr))`, which stops long content from widening a column, and `grid-cols-[repeat(2,1fr)]` is not; swap them only after checking the render.
- Keep an arbitrary value the theme cannot express: generated content, viewport and container units (`max-h-[60dvh]`, `w-[80cqw]`), track templates and `calc()` expressions, variables a library or style prop sets at runtime (`max-h-(--available-height)`), setting a variable (`[--gutter:2rem]`), and a breakpoint width the theme lacks.
- Put values that change at runtime in `style` or a CSS variable set from `style`.
- Restyle a library component through its variants, semantic tokens, or theme variables, and keep `className` on it for layout, because appearance classes there fight the component's own states.
- Space siblings in new code with `gap` on a flex or grid parent. Leave existing `space-*` in place: child margins and `gap` lay out differently, so swapping them is a design change.

Preflight applies when the CSS entry imports `tailwindcss`. Its less obvious effects:

- `border` alone draws a solid line.
- Buttons inherit font and color, have no background or radius, and use the default cursor; add `cursor-pointer` deliberately.
- `strong` is `bolder`; keep `font-bold` where exactly 700 is required.
- Tables collapse borders, textareas resize vertically, and `[hidden]` is `display: none !important` except `hidden="until-found"`.
- Lists lose their bullets, and VoiceOver then stops announcing them as lists; add `role="list"` to a styled list that should still be announced.

## Cleaning up classes and markup

A cleanup is a refactor. At the default root font size, every element's computed style in every state stays the same, and so does behavior. The accessibility tree changes only through the semantic fixes below, each listed in your report. Propose anything else as a design change instead of folding it in.

Before editing, find the CSS entry and its `@layer base` rules, the source of each component the targets use (for shadcn, the UI file and its `cva` base), and the paths the project forbids editing; fix generated or vendored components at the call site. Render the target screens at the narrowest and widest supported widths, in each shipped theme, as the baseline.

Remove a class only when you can name what supplies the same computed value in every state the list covers (each variant, breakpoint, theme, and component prop), and name that source in your report:

- The base layer: shadcn ships `* { @apply border-border outline-ring/50 }` and `body { @apply bg-background text-foreground }`, so `border-border` is redundant unless it overrides a component's border color.
- Inheritance: `color`, `font-*`, `leading-*`, `tracking-*`, `text-<align>`, `whitespace-*`, `cursor-*`, `italic`, and `uppercase` inherit. Drop a repeat of the ancestor's value, and set a value all children share once on their nearest common ancestor.
- A transparent element shows its ancestor's background, so drop a repeated background except on anything that must cover content: sticky headers, overlays, scroll shadows.
- The component's own classes: shadcn's `buttonVariants` base already sets `inline-flex items-center gap-2 text-sm font-medium`, and the Card root is `flex flex-col`.
- Initial values, such as `flex-row flex-nowrap items-stretch justify-start` after `flex`, `block` on a `div`, or `static`, `visible`, `opacity-100`, `basis-auto`, `order-0`, `z-auto`, unless the class resets an earlier class, variant, or breakpoint.
- Variants that never match: `disabled:` on an element that is never disabled, `group-hover:` without a `group` ancestor.

Unwrap a `div`, fragment, or `span` only when it carries no class, attribute, ref, key, or handler; move a wrapper's layout classes to its child only when the child renders one DOM element that accepts `className`. Keep every element that carries a ref, key, handler, `id`, `data-*` or `data-slot` hook, test selector, or `render`/`asChild` target, and every wrapper that takes part in layout: a grid or flex item, scroll container, `relative` positioning context, stacking context, `@container` parent, or clipping box.

Semantic fixes:

- A `section` is a region landmark only when named: give it `aria-labelledby` pointing at its heading, or use a `div` when it has none. Name each `nav` when a page has several. `header` and `footer` are banner and contentinfo only outside `article`, `aside`, `main`, `nav`, and `section`.
- Mark repeated items of one shape as `ul` or `ol` with `li`.
- Render a component nested inside a link as the link itself: `render={<a href="…" />}` in Base UI, `asChild` in Radix.
- Replace `aria-label` on a `div` or `span` without a role, which ARIA prohibits and screen readers ignore, with visible text, `aria-labelledby` on a landmark, or a real role.

Keep accessible names, descriptions, live regions, focus order, and the heading outline. When a tag change adds a landmark of a kind the page already has, give each one a distinct name.

To verify, rerun the lint, render the baseline screens again at the same widths and themes, and treat any difference as a regression unless it comes from a semantic fix you listed. Inspect the accessibility tree of each changed screen: landmarks, names, roles, and heading levels.
