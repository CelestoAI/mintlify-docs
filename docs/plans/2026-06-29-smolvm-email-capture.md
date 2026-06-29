# SmolVM Intro Email Capture Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task after the capture backend is chosen.

**Goal:** Add a lightweight email capture CTA to the SmolVM intro page so high-intent docs visitors can subscribe to SmolVM release notes, product updates, and early-access follow-up.

**Architecture:** Use a no-JS-first embed inside Mintlify MDX on `smolvm/introduction.mdx`. The initial safest implementation should use an iframe/hosted form or normal external link because this Mintlify repo currently has no custom React components and no package/build layer. If we later confirm Mintlify custom JS/components are available, replace the hosted form with an inline native form.

**Tech Stack:** Mintlify docs, MDX, external email capture backend (recommended: Loops if it provides a hosted subscribe page or embeddable form; fallback: Tally/Typeform + Zapier/Make into Loops/HubSpot/Slack).

---

## Recommendation

Use a two-step rollout:

1. **Phase 1 — ship in one hour:** Add an inline CTA card to `smolvm/introduction.mdx` with a button to a hosted form. This avoids Mintlify custom-script uncertainty and gets capture live immediately.
2. **Phase 2 — improve conversion:** Replace the hosted-link CTA with an embedded iframe form once the chosen provider's embed is confirmed to work in Mintlify.

Recommended CTA copy:

> **Get SmolVM updates**  
> New releases, agent sandbox patterns, and production notes. No spam — just the useful bits.

Button:

> Get updates

Fields:
- Email — required
- Role — optional dropdown/text: founder, engineer, researcher, investor, other
- What are you building? — optional short text

Hidden/source metadata to capture if provider supports it:
- `source=docs`
- `product=smolvm`
- `page=smolvm-introduction`
- `utm_source`, `utm_medium`, `utm_campaign` if present

---

## Task 1: Choose and create the capture backend

**Objective:** Create the form endpoint/page before touching docs content.

**Files:**
- No repo changes yet

**Steps:**
1. Pick backend:
   - Preferred: Loops hosted form / audience form if available.
   - Fastest fallback: Tally form embedded or linked from docs.
   - CRM-heavy fallback: HubSpot form if Celesto wants these leads directly in CRM.
2. Create a list/audience named `SmolVM Docs Subscribers`.
3. Create the form with fields:
   - Email: required
   - Role: optional
   - What are you building?: optional
4. Configure a thank-you message:
   - `Thanks — we'll send SmolVM releases, sandbox patterns, and early-access notes.`
5. Configure notifications:
   - Send a Slack/email alert for new subscribers if supported.
6. Copy either:
   - Hosted form URL, or
   - iframe embed URL/snippet.

**Verification:**
- Submit a test email such as `test+smolvm@celesto.ai`.
- Confirm it appears in the correct list/audience.
- Confirm notification fires if configured.

---

## Task 2: Add the first CTA after the hero cards

**Objective:** Put the capture CTA near the top of the highest-traffic page, before the user gets lost in quickstart details.

**Files:**
- Modify: `smolvm/introduction.mdx:30-32`

**Implementation:**
Insert after `</CardGroup>` and before `## Quickstart`:

```mdx
<Note>
  **Get SmolVM updates** — new releases, agent sandbox patterns, and production notes. No spam, just the useful bits.

  [Get updates](REPLACE_WITH_HOSTED_FORM_URL)
</Note>
```

If Mintlify renders HTML well and the provider gives iframe embed support, use this instead:

```mdx
<Frame caption="Get SmolVM updates">
  <iframe
    src="REPLACE_WITH_EMBED_URL"
    title="Subscribe to SmolVM updates"
    width="100%"
    height="360"
    style={{ border: "0", borderRadius: "12px" }}
  />
</Frame>
```

**Verification:**
- Run Mintlify dev preview if available: `mintlify dev` from repo root.
- Open `/smolvm/introduction`.
- Confirm CTA appears above Quickstart.
- Submit one test email if iframe is used, or click hosted link if link CTA is used.

---

## Task 3: Add a second CTA near Next steps

