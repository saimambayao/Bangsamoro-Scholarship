# Mobile Page Map & Implementation Plan

**Date:** January 29, 2026
**Based on:** `Web-App-Audit.md` (v1.0)
**Objective:** Translate the Web App structure into a Mobile App plan with equivalent functionality.

## 1. Design Philosophy: Mobile-Friendly vs. Exact Copy

**Answer to User Question:**
> "Should the mobile app pages be exactly the same as the web app pages?"

**No.** The mobile app should aim for **Feature Parity** (same capabilities) but **Native UX** (mobile-friendly design).

*   **Navigation:** Replace Top-bar/Side-bar navigation with **Bottom Tabs** and **Stack Navigation** (Back button flows).
*   **Layout:** Replace Grids/Tables with **Lists/Cards**. Avoid horizontal scrolling.
*   **Interactions:** Use large touch targets (min 44px/48px). Use native gestures (swipe to refresh, swipe to go back).
*   **Scope:** The Mobile App is exclusively for **Applicants and Scholars**. Admin/Staff features remain Web-Only.

---

## 2. Navigation Structure

### Web vs. Mobile Navigation

| Web Structure | Mobile Construct |
| :--- | :--- |
| **Global Header** (Logo, Login) | **Stack Header** (Title, Back Btn) |
| **Sidebar** (Dashboard) | **Bottom Tab Bar** (Primary Navigation) |
| **Grid Layout** | **Vertical List / ScrollView** |
| **Modals** | **Bottom Sheets / Full Screen Modals** |

### Mobile Tab Bar (Bottom)
1.  **Home** (Dashboard)
2.  **Scholarships** (Directory)
3.  **Applications** (My Apps)
4.  **Community** (Feed/Chat) - *Phase 3*
5.  **Profile** (Account/Settings)

---

## 3. Page-by-Page Translation Map

### A. Public Pages (Guest Access)

| Web Route | Mobile Screen / Flow | Implementation Plan |
| :--- | :--- | :--- |
| `/` (Landing) | **Onboarding / Public Home** | Show a simplified "Welcome" screen or Guest Feed. Key actions: "Search Scholarships", "Login". |
| `/about` | **Stack: About** | Static content screen. Accessible via Settings or Login screen. |
| `/contact` | **Stack: Support** | "Help & Support" screen. Use native mailto/call triggers or a simple form. |
| `/scholarships` | **Tab: Scholarships** | **List View**. Card-based layout. |
| `/scholarships?filter=...` | **Sheet: Filters** | Use a Bottom Sheet for filtering (Program, Agency, etc.) instead of a sidebar. |
| `/scholarships/[id]` | **Stack: ScholarshipDetail** | Full screen detail. "Apply" button fixed at bottom. |
| `/scholarships/[id]/apply` | **Stack: ApplicationForm** | **Wizard Flow**. Break multi-step web forms into separate screens (Step 1 -> Next -> Step 2). |
| `/success-stories` | **Component: Home Feed** | Integrate stories into the Home Tab feed rather than a standalone page. |
| `/providers/[slug]` | **Stack: ProviderProfile** | View Ministry/Partner details. |

### B. Authentication

*Same logic, adapted UI.*

| Web Route | Mobile Screen | Notes |
| :--- | :--- | :--- |
| `/login` | **Auth: Login** | Support FaceID/TouchID (Biometrics). |
| `/register` | **Auth: Register** | Step-by-step wizard. |
| `/forgot-password` | **Auth: ForgotPassword** | |
| `/verify-email` | **Auth: OTP** | Auto-read OTP from SMS (if possible) or number pad input. |
| `/onboarding` | **Auth: Onboarding** | Profile completion after registration. |

### C. Applicant Dashboard (Authenticated)

| Web Route | Mobile Screen / Flow | Implementation Plan |
| :--- | :--- | :--- |
| `/dashboard` | **Tab: Home** | Personalized greeting, "At a Glance" stats, "Recent Activity" feed. |
| `/dashboard/applications` | **Tab: Applications** | List of active applications. Tabs for "Active" vs "History". |
| `/dashboard/applications/[id]` | **Stack: ApplicationDetail** | Timeline view of status. |
| `/dashboard/profile` | **Tab: Profile** | User avatar, details, edit profile button. |
| `/dashboard/documents` | **Stack: DocumentVault** | **Native Feature**: Use Camera to scan docs. View/Delete uploads. |
| `/dashboard/messages` | **Stack: Messages** | Chat list. (Phase 3) |
| `/dashboard/community` | **Tab: Community** | Social feed (Posts/Stories). (Phase 3) |
| `/dashboard/learning` | **Stack: Learning** | List of courses/resources. Downloadable for **Offline Access**. |

### D. Admin Pages (Tenant & Super Admin)

**Current Decision: NO MOBILE APP.**
*   Admin features (`/[tenant]/admin`, `/admin`) are complex and data-heavy (tables, reports).
*   **Strategy**: If an admin logs in on mobile, redirect them to the **Mobile Web** version or show a message "Please use the Desktop Portal for Admin tools."

---

## 4. Mobile-Specific Additions

The mobile app enables features not possible/easy on web:
1.  **Offline Mode**: Cache Scholarships and Profile data. Allow "Draft Apply" without internet. `Web-App-Audit.md` notes this as a key requirement.
2.  **Push Notifications**: Replace or augment the `/dashboard` notification center.
3.  **Biometric Login**: Faster access than typing passwords.
4.  **Camera Integration**: Direct document scanning for requirements.

## 5. Execution Checklist (Gap Analysis)

Comparing `Web-App-Audit` vs `Mobile-Architecture`:

### Missing in Mobile Architecture Plan:
- [ ] **Success Stories**: Plan to integrate into Home Feed.
- [ ] **Provider Profiles**: Need a screen to view Ministry details.
- [ ] **Document Vault (Camera)**: explicit requirement for scanning.
- [ ] **Learning (LMS)**: Mobile access to learning modules (offline capable).
- [ ] **Contact/Support**: "Help" section in Profile tab.

---

**Summary:** The mobile app will strictly mirror the **Applicant** and **Public** experience, optimizing for touch and offline usage. It will **exclude** Admin functionalities.
