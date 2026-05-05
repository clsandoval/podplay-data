---
name: discovery-call
description: Run a first-meeting / site-visit workflow — prep research, structured questioning, and post-call follow-up (lead update, meeting file, action items, draft email)
---

# Discovery Call

The first real conversation with a venue. Goal is not to sell — it is to understand the venue, qualify against the ICP, and earn the right to a proposal.

## When this runs

- User says "prep me for a call with [venue]", "discovery call with [client]", "site visit prep", or similar.
- After a first call: user says "process the call notes for [venue]" or similar, with transcript/notes attached.

Two phases: **prep** (before the call) and **debrief** (after).

---

## Phase 1: Prep

### 1. Read the existing record

- `data/leads/<slug>.md` if it exists. If not, create a stub lead file in `initial_contact` stage before the call.
- `data/clients/<slug>.md` if the venue is an existing client.
- Any prior `data/meetings/*.md` with the same contact.
- `data/notes/sales/icp.md` for the qualification criteria.

### 2. Research the venue

Do 10–15 minutes of research and capture findings in the lead file:

- **Venue basics:** how many courts, sport(s), location, opening date or years operating.
- **Operator type:** single venue or chain, who owns it, who runs it day-to-day.
- **Public signals:** social media activity, pricing published on their site, any press or reviews mentioning operational pain.
- **Tech maturity:** do they have a booking platform, cameras, displays already? Is the website modern or neglected?
- **Buying triggers:** any obvious ones from the ICP list (expansion, opening, staff pressure, incident).

### 3. Set the objective

Before the call, write down three things in the prep section of the lead file:

- **What I need to learn** — the top 3 gaps blocking a go/no-go decision. Court count, budget range, timeline, decision process, existing infrastructure — whichever is still unknown.
- **What I want them to feel** — typically: "understood, not sold to; confident that we've done this before; clear on what happens next if they move forward."
- **What the next step should be** — site visit? Proposal? Intro to the owner? Know before the call starts.

### 4. Prepare questions

Pull from the discovery bank below. Don't read them like a script — pick the 6–10 most relevant and keep them handy.

**Context (safe, warm-up):**
- Tell me about the venue — how many courts, how long have you been running it?
- Who handles the day-to-day operations?
- What's the member / player experience like today from first booking to walking out?

**Current state:**
- How are bookings handled? Phone, app, walk-in?
- What does a busy Saturday look like from your side of the desk?
- What technology do you have in place today — cameras, displays, booking system?
- How do you handle disputes over court time or close calls?

**Pain:**
- What's the single thing that, if it stopped happening, would make your life noticeably better?
- Where do you feel you're losing time or money that shouldn't be lost?
- What's driving you to explore this now versus six months ago?

**Stakes (later in the call):**
- If you do nothing for the next twelve months, what does that cost you?
- Who else in the business feels this problem?
- If this works, what number or outcome changes for the venue?

**Decision process:**
- Who needs to be involved in deciding on something like this?
- What's your timeline for making a call?
- What budget range are you working with, or is that still being scoped?

**Technical / feasibility:**
- What's your internet situation? Is it dedicated business fiber or shared?
- What's the ceiling like — solid, drop-tile, exposed?
- How's the power setup at the venue?

### 5. Output

Write a short prep note as the body of the lead file (or append to it), listing the three objectives and the 6–10 questions. That's the agent's deliverable for phase 1.

---

## Phase 2: Debrief

After the call, the user brings notes or a transcript. This is where the work compounds.

### 1. Process the notes

Run the `meeting-to-tickets` skill first — it parses the raw notes into decisions, action items, and open questions, creates tickets, and updates dependent entities.

### 2. Update the lead

Based on what was learned, update `data/leads/<slug>.md`:

- **Contact fields** — fill in `contact_name`, `contact_email`, `contact_phone` if captured.
- **`estimated_value`** — compute from the rate card using the court count and likely tier.
- **`expected_close`** — infer from their stated decision timeline.
- **Body** — add a section summarizing the call: who they are, what they need, what's blocking a decision, what happens next.

### 3. Qualify

Run the ICP check from `data/notes/sales/icp.md`:

- Venue profile: Ideal / Acceptable / Disqualify?
- At least one buying trigger present?
- Primary buyer persona identified?
- Any disqualification signal active?

If they pass, advance the lead `stage` from `initial_contact` to `qualified` in the same PR.
If they're borderline, keep in `initial_contact` and note in the body what would need to be true to qualify.
If they're disqualified, advance to `lost` with a reason in the body — don't ghost the entry.

### 4. Draft the follow-up email

Create a draft email file in `data/notes/sales/emails/<lead-slug>-followup_YYMMDD.md`. Rules:

- From the user (the account owner), not from "PodPlay" generically.
- Reference **one or two specific things they said** on the call. This is the whole point of sending a follow-up rather than a template.
- State the next step in one sentence. Don't load up five action items.
- If the call qualified them for a proposal, the next step is "I'll send a proposal by [date]". If it didn't, the next step is whatever was agreed (site visit, call with the owner, reference check).
- Sign off plainly. No "industry-leading", no "unparalleled", no em-dashes.

Surface the draft in the PR body so the user can copy and send.

### 5. Report

One plain summary at the end:

```
Discovery debrief — Makati Sports Hub

- Lead advanced from initial_contact to qualified
- Venue: 6 courts, single-operator, opening December 2026
- Estimated value: $20,000 (Pro tier, 6 courts)
- 3 tickets created for follow-ups
- Draft follow-up email: data/notes/sales/emails/makati-sports-hub-followup_260422.md
- Next step: send proposal by 2026-04-29

PR: <link>
```

## Rules

- **Don't qualify a lead the agent is unsure about.** If two of the four ICP checks are ambiguous, leave the lead in `initial_contact` and say why.
- **Don't invent call content.** If something wasn't in the notes, don't put it in the summary. Flag it as a follow-up question for the next conversation.
- **Follow-up email is a draft, not a send.** The user sends; the agent drafts. Never send an email on behalf of the user without explicit confirmation.
- **Prep is cheap, debrief is valuable.** If pressed for time, skip the prep phase. The debrief is what compounds.
