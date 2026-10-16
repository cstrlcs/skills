# UI Prototype

Generate **several radically different UI variations** on a single route, switchable from a floating bottom bar. The user flips between variants in the browser, picks one (or steals bits from each), then throws the rest away.

If the question is about logic/state rather than what something looks like, this is the wrong branch. Use [LOGIC.md](LOGIC.md).

## When this is the right shape

- "What should this page look like?"
- "I want to see a few options for this dashboard before committing."
- "Try a different layout for the settings screen."
- Any time the user would otherwise spend a day picking between three vague mockups in their head.
- Before a large, identity-changing, or technically risky build whose direction is still open, so the user chooses before the build. A narrow, well-specified request skips this round.

## Two sub-shapes: strongly prefer sub-shape A

A UI prototype is much easier to judge when it's **butting up against the rest of the app**: real header, real sidebar, real data, real density. A throwaway route on its own is a vacuum: every variant looks fine in isolation. Default to sub-shape A whenever there's a plausible existing page to host the variants. Only reach for sub-shape B if the prototype genuinely has no nearby home.

### Sub-shape A: adjustment to an existing page (preferred)

The route already exists. Variants are rendered **on the same route**, gated by a `?variant=` URL search param. The existing data fetching, params, and auth all stay. Only the rendering swaps. This is the default; pick it unless there's a specific reason not to.

If the prototype is for something that doesn't yet have a page but *would naturally live inside one* (a new section of the dashboard, a new card on the settings screen, a new step in an existing flow), it's still sub-shape A. Mount the variants inside the host page.

### Sub-shape B: a new page (last resort)

Only use this when the thing being prototyped genuinely has no existing page to live inside (e.g. an entirely new top-level surface, or a flow that can't be embedded anywhere sensible).

Create a **throwaway route** following whatever routing convention the project already uses. Don't invent a new top-level structure. Name it so it's obviously a prototype (e.g. include the word `prototype` in the path or filename). Same `?variant=` pattern.

Before committing to sub-shape B, sanity-check: is there really no existing page this could be embedded in? An empty route hides design problems that a populated one would expose.

In both sub-shapes the floating bottom bar is identical.

## Process

### 1. State the question and pick N

Default to **3 variants**. More than 5 stops being radically different and starts being noise, so cap there.

When the request names no axis ("make it better", "show me options"), ask which one the variants should explore (structure, hierarchy, density, colour, type, motion, or a new visual direction) before drafting, because variants without an axis come out arbitrary. "You pick" delegates the choice to you. When the axis is an intent, vary each variant along that intent's own levers: bolder by scale, saturation, or structure; quieter by colour, ornament, or spacing; simpler by visual noise, redundant content, or nesting; type by pairing and scale; colour by hue family, chroma, or contrast strategy; layout by structural arrangement, not spacing.

Write down the plan in one line, in the prototype's location or a top-of-file comment:

> "Three variants of the settings page, switchable via `?variant=`, on the existing `/settings` route."

### 2. Generate radically different variants

Draft each variant. Hold each one to:

- The page's purpose and the data it has access to.
- The project's component library / styling system (TailwindCSS, shadcn, MUI, plain CSS, whatever).
- A clear exported component name, e.g. `VariantA`, `VariantB`, `VariantC`.

Unless the user chose a colour, type, or motion axis, variants must be **structurally different**: different layout, different information hierarchy, different primary affordance, not just different colours. Three slightly-tweaked card grids isn't a UI prototype, it's wallpaper. If two drafts come out too similar, redo one from a different named layout (a single column, a split view, a dense table). Each variant should be recognisable at a glance, on a structural axis by its organisation (navigation model, column or work-area division, density, which data leads, where the signature sits), never by world material added to the reading or working area; one that only its label tells apart adds no choice. When the axis is colour, no two share a theme and dominant hue.

On an existing page, write one identity-lock sentence from the page's markup and computed styles (ground and accent values, loaded fonts, layout topology, surface treatment, voice; skip an axis the page does not show rather than inventing it, and name no aesthetic family) and hold every variant to it, so variants differ along the chosen axis using the page's own tokens and loaded faces, never its identity: a colour variant changes the colour strategy (Restrained through Drenched, as [visual direction](../develop/references/visual-direction.md) defines them) and which existing colour dominates, not the palette. Three off-brand variants of a shipped page leave the user nothing to adopt. Draft from the markup, tokens, and question rather than a screenshot of the current page, which anchors every variant to what already exists.

Leave the identity only when the question is the visual direction itself. Then give each variant its own world, named in one sentence with a real-world referent such as "a museum exhibition label system", drawn from the audience's artifacts, places, and publishing or screen traditions (for a Read surface: reference books, type specimens, timetables, field guides, technical manuals, scholarly apparatus, a newspaper's wayfinding), with the three spanning different material families. New fonts, hues, and aesthetic families belong only to this case. Spend at most one variant on the brief's literal metaphor and at most one on a world taken from the tools the audience operates (a terminal, an instrument, a control panel), and drop any whose rationale would fit a neighbouring product.

