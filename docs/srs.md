# Software Requirements Specification (SRS)

**Digital Internship Management System (DIMS)**

**March 2026**

---

## 1. Introduction

This SRS defines the functional and non-functional requirements for the Digital Internship Management System (DIMS) to be developed for the Namibia University of Science and Technology.

**Scope:** DIMS will digitise the WIL internship process for NUST students, CEU staff, academic supervisors, and industry partners. It covers student registration, opportunity management, application workflow, placement tracking, digital logbooks, evaluations, and reporting.

**Definitions:** 
- WIL - Work Integrated Learning. 
- CEU - Cooperative Education Unit. 
- MoU - Memorandum of Understanding. 
- SRS - Software Requirements Specification. 
- DIMS - Digital Internship Management System.

### 1.1 System Overview

DIMS is a web-based platform designed to replace the current manual email-and-spreadsheet workflow used by the NUST CEU. The system provides role-based portals for students, CEU staff, lecturers, employers, and management. Key features include a student application portal, an opportunity management dashboard for CEU, a digital logbook module, and a reporting engine.

---

## 2. Requirements

### 2.1 Functional Requirements

- **FR-01**: The system shall allow students to register, log in, and create a personal profile including CV, transcripts, and faculty details.
- **FR-02**: CEU staff shall be able to post, edit, and remove internship opportunities on the system.
- **FR-03**: Students shall be able to search, filter, and apply for internship opportunities directly through the platform.
- **FR-04**: The system shall provide real-time status updates for student applications (Pending, Shortlisted, Accepted, Rejected).
- **FR-05**: Students shall be able to submit weekly digital logbook entries during their internship period.
- **FR-06**: Lecturers shall be able to view logbook submissions and provide digital feedback and evaluations.
- **FR-07**: Employers shall be able to submit digital performance evaluations of students at the conclusion of the internship.
- **FR-08**: CEU staff shall be able to generate placement statistics reports by faculty, semester, and employer.
- **FR-09**: The system shall send automated email notifications to students, employers, and CEU staff at key process milestones.
- **FR-10**: NUST Management shall have access to a read-only reporting dashboard showing aggregate placement data.

### 2.2 Non-Functional Requirements

- **NFR-01** (Security): All user data must be encrypted in transit and at rest. Authentication must use secure password hashing and support two-factor authentication.
- **NFR-02** (Performance): The system must handle at least 500 concurrent users while maintaining a page load time of under 3 seconds.
- **NFR-03** (Usability): The interface must be intuitive and mobile-responsive, usable on lowbandwidth connections common among students.
- **NFR-04** (Reliability): The system must maintain 99.5% uptime during active academic semesters.
- **NFR-05** (Scalability): The architecture must support future expansion to additional faculties and NUST satellite campuses.
- **NFR-06** (Accessibility): The system must comply with WCAG 2.1 Level AA accessibility standards.

---

## 3. Constraints and Assumptions

- The system must integrate with the existing NUST student database for identity verification. 
- All users are assumed to have at minimum basic smartphone or computer access. 
- Employers must hold an active MoU with the CEU to post opportunities on DIMS.
- The system will be developed and tested in alignment with NUST academic semester timelines.
- Third-party integrations with company HR systems are out of scope for the MVP.

---

## References

Cooperative Education Unit. Internships. NUST. https://ceu.nust.na/internships

Namibia Statistics Agency. (2023). Labour Force Survey. https://nsa.org.na 
Schwaber, K., & Sutherland, J. (2020). The Scrum Guide. https://scrumguides.org 
IEEE Std 830-1998. Recommended Practice for SRS.