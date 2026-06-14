# 48-Hour Launch Playbook for the First $10

Goal: get the first $10 online from the AI Disclosure Generator by selling a tiny sponsor slot, not by waiting for ad revenue.

## Positioning

One-line pitch:

> AI Disclosure Generator creates clear AI-use disclosure statements for blogs, YouTube videos, games, client work, education materials, marketing pages, and AI images.

Sponsor offer:

> $10 launch sponsor slot: a small text placement for a relevant creator, compliance, publishing, or AI workflow tool.

Best sponsor targets:

- Tiny AI tools that sell to creators, indie hackers, writers, YouTubers, educators, or freelancers
- Newsletter writers covering AI, creator economy, compliance, publishing, or indie products
- Chrome extensions or micro SaaS tools that need early traffic and backlinks
- Template sellers on Gumroad, Lemon Squeezy, Ko-fi, or Buy Me a Coffee

Avoid:

- Crypto, gambling, adult, fake-review, plagiarism, school-cheating, or impersonation sponsors
- Any sponsor that would make AdSense approval harder later

## Before Posting

Replace these placeholders:

- Site URL: `https://ai-disclosure-generator.com/`
- Sponsor email: `hello@ai-disclosure-generator.com`
- Payment link: Buy Me a Coffee, Ko-fi, Lemon Squeezy, Stripe Payment Link, or a platform you can receive through

Minimum launch checklist:

- Deploy the static site
- Confirm `/robots.txt`, `/sitemap.xml`, and `/llms.txt` return 200
- Submit the site to Google Search Console and Bing Webmaster Tools
- Test the sponsor mail link from the deployed site

## Day 1: Direct Outreach

Send 30 short messages. The first $10 is more likely from direct outreach than passive traffic.

Target search terms:

- `site:indiehackers.com AI tool creator`
- `site:producthunt.com AI writing tool`
- `site:gumroad.com AI template`
- `site:lemonsqueezy.com AI tool`
- `site:reddit.com/r/SideProject AI tool`
- `site:reddit.com/r/indiehackers AI tool`

Direct message template:

```text
Hey, I built a small free tool for creators: AI Disclosure Generator.

It helps users create clear AI-use disclosure statements for blogs, YouTube, games, client work, education, marketing, and AI images.

I am offering the first launch sponsor slot for $10. It is a small text placement for a relevant creator or AI workflow product.

Your tool seems like a good fit for creators who care about AI workflows. Interested in taking the first slot?

Site: https://ai-disclosure-generator.com/
```

Shorter version:

```text
Hey, I launched a free AI Disclosure Generator for creators and indie makers.

I am selling the first tiny sponsor slot for $10. Your product looks relevant to the audience.

Want the launch slot?
https://ai-disclosure-generator.com/
```

Follow-up after 24 hours:

```text
Quick follow-up. I am keeping the first sponsor slot at $10 while the site is new.

If you want it, I can add a short line like:
"Sponsored by [Name] - [one short benefit]."
```

## Day 1: Public Posts

Post to 5 to 8 places. Keep it useful, not salesy.

Post title options:

```text
I made a free AI disclosure statement generator for creators
```

```text
Free tool: generate AI-use disclosure statements for blogs, YouTube, games, and client work
```

Post body:

```text
I built a small free tool called AI Disclosure Generator.

It creates clear disclosure statements for cases where AI helped with brainstorming, drafting, editing, translation, images, code assistance, research, or voice/video generation.

It supports English, Chinese, and bilingual output. It also gives a short social version and a structured bullet version for client docs or platform forms.

No login, no saved input, no AI API call.

Feedback welcome:
https://ai-disclosure-generator.com/
```

Where to post:

- Indie Hackers
- Product Hunt upcoming/launch post
- Hacker News `Show HN` when the deployed site is polished
- Reddit communities such as `r/SideProject`, `r/indiehackers`, `r/EntrepreneurRideAlong`, `r/ChatGPT`, `r/freelance`
- X/Twitter with tags around AI creators, indie hacking, and creator tools
- LinkedIn post targeting creators, marketers, educators, and compliance-minded teams

## Day 2: Sponsor Close

When someone replies positively, send this:

```text
Great. The launch sponsor slot is $10.

Placement format:
Sponsored by [Name] - [one short benefit or offer]

I can place it near the generator/support area and keep it lightweight.

Send:
1. Sponsor name
2. URL
3. One sentence benefit
4. Preferred payment method
```

Sponsor copy examples:

```text
Sponsored by ClearDraft - AI writing workflows for creators who publish faster.
```

```text
Sponsored by IndiePolicy - simple policy templates for small AI products.
```

```text
Sponsored by CreatorKit - templates for YouTubers, bloggers, and newsletter writers.
```

After payment, fulfill the sponsor slot by setting:

```text
VITE_SPONSOR_NAME=Sponsor name
VITE_SPONSOR_URL=https://sponsor.example
VITE_SPONSOR_TAGLINE=One short benefit for creators.
```

Then rebuild and redeploy. The site will switch from the "$10 launch sponsor slot" CTA to a "Launch sponsor" placement.

## If No Sponsor Replies

Do these fallback actions:

- Add a real Ko-fi or Buy Me a Coffee link and ask for $3 support instead of a $10 sponsor
- Offer a $10 custom AI disclosure statement review for one creator or freelancer
- Offer to write 5 platform-specific disclosure templates for $10
- DM creators who recently posted AI-generated images, videos, courses, or client deliverables

Fallback service pitch:

```text
I can write a clear AI-use disclosure statement for your project for $10.

Send me:
1. What you made
2. Which AI tools you used
3. What AI helped with
4. Whether a human reviewed the final content

I will send you a polished version, a short social version, and a structured bullet version.
```

## Success Criteria

The objective is not "get traffic." The objective is one of:

- One $10 sponsor payment
- Two $5 support payments
- One $10 custom disclosure-writing service
- Any equivalent online payment from the tool or its related service
