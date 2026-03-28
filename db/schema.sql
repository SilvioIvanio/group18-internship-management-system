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
