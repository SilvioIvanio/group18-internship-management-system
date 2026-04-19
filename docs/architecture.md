# DIMS System Architecture

This outlines the high-level architecture structuring the Digital Internship Management System.

## The Paradigm: Vanilla SPA (Single Page Application)
By eliminating heavy node modules or React/Vue dependencies, DIMS maintains absolute portability simply as a bundled HTML layout and Javascript engine running on a generic HTTP Server without build compilation commands.
Instead of navigating physically across multiple HTML pages, the application acts as an app-router: changing display block parameters and utilizing `fetch()` handlers to asynchronously repaint panels (e.g., `PAGES.student.profile`) over the `<body>` element.

## Directory Structure
- `/api/` 
  - Hosts all discrete backend `.php` logic. (e.g. `login.php`, `register.php`, `profile.php`). The UI communicates entirely through this layer in secure JSON.
- `/db/` 
  - Includes `schema.sql` carrying out table generation, sample data configurations, and `db.php` connecting standard mysqli strings.
- `/docs/`
  - Deep-dive context and technical guides regarding the system layout.
- `/css/` and `/assets/` 
  - Pure graphical configurations, tokens, branding SVGs and web-font injection files.
- `/js/` 
  - Central `app.js` application engine handling the boot sequence, event listeners, component string literals, logic hooks, and authentication state caching (`currentUser`).
- `/uploads/`
  - Generated destination handling native `documents.php` byte-transfer outputs for student CVs.

## Security Overview
- Database passwords and user states utilize default MySQL security guidelines.
- XSS prevention is lightly enforced against HTML rendering mechanisms. Wait-states are embedded on frontend API executions to prevent heavy payload racing conditions.
