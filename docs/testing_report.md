# DIMS - Testing Report

**Date of Execution:** 19 April 2026
**System:** Digital Internship Management System (DIMS)
**Testing Methodology:** Manual System Testing & Endpoint Validation

---

## 1. Test Cases & Execution Results

### Test Suite 1: Authentication & User Registration
| Test Case ID | Description | Input Data | Expected Output | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-AUTH-01** | Test successful student registration | Name, `test@gmail.com`, Valid Password, Role='Student' | User profile recorded, success status returned in JSON, redirected to login. | JSON `{status: "success"}`, redirected safely. | ✅ Pass |
| **TC-AUTH-02** | Prevent duplicate email registration | Email already in DB (`silvioivanio29@gmail.com`) | Registration blocked, error toast displayed. | JSON `{status: "error"}`, UI error triggered. | ✅ Pass |
| **TC-AUTH-03** | Successful login rendering | Valid credentials for CEU | Session token injected, navigates to CEU Dashboard parsing correct templates. | Navigates to `/index.html#ceu`, dashboard populates. | ✅ Pass |

### Test Suite 2: Profile & Real-Time Aggregation
| Test Case ID | Description | Input Data | Expected Output | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-PROF-01** | Student Profile Initialization | Login as Student (`student_id=1`) | Display exact Student Name, active applications count, evaluation stats fetch. | Stats match DB. Applications count accurately reflects `COUNT(*)`. | ✅ Pass |
| **TC-PROF-02** | Handle Empty Profile Gracefully | New user with 0 internships/logs | Defaults metrics to `0` or `--` instead of throwing fatal array exceptions. | Handled gracefully without UI crash. | ✅ Pass |

### Test Suite 3: Internship Vacancies & Placements
| Test Case ID | Description | Input Data | Expected Output | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-VAC-01** | Vacancy Application | Student clicks "Apply" on Vacancy #3 | Application row inserted into DB, status set to "Pending". | Success toast, UI state updates to "Applied". | ✅ Pass |
| **TC-VAC-02** | CEU Placement Override | CEU clicks "Process Approval" for Pending | Application status updates from "Accepted" to "Placed". | System successfully writes "Placed" into state. | ✅ Pass |

### Test Suite 4: File Upload & Integrity (CV)
| Test Case ID | Description | Input Data | Expected Output | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-FILE-01** | Supported File Upload (PDF) | Drag & drop `resume.pdf` onto Document Zone | File transfers to `/uploads/`, success notification fires, path updates in DB. | File appears physically in `/uploads/ documents/` | ✅ Pass |

---

## 2. Discovered Defects and Resolutions

During the final development sprints, several critical integration defects were caught and resolved. Below is a brief discussion of the most significant fixes implemented:

### Defect #1: Fatal 500 Server Error on Profile Aggregation
- **Discovery Context:** When testing the Student Profile load, the UI threw a generic "Failed to fetch data from server" error. Diagnostics revealed a `mysqli_sql_exception`.
- **Root Cause:** The `logbooks` DB table schema was natively tied only to a `placement_id` foreign key. The `api/profile.php` query incorrectly attempted to execute `WHERE student_id = ?`, which did not exist on that specific table.
- **Resolution:** Re-wrote the SQL to map relationally via a subquery: `SELECT COUNT(*) FROM logbooks WHERE placement_id IN (SELECT id FROM placements WHERE student_id = ?)`. Wrapped all analytical queries in explicit `try { } catch(\Exception $e)` blocks to ensure JSON always yields safely, even on database misses.

### Defect #2: Hardcoded UI Components & Ghost Features
- **Discovery Context:** Clicking active UI elements (Logbook Review, Accept Student) resulted in a static Javascript string (`toast("Mocking layout")`) firing instead of performing asynchronous network calls.
- **Root Cause:** The `PAGES.employer` and `PAGES.ceu` DOM blocks were historically hardcoded string templates from Sprint 3 UI testing.
- **Resolution:** Migrated all 4 peripheral roles (Employer, Lecturer, CEU, Management) to pure dynamic `async () => fetch(...)` wrappers. Completely ripped out the generic functions, replacing them with dynamic DOM injections tied to real `app.js` functionality. 

### Defect #3: Absolute Origin Restrictions (Deployment Risk)
- **Discovery Context:** Scaling the application to run on peer-machines resulted in Fetch/CORS errors because javascript endpoints were hardcoded to `http://localhost/DIMS/api/`. 
- **Root Cause:** Inflexible absolute URL paths hard-mapped during early dev loops.
- **Resolution:** Executed a system-wide regex substitution mapping all API endpoints to purely relative paths (e.g. `api/profile.php`). The codebase is now completely agnostic to its folder name or localhost port.
