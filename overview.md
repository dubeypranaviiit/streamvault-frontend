# 🎥 StreamVault Frontend – Overview

StreamVault frontend is a React + TailwindCSS application that provides
secure video upload, processing tracking, and controlled streaming.

It integrates tightly with the StreamVault backend using:
- JWT authentication via HTTP-only cookies
- Role-based UI rendering
- Real-time updates via Socket.IO

Key goals:
- Secure access
- Clean role separation
- Real-time UX

# 🔐 Authentication Flow

## AuthContext
Location:
src/context/AuthContext.jsx

Responsibilities:
- Load user on app startup (/auth/me)
- Maintain auth state
- Expose login, signup, logout
- Track loading state

## Initial Load
1. App mounts
2. AuthProvider calls `/auth/me`
3. User is set or cleared
4. UI rendering begins only after loading=false

## Token Refresh
Hook:
useRefreshToken(user)

- Runs every 14 minutes
- Calls `/auth/refresh`
- Keeps session alive silently

## Authentication Rules
- Authentication = user exists
- Authorization = role checks (viewer/editor/admin)

# 🧭 Routing & Route Protection

## Router
Library:
react-router-dom

Routes are defined in:
src/routes/AppRoutes.jsx

## ProtectedRoute
- Blocks unauthenticated users
- Redirects to /auth

## RoleRoute
- Wraps protected routes
- Checks allowedRoles array
- Redirects unauthorized users safely

Example:
- Editors/Admins can edit videos
- Viewers cannot

# 📊 Dashboard Architecture

## DashboardContext
Manages:
- activeTab state
- navigation between sections

Tabs:
- videos
- upload (editor/admin)
- admin (admin only)

## Dashboard Rendering
Dashboard.jsx:
- Waits for auth resolution
- Mounts DashboardProvider
- Renders DashboardInner

## Role-Based UI
- Viewer → video list only
- Editor → upload + edit
- Admin → full access

# 📤 Video Upload Flow

Component:
src/pages/Upload.jsx

## Upload Steps
1. User selects file
2. Metadata submitted via FormData
3. POST /videos/upload
4. Backend starts processing
5. Socket.IO sends progress updates
6. Final sensitivity result displayed

## UI States
- idle
- uploading
- processing
- completed

## Auto Redirect
After completion:
- Dashboard tab switches to "videos"

# 🎬 Video Streaming

Component:
src/pages/VideoWatch.jsx

## Streaming Logic
- Fetch video metadata
- Block playback if processing incomplete
- Stream via HTTP range requests

Video URL:
GET /api/videos/:id/stream

## Safety Enforcement
- Flagged videos show warning
- Backend enforces final access

# 🧠 State Management

## Contexts Used
- AuthContext → auth state
- DashboardContext → UI state

## Hooks
- useAuth()
- useDashboard()
- useRefreshToken()
- useSocket()

## Why Context?
- Lightweight
- Predictable
- No Redux needed


# 🔄 Real-Time Updates (Socket.IO)

Hook:
useSocket(userId)

## Events
- join → user joins private room
- video-progress → progress updates
- video-complete → processing done

## Safety
- Duplicate completion events ignored
- State locked after completion

# 🎨 UI & Layout Structure

## Layout Components
- Header (auth aware)
- DashboardLayout
- Topbar
- Sidebar

## Styling
- TailwindCSS
- Dark-first design
- Responsive grid layout

## UX Principles
- Block UI until auth resolves
- Clear loading states
- Role-aware navigation