Make each later variant go further than the first, never tidier, because variants drift back toward the safe one. Build all of them to the same visual fidelity, so none loses on finish rather than idea; the skipped polish is tests and error handling, not the look.

### 3. Wire them together

Create a single switcher component on the route:

```tsx
// pseudo-code, adapt to the project's framework
const variant = searchParams.get('variant') ?? 'A';
return (
  <>
    {variant === 'A' && <VariantA {...data} />}
    {variant === 'B' && <VariantB {...data} />}
    {variant === 'C' && <VariantC {...data} />}
    <PrototypeSwitcher variants={['A','B','C']} current={variant} />
  </>
);
```

For sub-shape A (existing page): keep all the existing data fetching above the switcher; only the rendered subtree changes per variant.

For sub-shape B (new page): the throwaway route under `/prototype/<name>` mounts the same switcher.

### 4. Build the floating switcher

A small fixed-position bar at the bottom-centre of the screen with three pieces:

- **Left arrow**: cycles to the previous variant (wraps around).
- **Variant label**: shows the current variant key and, if the variant exports a name, that name too. e.g. `B (Sidebar layout)`.
- **Right arrow**: cycles forward (wraps around).

Behaviour:

- Clicking an arrow updates the URL search param (use the framework's router, e.g. `router.replace` on Next, `navigate` on React Router, etc) so the variant is shareable and reload-stable.
- Keyboard: `←` and `→` arrow keys also cycle. Don't intercept arrow keys when an `<input>`, `<textarea>`, or `[contenteditable]` is focused.
- Visually distinct from the page (e.g. high-contrast pill, subtle shadow) so it's obviously not part of the design being evaluated.
- Hidden in production builds: gate on `process.env.NODE_ENV !== 'production'` or an equivalent check, so a stray prototype merge can't ship the bar to users.

Put the switcher in a single shared component so both sub-shapes can reuse it. Locate it wherever shared UI lives in the project.

### 5. Hand it over

Surface the URL (and the `?variant=` keys). Present the variants unranked, because your own ranking steers toward the safest. When a variant uses an ambitious technique (WebGL, view transitions, generative motion), state its browser support, performance cost, and fallback. If the user delegates the pick, name the evidence it rests on (the brief, product facts, the design system). The interesting feedback is usually **"I want the header from B with the sidebar from C"**, which is the actual design they want. When variants from different worlds are combined, one world still owns the page: take a losing variant's discipline (its density, its colour commitment), not its surface details.

### 6. Capture the answer and clean up

When the user rejects two sets in a row, ask what quality is missing before generating another.

Once a variant has won, capture the answer (which variant and why), then capture the prototype the way the [SKILL](SKILL.md) describes. Fold the winner into the real code and move the rest onto the throwaway branch, not into main:

- **Sub-shape A**: fold the winner into the existing page; drop the losing variants and the switcher from main.
- **Sub-shape B**: promote the winning variant to a real route; drop the throwaway route and the switcher from main.

The full set of variants is the primary source, so it lands on the throwaway branch, not the bin, since variant components and the switcher left in the main branch rot fast and confuse the next reader.

## Image mockups

For landing pages and showcase surfaces, when an image-generation tool is available and the user wants pictures before code, render one mockup per variant at the surface's own viewport: portrait at device size for native or mobile-first surfaces, desktop landscape otherwise. App screens and documents stay in code, because working screens come out better built than pictured. Keep each prompt to 150–300 words carrying only what the image model cannot know, in this order: the surface type and product by name, edge to edge with no browser, device, or desk; the visitor's job with real content (names, numbers with units, the offer or state, claims at honest certainty, the next action by name); what leads, then the parts in reading order, a phrase each; the frame (mark, navigation, utility controls, the far edge), never a fragment. Leave sizes, positions, and colours out unless the user pinned them, because a prompt that pins everything gets back a template.

Take the look from pictures. On an established product, pass a screenshot of a representative page as the reference image and state that its chrome, palette, type, and components carry over while its own content does not, and leave the style undescribed in words, because a description overrides the picture. Attach reference boards with one sentence saying they are style inspiration, not layout to copy. With no pictures, write two to four sentences of visual law (ground and main colours with their jobs, the type voices, one signature) and list no colours past the main few. Generate later mockups from the words, never with the first mockup as an input image, which collapses the set into one composition. Reject a render that reads as a poster or a photograph with text on it: the visitor's job must be readable with no caption.

## Anti-patterns

- **Variants that differ only in colour or copy, unless colour is the axis the user chose.** That's a tweak, not a prototype. Real variants disagree along the chosen axis.
- **Sharing too much code between variants.** A shared `<Header>` is fine; a shared `<Layout>` defeats the point. Each variant should be free to throw out the layout.
- **Wiring variants to real mutations.** Read-only prototypes are fine. If a variant needs to mutate, point it at a stub: the question is "what should this look like", not "does the backend work".
- **Promoting the prototype directly to production.** The variant code was written under prototype constraints (no tests, minimal error handling). Rewrite it properly when you fold it in: the winner settles the direction, not the states, accessibility, and copy the real build still owes.
