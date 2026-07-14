# Hepi Cure — Website MVP

**Eat Healthy. Live Happy.**

A fully working, static front-end build of the Hepi Cure website: landing page, auth, health-assessment interstitial, subscription plans, a member dashboard with all 5 meal categories (50 sample meals), order tracking, profile, and a full admin panel.

## Open it
Just open `index.html` in a browser — no build step, no server, no install required. Every page links to the next in the flow described below.

## Flow
```
index.html  →  login.html / register.html  →  assessment.html
     →  subscription.html  →  dashboard.html (bottom-nav app)
     ├── subscription-status.html
     ├── track-order.html
     └── profile.html

admin/login.html  →  admin/dashboard.html
```

## Demo logins
- **Member:** register a new account on `register.html` — it's saved to your browser's localStorage.
- **Admin:** `admin@hepicure.com` / `admin123`

## What's real vs. mocked (important)
This build runs **entirely in the browser with no backend**, so a few things from the brief are simulated so you can click through the whole product today:

| Brief asked for | This build uses |
|---|---|
| Firebase Authentication | `localStorage`-based mock auth (see `js/app.js` → `Auth` object) |
| Cloud Firestore (meals, users, orders...) | Static sample data in `js/data.js` + `localStorage` for user records |
| Google Health Assessment Form | Links out to a placeholder Google Forms URL — swap `js/app.js`/`assessment.html` with your real form link |
| WhatsApp ordering | Fully real — every "Order" and "Subscribe" button opens `wa.me` with a pre-filled message. Update `WHATSAPP_NUMBER` in `js/data.js` |
| Admin panel | Fully functional UI reading from the same sample data + localStorage registrations, no persistence to a real database yet |

Everything else — layout, animations, responsiveness, dark mode, search/filter, WhatsApp deep-links, the timeline UI, form validation — is fully functional right now.

## Going to production (Next.js + Firebase)
The brief's target stack is Next.js + Firebase + Vercel. To get there:
1. Scaffold a Next.js app and port each `.html` page into a route/page component (the HTML/CSS structure and class names in `css/style.css` can be reused almost as-is, or migrated to Tailwind using the same design tokens listed at the top of `style.css`).
2. Replace `js/app.js`'s `Auth` object with real `firebase/auth` calls (`createUserWithEmailAndPassword`, `signInWithEmailAndPassword`).
3. Replace `js/data.js`'s static arrays with Firestore collections: `users`, `meals`, `subscriptions`, `categories`, `orders`, `settings` (matching the brief's schema).
4. Move meal images from the Unsplash placeholder URLs to Firebase Storage.
5. Deploy to Vercel.

## Structure
```
hepicure/
├── index.html              Landing page
├── login.html               
├── register.html
├── assessment.html          Health assessment interstitial
├── subscription.html        Plan picker (postsign-up)
├── dashboard.html           Home — search + category browse, all 50 meals
├── subscription-status.html Manage active plan
├── track-order.html         Delivery timeline
├── profile.html
├── admin/
│   ├── login.html
│   └── dashboard.html       Users · Meals · Categories · Subscriptions · Orders · Settings
├── css/style.css            Design tokens + all styling
└── js/
    ├── data.js               Meals, plans, testimonials, FAQ, WhatsApp helper
    └── app.js                Mock auth, theme, toasts, shared render helpers
```

## Design tokens
- **Colors:** Terracotta `#A65D3A`, Cream `#F8F3E8`, Olive `#6F7D4E`, Dark Brown text `#3A2B20`
- **Fonts:** Poppins (headings), Inter (body) — loaded via Google Fonts
- **Radius:** 20px cards, pill-shaped buttons
- **Dark mode:** toggle in the top nav, persisted via localStorage
