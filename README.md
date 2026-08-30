# QuickServe - Local Service Booking Platform (Hackathon MVP)

QuickServe is a local service-booking web application designed for a Beginner-to-Intermediate Modern Web & App Development Hackathon. It enables customers to discover local service providers, request appointments with strict validation, track status transitions in real-time, and submit 1–5 star reviews upon job completion.

---

## 🚀 Key Features & Workflow

### Main Workflow
`Customer` → Browse Services → Select Provider → Book Service (`QS-2026-XXX`) → `Provider` Accepts → In Progress → Completed → Customer Reviews (1–5 Stars)

1. **Service Search & Category Filtering:** Instant search by pro name, service category, or location.
2. **Role-Based Authentication:** Seamless Supabase Auth & Role persistence (`customer` vs `provider`).
3. **Strict Booking Validation:** Enforces required fields, date selection, time, and service location.
4. **Unique Booking IDs:** Generates format `QS-2026-001`, `QS-2026-002`, etc., persisted across page refreshes.
5. **State Transition Business Rules:**
   - Provider can `Accept` or `Reject` pending requests.
   - Transition sequence: `Pending` → `Accepted` → `In Progress` → `Completed`.
   - Rejection lock: `Rejected` bookings cannot be moved to `In Progress` or active states.
   - Immutability: `Completed` bookings cannot be edited.
6. **Gated Review System:**
   - Reviews restricted strictly to `Completed` bookings.
   - Max 1 review per booking ID.
   - Rating validated between 1 and 5 stars.
7. **Dual-Layer Persistence:** Direct connection to Supabase DB with an automatic `localStorage` fallback so the app works seamlessly offline or without API keys.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, JavaScript (ES6+)
- **Build Tool:** Vite v8
- **Routing:** React Router v7 (`BrowserRouter`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), Lucide Icons
- **Database & Auth:** Supabase Client (`@supabase/supabase-js`) with `localStorage` fallback

---

## 📁 Required Pages Matrix

| Page Name | Route Path | Authorization | Purpose |
| --- | --- | --- | --- |
| **Home** | `/` | Public | Hero landing, category filters, search bar, 6 provider cards |
| **Login** | `/login` | Public | Auth login with quick role toggle |
| **Register** | `/register` | Public | Account registration (Customer vs Provider) |
| **Provider Profile** | `/provider/:id` | Public | Full provider specs, experience, rate, and booking CTA |
| **Booking Form** | `/booking/:providerId` | Customer | Validated form generating unique `QS-2026-XXX` ID |
| **Customer Dashboard** | `/customer/dashboard` | Customer | Booking status tracker and gated 1–5 star review form |
| **Provider Dashboard** | `/provider/dashboard` | Provider | Workspace for accepting/rejecting & state transitions |
| **Profile Account** | `/profile` | Authenticated | Account management & role switching |
| **404 Not Found** | `*` | Public | Friendly fallback page |

---

## 💡 Seed Demo Data (6 Providers)

1. **Ahmed Electrician** - Electrician ($85/hr, 12 yrs exp, Rating 4.9)
2. **Ali Plumbing Services** - Plumber ($72/hr, 8 yrs exp, Rating 4.8)
3. **Sara Cleaning Services** - Cleaner ($45/hr, 6 yrs exp, Rating 4.7)
4. **Hassan AC Services** - AC Technician ($68/hr, 9 yrs exp, Rating 4.8)
5. **Ayesha Painting Services** - Painter ($65/hr, 10 yrs exp, Rating 4.9)
6. **Bilal Computer Repair** - Computer Repair ($55/hr, 7 yrs exp, Rating 4.9)

---

## 🔑 Demo Login Credentials

You can use the built-in Quick Switch role pill in the top header, or log in with demo credentials:

- **Customer Login:**
  - Email: `jane@example.com`
  - Password: `password123`
  - Role: `customer`

- **Provider Login:**
  - Email: `ahmed@example.com`
  - Password: `password123`
  - Role: `provider`

---

## ⚙️ Environment Variables & Setup

Create a `.env` file in the project root (see `.env.example`):

```env
VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### Database Setup (Supabase SQL)
Run the SQL script provided in `supabase_schema.sql` in your Supabase Query Editor:
- Creates `profiles`, `providers`, `bookings`, `reviews` tables.
- Enables Row Level Security (RLS) policies.
- Inserts seed data for the 6 demo service providers.

---

## 📦 Local Installation & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fizabaneen/Quickserve-hackathon.git
   cd Quickserve-hackathon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run Dev Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for Production:**
   ```bash
   npm run build
   ```

---

## ✅ Hackathon Requirements Completed Checklist

- [x] Responsive home / services page
- [x] At least 6 service providers
- [x] Search & category filter
- [x] Provider details page
- [x] Registration & Login
- [x] Customer role support
- [x] Provider role support
- [x] Booking form with validation
- [x] Unique booking ID (`QS-2026-XXX`)
- [x] Persistent database (Supabase + LocalStorage fallback)
- [x] Customer dashboard
- [x] Provider dashboard
- [x] Accept booking action
- [x] Reject booking action
- [x] In Progress status transition
- [x] Completed status transition
- [x] 1–5 star review submission
- [x] Review validation (gated to completed, max 1 review per booking)
- [x] Business rules enforced (rejection lock & completion lock)
- [x] Responsive mobile, tablet, and desktop layout
