# Frontend Integration Plan

**Branch**: `anupa-main2`  
**Date**: 2026-07-26  
**Prerequisite**: Backend security hardening is complete on `anupa2`

---

## Integration Order (Safest Sequence)

### Phase 1: Authentication Foundation (CRITICAL — Do First)

#### Step 1.1 — Fix Login.jsx
- **File**: `src/pages/Login.jsx`
- **What**: Uncomment the `axios.post` call to `/admin/login`, capture the JWT token from `response.data.token`, store it in `localStorage.setItem("token", token)`
- **Why**: Without this, nothing else works — ProtectedRoute blocks all admin access
- **Remove**: `console.log` calls that print passwords (lines 73, 88, 101)
- **Endpoint**: `POST /admin/login` (Public)

#### Step 1.2 — Add Logout
- **File**: `src/components/AdminPage/SlideBar.jsx` or `TopNav.jsx`
- **What**: Add a logout button that calls `localStorage.removeItem("token")` and `navigate("/login")`
- **Why**: Currently no way to log out

#### Step 1.3 — Add 401 Interceptor
- **File**: `src/config/axios.js`
- **What**: Add a response interceptor that catches 401 errors, clears the token, and redirects to `/login`
- **Why**: Handles token expiry gracefully

---

### Phase 2: API Layer Migration (HIGH — Core Fix)

#### Step 2.1 — Delete Duplicate
- **Delete**: `src/utils/api.js` (exact duplicate of `src/config/axios.js`)

#### Step 2.2 — Migrate Components to API Layer
Replace raw `axios` imports + hardcoded URLs with the existing API modules in `src/api/`.

| Component | Replace With | Import From |
|---|---|---|
| `Dashborad.jsx` | `getStats()` | `src/api/DashboardApi.js` |
| `StudentDetails.jsx` | `getStudents()`, `deleteStudent()` | `src/api/StudentApi.js` |
| `StudentRegister.jsx` | `createStudent()` | `src/api/StudentApi.js` |
| `EditStudent.jsx` | `editStudent()`, `updateEdit()` | `src/api/StudentApi.js` |
| `ViewStudent.jsx` | `viewStudent()` | `src/api/StudentApi.js` |
| `AdminRegister.jsx` | New `getAdmins()`, `createAdmin()` | `src/api/AdminApi.js` (NEW) |
| `AddCourse.jsx` | `createCourse()` | `src/api/CourseApi.js` |
| `PreviousAddedCourse.jsx` | `getCourses()` | `src/api/CourseApi.js` |
| `PaymentDrawer.jsx` | `createPayment()` | `src/api/PaymentApi.js` |
| `AllPayments.jsx` | `getPayments()` | `src/api/PaymentApi.js` |
| `PaymentStudent.jsx` | `getPayments()` | `src/api/PaymentApi.js` |

#### Step 2.3 — Create Missing API Module
- **New file**: `src/api/AdminApi.js`
- **Functions**: `loginAdmin()`, `createAdmin()`, `getAdmins()`

#### Step 2.4 — Create `.env` File
- **New file**: `.env`
- **Content**: `VITE_API_URL=http://localhost:8080`

---

### Phase 3: Route Protection Hardening

#### Step 3.1 — Role-Based Route Guard
- **File**: `src/components/ProtectedRoute.jsx`
- **What**: Decode the JWT token (without verifying signature — just `atob(token.split('.')[1])`) to extract `role`. Add an optional `requiredRole` prop. If role doesn't match, redirect.
- **Why**: Currently any valid token grants access to admin pages

---

### Phase 4: Dashboard Integration
- **File**: `src/components/AdminPage/Dashborad.jsx`
- **What**: Replace `axios.get("http://localhost:8080/dashboard/")` with `getStats()` from `DashboardApi`
- **Test**: Should display stats if admin token is in localStorage

---

### Phase 5: Student CRUD Integration
- **Files**: `StudentDetails.jsx`, `StudentRegister.jsx`, `EditStudent.jsx`, `ViewStudent.jsx`
- **What**: Replace all raw axios calls with API layer functions
- **Connect**: Zod validation in `StudentRegister.jsx` (import `studentSchema` from `validations/`)

---

### Phase 6: Course Integration
- **Files**: `AddCourse.jsx`, `PreviousAddedCourse.jsx`
- **What**: Replace raw axios with `CourseApi` functions

---

### Phase 7: Payment Integration
- **Files**: `PaymentDrawer.jsx`, `AllPayments.jsx`, `PaymentStudent.jsx`
- **What**: Replace raw axios with `PaymentApi` functions

---

### Phase 8: Admin Management Integration
- **Files**: `AdminRegister.jsx`
- **What**: Replace raw axios with new `AdminApi` functions

---

### Phase 9: Cleanup
- Delete dead pages: `AdminDashboard.jsx`, `AdminStudentDetails.jsx`, `AdminStudentEdit.jsx`, `AdminCourseDetails.jsx`
- Delete dead file: `data.jsx` (root)
- Remove all `console.log` debug statements (14+ locations)
- Fix `App.jsx` line 15: remove `-toast;` stray expression
- Fix `AdminCourseDetails.jsx`: add missing `UnderDevelopment` import (or delete file)

---

### Phase 10: Final Testing

| Test | Expected Result |
|---|---|
| Visit `/admin` without token | Redirected to `/login` |
| Login with valid admin credentials | Token stored, redirected to `/admin` |
| Dashboard loads | Stats displayed from `GET /dashboard` |
| Student list loads | Table populated from `GET /student/` |
| Create student | Success toast, redirected to student list |
| Edit student | Form pre-filled, save updates via `PUT` |
| View student | Detail page loads via `GET /student/getOne/:id` |
| Delete student | Confirmation modal, delete via `DELETE /student/:id` |
| Create payment | Drawer opens, submit creates payment |
| Add course | Form submits via `POST /addcourse/` |
| Logout | Token cleared, redirected to login |
| Token expires | Automatically redirected to login (401 interceptor) |

---

## Risks During Integration

| Risk | Mitigation |
|---|---|
| Breaking existing UI | Only change import statements and API call lines — do not restructure components |
| API contract mismatch | Verify response shapes against existing component expectations before migrating |
| Stale cached data | No cache layer exists — components re-fetch on mount |
| CORS issues | Backend already allows `*` — will work during development |
