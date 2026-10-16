---
name: write
description: Writing documents for agents. Use when creating, editing, or pruning skills, AGENTS.md, CLAUDE.md, rules files, subagent definitions, or system prompts.
---

Reference for writing any document an agent consumes: a skill, an `AGENTS.md` / `CLAUDE.md`, a doc reached by a pointer. The goal is low variance: the agent takes the same _process_ every run, not that it produces the same output.

When the document you're writing is a skill, read [`SKILL-MECHANICS.md`](SKILL-MECHANICS.md) for format limits, frontmatter, invocation choice, and router skills. When it is an always-loaded instruction file (`AGENTS.md`, `CLAUDE.md`, a rules file), read [`INSTRUCTION-FILES.md`](INSTRUCTION-FILES.md) for budget, placement, and layering.

## Context pointers

A **context pointer** is a reference held in the agent's context that names some out-of-context material and encodes the condition for reaching it. A skill's description is one; a line in `AGENTS.md` naming a doc is another. The pointer's _wording_, not its target, decides when the agent reaches the material, and how reliably. A must-have target behind a weakly worded pointer is a variance bug: sharpen the wording first, and inline the material only if sharpening fails.

A pointer does two jobs: state what the material is, and list the **branches** that should trigger reaching it (a branch is a distinct case the document handles). Every word of an always-loaded pointer costs on every turn, so it earns even harder pruning than the body:

- **Front-load the leading word**: the pointer is where it does its triggering work.
- **One trigger per branch.** Synonyms that rename a single branch are one branch written twice; keep only genuinely distinct branches.
- **Cut identity the body already carries.**

## The two loads

Every document and pointer you add spends one of two budgets:

- **Context load** is the cost of always-loaded material on the agent's window: an `AGENTS.md` line, a skill description, anything sitting in context every turn, spending tokens and attention whether or not it fires.
- **Cognitive load** is the cost on the human: which documents exist and when to reach for each. The human is the index. Spend it where human judgement matters, remove it where it does not.

A pointer trades the two: material behind one costs context load only for the pointer's line; material with no pointer rides entirely on cognitive load.

## Information hierarchy

A document holds **steps** (ordered actions the agent performs) and **reference** (definitions, rules, facts consulted on demand), in any mix. The core decision is where each piece sits on a ladder ranked by how immediately the agent needs it:

1. **In-file step**: what the agent does, in order.
2. **In-file reference**: consulted on demand.
3. **Disclosed reference**: a separate file (a sibling, or an external doc any document can point at), reached by a context pointer and loaded only when it fires.

Push too little down and the top sprawls: attention thins, even when every line is live. Push too much and you hide material the agent needs. That tension is the whole decision.

**Progressive disclosure** is the move down the ladder, and its cleanest test is branching: inline what every branch needs, and push behind a pointer what only some branches reach. It protects the steps more than it saves tokens: reference left inline buries them, and attending to buried steps becomes a coin-flip.

**Co-location** decides what sits beside a piece once placed: keep a concept's definition, rules, and caveats under one heading, so reading one part brings its neighbours with it.

## Steps and completion criteria

Every step ends on a **completion criterion**, the condition that tells the agent the work is done. Two properties make it a lever:

- **Clarity**: can the agent tell done from not-done? A vague bound ("understanding reached") invites **premature completion**, pulled along by the steps still ahead. Sharpen the bound first; split the sequence only if it stays fuzzy and you observe the rush (see _When to split_ below).
- **Demand**: how much it requires. "Every modified model accounted for" forces digging that "produce a change list" does not. Demand binds reference too: "every rule applied" puts an exhaustiveness bar on a flat list of rules.

The strongest criteria are checkable and exhaustive, and the most checkable is one the agent can **run**: a test, validator, or build that returns pass or fail, looped (run, fix, rerun) until it passes.

**Freedom** matches fragility. Where only one path is safe (a migration, a release), give the exact command and say not to vary it; where many paths work, give heuristics and trust the agent. Offer one default with an escape hatch for the known exception, never a menu of equals: a menu makes the agent choose on every run, and choosing is variance.

## Enforcement

A document is a request; code is a guarantee. Anything that must hold every time and needs no judgement (formatting after an edit, a blocked path, a required check before finishing) belongs in a hook, script, or schema, and the document keeps only what needs judgement.

Deterministic operations go in scripts for the same reason: running a script costs only its output, while prose the agent must turn into code costs tokens and variance on every run. Say whether a script is to be **run** or **read**; the default should be run.

## Reasons

