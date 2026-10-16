# Visual direction

Read this when creating or restyling a surface, before writing its code. When you extend or edit an existing surface instead, its system wins over everything here: keep its fonts, colors, labels, cards, and patterns, including model defaults it already uses, because consistency with the shipped page outweighs taste and an edit changes only what it was asked to. A new surface inside an established system inherits that system, and this file decides only what the system leaves open. A direction the user or brief pins (an aesthetic, era, material, font, or palette) beats every default below, and redirecting a clear brief toward your own taste is a failure. Nothing here overrides the floor in [frontend-ui](frontend-ui.md).

## Pin the direction

For a large, identity-changing, or technically risky build whose direction is open, propose two or three directions that differ in composition, type, palette, and material, and get the user's choice when the user can answer; when they cannot (an unattended or non-interactive run), choose one and state it. A narrow, well-specified request skips this round.

Before code, write the direction down in about 150 words:

- Thesis: one idea, resting on something uniquely true about this product that a neighbor or a template could not claim, and the category-default arrangement it refuses.
- World: a palette and component language recognizable with all content removed.
- Story: what the visitor understands, believes, and does.
- First viewport: the exact composition, scale, and where the primary action sits, plus the signature interaction and motion.

If a block reads like a mood, the direction is not decided. Keep these notes in your reply or a scratch file, never in anything the browser receives (comments, hidden DOM, data attributes, serialized props, metadata, accessibility text, files served beside the page), because a build step that strips them is no safeguard.

Name the page this category always ships and its predictable opposite, and keep both out: if a neighboring product could ship the same arrangement of the same blocks, or someone could guess the aesthetic from the category alone or from the category plus what you avoided, rework the composition.

A pinned world pins the world, not its softest rendition: keep its full material range, and treat the rendition any model would ship for that world as a failure. Resolve collisions with a pinned direction field by field, keeping every pinned constraint; when only the materials conflict, translate them and name the translation. Negative constraints (no gamification, no hype) rule out those devices, not energy, and adjectives about the product's behavior (quiet support, calm coaching) do not set the surface's energy. When the user chooses the familiar path, ask once for two or three products it should sit alongside, take their craft as the bar, and execute the convention at full fidelity with no irony or smuggled quirk.

In a redesign, keep product truth, content, function, native affordances, confirmed assets, and constraints. Read the old look as evidence of what the subject is, not authority over what it becomes, and replace it; splitting the difference ships polish on the discarded look. A chosen reference world is a working system, not a mood: carry its palette, material, type, composition and topology, controls and their states, and responsive rules as far as the visitor mode allows. Reference renders set the craft level, never the composition.

Commit through one dominant move with the material, type, and spacing that support it, and let every other region hold still at real reading size. A second element competing with the lead at the same scale is shouting; if every element got louder, the section got flatter. Build the chosen direction, not a safer interpretation: when torn between refined and committed, commit, land the first build fully committed, and use later passes to clarify, never to dilute. When the world names a technique (canvas, WebGL, view transitions, generative motion), build the technique, not a static imitation of it.

Write the direction from the sections below, then read [reflexes](reflexes.md) and check the direction and the build against it.

## Visitor modes

Classify the surface, not the company: a tool's landing page is Persuade and a fashion house's documentation is Read. The mode decides what the opening must do and how far the world reaches into the page, and its rules win over the shared sections below.

**Persuade** (landing, marketing, campaign, pricing pages) and **Experience** (portfolios, galleries, showcases): display type may carry the voice with decisive contrast, color may own large regions, and composition may be asymmetric. Let the world's material be the ground and major surfaces and its type set the headlines, since a world reduced to an accent on a neutral template is the category default with a sticker. Rebuild every atom (navigation, buttons, inputs, links) in the form's vocabulary, because a stock component inside a committed form reads as a lapse.

