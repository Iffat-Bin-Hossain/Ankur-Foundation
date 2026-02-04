# Authentication & Role-Based Authorization API Documentation

## Overview
This document describes the authentication and role-based access control (RBAC) system for the Ankur Foundation admin module.

### User Roles (5 Tiers)
1. **PRESIDENT** - Full control over all operations
2. **SECRETARY** - Data entry and view access
3. **TREASURER** - Financial/account management only
4. **MEMBER** - View-only access
5. **AUDITOR** - View and export access

### Permission Matrix

| Permission | PRESIDENT | SECRETARY | TREASURER | MEMBER | AUDITOR |
|-----------|-----------|-----------|-----------|--------|---------|
| **User Management** | | | | | |
| CREATE_USER | ✓ | | | | |
| MANAGE_USERS | ✓ | | | | |
| VIEW_USERS | ✓ | | | | ✓ |
| **Committee Management** | | | | | |
| CREATE_COMMITTEE | ✓ | ✓ | | | |
| EDIT_COMMITTEE | ✓ | ✓ | | | |
| DELETE_COMMITTEE | ✓ | | | | |
| VIEW_COMMITTEES | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Financial Management** | | | | | |
| CREATE_ACCOUNT | ✓ | | ✓ | | |
| EDIT_ACCOUNT | ✓ | | ✓ | | |
| VIEW_ACCOUNTS | ✓ | ✓ | ✓ | ✓ | ✓ |
| CREATE_TRANSACTION | ✓ | ✓ | ✓ | | |
| VIEW_TRANSACTIONS | ✓ | ✓ | ✓ | ✓ | ✓ |
| GENERATE_REPORTS | ✓ | | ✓ | | ✓ |
| **Audit & Logs** | | | | | |
| VIEW_AUDIT_LOGS | ✓ | | | | ✓ |
| EXPORT_DATA | ✓ | | | | ✓ |

---

## API Endpoints

### 1. Authentication Endpoints

#### Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "MEMBER"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "MEMBER",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

**Errors:**
- 400: Missing required fields
- 409: User already exists

---

#### Login User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "MEMBER",
    "isActive": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- 401: Invalid credentials
- 403: User is inactive

---

### 2. User Management Endpoints

#### Get User Profile
**Endpoint:** `GET /api/user/profile`

**Headers:**
```
x-user-id: user_123
```

