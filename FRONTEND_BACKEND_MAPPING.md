# Frontend ↔ Backend Mapping

**Branch**: `anupa-main2` (frontend) / `anupa2` (backend)  
**Date**: 2026-07-26

---

## Complete Endpoint Mapping

### Public Pages (No Auth Required)

| Frontend Page | Component | Backend Endpoint | Method | Auth | Status |
|---|---|---|---|---|---|
| Home | `HomePage.jsx` | None | — | Public | ✅ Static |
| About | `About.jsx` | None | — | Public | ✅ Static |
| Classes | `Classes.jsx` | None | — | Public | ✅ Static |
| Contact | `Contact.jsx` | None | — | Public | ⚠️ No submit handler |
| Courses | `Course.jsx` → `CourseCardSection` | `GET /addcourse/` | GET | Public | ⚠️ Uses static `CourseData.js` |
| Login | `Login.jsx` | `POST /admin/login` | POST | Public | ⛔ API commented out |

---

### Admin Pages (Auth + Admin Required)

| Frontend Page | Component | Backend Endpoint | Method | Backend Auth | Frontend Auth | API Layer |
|---|---|---|---|---|---|---|
| Dashboard | `Dashborad.jsx` | `GET /dashboard/` | GET | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Student List | `StudentDetails.jsx` | `GET /student/` | GET | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Student Delete | `StudentDetails.jsx` | `DELETE /student/:id` | DELETE | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Student Register | `StudentRegister.jsx` | `POST /student/` | POST | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Student View | `ViewStudent.jsx` | `GET /student/getOne/:id` | GET | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Student Edit (load) | `EditStudent.jsx` | `GET /student/getOne/:id` | GET | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Student Edit (save) | `EditStudent.jsx` | `PUT /student/:id` | PUT | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Admin Register | `AdminRegister.jsx` | `POST /admin/` | POST | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Admin List | `AdminRegister.jsx` | `GET /admin/all` | GET | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Add Course | `AddCourse.jsx` | `POST /addcourse/` | POST | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Course List | `PreviousAddedCourse.jsx` | `GET /addcourse/` | GET | Public | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Payment Create | `PaymentDrawer.jsx` | `POST /payment/create` | POST | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Payment History | `AllPayments.jsx` | `GET /payment?studentId=...` | GET | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| Payment Summary | `PaymentStudent.jsx` | `GET /payment?studentId=...` | GET | Auth+Admin | ProtectedRoute | ⛔ Raw axios, hardcoded URL |
| QR Scanner | `QrScanner.jsx` | `POST /student/scan` | POST | Auth+Admin | ProtectedRoute | ⚠️ Check implementation |
| Pricing (used in payments) | `PaymentDrawer.jsx` | `GET /pricing?institute=...&batch=...` | GET | Auth | ProtectedRoute | ⛔ Check implementation |

---

## API Layer Usage Map

### Centralized API Layer (`src/api/`) — EXISTS BUT UNUSED

| API Module | Functions | Used By |
|---|---|---|
| `StudentApi.js` | `getStudents`, `deleteStudent`, `createStudent`, `editStudent`, `viewStudent`, `updateEdit` | **Nobody** — all components use raw axios |
| `CourseApi.js` | `createCourse`, `getCourses` | **Nobody** |
| `DashboardApi.js` | `getStats` | **Nobody** |
| `PaymentApi.js` | `getPayments`, `createPayment` | **Nobody** |
| `PricingApi.js` | `getPricing` | **Nobody** |

### What Each Component Actually Uses

| Component | Imports | API Base |
|---|---|---|
| `Dashborad.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `StudentDetails.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `StudentRegister.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `EditStudent.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `ViewStudent.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `AdminRegister.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `AddCourse.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `PreviousAddedCourse.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `PaymentDrawer.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `AllPayments.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `PaymentStudent.jsx` | `import axios from "axios"` | `http://localhost:8080` |
| `Login.jsx` | `import axios from "axios"` | Commented out |

---

## Missing Backend Endpoints (Frontend Expects But Backend May Not Have)

| Feature | Expected Endpoint | Backend Status |
|---|---|---|
| Student Login | `POST /student/login` | ✅ Exists |
| Forgot Password | None | ❌ Not implemented (button exists, no handler) |
| Student Portal | None | ❌ No routes exist |
