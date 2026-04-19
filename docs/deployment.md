# Deployment & Configuration

Deploying DIMS is straightforward given its PHP/MySQL core architecture and Vanilla JS bundle. There are zero compilation steps required (no Webpack, Vite, Node modules).

## 1. Prerequisites
- PHP 8.x
- MySQL 8.x / MariaDB
- Apache Web Server (or NGINX) enabled to process `.php` files.

## 2. Setting Up MySQL
1. Open your native Database administrative GUI tool (e.g., PHPMyAdmin) or connect via terminal: `mysql -u root -p`.
2. Reconstruct the base container:
   ```sql
   CREATE DATABASE dims_system;
   USE dims_system;
   ```
3. Inject the table bounds using the file located in `db/schema.sql`.

## 3. Configuring the Application
1. Extract or clone this repository into your chosen web serving pathway (i.e. `/var/www/html/DIMS` or `/htdocs/DIMS`).
2. Map the environment variables in `/api/db.php`:
   ```php
   $servername = "localhost";
   $username = "root";  // Substitute mapping credential
   $password = "";      // Substitute mapping credential
   $dbname = "dims_system"; // Optional to rename based upon earlier query
   ```
3. Secure the `/uploads/` directory parameters recursively via standard terminal execution:
   ```bash
   chmod 755 -R /uploads
   ```

## 4. Scaling Warnings
Whenever mapping the solution outside of generic `localhost/` scopes:
- **Paths**: Please locate and strip the static URL strings explicitly tied within Javascript `fetch('http://localhost/DIMS/api/...')` arrays in `app.js`. Use relative domain parsing functions or generic API prefixes (e.g. `/api/`) to maintain URL agnosticism throughout varied domains seamlessly.
