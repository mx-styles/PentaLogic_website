# Pentalogic Website Development

A company website project for **Pentalogic Consultancy**, a data, analytics, technology, and predictive intelligence consultancy.

The website will present Pentalogic’s services, team, thought leadership, case studies, contact information, and legal pages in a professional and responsive format.

---

## Project Goal

To design, develop, test, and launch a professional company website for Pentalogic Consultancy.

The website should:

- Clearly communicate Pentalogic’s value proposition.
- Present the company as a trusted technology and data consultancy.
- Showcase services in Data Strategy, Predictive Analytics, Data Systems, and Custom Software.
- Provide a clean user experience on desktop, tablet, and mobile.
- Support future publishing of insights, blogs, and case studies.
- Include basic SEO, legal pages, and a working contact page.

---
## Technology Stack

This project will use the following technology stack:

- Next.js for the website framework
- React for building user interface components
- TypeScript for safer and cleaner code
- Tailwind CSS for styling and responsive design
- MDX/Markdown for blog and insight content
- GitHub for version control and issue tracking
- Vercel for deployment and preview links
- Next.js Metadata API for SEO

## Team Members and Roles

Replace the placeholders below with the real GitHub usernames of the five developers.

| Member | GitHub Username | Main Role | Main Responsibility |
|---|---|---|---|
| Member 1 | `@member-1` | Project Lead / Full-stack Developer | Project coordination, sitemap, setup, SEO support, deployment, final review |
| Member 2 | `@member-2` | UI/UX Designer / Frontend Developer | Wireframes, branding, page layouts, visual consistency |
| Member 3 | `@member-3` | Content Lead / SEO Developer | Website copy, service content, legal content, SEO metadata |
| Member 4 | `@member-4` | Frontend Developer | Core page development, navigation, homepage, services pages |
| Member 5 | `@member-5` | Backend / QA / Deployment Support | Blog, contact form, testing, performance, deployment support |

---

## Milestones

### Milestone 1: UI/UX Wireframe & Copy Sign-off

This milestone focuses on planning, content, and design before full development begins.

| Issue | Task | Priority | Assigned To |
|---|---|---|---|
| #1 | Create full website sitemap | High | `@member-1` |
| #2 | Design homepage wireframe | High | `@member-2` |
| #3 | Write homepage website copy | High | `@member-3` |
| #4 | Design About Us page wireframe and content | High | `@member-2`, `@member-3` |
| #5 | Design Services Overview page | High | `@member-2` |
| #6 | Create individual service page template | High | `@member-2`, `@member-4` |
| #7 | Write content for Data Strategy service page | Medium | `@member-3` |
| #8 | Write content for Predictive Analytics service page | Medium | `@member-3` |
| #9 | Write content for Data Systems service page | Medium | `@member-3`, `@member-5` |
| #10 | Write content for Custom Software service page | Medium | `@member-3`, `@member-4` |

---

### Milestone 2: Website Development

This milestone focuses on building the website pages, components, routing, and core functionality.

| Issue | Task | Priority | Assigned To |
|---|---|---|---|
| #11 | Set up website project structure | High | `@member-1`, `@member-4` |
| #12 | Build responsive navigation and footer | High | `@member-4` |
| #13 | Build homepage | High | `@member-4`, `@member-2` |
| #14 | Build About Us page | High | `@member-4` |
| #15 | Build Services Overview page | High | `@member-4` |
| #16 | Build individual service pages | High | `@member-4`, `@member-5` |
| #17 | Build Insights/Blog listing page | Medium | `@member-5` |
| #18 | Build individual insight/blog post page | Medium | `@member-5` |
| #19 | Build Case Studies page | Low | `@member-5` |
| #20 | Build Contact Us page | High | `@member-5` |
| #21 | Add Privacy Policy page | Medium | `@member-3`, `@member-5` |
| #22 | Add Terms of Service page | Medium | `@member-3`, `@member-5` |

---

### Milestone 3: Branding, SEO, Testing & Launch

This milestone focuses on polishing, testing, optimization, deployment, and final approval.

| Issue | Task | Priority | Assigned To |
|---|---|---|---|
| #23 | Apply Pentalogic branding | High | `@member-2`, `@member-4` |
| #24 | Add SEO basics | High | `@member-3`, `@member-1` |
| #25 | Test website responsiveness | High | `@member-5`, all members |
| #26 | Test all links, buttons, and forms | High | `@member-5`, all members |
| #27 | Optimize website performance | Medium | `@member-5`, `@member-4` |
| #28 | Deploy website online | High | `@member-1`, `@member-5` |
| #29 | Final website review and sign-off | High | `@member-1`, all members |

---

## Recommended GitHub Labels

Use these labels to keep issues organized:

| Label | Purpose |
|---|---|
| `priority: high` | Important tasks that must be completed early |
| `priority: medium` | Important but not urgent tasks |
| `priority: low` | Nice-to-have or future-ready tasks |
| `milestone-1` | UI/UX, sitemap, and content planning |
| `milestone-2` | Website development |
| `milestone-3` | Branding, SEO, testing, and launch |
| `design` | Wireframes, layouts, branding, visuals |
| `content` | Website copy, service pages, legal content |
| `frontend` | Page building, components, responsiveness |
| `backend` | Forms, integrations, data handling |
| `seo` | Page titles, meta descriptions, sitemap, robots.txt |
| `qa` | Testing, review, bug fixing |
| `deployment` | Hosting, domain, SSL, live launch |