State the **reason** beside any rule the agent could misapply. "Amounts in integer cents, because the ERP rounds floats" lets the agent generalise to cases the rule never names; a bare rule is applied literally where it doesn't fit and dropped where it seems to cost too much.

## Examples

An example steers format, tone, and granularity more precisely than any description of them, and the agent copies it closely, so every example is a template. Use a few canonical ones (three to five), varied enough that no incidental feature reads as a rule, formatted identically, and fenced off from instructions (`<example>` tags or a labelled block).

## When to split

Splitting one document into two spends one of the two loads, so split only when the cut earns it:

- **By sequence**: when later steps pull the agent into rushing the current one, move them out of view. This works only across a real context boundary (a hand-off or a subagent dispatch); an inline call leaves the later steps in context. The reverse also holds: merging sequences exposes each step to what follows it.
- **By invocation**, skill-specific: see [`SKILL-MECHANICS.md`](SKILL-MECHANICS.md).

## Leading words

A **leading word** is a compact concept already in the model's pretraining that the agent thinks with while running the document (_lesson_, _fog of war_, _tracer bullets_). Repeated as a token, it anchors a whole region of behaviour in the fewest tokens by recruiting priors the model already holds. A coined word recruits none, so you pay in definition tokens what an existing word gives free; reach for an existing word first. The same word in your prompts, docs, and pointers also makes the agent reach the material more reliably.

Hunt for passages that collapse into one: a triad spelled out at three sites, a pointer spending a sentence to gesture at one idea.

- "fast, deterministic, low-overhead" → _tight_ (a _tight_ loop).
- "a loop you believe in" → _red_, turning a fuzzy gate into a binary observable state (the loop goes _red_ on the bug, or it doesn't).

**Negation** is the failure mode beside this lever: a prohibition names the forbidden behaviour and makes it _more_ available (_don't think of an elephant_). Prompt the **positive**: state the target behaviour ("write one-line comments") so the banned one is never spoken. Keep a prohibition only as a hard guardrail you cannot phrase positively, and pair it with the positive target.

**Emphasis** is the same failure in volume. Capitals and _MUST_, _CRITICAL_, _NEVER_ make current models over-apply a rule far outside its branch, and marking many lines leaves none standing out. Write rules in a normal voice. When one specific rule is observed being skipped, sharpen its wording first, then emphasise that line alone.

## Pruning

- Keep each meaning in a **single source of truth**, so changing the behaviour is a one-place edit. **Duplication** costs maintenance and tokens, and inflates a meaning's prominence past its real rank. (A leading word repeats a token on purpose; duplication repeats a meaning.)
- The **environment** is a source of truth too (`package.json` scripts, config files, the directory layout, `--help` output), and a document that restates it is a **cache**, earning its load only when the lookup is expensive. Cache what the agent cannot find by looking: the unwritten convention, the reason behind a choice, the gotcha no config confesses.
- Check every line for **relevance**: a line loses it by never bearing on the task (exposition, or a branch that should be disclosed) or by going stale. Without a pruning discipline the default fate is **sediment**: stale layers that settle because adding feels safe and removing feels risky.
- Hunt **no-ops** sentence by sentence: an instruction the model already obeys by default pays load to say nothing. The test (does it change behaviour versus the default?) is model-relative, so settle disagreements by running the document, not by debate. Delete a failing sentence whole rather than trimming words. A word too weak to beat the default (_be thorough_) is a no-op too; the fix is a sharper completion criterion, one whose demand the agent can check, not a louder word.
- Resolve **conflicts** where rules meet. Two rules that can collide, in one file or across layers (a global file, a project file, a skill), make the agent burn reasoning and then pick one arbitrarily. State the precedence and the exception at the point of contact ("in an emergency, skip the lookup").
- Hold **one term per concept**. Synonyms for a single thing ("field", "box", "control") make the agent wonder whether they are three things.

## Testing

A document is done when a run shows it changes behaviour, not when it reads well.

- **Start from observed failure.** Run the task without the document, note what went wrong, and write the minimum that fixes it. Material written for imagined failures is sediment from day one.
- **Test in a fresh context**: a new session or a subagent with the document loaded, on real tasks, on every model it will run on. A weaker model needs more said; a stronger one is slowed by over-explanation.
- **Watch the path.** A disclosed file never opened is a dead pointer or dead material; a file reread every run belongs higher on the ladder; files read out of the intended order mean the structure misleads.
- **Test a trigger both ways**: prompts that should reach the material do, and near-misses don't.
- **Measure against a baseline** before keeping an edit to a skill that shapes behavior, or before pruning one: run the same cases with and without the skill.
