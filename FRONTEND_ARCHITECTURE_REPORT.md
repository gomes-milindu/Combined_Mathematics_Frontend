# Frontend Architecture Report

**Repository**: Combined_Mathematics_Frontend  
**Branch**: `anupa-main2`  
**Framework**: React 19 + Vite 7 + TailwindCSS 4 + React Router 7  
**Audit Date**: 2026-07-26  
**Status**: READ-ONLY analysis — no modifications made

---

## 1. Folder Structure

```
Combined_Mathematics_Frontend/
├── Data/                          # Root-level data (outside src)
│   ├── CourseData.js              # Static course card data
│   └── breadcrumbConfig.js        # Breadcrumb route config
├── data.jsx                       # DEAD FILE — commented-out JSX snippets
├── vercel.json                    # SPA rewrite rule
├── vite.config.js                 # Vite + React + Tailwind plugins
├── src/
│   ├── main.jsx                   # Entry point
│   ├── App.jsx                    # Root router
│   ├── App.css                    # Minimal global CSS
│   ├── index.css                  # Tailwind + custom styles
│   ├── api/                       # ✅ Centralized API layer (PARTIALLY USED)
│   │   ├── CourseApi.js
│   │   ├── DashboardApi.js
│   │   ├── PaymentApi.js
│   │   ├── PricingApi.js
│   │   └── StudentApi.js
│   ├── config/
│   │   └── axios.js               # ✅ Axios instance with JWT interceptor
│   ├── utils/
│   │   └── api.js                 # ⚠️ DUPLICATE of config/axios.js
│   ├── validations/
│   │   └── StudentSchema.js       # Zod schema (NOT USED in StudentRegister)
│   ├── data/
│   │   └── AssetLinks.js          # Image/asset URL constants
│   ├── components/
│   │   ├── ProtectedRoute.jsx     # ✅ JWT route guard (functional)
│   │   ├── NavBar.jsx             # Public site navbar
│   │   ├── Header.jsx             # Public site hero header
│   │   ├── Footer.jsx             # Public site footer
│   │   ├── layout/
│   │   │   └── GridLayout.jsx     # Unused grid layout experiment
│   │   ├── HomePage/              # 8 components (Card, CourseCard, etc.)
│   │   ├── ClassesPage/
│   │   │   └── ClassCard.jsx
│   │   └── AdminPage/             # 24 components — BULK OF APPLICATION
│   │       ├── AdminLayout.jsx    # Sidebar + TopNav + Outlet
│   │       ├── SlideBar.jsx       # Collapsible admin sidebar
│   │       ├── TopNav.jsx         # Admin top navigation bar
│   │       ├── Dashborad.jsx      # Dashboard stats (typo in filename)
│   │       ├── StudentDetails.jsx # Student list + table + pagination
│   │       ├── StudentRegister.jsx# Student registration form
│   │       ├── EditStudent.jsx    # Student edit form
│   │       ├── ViewStudent.jsx    # Student detail view
│   │       ├── AddCourse.jsx      # Course creation form
│   │       ├── AdminRegister.jsx  # Admin creation form + admin list
│   │       ├── PaymentDrawer.jsx  # Payment form drawer
│   │       ├── PaymentStudent.jsx # Student payment history
│   │       ├── AllPayments.jsx    # Payment list view
│   │       ├── QrScanner.jsx      # QR code scanner
│   │       ├── PreviousAddedCourse.jsx # Course list
│   │       ├── DeleteConfirmation.jsx  # Delete modal
│   │       ├── StudentTable.jsx        # Desktop student table
│   │       ├── StudentMobileList.jsx   # Mobile student list
│   │       ├── StudentActionMenu.jsx   # Context menu
│   │       ├── RecentPaymentsDrawer.jsx
│   │       ├── PaginationPage.jsx
│   │       ├── Breadcrumb.jsx
│   │       ├── AdminCourseRegister.jsx # Thin wrapper (unused in routes)
│   │       └── UnderDevelopment.jsx    # Placeholder page
│   ├── pages/
│   │   ├── HomePage.jsx           # Public landing page
│   │   ├── Course.jsx             # Public courses page
│   │   ├── Classes.jsx            # Public classes page
│   │   ├── About.jsx              # Public about page
│   │   ├── Contact.jsx            # Public contact page
│   │   ├── Login.jsx              # ⛔ LOGIN IS BROKEN (API commented out)
│   │   ├── Admin.jsx              # Admin sub-router (nested routes)
│   │   └── admin/                 # Admin page wrappers
│   │       ├── AdminDashboard.jsx     # DEAD PAGE (duplicate layout)
│   │       ├── AdminStudentDetails.jsx# DEAD PAGE (duplicate layout)
│   │       ├── AdminCourseDetails.jsx # DEAD PAGE (broken import)
│   │       ├── AdminStudentRegister.jsx# Thin wrapper → StudentRegister
│   │       ├── AdminStudentEdit.jsx   # DEAD PAGE (duplicate layout)
│   │       ├── AdminStudentView.jsx   # Thin wrapper → ViewStudent
│   │       ├── AdminScanStudents.jsx  # Thin wrapper → QrScanner
│   │       └── AdminCreateAdmin.jsx   # Thin wrapper → AdminRegister
│   └── sections/
│       ├── HomePage/              # Home page section compositions
│       ├── CoursePage/            # Course page sections
│       └── ClassPage/             # Class page sections
```