---

## Recommended Branching Strategy

The repository should use a simple team-friendly workflow.

### Main Branches

| Branch | Purpose |
|---|---|
| `main` | Stable production-ready code |
| `develop` | Main development branch where approved work is merged |
| `feature/issue-number-task-name` | Branch for each issue |

### Branch Naming Examples

```bash
feature/1-website-sitemap
feature/2-homepage-wireframe
feature/11-project-structure
feature/13-build-homepage
feature/20-contact-page
feature/28-deploy-website
```

---

## Git Workflow

Each member should follow this workflow:

1. Pick an assigned issue from GitHub Issues.
2. Create a new branch from `develop`.
3. Work on the task.
4. Commit changes clearly.
5. Push the branch to GitHub.
6. Open a Pull Request into `develop`.
7. Request review from at least one team member.
8. Fix requested changes.
9. Merge only after approval.

---

## Commit Message Guide

Use clear commit messages.

Examples:

```bash
feat: add responsive navigation bar
feat: build homepage hero section
content: add predictive analytics service copy
style: apply Pentalogic brand colours
fix: correct footer link routing
test: check contact form validation
docs: update README task assignment
```

Recommended commit types:

| Type | Meaning |
|---|---|
| `feat` | New feature or page |
| `fix` | Bug fix |
| `style` | Styling or design changes |
| `content` | Text or copy updates |
| `docs` | Documentation changes |
| `test` | Testing changes |
| `refactor` | Code improvement without changing behavior |
| `chore` | Setup, configuration, or maintenance |

---

## Suggested Project Structure

Update this section depending on the final framework selected.

```text
pentalogic-website/
│
├── public/
│   ├── images/
│   ├── logo/
│   └── favicon/
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── footer/
│   │   ├── cards/
│   │   └── sections/
│   │
│   ├── pages/
│   │   ├── home/
│   │   ├── about/
│   │   ├── services/
│   │   ├── insights/
│   │   ├── case-studies/
│   │   ├── contact/
│   │   ├── privacy-policy/
│   │   └── terms-of-service/
│   │
│   ├── styles/
│   ├── data/
│   └── utils/
│
├── README.md
├── package.json
└── .gitignore
```

---

## Main Website Pages

The website should include the following pages:

| Page | Purpose |
|---|---|
| Home | Introduce the company and guide visitors to key areas |
| About Us | Present the company story, mission, vision, team, and values |
| Services Overview | Show the four main service categories |
| Data Strategy | Explain the Data Strategy service |
| Predictive Analytics | Explain the Predictive Analytics service |
| Data Systems | Explain the Data Systems service |
| Custom Software | Explain the Custom Software service |
| Insights / Blog | Publish articles, reports, and thought leadership |
| Individual Blog Post | Display full insight articles |
| Case Studies | Showcase future client success stories |
| Contact Us | Allow visitors to contact Pentalogic |
| Privacy Policy | Explain data handling and privacy |
| Terms of Service | Explain website use rules and disclaimers |

---

## Definition of Done

A task is complete only when:

- The work matches the issue description.
- The acceptance criteria are satisfied.
- The page or feature is responsive.
- There are no broken links.
- The design is clean and professional.
- The code has been pushed to GitHub.
- A Pull Request has been opened.
- At least one team member has reviewed the work.
- The task is merged into `develop`.

---

## Pull Request Checklist

Before opening a Pull Request, check the following:

- [ ] I worked on the correct issue.
- [ ] My branch name follows the required format.
- [ ] My code runs locally.
- [ ] The page is responsive.
- [ ] Links and buttons work.
- [ ] I removed unused code.
- [ ] I added or updated content where needed.
- [ ] I tested my changes before submitting.
- [ ] I linked the Pull Request to the correct issue.

---

## Launch Checklist

Before the website goes live, the team must confirm:

- [ ] All high-priority issues are completed.
- [ ] Homepage is approved.
- [ ] About page is approved.
- [ ] Services pages are approved.
- [ ] Contact page is complete.
- [ ] Privacy Policy page is added.
- [ ] Terms of Service page is added.
- [ ] SEO basics are added.
- [ ] Website is tested on desktop, tablet, and mobile.
- [ ] All links and forms are tested.
- [ ] Website performance is optimized.
- [ ] Domain is connected.
- [ ] SSL certificate is active.
- [ ] Final review is approved by the Project Lead.

---

## Current Project Status

| Area | Status |
|---|---|
| Repository setup | Not started |
| Sitemap | Not started |
| Wireframes | Not started |
| Content | Not started |
| Development | Not started |
| Testing | Not started |
| Deployment | Not started |

---

## Notes for the Team

- Keep communication clear and professional.
- Update GitHub Issues as work progresses.
- Do not push directly to `main`.
- Use Pull Requests for all changes.
- Comment on issues when blocked.
- Keep the website simple, clean, fast, and professional.
- Always test on mobile before marking a task complete.
