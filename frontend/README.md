# TorinFly ✈️

A full-featured tour reservation web app built with Next.js 14. Users can search for tours, go through a complete booking flow, and manage their profile — all with OTP-based authentication and a Persian calendar.

Built as my frontend bootcamp final project.

---

## Features

**User Side**
- OTP login (no password required)
- Tour search by origin, destination, and date
- Tour detail page with full info
- Multi-step checkout with passenger form & validation
- User profile with edit functionality
- My Tours — list of booked tours
- Transaction history
- Persian (Shamsi) date picker



## Tech Stack

| Area | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | CSS Modules |
| Forms & Validation | React Hook Form + Yup |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Persian Calendar | Zaman |

---

## Challenges Worth Mentioning

**OTP Timer** — Managing multiple states at once (sending / error / success / countdown) while keeping the resend button disabled until the timer hits zero. Solved with `useEffect` cleanup and coordinated `useState` updates.

**Persian Date Picker + React Hook Form** — The calendar component wasn't a controlled input, so registering it with the form required using `setValue` and `trigger` manually instead of the standard `register` pattern.

---

## Getting Started

```bash
git clone https://github.com/amirhosseinesalat/TorinFly
cd TorinFly/frontend
npm install
npm run dev
```

## Project Structure

```
TorinFly/
├── frontend/    # Next.js App Router — this is the frontend
└── backend/     # Separate backend (API server)
```

The frontend and backend are in the same repo but run independently.

---

## Pages

- `/` — Home & tour search
- `/tours/[id]` — Tour detail
- `/checkout` — Booking & passenger info
- `/profile` — User profile & edit
- `/my-tours` — Booked tours
- `/auth` — OTP login
- `/404` & `/error` — Error handling

---

Built by Amirhossein Esalat
