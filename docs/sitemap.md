# Pentalogic Website Sitemap

Issue: #1 - Create full website sitemap  
Owner: Member 1  
Status: Ready for review

## Sitemap Overview

The Pentalogic website should use a simple, professional structure that helps visitors understand the company, explore services, read insights, and contact the team.

```text
/
├── /about
├── /services
│   ├── /services/data-strategy
│   ├── /services/predictive-analytics
│   ├── /services/data-systems
│   └── /services/custom-software
├── /insights
│   └── /insights/[slug]
├── /case-studies
├── /contact
├── /privacy-policy
└── /terms-of-service
```

## Main Navigation

These links should appear in the website header.

| Label | Route | Purpose |
|---|---|---|
| Home | `/` | Introduce Pentalogic and guide visitors to key sections |
| About | `/about` | Explain the company story, mission, vision, team, and values |
| Services | `/services` | Show the main service categories |
| Insights | `/insights` | Share articles, reports, and thought leadership |
| Case Studies | `/case-studies` | Show future client success stories |
| Contact | `/contact` | Let visitors contact Pentalogic |

## Footer Navigation

These links should appear in the website footer.

| Group | Links |
|---|---|
| Company | Home, About, Contact |
| Services | Data Strategy, Predictive Analytics, Data Systems, Custom Software |
| Resources | Insights, Case Studies |
| Legal | Privacy Policy, Terms of Service |

## Page Details

| Page | Route | Priority | Assigned Build Issue | Notes |
|---|---|---|---|---|
| Home | `/` | High | #13 | First impression of the company, services, trust signals, and call to action |
| About Us | `/about` | High | #14 | Company story, mission, vision, values, and team section |
| Services Overview | `/services` | High | #15 | Overview of all four service categories |
| Data Strategy | `/services/data-strategy` | High | #16 | Explain data strategy consulting and planning |
| Predictive Analytics | `/services/predictive-analytics` | High | #16 | Explain analytics, forecasting, and intelligence work |
| Data Systems | `/services/data-systems` | High | #16 | Explain data platforms, pipelines, and systems |
| Custom Software | `/services/custom-software` | High | #16 | Explain custom software and digital product development |
| Insights / Blog | `/insights` | Medium | #17 | Listing page for articles and thought leadership |
| Individual Blog Post | `/insights/[slug]` | Medium | #18 | Template for full insight articles |
| Case Studies | `/case-studies` | Low | #19 | Future page for project success stories |
| Contact Us | `/contact` | High | #20 | Contact form, email, location, and social links if available |
| Privacy Policy | `/privacy-policy` | Medium | #21 | Explain privacy and data handling |
| Terms of Service | `/terms-of-service` | Medium | #22 | Explain website use rules and disclaimers |

## Suggested User Flow

1. Visitor lands on the homepage.
2. Visitor learns what Pentalogic does.
3. Visitor opens the Services page.
4. Visitor chooses a specific service page.
5. Visitor reads supporting content such as insights or case studies.
6. Visitor contacts Pentalogic through the Contact page.

## SEO Notes

Each public page should have:

- A unique page title.
- A clear meta description.
- One main heading.
- Clean URL structure.
- Internal links to related pages.

The sitemap should later be used to create:

- `sitemap.xml`
- `robots.txt`
- SEO metadata for each page

## Acceptance Criteria

- All required website pages are listed.
- Routes are clear and consistent.
- Main navigation and footer navigation are defined.
- Service pages are grouped under `/services`.
- Blog post pages use a reusable dynamic route.
- Legal pages are included.
- The sitemap supports future SEO work in Issue #24.
