DROP DATABASE IF EXISTS dims_db;
CREATE DATABASE dims_db;
USE dims_db;

-- 1. Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- 2. User Profiles (Extended details for all roles)
CREATE TABLE user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    -- Student specific
    student_no VARCHAR(20),
    programme VARCHAR(100),
    year_of_study VARCHAR(20),
    faculty VARCHAR(100),
    cv_path VARCHAR(255),
    transcript_path VARCHAR(255),
    -- Employer specific
    company_name VARCHAR(100),
    industry VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Vacancies Table
CREATE TABLE vacancies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employer_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    location VARCHAR(100),
    duration_months INT,
    deadline DATE,
    slots INT,
    sector VARCHAR(50),
    description TEXT,
    requirements TEXT,
    remuneration VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Pending Review', -- Pending Review, Open, Closed
    FOREIGN KEY (employer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Applications Table
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    vacancy_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Shortlisted, Accepted, Rejected
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vacancy_id) REFERENCES vacancies(id) ON DELETE CASCADE
);

-- 5. Placements Table (Active Internships)
CREATE TABLE placements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    vacancy_id INT NOT NULL,
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'Active', -- Active, Completed, Terminated
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vacancy_id) REFERENCES vacancies(id) ON DELETE CASCADE
);

-- 6. Logbooks Table
CREATE TABLE logbooks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placement_id INT NOT NULL,
    week_title VARCHAR(50) NOT NULL,
    dates VARCHAR(50),
    body TEXT NOT NULL,
    hours INT,
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Approved, Rejected
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (placement_id) REFERENCES placements(id) ON DELETE CASCADE
);

-- 7. Evaluations Table
CREATE TABLE evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placement_id INT NOT NULL,
    evaluator_id INT NOT NULL,
    type VARCHAR(20) NOT NULL, -- Mid-term, Final
    score INT,
    feedback TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (placement_id) REFERENCES placements(id) ON DELETE CASCADE,
    FOREIGN KEY (evaluator_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Notifications Table
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    icon VARCHAR(10),
    type VARCHAR(20), -- blue, green, amber, red
    text TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- INSERT INITIAL SEED DATA
-- --------------------------------------------------------

-- Insert Users (Passwords are hashed: 'password123')
INSERT INTO users (name, email, password, role) VALUES
('Tjihezu Tjihozu', 'tjihezu@nust.na', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Mr. H. Nakamhela', 'hr@namibiabreweries.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employer'),
('Ms. P. Shikongo', 'p.shikongo@nust.na', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ceu'),
('Dr. A. Tjihambuma', 'a.tjihambuma@nust.na', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'lecturer'),
('Prof. J. Amupolo', 'j.amupolo@nust.na', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'management');

-- Profiles
INSERT INTO user_profiles (user_id, student_no, programme, year_of_study, faculty) VALUES 
(1, '223127418', 'BSc Computer Science', '3rd Year', 'Computing & Informatics');

INSERT INTO user_profiles (user_id, company_name, industry) VALUES 
(2, 'Namibia Breweries Ltd', 'FMCG');

-- Vacancies
INSERT INTO vacancies (employer_id, title, location, duration_months, deadline, slots, sector, description, status) VALUES
(2, 'IT Support Intern', 'Windhoek', 5, '2025-02-28', 2, 'IT & Software', 'Assist the IT department with hardware and software support.', 'Closed'),
(2, 'Systems Admin Intern', 'Windhoek', 6, '2025-05-30', 1, 'IT & Software', 'Manage Windows Server environments.', 'Open');

-- Applications
INSERT INTO applications (student_id, vacancy_id, status) VALUES
(1, 1, 'Accepted');

-- Placements
INSERT INTO placements (student_id, vacancy_id, start_date, end_date, status) VALUES
(1, 1, '2025-02-01', '2025-06-30', 'Active');

-- Logbooks
INSERT INTO logbooks (placement_id, week_title, dates, body, hours, status) VALUES
(1, 'Week 1', '03-07 Feb 2025', 'Induction and setup of workstation.', 40, 'Approved'),
(1, 'Week 2', '10-14 Feb 2025', 'Helpdesk support for basic password resets.', 40, 'Pending');

-- Notifications
INSERT INTO notifications (user_id, icon, type, text) VALUES
(1, '📌', 'green', 'Welcome to DIMS!');
