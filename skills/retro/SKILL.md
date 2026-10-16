---
name: retro
description: Reviews a finished session for corrections and repeated mistakes, and proposes each lesson as a hook, lint rule, instruction line, skill edit, or project standard.
disable-model-invocation: true
allowed-tools: Bash(jq *) Read(~/.claude/projects/**)
---

# Retro

Turn what went wrong in a session into the smallest durable fix, placed where it will change the next session. Propose; change nothing until the user chooses.

## 1. Read the session

This session's digest, one line per entry: `U` user message, `A` agent text, `T` tool call, `E` tool error. The numbers are stable references for findings.

```!
jq -Rrs '
  def noise: test("^\\s*(<task-notification>|Another Claude session sent a message|<system-reminder>|<local-command-stdout>|Caveat:)");
  def text: if type == "string" then . else tojson end;
  def clip($n): gsub("\\s+"; " ") | sub("^ "; "") | sub(" $"; "") | if length > $n then .[:$n] + "…" else . end;
  def tool: .input as $i | "\(.name) \($i.command // $i.file_path // $i.pattern // $i.skill // $i.description // $i.url // "" | text)";
  def user($record):
    if type == "string" then select(noise | not) | ["U", .]
    else .[] |
      if .type == "text" then select(.text | noise | not) | ["U", .text]
      elif .type == "tool_result" and .is_error then ["E", (.content | text)]
      elif .type == "tool_result" then $record.toolUseResult.answers? // {} | to_entries[] | ["U", "\(.value) (answering: \(.key))"]
      else empty end
    end;
  def agent: .[] | if .type == "text" then ["A", .text] elif .type == "tool_use" then ["T", tool] else empty end;
  "Transcript: \(input_filename)",
  ([split("\n")[] | fromjson? | select((.isSidechain or .isMeta | not) and .message.content != null)
    | . as $record | .message.content
    | if $record.type == "user" then user($record) elif $record.type == "assistant" then agent else empty end
    | select(.[1] | test("\\S"))]
  | to_entries[] | .key as $index | .value as [$tag, $text] | "\($tag)\($index) \($text | clip({U: 800, A: 240, T: 140, E: 400}[$tag]))")
' ~/.claude/projects/*/${CLAUDE_SESSION_ID}.jsonl
```

Work from the digest, not the raw transcript, because the transcript is far larger than the evidence it holds. Open the raw transcript only to settle a detail the digest truncated.

## 2. Find lessons

A lesson is a mistake the user had to correct, or one the agent repeated, that a rule could have prevented. Look for:

- user corrections, reversals, and "don't", "no", "again", "I said" messages;
- the same tool error or failed command more than once;
- work redone after a wrong assumption, a skipped check, or a misread instruction;
- a gotcha the agent found the hard way (a tool flag, a path, a version) that the next session would hit again.

Skip one-off slips with no pattern, mistakes the agent caught and fixed itself without cost, and anything already fixed in this session's diff. Cite each lesson by digest reference (`U12`, `E40`).

Before proposing a fix, search for an existing rule that already covers it in `~/.agents/defaults/INSTRUCTIONS.md`, `~/.agents/skills/`, the project's `AGENTS.md` or `CLAUDE.md`, and its `CODING_STANDARDS.md`. A covered lesson that was still broken means the existing rule is too weak or misplaced: propose sharpening or moving it rather than adding a second one.

## 3. Place each fix

Choose the first home that fits, because a guarantee beats a request and narrow scope beats global load:

| Home | When |
|---|---|
| Hook, lint rule, or script | The rule needs no judgement and can be checked mechanically. Name the tool and the exact rule or check |
| Skill or reference edit | The rule applies only while doing one kind of work (debugging, reviewing, UI). Name the file and section |
| Project `AGENTS.md` | The rule is true in every session of this project and the agent cannot discover it by looking |
| Project `CODING_STANDARDS.md` | A code judgement call for this project; `review` reads it |
| `~/.agents/defaults/INSTRUCTIONS.md` | True in every session of every project; reserve for mistakes seen across projects |
| Drop | No pattern, or the cost of the rule outweighs the mistake |

Load the `write` skill through the Skill tool, or your runtime's equivalent, before drafting any instruction text, and follow its wording rules. Never create a new skill: a new description is load on every session.

## 4. Present and apply

Present one numbered list, most costly lesson first. For each:

- **Lesson:** what went wrong, with digest references.
- **Fix:** the home from step 3 and the exact change, as a diff or the precise rule.
- **Why there:** one line on why this home and not a broader one.

End with the lessons you dropped and why, in one line each. Wait for the user to choose. Apply only the chosen fixes; for a hook or lint rule, prove it bites by showing it fail on the original mistake and pass on the fix.

The retro is complete when every lesson found is either applied, declined by the user, or listed as dropped.
