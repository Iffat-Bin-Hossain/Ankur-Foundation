# Quick Reference - Role-Based Authentication

## 🎯 What's Implemented

### 5 User Roles with Hierarchical Permissions
```
PRESIDENT          (Full Control)
├─ Can: Create users, manage all features
└─ Cannot: None

SECRETARY          (Data Entry + View)
├─ Can: Create committees, transactions, view data
└─ Cannot: Create accounts, manage users

TREASURER          (Financial Only)
├─ Can: Create/view accounts, transactions
└─ Cannot: Create committees, manage users

MEMBER             (View Only)
├─ Can: View committees, accounts, transactions
└─ Cannot: Create anything, view users

AUDITOR            (View + Export)
├─ Can: View users, audit logs, export data
└─ Cannot: Create/modify anything
```

---

## 📚 Database Models

```
User
├── id, email, password, name, role
├── isActive, createdAt, updatedAt
└── Relations: committees, auditLogs, accounts

Committee
├── id, name, description
├── presidentId, createdAt, updatedAt
└── Relations: accounts

Account
├── id, name, accountType, balance
├── committeeId, treasurerId
└── Relations: transactions

Transaction
├── id, type (INCOME/EXPENSE), amount
├── description, accountId, createdAt
└── Auto-updates Account balance

AuditLog
├── id, action, entity, entityId
├── userId, changes, createdAt
└── Tracks all significant actions

RolePermission
├── role, permission
└── For future RBAC expansion
```

---

## 🔌 API Endpoints Summary

### Auth Routes
```
POST   /api/auth/register       - Create new user
POST   /api/auth/login          - Login and get user data
```

### User Routes  
```
GET    /api/user/profile        - Get current user
PATCH  /api/user/profile        - Update current user
GET    /api/admin/users         - View all users (PRES/AUD)
PATCH  /api/admin/users         - Deactivate user (PRES)
```

### Committee Routes
```
POST   /api/admin/committees    - Create committee (SEC/PRES)
GET    /api/admin/committees    - View committees (ALL)
```

### Account Routes
```
POST   /api/admin/accounts      - Create account (TREAS/PRES)
GET    /api/admin/accounts      - View accounts (ALL)
```

### Transaction Routes
```
POST   /api/admin/transactions  - Create transaction (SEC/TREAS/PRES)
GET    /api/admin/transactions  - View transactions (ALL)
```

### Audit Routes
```
POST   /api/admin/audit-logs    - Log action
GET    /api/admin/audit-logs    - View logs (PRES/AUD)
```

---

## 🧪 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| PRESIDENT | president@ankur.org | password123 |
| SECRETARY | secretary@ankur.org | password123 |
| TREASURER | treasurer@ankur.org | password123 |
| MEMBER | member@ankur.org | password123 |
| AUDITOR | auditor@ankur.org | password123 |

---

## 🚀 Quick Start

### 1. Start Project
```bash
./run.sh dev
```

### 2. Test Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"president@ankur.org","password":"password123"}'
```

### 3. Test Protected Endpoint
```bash
curl -X GET http://localhost:3001/api/admin/users \
  -H "x-user-role: PRESIDENT"
```

### 4. View Database
```bash
./run.sh db-studio
```

---

## 📋 Permission Matrix at a Glance

|  | PRES | SEC | TREAS | MEM | AUD |
|---|------|-----|-------|-----|-----|
| Create User | ✓ | | | | |
| Manage Users | ✓ | | | | |
| View Users | ✓ | | | | ✓ |
| Create Committee | ✓ | ✓ | | | |
| Delete Committee | ✓ | | | | |
| Create Account | ✓ | | ✓ | | |
| Create Transaction | ✓ | ✓ | ✓ | | |
| View Audit Logs | ✓ | | | | ✓ |

---

## 🔐 Key Features

✅ **Secure Password Hashing** - bcryptjs (12 rounds)
✅ **Role-Based Access Control** - 5 roles with granular permissions
✅ **Audit Logging** - Track all actions with user info
✅ **Database Relationships** - Proper foreign keys and constraints
✅ **Input Validation** - All endpoints validate input
✅ **Error Handling** - Proper HTTP status codes
✅ **Test Data** - Pre-seeded database ready for testing

---

## 📂 File Locations

**Core Files:**
- `/backend/lib/roles.ts` - Role definitions and permissions
- `/backend/lib/auth.ts` - Auth middleware functions
- `/backend/prisma/schema.prisma` - Database schema

**API Routes:**
- `/backend/api/auth/` - Authentication endpoints
- `/backend/api/user/` - User profile endpoints
- `/backend/api/admin/` - Admin management endpoints

**Documentation:**
- `/IMPLEMENTATION_SUMMARY.md` - Full implementation details
- `/backend/API_DOCUMENTATION.md` - API reference
- `/backend/TESTING_GUIDE.md` - Testing instructions

---

## 🎓 Learning Resources

**To understand the system:**
1. Read `/IMPLEMENTATION_SUMMARY.md` for overview
2. Check `/backend/API_DOCUMENTATION.md` for endpoint details
3. Use `/backend/TESTING_GUIDE.md` to test manually
4. Review `/backend/lib/roles.ts` for permission logic

---

## ⏭️ Next Steps

1. **Frontend Integration**
   - Create login/register UI components
   - Implement auth context for frontend
   - Add role-based conditional rendering

2. **JWT Implementation**
   - Replace mock tokens with real JWT
   - Store tokens in httpOnly cookies
   - Add token refresh mechanism

3. **Admin Dashboard**
   - Build role-specific dashboards
   - Add committee management UI
   - Add financial reporting UI

4. **Production Hardening**
   - Add rate limiting
   - Email verification
   - Password reset flow
   - Session management

---

**Status: ✅ COMPLETE AND TESTED**
**Database: ✅ MIGRATED AND SEEDED**
**Ready for: Frontend Integration**
