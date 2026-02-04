# Role-Based Authentication Testing Guide

## Quick Start

### 1. Database is Ready
- ✓ Database migrated with all tables created
- ✓ 5 test users seeded with different roles
- ✓ Sample data created (committees, accounts, transactions)
- ✓ All API endpoints ready for testing

### 2. Test Credentials
Use these credentials to test the system:

```
PRESIDENT:  president@ankur.org / password123
SECRETARY:  secretary@ankur.org / password123
TREASURER:  treasurer@ankur.org / password123
MEMBER:     member@ankur.org / password123
AUDITOR:    auditor@ankur.org / password123
```

---

## Testing the API Endpoints

### Using cURL (Command Line)

#### 1. Register a New User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123",
    "role": "MEMBER"
  }'
```

Expected Response:
```json
{
  "user": {
    "id": "cml...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "MEMBER",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

#### 2. Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "president@ankur.org",
    "password": "password123"
  }'
```

Expected Response:
```json
{
  "user": {
    "id": "cml...",
    "name": "Amit Kumar",
    "email": "president@ankur.org",
    "role": "PRESIDENT",
    "isActive": true
  },
  "token": "mock-jwt-token"
}
```

---

#### 3. Get User Profile
```bash
curl -X GET http://localhost:3001/api/user/profile \
  -H "x-user-id: USER_ID_HERE"
```

Replace `USER_ID_HERE` with actual user ID from login response.

Expected Response:
```json
{
  "user": {
    "id": "cml...",
    "name": "Amit Kumar",
    "email": "president@ankur.org",
    "role": "PRESIDENT",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00Z",
    "committees": [...]
  }
}
```

---

#### 4. View All Users (President/Auditor Only)
```bash
curl -X GET http://localhost:3001/api/admin/users \
  -H "x-user-role: PRESIDENT"
```

Expected Response:
```json
{
  "users": [
    {
      "id": "cml...",
      "name": "Amit Kumar",
      "email": "president@ankur.org",
      "role": "PRESIDENT",
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00Z"
    },
    ...
  ]
}
```

**Test Permission Denial:**
```bash
curl -X GET http://localhost:3001/api/admin/users \
  -H "x-user-role: MEMBER"
```

Expected: 403 Forbidden error

---

#### 5. Create Committee (Secretary/President)
```bash
curl -X POST http://localhost:3001/api/admin/committees \
  -H "Content-Type: application/json" \
  -H "x-user-role: SECRETARY" \
  -d '{
    "name": "Outreach Committee",
    "description": "Handles community outreach programs",
    "presidentId": "USER_ID_HERE"
  }'
```

Expected Response (201):
```json
{
  "id": "cml...",
  "name": "Outreach Committee",
  "description": "Handles community outreach programs",
  "presidentId": "USER_ID_HERE",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

#### 6. Get All Committees
```bash
curl -X GET http://localhost:3001/api/admin/committees
```

Expected Response:
```json
{
  "committees": [
    {
      "id": "cml...",
      "name": "Finance Committee",
      "description": "Manages all financial matters and budgeting",
      "presidentId": "cml...",
      "createdAt": "2024-01-15T10:00:00Z"
    },
    ...
  ]
}
```

---

#### 7. Create Account (Treasurer/President)
```bash
curl -X POST http://localhost:3001/api/admin/accounts \
  -H "Content-Type: application/json" \
  -H "x-user-role: TREASURER" \
  -d '{
    "name": "Project Donation Fund",
    "accountType": "SAVINGS",
    "balance": 10000,
    "treasurerId": "USER_ID_HERE",
    "committeeId": "COMMITTEE_ID_HERE"
  }'
```

Expected Response (201):
```json
{
  "id": "cml...",
  "name": "Project Donation Fund",
  "accountType": "SAVINGS",
  "balance": 10000,
  "treasurerId": "USER_ID_HERE",
  "committeeId": "COMMITTEE_ID_HERE",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

#### 8. Create Transaction (Secretary/Treasurer/President)
```bash
curl -X POST http://localhost:3001/api/admin/transactions \
  -H "Content-Type: application/json" \
  -H "x-user-role: SECRETARY" \
  -d '{
    "type": "INCOME",
    "amount": 2500,
    "description": "Donation from XYZ Corporation",
    "accountId": "ACCOUNT_ID_HERE"
  }'
