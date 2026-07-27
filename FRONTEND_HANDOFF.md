# Frontend Handoff Document

**Repository**: Combined_Mathematics_Frontend  
**Branch**: `anupa-main2`  
**Date**: 2026-07-26  
**Purpose**: Single source of truth for future frontend integration sessions

---

## Project Overview

- **Framework**: React 19 + Vite 7 + TailwindCSS 4 + React Router 7
- **Backend**: Express/MongoDB on branch `anupa2` — fully secured with JWT auth
- **Frontend status**: UI is complete but **not connected to backend authentication**
- **Deployment target**: Vercel (SPA rewrite configured)

---

## Current State Summary

### What Works
- Public pages render correctly (Home, About, Courses, Classes, Contact)
- Admin panel UI is fully built (Sidebar, TopNav, Dashboard, Student CRUD, Payments, Courses, QR Scanner)
- `ProtectedRoute` component exists and functions (blocks unauthenticated access)
- Axios interceptor exists and automatically attaches JWT tokens from `localStorage`
- Centralized API layer exists (`src/api/`) with 5 modules ready to use

### What's Broken
- **Login is non-functional** — the API call is commented out, no token is ever stored
- **12 components bypass the JWT interceptor** — they import raw `axios` and hardcode `localhost:8080`
- **No logout** exists anywhere
- **No 401 error handling** — expired tokens cause silent failures
- **No `.env` file** — `VITE_API_URL` is not configured
- **Duplicate API utility** — `src/utils/api.js` duplicates `src/config/axios.js`
- **Dead pages** exist in `src/pages/admin/` (duplicate layout wrappers)

---

## Key Files Reference

### Authentication
| File | Purpose | Status |
|---|---|---|
| `src/pages/Login.jsx` | Admin login form | ⛔ API commented out |
| `src/components/ProtectedRoute.jsx` | JWT route guard | ✅ Working |
| `src/config/axios.js` | Axios instance + JWT interceptor | ✅ Working (bypassed) |
| `src/utils/api.js` | Duplicate of above | ⚠️ Delete |

### API Layer
| File | Purpose | Used? |
|---|---|---|
| `src/api/StudentApi.js` | Student CRUD API | ❌ Not imported by any component |
| `src/api/CourseApi.js` | Course API | ❌ Not imported |
| `src/api/DashboardApi.js` | Dashboard stats API | ❌ Not imported |
| `src/api/PaymentApi.js` | Payment API | ❌ Not imported |
| `src/api/PricingApi.js` | Pricing API | ❌ Not imported |

### Admin Components (Backend Integration Needed)
| File | Size | API Calls | Raw Axios? |
|---|---|---|---|
| `StudentDetails.jsx` | 14.4KB | GET, DELETE | Yes |
| `PaymentDrawer.jsx` | 13.2KB | POST | Yes |
| `EditStudent.jsx` | 11.9KB | GET, PUT | Yes |
| `StudentRegister.jsx` | 8.9KB | POST | Yes |
| `ViewStudent.jsx` | 8.9KB | GET | Yes |
| `QrScanner.jsx` | 8.9KB | POST | Check |
| `SlideBar.jsx` | 8.9KB | None | N/A |
| `Dashborad.jsx` | 7.7KB | GET | Yes |
| `AdminRegister.jsx` | 7.6KB | GET, POST | Yes |
| `PreviousAddedCourse.jsx` | 7.1KB | GET | Yes |
| `AddCourse.jsx` | 6.2KB | POST | Yes |
| `AllPayments.jsx` | 4.9KB | GET | Yes |
| `PaymentStudent.jsx` | 4.3KB | GET | Yes |

---

## Backend Endpoint Compatibility

All admin endpoints require `Authorization: Bearer <token>` header.

| Backend Route | Method | Auth | Frontend Component |
|---|---|---|---|
| `POST /admin/login` | POST | Public | `Login.jsx` (commented out) |
| `GET /admin/all` | GET | Auth+Admin | `AdminRegister.jsx` |
| `POST /admin/` | POST | Auth+Admin | `AdminRegister.jsx` |
| `GET /dashboard/` | GET | Auth+Admin | `Dashborad.jsx` |
| `GET /student/` | GET | Auth+Admin | `StudentDetails.jsx` |
| `POST /student/` | POST | Auth+Admin | `StudentRegister.jsx` |
| `GET /student/getOne/:id` | GET | Auth+Admin | `ViewStudent.jsx`, `EditStudent.jsx` |
| `PUT /student/:id` | PUT | Auth+Admin | `EditStudent.jsx` |
| `DELETE /student/:id` | DELETE | Auth+Admin | `StudentDetails.jsx` |
| `GET /addcourse/` | GET | Public | `PreviousAddedCourse.jsx` |
| `POST /addcourse/` | POST | Auth+Admin | `AddCourse.jsx` |
| `GET /payment?studentId=` | GET | Auth+Admin | `AllPayments.jsx`, `PaymentStudent.jsx` |
| `POST /payment/create` | POST | Auth+Admin | `PaymentDrawer.jsx` |
| `GET /pricing?institute=&batch=` | GET | Auth | `PricingApi.js` |

---

## Integration Priority Order

1. **Login.jsx** — Uncomment API call, store JWT token
2. **Logout** — Add to SlideBar/TopNav
3. **401 interceptor** — Add to `config/axios.js`
4. **Migrate all 12 components** from raw axios → API layer
5. **Delete `src/utils/api.js`** (duplicate)
6. **Create `src/api/AdminApi.js`** (missing)
7. **Create `.env`** with `VITE_API_URL`
8. **Connect Zod validation** in StudentRegister
9. **Delete dead pages** (AdminDashboard, AdminStudentDetails, etc.)
10. **Remove console.logs** (14+ locations)

---

## Known Issues To Fix During Integration

| Issue | File | Line(s) |
|---|---|---|
| Passwords logged to console | `Login.jsx` | 73, 88 |
| Stray expression `-toast;` | `App.jsx` | 15 |
| Filename typo `Dashborad.jsx` | `components/AdminPage/` | — |
| Missing import `UnderDevelopment` | `AdminCourseDetails.jsx` | 21 |
| Debug interceptor log | `config/axios.js` | 11 |
| Duplicate file | `utils/api.js` | entire |
| Dead root file | `data.jsx` | entire |
| Hardcoded "Admin Name" | `TopNav.jsx` | 47 |
| Hardcoded "LKR 5000" revenue | `Dashborad.jsx` | 91, 154 |

---

## Instructions For Future Sessions

1. **Read this file first** before making any changes
2. **Read `FRONTEND_INTEGRATION_PLAN.md`** for the step-by-step integration order
3. **Read `FRONTEND_BACKEND_MAPPING.md`** for the complete endpoint-to-component mapping
4. **Read `FRONTEND_ARCHITECTURE_REPORT.md`** for detailed architecture analysis
5. **Do NOT re-audit** — this audit is comprehensive and current
6. **Follow the 10-step integration order** — dependencies matter
7. **Test after each phase** — don't batch all changes together
8. **Backend is on branch `anupa2`** — security handoff is at `SECURITY_AUDIT_HANDOFF.md` in the backend repo
