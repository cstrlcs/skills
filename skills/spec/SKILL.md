---
name: spec
description: "Turns the current conversation into a feature spec saved under `.scratch/`, synthesizing what was already discussed without interviewing."
disable-model-invocation: true
---

# Spec

Synthesize the conversation and your codebase understanding into a spec. Decisions already made in the conversation are settled: record them rather than reopening them, and put what remains undecided under Open Questions instead of asking. Keep the names the user gave to values and concepts. A proposal of yours that the user did not confirm is undecided: it goes under Open Questions only, not also under Implementation Decisions.

## Process

1. Explore the repository if you have not already. Use the project's domain glossary vocabulary throughout and respect the ADRs in the area the feature touches.
2. Choose the seams where the feature will be tested: the public interfaces a test exercises and observes. Prefer existing seams at the highest level possible; propose a new seam only when none fits, as high as it can sit. One seam is the ideal count. Record them under Testing Decisions so the user reviews them with the spec.
3. Write the spec with the template below, save it to `.scratch/<feature-slug>/spec.md`, and return the path.

<spec-template>

## Problem Statement

The problem the user faces, from the user's perspective.

## Solution

The solution, from the user's perspective.

## User Stories

A numbered list covering every actor and every capability the feature provides, including edge and failure cases. Each story follows `As an <actor>, I want <feature>, so that <benefit>`.

<user-story-example>
1. As a mobile bank customer, I want to see the balance on my accounts, so that I can make better informed decisions about my spending
</user-story-example>

## Implementation Decisions

The decisions made: modules built or modified and their interfaces, architectural decisions, schema changes, API contracts, specific interactions, and technical clarifications. Describe them in prose without file paths or code snippets, because those go stale quickly. The exception is a snippet from a prototype that encodes a decision more precisely than prose can (a state machine, reducer, schema, or type shape): inline the decision-rich part and note that it came from a prototype.

## Testing Decisions

What makes a good test here (external behavior, not implementation details), the seams chosen in step 2, which modules are tested, and prior art for similar tests in the codebase.

## Out of Scope

What this spec deliberately leaves out.

## Open Questions

Decisions the conversation did not settle.

## Further Notes

Anything else about the feature.

</spec-template>