---

## 2. Authentication Status

### Login Page (`Login.jsx`)
- **API call**: ⛔ **COMMENTED OUT** (lines 15-23)
- **Current behavior**: `navigate("/admin")` is called directly without any API call
- **Token storage**: **NONE** — no token is captured or stored
- **Passwords logged to console**: Yes (line 88)

### Axios Interceptor (`config/axios.js`)
- **EXISTS and is FUNCTIONAL**: Reads `localStorage.getItem("token")` and attaches `Authorization: Bearer <token>`
- **Problem**: Most components **bypass this** by importing raw `axios` from `"axios"` instead of the configured instance from `"../config/axios"`

### ProtectedRoute (`components/ProtectedRoute.jsx`)
- **EXISTS and is FUNCTIONAL**: Checks `localStorage.getItem("token")`, redirects to `/login` if missing
- **Applied to**: `/admin/*` routes in `App.jsx`
- **Problem**: Since Login never stores a token, this guard currently blocks access until a token is manually placed in localStorage

### Summary

| Component | Exists? | Functional? | Connected? |
|---|---|---|---|
| Login form | ✅ | ⛔ API commented out | ❌ |
| JWT token storage | ❌ | — | — |
| Axios interceptor | ✅ | ✅ | ⚠️ Bypassed by 12 components |
| ProtectedRoute | ✅ | ✅ | ⚠️ Blocks access (no token stored) |
| Logout | ❌ | — | — |

---

## 3. API Layer

### Architecture: Two Parallel Systems (Conflicting)

**System A — Centralized API layer** (`src/api/` + `src/config/axios.js`):
- A properly configured Axios instance with JWT interceptor
- 5 API modules (`StudentApi`, `CourseApi`, `DashboardApi`, `PaymentApi`, `PricingApi`)
- Uses `import api from '../config/axios'`
- **Only used by**: None of the active components (these API files exist but are unused)

**System B — Raw hardcoded calls** (in 12+ components):
- Components directly `import axios from "axios"` (raw, no interceptor)
- Hardcode `http://localhost:8080` in every call
- **NO JWT tokens are sent** via these calls

### Hardcoded URL Locations (17 instances)

