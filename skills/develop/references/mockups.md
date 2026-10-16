# Supplied mockups

Read this when implementing from a supplied mockup, design, or annotated screenshot, alongside the [frontend and UI floor](frontend-ui.md).

## Build

An approved mockup is a spatial contract: keep its composition, inventory, density, lettering (compression, width, weight, contrast, terminals), and material, and translate semantics, states, and reflow.

- Add nothing it does not show (no borders, rules, containers, or chrome), and carry its corner language, line weights, and palette into regions it does not cover. Three concessions only: the closest obtainable font, icon pictograms but never a control's chrome, and genuine defects such as misspellings.
- Painted, photographic, or textured regions ship as raster assets at 1.5x their displayed size, never crops of the mockup; text, controls, and anything that moves are code.
- Build the first viewport first, with the words verbatim. Use fluid columns, not a fixed-pixel grid, and when an element falls out of the first viewport, shrink what sits above it.

## Compare

Compare against the image, not memory. List its salient elements first, capture at the mockup's pixel size, compare region crops at 1440 wide (holding from 1280 to 1600) and 390 wide, sample colors, and state misses as numbers. Fix missing material first, then structure, then size and spacing. A missing signature element, changed topology, or unapproved addition outranks any craft flaw.

Count a deviation as intentional only when it cites the user's answer, the brief, an accessibility need, or product truth, and name it in your report. A reference you cannot open is a verification gap, not a pass.

## Annotated screenshots

Read marks by position and shape: a note binds to the element under it, a closed loop means emphasis, an arrow direction or movement, a cross or slash delete, and a scribble emphasis or delete by context. State your reading in one sentence, and ask one short question only when an ambiguous mark changes the request.