```

Expected Response (201):
```json
{
  "id": "cml...",
  "type": "INCOME",
  "amount": 2500,
  "description": "Donation from XYZ Corporation",
  "accountId": "ACCOUNT_ID_HERE",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

#### 9. Get Transactions with Filtering
```bash
curl -X GET "http://localhost:3001/api/admin/transactions?accountId=ACCOUNT_ID_HERE"
```

Expected Response:
```json
{
  "transactions": [
    {
      "id": "cml...",
      "type": "INCOME",
      "amount": 5000,
      "description": "Donation received from ABC Foundation",
      "accountId": "ACCOUNT_ID_HERE",
      "account": {
        "id": "ACCOUNT_ID_HERE",
        "name": "General Fund"
      },
      "createdAt": "2024-01-15T10:00:00Z"
    },
    ...
  ]
}
```

---

#### 10. Get Audit Logs (President/Auditor Only)
```bash
curl -X GET "http://localhost:3001/api/admin/audit-logs?entity=TRANSACTION&limit=10" \
  -H "x-user-role: AUDITOR"
```

Expected Response:
```json
{
  "logs": [
    {
      "id": "cml...",
      "userId": "cml...",
      "action": "CREATE",
      "entity": "TRANSACTION",
      "entityId": "cml...",
      "changes": "{\"type\":\"INCOME\",\"amount\":5000}",
      "user": {
        "id": "cml...",
        "name": "Priya Singh",
        "role": "SECRETARY"
      },
      "createdAt": "2024-01-15T10:00:00Z"
    },
    ...
  ]
}
```

---

## Role Permission Testing Matrix

### Test each role's capabilities:

#### PRESIDENT (Full Control)
- [ ] Can create users
- [ ] Can view all users
- [ ] Can deactivate users
- [ ] Can create committees
- [ ] Can edit committees
- [ ] Can delete committees
- [ ] Can create accounts
- [ ] Can create transactions
- [ ] Can view audit logs

Test:
```bash
curl -X GET http://localhost:3001/api/admin/users -H "x-user-role: PRESIDENT"
```
Expected: 200 OK with user list

---

#### SECRETARY (Data Entry + View)
- [ ] Can create committees
- [ ] Can view committees (but not delete)
- [ ] Can create transactions
- [ ] Can view accounts and transactions
- [ ] CANNOT create accounts
- [ ] CANNOT view all users

Test Committee Creation:
```bash
curl -X POST http://localhost:3001/api/admin/committees \
  -H "Content-Type: application/json" \
  -H "x-user-role: SECRETARY" \
  -d '{"name":"Test","description":"Test","presidentId":"USER_ID"}'
```
Expected: 201 Created

Test Forbidden Action (view all users):
```bash
curl -X GET http://localhost:3001/api/admin/users -H "x-user-role: SECRETARY"
```
Expected: 403 Forbidden

---

#### TREASURER (Financial Only)
- [ ] Can create accounts
- [ ] Can view accounts and transactions
- [ ] Can create transactions
- [ ] CANNOT create committees
- [ ] CANNOT manage users

Test Account Creation:
```bash
curl -X POST http://localhost:3001/api/admin/accounts \
  -H "Content-Type: application/json" \
  -H "x-user-role: TREASURER" \
  -d '{"name":"Fund","accountType":"SAVINGS","balance":0,"treasurerId":"ID","committeeId":"ID"}'
```
Expected: 201 Created

Test Forbidden Action (create committee):
```bash
curl -X POST http://localhost:3001/api/admin/committees \
  -H "Content-Type: application/json" \
  -H "x-user-role: TREASURER" \
  -d '{"name":"Test","description":"Test","presidentId":"ID"}'
```
Expected: 403 Forbidden

---

#### MEMBER (View Only)
- [ ] Can view committees
- [ ] Can view accounts
- [ ] Can view transactions
- [ ] CANNOT create anything
- [ ] CANNOT view all users
- [ ] CANNOT view audit logs

Test View Committees:
```bash
curl -X GET http://localhost:3001/api/admin/committees
```
Expected: 200 OK with committees

Test Forbidden Action (create transaction):
```bash
curl -X POST http://localhost:3001/api/admin/transactions \
  -H "Content-Type: application/json" \
  -H "x-user-role: MEMBER" \
  -d '{"type":"INCOME","amount":100,"description":"Test","accountId":"ID"}'
```
Expected: 403 Forbidden

---

#### AUDITOR (View + Export)
- [ ] Can view all users
- [ ] Can view audit logs
- [ ] Can view accounts/transactions
- [ ] Can export data
- [ ] CANNOT modify anything

Test View Audit Logs:
```bash
curl -X GET http://localhost:3001/api/admin/audit-logs -H "x-user-role: AUDITOR"
```
Expected: 200 OK with audit logs

---

## Using Postman for Testing

### 1. Import API Collection
Create a new Postman collection with these requests:

**Collection: Ankur Foundation Auth**
- Folder: Authentication
  - POST /api/auth/register
  - POST /api/auth/login
- Folder: Users
  - GET /api/user/profile
  - GET /api/admin/users
  - PATCH /api/admin/users
- Folder: Committees
  - POST /api/admin/committees
  - GET /api/admin/committees
- Folder: Accounts
  - POST /api/admin/accounts
  - GET /api/admin/accounts
- Folder: Transactions
  - POST /api/admin/transactions
  - GET /api/admin/transactions
- Folder: Audit
  - POST /api/admin/audit-logs
  - GET /api/admin/audit-logs

### 2. Set Environment Variables
Create Postman environment with:
```
base_url: http://localhost:3001
user_id: [copy from login response]
user_role: [PRESIDENT/SECRETARY/TREASURER/MEMBER/AUDITOR]
token: [copy from login response]
```

### 3. Use Headers in Requests
Set in request headers:
```
x-user-id: {{user_id}}
x-user-role: {{user_role}}
Authorization: Bearer {{token}}
```

---

## Expected Error Responses

### 400 Bad Request
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'  # Missing email and password
```

Response:
```json
{
  "error": "Missing required fields: email, password"
}
```

---

### 401 Unauthorized
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"president@ankur.org","password":"wrongpassword"}'
```

Response:
```json
{
  "error": "Invalid credentials"
}
```

---

### 403 Forbidden
```bash
curl -X GET http://localhost:3001/api/admin/users -H "x-user-role: MEMBER"
```

Response:
```json
{
  "error": "Forbidden: Only President and Auditor can view all users"
}
```

---

### 409 Conflict
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"president@ankur.org","password":"pass","role":"MEMBER"}'
```

Response:
```json
{
  "error": "User already exists"
}
```

---

## Next Steps

1. **Frontend Integration**
   - Create login/register pages in `/frontend/src/app/auth/`
   - Implement authentication context/hook
   - Add role-based UI access control

2. **JWT Implementation**
   - Install `jsonwebtoken` package
   - Generate JWT token on login
   - Verify JWT on protected routes
   - Store token in httpOnly cookies

3. **Admin Dashboard**
   - Create role-specific dashboards
   - Add committee management UI
   - Add financial management UI
   - Add audit log viewer

4. **Production Hardening**
   - Rate limiting on auth endpoints
   - Email verification on registration
   - Password reset functionality
   - Session management
   - CORS configuration
