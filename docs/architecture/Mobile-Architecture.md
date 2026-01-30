# Mobile Architecture for Bangsamoro Scholarship Portal

## Overview

The **Bangsamoro Scholarship Portal (BSP) Mobile App** is a companion application designed primarily for **Scholarship Applicants** and **Scholars**. While the web portal serves all user types (including admins and entity staff), the mobile app focuses on providing a streamlined, accessible, and offline-capable experience for the students themselves.

The app supports the BSP's core pillars:
1.  **Matchmaking**: Finding and applying for scholarships.
2.  **Community**: Networking and peer support.
3.  **Support**: Accessing offline resources and notifications.

---

## 1. Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | **React Native (via Expo)** | Cross-platform (iOS/Android), rapid development, easy updates via OTA. |
| **Language** | **TypeScript** | Type safety, shared types with web frontend. |
| **Routing** | **Expo Router** | File-based routing (familiar to Next.js), deep linking support. |
| **Styling** | **NativeWind (Tailwind CSS)** | Shared design system with web, rapid UI development. |
| **Local DB** | **SQLite** (via `expo-sqlite`) | Offline data storage (cached scholarships, user profile). |
| **State/Query** | **TanStack Query** | Server state management, caching, and offline synchronization. |
| **Auth** | **Expo SecureStore** | Secure storage for JWT tokens. |
| **Biometrics** | **expo-local-authentication** | FaceID/TouchID for quick login. |
| **Icons** | **Lucide React Native** | Consistent iconography with web. |

---

## 2. Navigation Structure

The app uses a tab-based navigation for primary access, with a stack navigator for deeper flows.

### Tab Navigator (Bottom Bar)
1.  **Home**
    *   Dashboard, featured scholarships, announcements.
2.  **Scholarships**
    *   Search, filter, and view scholarship listings.
3.  **Applications**
    *   Track status of submitted applications, view drafts.
4.  **Community** (Phase 3)
    *   News feed, messages, connections.
5.  **Profile**
    *   User details, digital ID, QR code, settings.

### Stack Navigator (Routes)
*   **Public (Entry)**: Landing Page, About.
*   **Auth**: Login, Register.
*   **Tabs (Dashboard)**: Home, Apps, Profile, Community, Settings.
*   **Onboarding**: Welcome slides, initial preferences.
*   **ScholarshipDetail**: Full view of a scholarship program.
*   **ApplicationForm**: Multi-step form wizard.
*   **Notifications**: Activity log and alerts.
*   **OfflineResources**: Downloaded guides and content.

---

## 3. Data Management & Offline Capability

A critical requirement for the BARMM region is **reliability in low-connectivity environments**.

### 3.0 Competitive Advantage & Rationale
Unlike national systems (e.g., CHED, DOST-SEI) which rely primarily on always-online web portals, the BSP Mobile App distinguishes itself with a true **Offline-First** architecture.
*   **Context**: BARMM provinces often face intermittent connectivity and power interruptions.
*   **Equity**: Allows students in remote areas (BASULTA, inland Maguindanao) to draft applications without data anxiety.
*   **Differentiation**: Sets BSP apart as a technologically inclusive platform tailored to the region's realities.

### 3.1 Offline Strategy
The app adopts an "Offline-First" approach using TanStack Query and SQLite.

*   **Read Operations**:
    *   All fetched data (scholarships, profile) is cached in SQLite.
    *   If the device is offline, the app serves data from the cache.
    *   Images are cached using `expo-image` with a custom cache policy.

*   **Write Operations (Optimistic Updates)**:
    *   Actions like "Save Scholarship" or "Mark as Read" update the UI immediately.
    *   Requests are added to a **Sync Queue** (persisted in SQLite).
    *   A background sync engine processes the queue when connectivity is restored (using `NetInfo`).

### 3.2 Sync Engine Logic
1.  **Detect Connection**: Listen for `NetInfo` changes.
2.  **Process Queue**: Iterate through pending `POST/PUT/DELETE` requests in the SQLite queue.
3.  **Retry Strategy**: Exponential backoff for failed requests.
4.  **Conflict Resolution**: Server wins (simplest model for this phase), or last-write-wins.

---

## 4. Authentication & Security

### 4.1 Login Flow
1.  **Credentials**: User logs in with Email/Password.
2.  **JWT**: Server returns Access and Refresh tokens.
3.  **Storage**: Tokens are stored in **SecureStore** (simulating Keychain/Keystore).
4.  **Biometrics**: User is prompted to enable FaceID/TouchID for future sessions.

### 4.2 Biometric Unlock
*   Create a "Session Key" generated upon successful password login.
*   Store the Session Key in SecureStore, protected by Biometric Access Control.
*   On app launch, prompt for biometrics to retrieve the Session Key and auto-login.

### 4.3 Digital ID (Future Feature)
*   A cryptographically signed **Scholar QR Code** stored locally.
*   Contains basic profile info (Name, Scholar ID, Program).
*   Verifiable offline by partner institutions using a verifier app.

---

## 5. UI/UX & Design System

The mobile app strictly follows the **Green & Gold** theme defined in existing architecture documents.

### 5.1 Theme Tokens (NativeWind)
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#004d40',  // Emerald Green (Web Match)
      secondary: '#c5a020', // Gold (Web Match)
      background: '#ffffff',
      foreground: '#1e293b',
    }
  }
}
```

### 5.2 Component Parity
We aim for visual parity with shadcn/ui components used on the web, adapted for touch:
*   **Cards**: Standard view with shadow and white background.
*   **Buttons**: TouchableOpacity with `h-12` (48px) minimum touch target.
*   **Inputs**: TextInputs with `p-4` padding and focus rings.

---

## 6. Modules Checklist

### Phase 1 (MVP)
- [x] **Auth**: Login, Register screens.
- [x] **Home**: Dashboard with user greeting.
- [ ] **Scholarships**: List view with infinite scroll.
- [ ] **Search**: Local filtering of cached scholarship data.
- [x] **Profile**: Read-only view of user profile.

### Phase 2 (Application)
- [ ] **Apply**: Multi-step form with "Save Draft" (local storage).
- [x] **My Applications**: Status tracker.
- [ ] **Documents**: Camera integration for scanning/uploading docs.

### Phase 3 (Community)
- [ ] **Chat**: WebSocket integration for real-time messaging.
- [ ] **Feed**: Social feed with "pull to refresh".
- [ ] **Push Notifications**: Expo Notifications service.

---

## 7. Development Workflow

1.  **Codebase**: `mobile/` directory in the monorepo.
2.  **Run**: `npx expo start` (Development).
3.  **Build**: local builds or EAS Build (Cloud).
4.  **Testing**:
    *   Unit: Jest + React Native Testing Library.
    *   E2E: Maestro (preferred over Detox for ease of use).

## 8. Alignment with Backend

*   **API**: Consumes the same Django REST Framework API at `/api/v1/`.
*   **Tenancy**: Mobile app detects tenant context either via user selection (e.g., "Select your Ministry") or deep links (`scholarships.bangsamoro.site/mbhte/mobile-login`).
