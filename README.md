# DIMS - Digital Internship Management System

**DIMS (Digital Internship Management System)** is a comprehensive, multi-role web platform engineered to digitize and streamline the Work-Integrated Learning (WIL) and internship lifecycle for the Namibia University of Science and Technology (NUST). 

DIMS replaces manual paper-based processes by bridging Students, Industry Employers, Lecturers, University Management, and the Cooperative Education Unit (CEU) into a single, unified ecosystem.

## Core Features
- **Multi-Role SPA:** Seamless single-page application experience adapting natively to 5 distinct user roles (Student, Employer, CEU, Lecturer, Management).
- **Asynchronous Data Handling:** 100% vanilla JavaScript asynchronous structure syncing live with a PHP 8 core API engine.
- **RESTful Endpoints:** Full dynamic CRUD capability parsing secure JSON outputs to handle all user metrics, reporting, logbooks, and applications.
- **Live Notifications System:** Continuous database polling mechanism notifying individuals of updates (vacancies, logbook approvals, account setups).
- **Premium UI / UX Architecture:** Deeply customized aesthetic logic using sleek glassmorphism panels, CSS Custom Properties (Tokens), standard modern spacing guidelines, and responsive mobile-first views.
- **Document Integrity:** Binary file handling architecture to validate and upload CVs/transcripts via local servers. 

## Technology Architecture
- **Frontend Stack**: HTML5, Vanilla JavaScript (`app.js`), Vanilla CSS3 (`style.css`).
- **Backend Stack**: PHP 8.2 (REST API Layer).
- **Database Engine**: MySQL 8.0 (Relational tables linked by strictly preserved foreign-keys via InnoDB).

## Quick Start
1. Ensure your local server environment (XAMPP/MAMP/LAMP) is active.
2. Initialize the DB via `db/schema.sql`.
3. Drop the project root into `/htdocs`.
4. Run `http://localhost/DIMS/index.html`.

For deeper explanations and technical details, please consult the `docs/` folder.