Make the first viewport a thesis, not a header. State the offer intelligibly and prove instead of claiming: show the mechanism working at the scale it has in life, not trapped in a hero or card shell, with specifics a competitor could not copy. Make the primary action the one this category's visitors came to take, in working form (an airline's route-and-dates search, a clinic's open slots, a store's add to cart), visible in the first viewport; a decorative link elsewhere does not count. Wherever the world puts a page part, the part still works: navigation reads as links, copy as set text, actions as plainly clickable, text stays legible against what sits behind it, the product's proof (demos, tables, pricing) stays readable, and the next section starts as a section. Fix a poster by making its parts work in place, not by retreating to a standard layout. Pace the scroll inside one grammar, varying density, scale, image, motion, and quiet: follow a dense passage with a quiet one and end on a real close.

**Operate** (apps, dashboards, editors, admin, settings, tools) and **Read** (docs, articles, guides, help, changelogs): stability, scanability, and measure come first. The world lends only type, palette, density, and one signature move, never the layout, navigation model, or controls. A display face the world lends stays in headings and the masthead; labels, buttons, inputs, table cells, and data use the UI face. A world taken from the tools the audience operates (a terminal, an instrument, a control panel) comes back as a costume, so take only those four things from it. Name the signature move concretely (service health drawn as a transit map, a schedule set in a timetable's column rhythm); a world that shows up only as a color scheme has not found its move. The move adds to a screen at least as clean as the best product in the category and never stands in for it. System stacks, workhorse sans faces, standard navigation, density, and screen-to-screen consistency belong here. On Read surfaces the world owns the frame (masthead, navigation rail, ground, title and section openers, how code, tables, and callouts are set) while the reading column stays calm: a reading face, real contrast and measure, nothing behind the text, and code, tables, and figures in their standard forms. The signature move is one system, not a frame around every element, and the page is never a poster, a magazine cover, or a book photographed open. Concentrate delight at first use, completion, recovery, and mastery, and let reliability carry the rest.

On Operate surfaces the tool disappears into the task: a category-fluent user should trust every control at first sight, so familiar affordances, one well-tuned sans, a fixed type scale with 1.125–1.2 steps, and a second neutral layer for sidebars and panels beat invention. Density is a permission, not a flaw: show many rows at once in the page's own scroll rather than a short inner scroll box, and size summary figures to their content instead of tall half-empty cards. Make the states the user acts on stand out (failing, blocked, exhausted, overdue) with color plus a word, and explain codes in plain language beside them. On phones, re-present table rows as compact cards that keep every field the task needs, pairing short values on one line rather than stacking one label per line.

## Bolder or quieter

A request to make a section bolder or quieter changes that section in the surface's own vocabulary, under frontend-ui's rule to change only the named target.

- Bolder raises one part that already exists to the conviction the rest implies and adds no new effect, because heft borrowed from a decorative import reads as another brand. Find why the section reads flat in what its neighbors already do (display type at full strength, structural devices, the signature motif, density, pacing) and bring it up in that vocabulary, so it looks more like the same brand.
- Quieter lowers weight and saturation before removing color, and keeps at least one anchor, the size and weight hierarchy, some accent color, clear affordances, and the point of view. On Persuade and Experience it restrains the palette and adds air; on Operate and Read it cuts background accents, flattens cards, and lowers color and motion.

## Color

Choose a strategy before choosing colors, and name it in the direction with its temperature, dominant relationship, contrast range, and dosage:

- Restrained: tinted neutrals plus one accent; the usual choice on Operate and Read.
- Committed: one saturated color carries 30–60% of the surface.
- Full palette: three or four named roles.
- Drenched: the surface is the color.

Persuade and Experience take the bolder strategies when the brief allows, committed at page scale: color fields own whole regions instead of accents scattered over a neutral ground.

Decide light or dark from one sentence of physical scene (who uses it, where, under what light), never from the category. Choose hue from the product's meaning and the direction, not the category's habitual association. Tint neutrals slightly toward the palette's own hue so they cohere; plain gray is right when the world is achromatic.

On Operate and Read surfaces the accent goes only to primary actions, selection, status, and wayfinding, never to decoration, so its rarity gives it force. A product may also let color own its shell (a colored rail or header, a tinted ground) when its world calls for it; the work area stays calm and the accent keeps its jobs.

Keep the project's color space. For a new web palette use OKLCH, and when deriving ramps vary lightness and lower chroma toward white and black instead of holding it constant.

Theme what the browser draws from the palette: text selection, the caret, scrollbar color, and link underline offset. Color these parts and keep their native shape and behavior.

## Typography

Choose faces like objects from the subject's world, in the mode's register. On Persuade and Experience surfaces the display face is a named, loaded face with a point of view, never a system face (Impact, Arial Black, the platform sans, a system stack). Operate and Read surfaces may use system stacks and familiar sans faces.

Set sentence-length headlines well below frontend-ui's display cap; only one- or two-word headlines reach it. Display type on Persuade and Experience may scale fluidly with `clamp()`. On dark grounds, give light text slightly more line height, a touch more tracking, and one weight step more when the face looks thin. Use monospace for code, data, parameters, and measurement, not as a costume for a technical subject or for running text and headings.

## Composition

Let layout follow product priority, and on narrow screens recompose the hierarchy instead of shrinking it. Repeat cards, columns, or sections only for content that is genuinely equivalent, and keep distinct content distinct without boxing every group; spacing, type, and dividers group as well as a card does. Repeat a pattern for recognition and break it only where content or priority changes, because variation is not a goal in itself.

## Surfaces and decoration

Every texture, blur, shadow, gradient, and illustration belongs to the visual idea; none fills empty space or competes with the task.

Never draw decoration from emblems tied to militarism, imperial conquest, supremacy, or hate movements (the Rising Sun flag's rays, the Confederate battle flag, Nazi-era insignia) or their stylized variants, even when they belong to the subject's world; use that world's neutral forms. Documenting such a symbol as fact is fine.

## Imagery

When a Persuade brief implies imagery, ship real images, not CSS panels, cards, or diagrams standing in for photographs. Use photographs of the subject's own physical object, not of its category; one decisive photo beats five mediocre ones. Verify that every image URL resolves before referencing it; without a way to verify, ship fewer images you can confirm, never colored placeholders. Exclusions ban invented claims (testimonials, specs, member counts, photos presented as real), never the medium the subject lives in, so a subject that lives in photographs keeps them.

Produce or collect the assets before writing page code, because a page written before its assets exist draws its material in CSS. Treat an image slot as a job (an anchor, a piece of evidence) and fill it with what the subject actually has. In greenfield work, author the demonstration content the concept needs (names, entries, copy, covers, thumbnails) at production fidelity, omitting no section, labelled as frontend-ui requires. Missing demo data is no reason to retreat from a bold direction, and gradients, glass, or icon tiles where an authored asset belongs are the gap wearing chrome.

Ship real illustration or none. SVG doing exact geometry (shapes, diagrams, linework, data graphics, icons) is first-class; scenes assembled from primitive shapes, sketch-style drawing, and noise grain are not, and shaded, perspectived, or figure-bearing line art counts as a picture. For an organic contour (a torn edge, a silhouette), derive an alpha matte or ship a cut-out asset instead of approximating it with clip-path, circles, or radial masks; keep clip-path for geometry.

## Motion

Persuade and Experience pages earn an orchestrated first-load sequence and reveals that fire once; read [motion](motion.md) before adding either.

## Copy voice

Describe what the product does with specific verbs and nouns, not generic marketing verbs and superlatives, and cut fluff, legalese, and hedging. Derive personality from the product's mechanism, voice, and world, specific enough that a neighbor could not reuse it; generic whimsy is worse than neutral clarity. Errors lead with the problem and the recovery; warmth is fine, but never joke about loss, money, privacy, or blocked work.

## Check the build

In the verification round, confirm that a first-time visitor to a Persuade page knows within seconds what it is, why it matters, and what to do. Then ask what someone who left after the first viewport would describe an hour later. If the answer is a mood, the concept has not committed: find the world's devices the build left unused (frame, depth, lettering, ornament, motion) and use one.
