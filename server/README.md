
# Company Portal Server

This is the backend API server for the Company Portal application, built with Node.js, Express, and SQL Server.

## Setup Instructions

### 1. Prerequisites
- Node.js (v16 or higher)
- SQL Server instance
- Access to create databases and tables

### 2. Database Setup
1. Create a new database called `company_portal` in your SQL Server instance
2. Run the SQL script in `scripts/create-tables.sql` to create all required tables
3. The script will create a default admin user with credentials:
   - Email: `admin@company.com`
   - Password: `admin123`

### 3. Environment Configuration
1. Copy `.env.example` to `.env`
2. Update the database connection settings in `.env`:
   ```
   DB_HOST=localhost\\MSSQLSERVER01
   DB_NAME=company_portal
   DB_TRUSTED_CONNECTION=true
   ```
3. Set a secure JWT secret:
   ```
   JWT_SECRET=your_secure_random_string_here
   ```

### 4. Installation and Running
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (admin only)

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Add new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Timesheets
- `GET /api/timesheets` - Get all timesheets
- `POST /api/timesheets` - Add new timesheet
- `PATCH /api/timesheets/:id/status` - Update timesheet status

### Marketing
- `GET /api/marketing/candidates` - Get all marketing candidates
- `POST /api/marketing/candidates` - Add new candidate
- `PUT /api/marketing/candidates/:id` - Update candidate

### Health Check
- `GET /api/health` - Server health status

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Role-Based Access Control

- **Admin**: Full access to all endpoints
- **Manager**: Access to employees, timesheets, and marketing
- **HR**: Access to employees and timesheets
- **Employee**: Limited access to timesheets
- **Marketing Associate**: Access to marketing candidates

## Database Connection

The server supports both Windows Authentication and SQL Server Authentication:

**Windows Authentication (Trusted Connection):**
```
DB_TRUSTED_CONNECTION=true
```

**SQL Server Authentication:**
```
DB_TRUSTED_CONNECTION=false
DB_USER=your_username
DB_PASSWORD=your_password
```

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Password hashing with bcrypt
- JWT token authentication
- SQL injection protection with parameterized queries

## Error Handling

The server includes comprehensive error handling with appropriate HTTP status codes and error messages.