**Response (200):**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "MEMBER",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00Z",
    "committees": []
  }
}
```

**Errors:**
- 401: Missing user ID header
- 404: User not found

---

#### Update User Profile
**Endpoint:** `PATCH /api/user/profile`

**Headers:**
```
x-user-id: user_123
```

**Request Body:**
```json
{
  "name": "Jane Doe"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user_123",
    "name": "Jane Doe",
    "email": "john@example.com",
    "role": "MEMBER",
    "isActive": true
  }
}
```

---

#### Get All Users (President/Auditor Only)
**Endpoint:** `GET /api/admin/users`

**Headers:**
```
x-user-role: PRESIDENT
```

**Response (200):**
```json
{
  "users": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "MEMBER",
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

**Errors:**
- 403: User doesn't have permission

---

#### Deactivate User (President Only)
**Endpoint:** `PATCH /api/admin/users`

**Headers:**
```
x-user-role: PRESIDENT
```

**Request Body:**
```json
{
  "userId": "user_456",
  "isActive": false
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user_456",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "SECRETARY",
    "isActive": false
  }
}
```

---

### 3. Committee Management Endpoints

#### Create Committee
**Endpoint:** `POST /api/admin/committees`

**Headers:**
```
x-user-role: SECRETARY
```

**Request Body:**
```json
{
  "name": "Finance Committee",
  "description": "Manages all financial matters",
  "presidentId": "user_123"
}
```

**Response (201):**
```json
{
  "id": "committee_789",
  "name": "Finance Committee",
  "description": "Manages all financial matters",
  "presidentId": "user_123",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

#### Get All Committees
**Endpoint:** `GET /api/admin/committees`

**Response (200):**
```json
{
  "committees": [
    {
      "id": "committee_789",
      "name": "Finance Committee",
      "description": "Manages all financial matters",
      "presidentId": "user_123",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### 4. Financial Management Endpoints

#### Create Account
**Endpoint:** `POST /api/admin/accounts`

**Headers:**
```
x-user-role: TREASURER
```

**Request Body:**
```json
{
  "name": "General Fund",
  "accountType": "SAVINGS",
  "balance": 5000,
  "treasurerId": "user_234"
}
```

**Response (201):**
```json
{
  "id": "account_456",
  "name": "General Fund",
  "accountType": "SAVINGS",
  "balance": 5000,
  "treasurerId": "user_234",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

#### Get All Accounts
**Endpoint:** `GET /api/admin/accounts`

**Response (200):**
```json
{
  "accounts": [
    {
      "id": "account_456",
      "name": "General Fund",
      "accountType": "SAVINGS",
      "balance": 5000,
      "treasurerId": "user_234",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### Create Transaction
**Endpoint:** `POST /api/admin/transactions`

**Headers:**
```
x-user-role: SECRETARY
```

**Request Body:**
```json
{
  "type": "INCOME",
  "amount": 1000,
  "description": "Donation received",
  "accountId": "account_456"
}
```

**Response (201):**
```json
{
  "id": "transaction_111",
  "type": "INCOME",
  "amount": 1000,
  "description": "Donation received",
  "accountId": "account_456",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

#### Get Transactions
**Endpoint:** `GET /api/admin/transactions?accountId=account_456`

**Response (200):**
```json
{
  "transactions": [
    {
      "id": "transaction_111",
      "type": "INCOME",
      "amount": 1000,
      "description": "Donation received",
      "accountId": "account_456",
      "account": {
        "id": "account_456",
        "name": "General Fund"
      },
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### 5. Audit & Logging Endpoints

#### Create Audit Log
**Endpoint:** `POST /api/admin/audit-logs`

**Request Body:**
```json
{
  "userId": "user_123",
  "action": "CREATE",
  "entity": "TRANSACTION",
  "entityId": "transaction_111",
  "details": {
    "amount": 1000,
    "type": "INCOME"
  }
}
```

**Response (201):**
```json
{
  "id": "log_999",
  "userId": "user_123",
  "action": "CREATE",
  "entity": "TRANSACTION",
  "entityId": "transaction_111",
  "details": {
    "amount": 1000,
    "type": "INCOME"
  },
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

#### Get Audit Logs (President/Auditor Only)
**Endpoint:** `GET /api/admin/audit-logs?entity=TRANSACTION&limit=50`

**Headers:**
```
x-user-role: AUDITOR
```

**Response (200):**
```json
{
  "logs": [
    {
      "id": "log_999",
      "userId": "user_123",
      "action": "CREATE",
      "entity": "TRANSACTION",
      "entityId": "transaction_111",
      "details": {
        "amount": 1000,
        "type": "INCOME"
      },
      "user": {
        "id": "user_123",
        "name": "John Doe",
        "role": "SECRETARY"
      },
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

## Authentication Flow

### 1. User Registration
```
User submits registration form
    ↓
POST /api/auth/register with credentials
    ↓
Server hashes password with bcryptjs
    ↓
User created in database
    ↓
Success response (201)
```

### 2. User Login
```
User submits login form
    ↓
POST /api/auth/login with credentials
    ↓
Server queries user by email
    ↓
Server compares password hash
    ↓
Generate JWT token (if credentials valid)
    ↓
Return user data + token (200)
```

### 3. Protected Request
```
Client includes JWT in Authorization header
    ↓
Middleware extracts and verifies token
    ↓
Extract user ID and role from token
    ↓
Set x-user-id and x-user-role headers
    ↓
Route handler checks permissions
    ↓
Return response or error (403 if unauthorized)
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Missing or invalid parameters |
| 401 | Unauthorized - Missing or invalid authentication |
| 403 | Forbidden - User lacks required permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists (e.g., duplicate email) |
| 500 | Internal Server Error - Server-side issue |

---

## Implementation Notes

### Headers
- `x-user-id`: Set by auth middleware, used to identify current user
- `x-user-role`: Set by auth middleware, used for permission checking
- `Authorization`: Will contain JWT token (when JWT is fully implemented)

### Database Models
All responses use Prisma-generated types which include timestamps (ISO 8601 format) and proper relationship data.

### Error Handling
All endpoints return consistent error format:
```json
{
  "error": "Human-readable error message"
}
```

### Security
- Passwords hashed with bcryptjs (12 rounds)
- User can only update own profile (not via general endpoint)
- Role-based access control enforced on all admin endpoints
- Audit logs track all significant actions

---

## Testing Checklist

- [ ] Register user with each role
- [ ] Login with correct credentials
- [ ] Verify incorrect password fails
- [ ] Verify permission checks on admin endpoints
- [ ] Test President can create/delete committees
- [ ] Test Secretary can create committees but not delete
- [ ] Test Treasurer can only access financial endpoints
- [ ] Test Member can only view data
- [ ] Test Auditor can view and export
- [ ] Verify audit logs record all actions
- [ ] Check JWT token validation on protected routes
