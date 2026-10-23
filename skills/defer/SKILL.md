---
name: defer
description: Schedules the current work to resume unattended at a given time later in this session, and keeps the machine awake until it finishes.
argument-hint: "[time, such as 7:00]"
disable-model-invocation: true
---

# Defer

Resume the current work by itself later, while the user is away.

1. **Time:** the supplied time, at its next occurrence. With none, ask for it; the status line shows when the 5-hour limit resets.
2. **Schedule:** create a one-shot `CronCreate` task at that minute, off `:00` and `:30`. Write its prompt to stand alone: the remaining steps in order, the user's authorization in their words, to stash a backup first in each git repository it will change (`[ -z "$(git status --porcelain)" ] || { git stash push -u -m defer-backup && git stash apply --index; }`, because on a clean tree `git stash push` creates nothing and the `apply` would restore an older, unrelated stash), to skip and list anything that needs a permission prompt or the user's decision instead of waiting, to stop the keep-awake process from step 3 when it finishes, and to end with a report of what was done, skipped, and needs the user.
3. **Keep awake** for the seconds until the task plus the hours the work needs, with the command for this OS:
   - macOS: `nohup caffeinate -dimsu -t <seconds> >/dev/null 2>&1 &`
   - Linux with systemd: `nohup systemd-inhibit --what=idle:sleep:handle-lid-switch --who=defer --why=defer sleep <seconds> >/dev/null 2>&1 &`
   - Otherwise, tell the user the machine must not sleep and how to prevent it.
4. **Report** the fire time, the task ID, the keep-awake command and its end time, and that this session must stay open with the machine on power.
