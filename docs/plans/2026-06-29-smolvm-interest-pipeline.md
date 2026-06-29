# SmolVM Interest Capture and Pipeline Implementation Plan

> **For Hermes:** Use this plan to implement the first SmolVM docs lead-capture loop. The repo-side work is intentionally lightweight and can ship before a full CRM/email backend exists.

**Goal:** Convert high-intent SmolVM docs traffic into an actionable founder-led pipeline by adding interest capture CTAs, source tracking, qualification fields, and a manual follow-up workflow.

**Architecture:** Start with a Mintlify-native CTA on `smolvm/introduction.mdx` that points to a form URL. Until a live form URL exists, use a working `mailto:` fallback so the page never ships a broken link. Keep the URL as a single Markdown reference at the bottom of the page so replacing it with Tally/Typeform/Loops is a one-line change.

**Tech Stack:** Mintlify MDX, Tally/Typeform/Loops hosted form, PostHog for traffic/CTA measurement, RB2B for account-identification signal, Notion/HubSpot later for pipeline tracking.

---

## Current Context

PostHog showed that SmolVM docs are the strongest current acquisition surface:

- `docs.celesto.ai/smolvm/introduction`: 168 pageviews / 93 users
- `docs.celesto.ai/smolvm/installation`: 39 pageviews / 25 users
- GitHub: 147 pageviews / 22 users
- Direct traffic: 833 pageviews / 183 users

Problem:

> Visitors are showing intent, but Celesto has no reliable way to capture, qualify, or follow up with them.

---

## Product Decision

Use the form as an **interest list + pipeline intake**, not just a newsletter signup.

The visitor should be able to say:

1. “Just send me updates.”
2. “I’m evaluating this now.”
3. “I want to talk.”

Those answers determine whether the lead goes into nurture or manual founder follow-up.

---

## Backend Recommendation

### Default: Tally

Use Tally first if the goal is speed and simplicity.

Recommended form fields:

1. **Email** — required
2. **What are you building with agents or sandboxes?** — optional long text
3. **Which best describes you?** — optional choice
   - Founder
   - Engineer
   - Researcher
   - Investor
   - Other
4. **What would you like?** — required choice
   - Send me SmolVM updates
   - I’m evaluating this now
   - I’d like a quick technical chat

Thank-you message:

> You’re on the list — thanks. If you’re actively building with agent sandboxes, we’ll reach out personally when useful.

Notification:

- Send new submissions to Aniket/Sam by email or Slack.

### Later: Loops or HubSpot

- Loops if this becomes a product-led email list.
- HubSpot if this becomes a sales-led CRM pipeline.

---

## Pipeline Stages

Keep it manually operated at first:

```text
New Interest
  → Qualified
  → Reached Out
  → Call Booked
  → Design Partner / Trial
  → Nurture / Closed
```

Qualification rule:

- Company email: +3
- “Evaluating this now” or “technical chat”: +3
- Concrete use case: +2
- Founder/engineer/researcher: +1
- Came from docs/GitHub: +1

Score:

- 8–10: reach out same day
- 5–7: reach out this week
- 1–4: nurture only

---

## Repo Implementation

### Task 1: Add top CTA to SmolVM intro

**Objective:** Capture high-intent visitors before the quickstart section.

**File:** `smolvm/introduction.mdx`

**Insert after the feature `</CardGroup>` and before `## Quickstart`:**

```mdx
<Note>
  **Building with agent sandboxes?** Get SmolVM release notes, implementation patterns, and early-access updates.

  [Join the SmolVM interest list][smolvm-interest-list]
</Note>
```

### Task 2: Add lower CTA before Next steps

**Objective:** Capture readers who have made it through the page.

**File:** `smolvm/introduction.mdx`

**Insert before `## Next steps`:**

```mdx
<Tip>
  Evaluating secure code execution, browser agents, or long-running agent environments? [Tell us what you're building][smolvm-interest-list] and we'll send the useful SmolVM updates — or follow up personally if you're evaluating now.
</Tip>
```

### Task 3: Add one swappable URL reference

**Objective:** Avoid duplicating URLs and make the real form swap one-line.

**File:** `smolvm/introduction.mdx`

**Add at the bottom:**

```mdx
[smolvm-interest-list]: mailto:founders@celesto.ai?subject=SmolVM%20interest&body=Hi%20Celesto%20team%2C%0A%0AI%27m%20interested%20in%20SmolVM.%20Here%27s%20what%20I%27m%20building%3A%0A%0A
```

When the real form exists, replace this with:

```mdx
[smolvm-interest-list]: https://tally.so/r/FORM_ID?utm_source=docs&utm_medium=smolvm_intro&utm_campaign=email_capture
```

or:

```mdx
[smolvm-interest-list]: https://form.typeform.com/to/FORM_ID?utm_source=docs&utm_medium=smolvm_intro&utm_campaign=email_capture
```

---

## Verification

Run from repo root:

```bash
mintlify dev
```

If unavailable:

```bash
npx mintlify dev
```

Manual checks:

1. Open `/smolvm/introduction`.
2. Confirm top CTA appears above Quickstart.
3. Confirm lower CTA appears above Next steps.
4. Click both links.
5. Confirm the temporary mailto opens an email compose window.
6. After replacing with Tally/Typeform, confirm UTM parameters are preserved.

---

## Follow-Up Workflow

Daily or weekly, review new submissions.

For high-intent submissions, send within 24 hours:

```text
Subject: Saw your SmolVM interest

Hey {first_name},

Saw you signed up for SmolVM updates — thanks.

Noticed you mentioned: “{what_they_are_building}”.

Curious: are you mostly looking for secure code execution, browser agents, or long-running agent environments?

If helpful, happy to share what we’re building and see whether SmolVM fits your use case.

— Aniket
```

For very high-intent submissions:

```text
Subject: SmolVM / agent sandboxing

Hey {first_name},

Saw your SmolVM signup — looks like you’re evaluating sandbox infrastructure for {use_case}.

We’re building SmolVM for secure AI-agent execution: microVM isolation, persistent state, browser sandboxes, snapshots, and network controls.

Worth a quick 20-min technical chat this week? I’d love to understand what you’re building and see if we can help.

— Aniket
```

---

## Acceptance Criteria

- `smolvm/introduction.mdx` has two interest CTAs.
- Both CTAs use `[smolvm-interest-list]` reference URL.
- The current URL is not broken; it uses a working `mailto:` fallback until Tally/Typeform is created.
- The plan documents the exact Tally/Typeform replacement URL format.
- No unrelated repo changes are modified.

---

## Next Step After This Implementation

Create the actual Tally or Typeform form, then replace the `mailto:` reference with the form URL + UTM parameters.
