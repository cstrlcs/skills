---
name: search
description: Searches the web through parallel subagents for official data and organic, recent first-hand reports, discarding sponsored, AI-generated, dropshipping, and scam sources. Use whenever the user asks to search, pesquisar, or find the best option for something, including products to buy in Brazil.
---

# Search

Answer from sources read in this session, never from memory, because memory lags current specs, prices, and availability.

1. Read [sources.md](sources.md). Done when you know which source tiers and discard signals apply to this topic.
2. Frame the search: the decision the user faces, their constraints (budget, use case), and whether it is a physical product, which adds the Brazil branch of `sources.md`. Ask only when a missing constraint would change the recommendation; otherwise state the assumption.
3. Dispatch two to four `general-purpose` subagents in one message, one per angle, using the brief below. Typical angles: official data and specs; organic first-hand reports and recommendations; for a physical product, availability, price, and seller reputation in Brazil. Split a broad topic further by option or sub-question.
4. Cross-check the returns. Drop any claim that rests on a discarded source, settle conflicts by source tier, and send a follow-up subagent for a gap that would change the recommendation. Done when every spec traces to an official page, every recommended option has at least two independent organic reports, and every physical product has a reputable Brazilian listing with price and check date.
5. Answer in the user's language: lead with one recommendation and why, then alternatives with their trade-off, then the sources with links and dates, then what you could not verify. Name any completion bar from step 4 that was not met instead of filling it from memory.

## Subagent brief

Each brief carries the topic, the user's constraints, the angle, and this text:

<example>
Read `~/.claude/skills/search/sources.md` and apply it to every source. Search with WebSearch and open the pages with WebFetch; take every fact from a page you opened, never from memory or a search snippet. Search in Portuguese and English. Return:
- Findings: each claim with its URL, source tier, publication or last-update date, and for organic reports whether the author owned or used the item.
- Discarded: each rejected source with its discard signal, one line each.
- Gaps: what you looked for and did not find.
</example>
