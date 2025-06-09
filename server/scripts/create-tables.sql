
-- Company Portal Database Schema
-- Execute this SQL to create the required tables in your SQL Server database

USE company_portal;

-- Users table for authentication
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Admin', 'Manager', 'Employee', 'HR', 'Marketing Associate')),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Employees table
CREATE TABLE employees (
    id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(100),
    department VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    join_date DATE,
    profile_photo VARCHAR(255),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Timesheets table
CREATE TABLE timesheets (
    id INT IDENTITY(1,1) PRIMARY KEY,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    break_duration INT DEFAULT 0,
    total_hours DECIMAL(4,2),
    status VARCHAR(20) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Submitted', 'Approved', 'Rejected')),
    notes TEXT,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Marketing candidates table
CREATE TABLE marketing_candidates (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    position VARCHAR(100),
    source VARCHAR(100),
    status VARCHAR(50) DEFAULT 'First Contact',
    submissions INT DEFAULT 0,
    interviews INT DEFAULT 0,
    last_contact DATE,
    notes TEXT,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Documents table
CREATE TABLE documents (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500),
    file_type VARCHAR(50),
    category VARCHAR(100),
    uploaded_by INT,
    file_size INT,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Company settings table
CREATE TABLE company_settings (
    id INT IDENTITY(1,1) PRIMARY KEY,
    company_name VARCHAR(255) DEFAULT 'Company Portal',
    company_logo VARCHAR(500),
    theme_primary_color VARCHAR(7) DEFAULT '#3B82F6',
    theme_secondary_color VARCHAR(7) DEFAULT '#1F2937',
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Create indexes for better performance
CREATE INDEX IX_employees_email ON employees(email);
CREATE INDEX IX_timesheets_employee_date ON timesheets(employee_id, date);
CREATE INDEX IX_timesheets_status ON timesheets(status);
CREATE INDEX IX_marketing_candidates_email ON marketing_candidates(email);
CREATE INDEX IX_marketing_candidates_status ON marketing_candidates(status);

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@company.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'Admin');

-- Insert sample data (optional)
INSERT INTO employees (first_name, last_name, email, position, department, join_date) VALUES
('John', 'Doe', 'john.doe@company.com', 'Senior Developer', 'Engineering', '2024-01-15'),
('Jane', 'Smith', 'jane.smith@company.com', 'Marketing Manager', 'Marketing', '2024-02-01'),
('Bob', 'Johnson', 'bob.johnson@company.com', 'HR Specialist', 'Human Resources', '2024-01-20');

INSERT INTO company_settings (company_name) VALUES ('Company Portal');

PRINT 'Database schema created successfully!';
PRINT 'Default admin credentials:';
PRINT 'Email: admin@company.com';
PRINT 'Password: admin123';