**Objective:** Capture users who read/skim to the end of the intro page.

**Files:**
- Modify: `smolvm/introduction.mdx:160-164`

**Implementation:**
Insert before `## Next steps`:

```mdx
<Tip>
  Building agent sandboxes or evaluating SmolVM for production? [Get SmolVM updates](REPLACE_WITH_HOSTED_FORM_URL) and we'll send release notes plus practical implementation patterns.
</Tip>
```

**Verification:**
- Preview `/smolvm/introduction`.
- Confirm the second CTA is visible after the SDK section and before Next steps.
- Confirm link opens in a new page if Mintlify supports external-link behavior automatically.

---

## Task 4: Track CTA clicks in PostHog

**Objective:** Measure conversion intent from the docs even if the external form conversion is measured elsewhere.

**Files:**
- Modify: `smolvm/introduction.mdx`

**Preferred implementation if custom JS is not available:**
Use URL params on the form URL:

```text
REPLACE_WITH_HOSTED_FORM_URL?utm_source=docs&utm_medium=smolvm_intro&utm_campaign=email_capture
```

**Better implementation if Mintlify custom JS becomes available:**
Attach PostHog click tracking to elements with `data-analytics-id="smolvm-email-capture"`.

**Verification:**
- Click the CTA.
- Confirm UTM parameters arrive in the form provider analytics.
- If PostHog click tracking is supported, confirm event appears with page URL `/smolvm/introduction`.

---

## Task 5: Add privacy-safe expectation copy

**Objective:** Keep the CTA transparent and aligned with the updated privacy policy.

**Files:**
- Modify: `smolvm/introduction.mdx`

**Implementation:**
Add one sentence below the primary CTA or in the form description:

```mdx
By subscribing, you agree to receive occasional SmolVM product emails. You can unsubscribe anytime.
```

If space is tight, use:

```mdx
Occasional product emails. Unsubscribe anytime.
```

**Verification:**
- CTA still feels lightweight, not legalistic.
- Copy is visible before submit/click.

---

## Task 6: Validate docs build/preview

**Objective:** Make sure Mintlify accepts the MDX and the page renders correctly.

**Files:**
- No new file changes unless preview reveals MDX syntax issues.

**Commands:**

```bash
cd /Users/aniket/Projects/celesto/mintlify-docs
mintlify dev
```

If `mintlify` is missing:

```bash
npx mintlify dev
```

**Expected:**
- Dev server starts.
- `/smolvm/introduction` renders with no MDX errors.
- CTA appears in both top and lower placements.

---

## Task 7: Deploy and watch conversion

**Objective:** Ship and measure for one week.

**Files:**
- Commit: `smolvm/introduction.mdx`

**Commit:**

```bash
git add smolvm/introduction.mdx docs/plans/2026-06-29-smolvm-email-capture.md
git commit -m "docs: add SmolVM email capture plan and CTA"
```

**Post-deploy checks:**
1. Visit production `https://docs.celesto.ai/smolvm/introduction`.
2. Submit a real test subscriber.
3. Confirm the subscriber lands in the list.
4. Confirm unsubscribe link exists in the first email if an automated welcome email is configured.
5. After 7 days, review:
   - Pageviews to `/smolvm/introduction`
   - CTA clicks / form opens
   - Submissions
   - Conversion rate

**Success threshold:**
- Week 1 target: 2-5% visitor-to-form-click rate.
- Week 1 target: 0.5-2% visitor-to-email conversion.

---

## Open Questions Before Implementation

1. Which backend should we use?
   - Loops hosted/embedded form preferred if available.
   - Tally fastest if Loops embed is inconvenient.
   - HubSpot best if sales CRM handoff matters immediately.
2. Do we want just email, or also optional role/building fields?
3. Should subscribers receive an automated welcome email immediately?
4. Should new signups notify Slack?

## My Default Choice

Use **Loops** if Celesto already has/wants a dev-friendly mailing list. Use **Tally** only as a 30-minute fallback if Loops form embedding is annoying. Start with the hosted-link CTA, then upgrade to iframe once confirmed in Mintlify preview.