| File | Line | API Call |
|---|---|---|
| `Dashborad.jsx` | 9 | `GET /dashboard/` |
| `AdminRegister.jsx` | 17 | `GET /admin/all` |
| `AdminRegister.jsx` | 29 | `POST /admin/` |
| `StudentRegister.jsx` | 22 | `POST /student/` |
| `StudentDetails.jsx` | 28 | `GET /student/` |
| `StudentDetails.jsx` | 67 | `DELETE /student/:id` |
| `EditStudent.jsx` | 43 | `GET /student/getOne/:id` |
| `EditStudent.jsx` | 78 | `PUT /student/:id` |
| `ViewStudent.jsx` | 52 | `GET /student/getOne/:id` |
| `AddCourse.jsx` | 19 | `POST /addcourse/` |
| `PreviousAddedCourse.jsx` | 13 | `GET /addcourse/` |
| `PaymentDrawer.jsx` | 243 | `POST /payment/create` |
| `AllPayments.jsx` | 12 | `GET /payment?studentId=...` |
| `PaymentStudent.jsx` | 13 | `GET /payment?studentId=...` |

### Duplicate API Utility

`src/utils/api.js` and `src/config/axios.js` are **near-identical duplicates**. Both create an Axios instance with the same interceptor. Only `config/axios.js` is imported by the API layer.

---

## 4. Routing

### Route Tree

```
/ (BrowserRouter)
├── /                    → HomePage         [PUBLIC]
├── /course/*            → Course           [PUBLIC]
├── /classes/*           → Classes          [PUBLIC]
├── /about/*             → About            [PUBLIC]
├── /contact/*           → Contact          [PUBLIC]
├── /login               → Login            [PUBLIC]
└── /admin/* (ProtectedRoute)               [PROTECTED]
    ├── /admin/           → Dashboard
    ├── /admin/dashboard  → Dashboard
    ├── /admin/students   → StudentDetails
    ├── /admin/register   → StudentRegister
    ├── /admin/course     → UnderDevelopment
    ├── /admin/course/*   → AddCourse
    ├── /admin/scan       → QrScanner
    ├── /admin/scan/*     → QrScanner
    ├── /admin/createAdmin → AdminRegister
    ├── /admin/students/studentView/:id → ViewStudent
    └── /admin/students/studentEdit/:id → EditStudent
```

### Route Guard Status
- **ProtectedRoute** wraps `/admin/*` — checks `localStorage.getItem("token")`
- **No role-based routing** — any token grants access to all admin pages
- **No student portal routes exist** — only admin routes are implemented

---

## 5. State Management

**No global state management.**

- No Context API providers
- No Redux / Zustand / Jotai
- All state is **component-local** via `useState`
- Data fetching happens in `useEffect` per component — no caching, no shared state
- No auth context or user state provider

---

## 6. Component Analysis

### Components Requiring Backend Integration (JWT)

All 12 components that use raw `axios` with hardcoded URLs need to be migrated to use the configured API layer:

| Component | Size | API Calls | Priority |
|---|---|---|---|
| `Login.jsx` | 5.9KB | 0 (commented) | **CRITICAL** |
| `Dashborad.jsx` | 7.7KB | 1 GET | High |
| `StudentDetails.jsx` | 14.4KB | 2 (GET, DELETE) | High |
| `StudentRegister.jsx` | 8.9KB | 1 POST | High |
| `EditStudent.jsx` | 11.9KB | 2 (GET, PUT) | High |
| `ViewStudent.jsx` | 8.9KB | 1 GET | High |
| `AdminRegister.jsx` | 7.6KB | 2 (GET, POST) | High |
| `AddCourse.jsx` | 6.2KB | 1 POST | Medium |
| `PreviousAddedCourse.jsx` | 7.1KB | 1 GET | Medium |
| `PaymentDrawer.jsx` | 13.2KB | 1 POST | Medium |
| `AllPayments.jsx` | 4.9KB | 1 GET | Medium |
| `PaymentStudent.jsx` | 4.3KB | 1 GET | Medium |

### Dead / Unused Pages

