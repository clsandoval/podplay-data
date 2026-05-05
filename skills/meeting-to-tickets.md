---
name: meeting-to-tickets
description: Turn a meeting note into decisions, action items, and tickets — closes the loop so nothing discussed gets lost
---

# Meeting → Tickets

When a new meeting file lands in `data/meetings/` (or the user pastes a transcript / notes), extract structure from it and create the dependent records in the same pass.

## Trigger

- User says "process this meeting", "file the action items", "turn this into tickets", or similar.
- A new meeting file is created with free-form notes and no "Action Items" section yet filled in.
- User pastes a call transcript or site-visit notes.

## Process

1. **Parse the meeting.** Read the note (or transcript) and extract four buckets:
   - **Decisions** — anything agreed on. Who decided, what, why.
   - **Action items** — each with an owner and a due date (infer a sensible date if unstated, mark it as inferred).
   - **Open questions** — things that need follow-up but aren't yet someone's job.
   - **Parking lot** — ideas surfaced but consciously deferred.

2. **Write the parsed structure back into the meeting file.** Update the three standard sections: `## Notes`, `## Action Items`, and add `## Decisions` and `## Open Questions` if any exist. Keep the raw transcript/notes intact under a `## Transcript` or `## Raw Notes` section at the bottom so nothing is lost.

3. **Create a ticket per action item** in `data/tickets/` using the Ticket schema from CLAUDE.md:
   - `title`: the action in imperative form ("Ship LBC box to Tela Park")
   - `project`: wikilink to the meeting's project
   - `assigned_to`: wikilink to the owner
   - `severity`: infer from context (default `medium`)
   - `status`: `open`
   - `created_date`: meeting date
   - Body: 1-2 lines of context quoted from the meeting, plus a wikilink back to the meeting file.

4. **Update dependent entities** when the meeting surfaced new information:
   - Site survey measurements → update the `data/venues/*.md` file.
   - Client feedback or preferences → update `data/clients/*.md`.
   - Vendor pricing or lead time → update `data/vendors/*.md`.
   - New lead contact or stage change → update `data/leads/*.md`.
   - Change in project stage or deployment date → update `data/projects/*.md`.

5. **Bundle everything into one PR** per the Write Path rules. New ticket files commit direct; edits to existing entities go through auto-merge. One logical operation = one PR.

6. **Report back to the user plainly.** One line per thing created or changed, with the merged PR link. Example:
   ```
   Processed 2026-04-10-tela-park-kickoff.md:
   - 3 decisions recorded
   - 4 tickets created: tela-park-ticket-012..015
   - Updated data/venues/tela-park-venue.md (added AP count, power spec)
   - Updated data/projects/tela-park.md (deployment_date → 2026-04-28)
   PR: <link>
   ```

## Rules

- **Don't invent owners or dates.** If the notes don't say who or when, mark `assigned_to: TODO` and `due_date: TODO` rather than guessing. Flag `TODO`s in the report so the user can fill them in.
- **One ticket per action item.** Don't roll up "fix the network issues" into a single ticket if the notes list three distinct fixes. Split them.
- **Don't create decision logs as separate files.** Decisions live inside the meeting file under `## Decisions`. If a decision is load-bearing enough that future projects should find it, note it in the related project file's body too.
- **Link everything both ways.** Tickets link to the meeting; the meeting's Action Items section links to the tickets (`[[tela-park-ticket-012]]`).
- **Skip if already processed.** If the meeting file already has a populated Action Items section with wikilinks to tickets, don't redo the work. Ask the user whether they want to reprocess.

## Edge cases

- **No project linked.** If the meeting has no `project` field and the notes make it clear which venue/client it's about, populate the field before processing. If truly ambiguous, ask the user once.
- **Multiple projects in one meeting.** Split action items by project when creating tickets. Each ticket gets the right project link.
- **Recurring meetings.** A weekly check-in file may already have decisions from prior weeks. Only extract items from the latest session (usually the top of the notes).
