# DIMS Core API Reference

The backend communicates strictly with the frontend via valid `/api/*.php` JSON objects utilizing standard HTTP verbs (GET, POST). 

## Endpoints

### 1. Registration (`/api/register.php`)
- **POST**
- **Parameters**: `name`, `email`, `password`, `role`, `student_no`, `programme`, `year`.
- **Purpose**: Validates uniqueness of user emails. Reconstructs sub-profile schemas directly mapping into relational tables (i.e. `user_profiles`).

### 2. Authentication (`/api/login.php`)
- **POST** 
- **Parameters**: `email`, `password`.
- **Returns**: A JSON dictionary carrying authenticated user traits. `app.js` caches this dictionary in standard `localStorage` or session variables mapped to `currentUser`.

### 3. Profile Information Aggregation (`/api/profile.php`)
- **GET**
- **Parameters**: `user_id`.
- **Returns**: A complex, computationally safe dictionary combining specific properties (`u.name`, `p.email`) paired with statistical performance (`COUNT(applications)`) querying seamlessly generated metric bounds mapped via logical SQL clauses.

### 4. Notifications Delivery (`/api/notifications.php`)
- **GET**
- **Parameters**: `user_id`.
- **Returns**: Fetches live update logs referencing exact event timings.
- **POST** 
- **Parameters**: `user_id`, `event_type`.
- **Purpose**: Marks database structures regarding notifications status (Read vs Unread flags).

### 5. Media Binding (`/api/documents.php`)
- **POST**
- **Parameters**: Form Upload (`$_FILES['file']`), `user_id`, `type`.
- **Returns**: Native string path pointer pointing the Database directly into physical disk mapping located in the `/uploads/` repository folder.