| File | Issue |
|---|---|
| `pages/admin/AdminDashboard.jsx` | Duplicate layout — renders its own Sidebar+TopNav instead of using AdminLayout |
| `pages/admin/AdminStudentDetails.jsx` | Same — duplicate layout wrapping |
| `pages/admin/AdminStudentEdit.jsx` | Same — duplicate layout wrapping |
| `pages/admin/AdminCourseDetails.jsx` | Broken — references `<UnderDevelopment />` without importing it |
| `data.jsx` (root) | Dead file — only contains commented-out JSX fragments |
| `GridLayout.jsx` | Commented out in both `App.jsx` and `main.jsx` |

---

## 7. Forms

| Form | Location | Validation | Submit Logic | Backend Endpoint |
|---|---|---|---|---|
| Admin Login | `Login.jsx` | None | ⛔ API commented out, navigates blindly | `POST /admin/login` |
| Student Registration | `StudentRegister.jsx` | None (Zod schema exists but unused) | Raw `axios.post` to hardcoded URL | `POST /student/` |
| Admin Registration | `AdminRegister.jsx` | Password match only | Raw `axios.post` to hardcoded URL | `POST /admin/` |
| Edit Student | `EditStudent.jsx` | None | Raw `axios.put` to hardcoded URL | `PUT /student/:id` |
| Add Course | `AddCourse.jsx` | None | Raw `axios.post` to hardcoded URL | `POST /addcourse/` |
| Payment Creation | `PaymentDrawer.jsx` | None | Raw `axios.post` to hardcoded URL | `POST /payment/create` |
| QR Scanner | `QrScanner.jsx` | N/A | Camera-based scan → POST body | `POST /student/scan` |
| Contact Form | `Contact.jsx` | None | ⛔ No submit handler | None |

---

## 8. Risks

### Critical
1. **Login is non-functional** — API call is commented out, no JWT is stored
2. **12 components bypass JWT interceptor** — use raw `axios` instead of configured instance
3. **All 17 API calls hardcode `localhost:8080`** — will fail in production
4. **Passwords logged to console** in Login.jsx (lines 73, 88)

### High
5. **Duplicate Axios configs** — `config/axios.js` and `utils/api.js` are near-identical
6. **Zod validation exists but is not connected** — `StudentSchema.js` is never imported by `StudentRegister.jsx`
7. **No logout functionality** — no way to clear tokens
8. **No error handling for 401 responses** — no interceptor to redirect on token expiry

### Medium
9. **Dead pages** in `pages/admin/` that duplicate layout wrapping (AdminDashboard, AdminStudentDetails, AdminStudentEdit)
10. **`AdminCourseDetails.jsx`** references `<UnderDevelopment />` without importing it — would crash if routed to
11. **`data.jsx` at project root** is dead code
12. **Debug console.logs** scattered across 14+ locations
13. **`App.jsx` line 15**: `-toast;` — a stray expression statement

### Low
14. **`Dashborad.jsx`** — filename typo (should be `Dashboard.jsx`)
15. **TopNav shows hardcoded "Admin Name"** — no dynamic user info
16. **No `.env` file** — `VITE_API_URL` environment variable is not set

---

## 9. Production Readiness Scores

| Category | Score | Notes |
|---|---|---|
| Security | 2/10 | No auth flow, passwords in console, no CSRF |
| Performance | 5/10 | No code splitting, no lazy loading, no caching |
| Maintainability | 4/10 | Duplicate files, dead code, inconsistent API patterns |
| Scalability | 3/10 | No state management, no auth context, no error boundaries |
| Code Quality | 4/10 | Console.logs, typos, unused imports, no TypeScript |
| Folder Organization | 6/10 | Good structure exists but contains dead pages and duplicates |
| Deployment Readiness | 3/10 | Hardcoded localhost URLs, no env config, broken login |
| **Overall** | **3.9/10** | Functional UI shell, but no working backend integration |
