# Skills

Portable skills for solo software development with Claude Code.

## Skills

| Skill | Use it for |
|---|---|
| `research` | Understanding codebases, researching technical topics, comparing options, planning changes, and writing documentation |
| `develop` | Implementing, debugging, refactoring, and verifying changes, including interfaces |
| `review` | Reviewing a change against its spec, project standards, and concrete defects |
| `interview` | Clarifying and stress-testing a plan, decision, or idea |
| `improve` | Finding architecture, test-suite, or UI improvements: `/improve [codebase\|tests\|ui] [scope]` |
| `prototype` | Answering a design question with a throwaway logic demo or UI variations |
| `spec` | Turning the current conversation into a feature spec |
| `write` | Writing skills, `CLAUDE.md`, and other documents agents read |
| `search` | Searching the web for official data and first-hand reports, discarding sponsored and AI-generated sources |
| `retro` | Turning the session's corrections and repeated mistakes into hooks, rules, or skill edits |
| `defer` | Resuming the current work at a given time, keeping the Mac awake |
| `obsidian` | Filing text, URLs, files, and audio into an Obsidian vault |

## Install

```sh
git clone https://github.com/cstrlcs/skills.git ~/.agents
~/.agents/setup
```

`setup` needs `jq` and `bun`, and is safe to rerun. It links `~/.claude/skills` to `skills/` and `~/.claude/CLAUDE.md` to `defaults/INSTRUCTIONS.md`, moving anything already there to a `.bkp` file. Then it merges [`defaults/claude-settings.json`](defaults/claude-settings.json) into `~/.claude/settings.json`, keeping your own settings: attribution off, a status line, permission rules, and the [`hooks/hook.ts`](hooks/hook.ts) hook.

When a turn ends, the hook formats the edited files with the project's oxfmt and runs its typecheck and `lint` scripts. Failures that mention an edited file go back to the agent; it only warns when the agent ends on a question or after three blocks in a row.

## Maintain

- Run `bun hooks/lint.ts` after editing skills.
- [`upstreams.json`](upstreams.json) pins the repositories these skills draw on. To update, compare each pinned commit with `HEAD` and read the `watch` paths.

## License

Apache License 2.0. See [LICENSE](LICENSE); credits are in [NOTICE.md](NOTICE.md).
