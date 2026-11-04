# Aviin — Pure Luxury Clothing | Coming Soon & Privé Subscribe

A minimalist, haute-couture "Coming Soon" and private circle VIP reservation platform built in **React + Vite + Pure Vanilla CSS**, powered by a **Node.js/Express dual-email dispatch backend**.

---

## ✦ Key Features

### 1. Authentic Hummingbird Preloader (Default: Mode 4 Spiral & Drop)
* Recreated directly from `aviin_pure_luxury_clothing_preloader.html` with 100% vector fidelity.
* **Active Effect: Mode 4: Spiral Ascent & Letter Drop ("Spiral & Drop")**:
  - The painted hummingbird spirals upward from the center with an iridescent ribbon trail path.
  - The letters of `Aviin` cascade down from above one by one with subtle elastic bounce physics.
  - The dots for the two `i` stems drop and bounce softly into place.
* Multi-layer SVG anatomy: needle beak, turquoise head, cobalt throat, rainbow wing with barb streaks, emerald underwing, and sweeping violet tail feathers.
* Authentic optical kerning on editorial wordmark `Aviin` with dotless `ı` stems and animated `.i-dot` spring pops.
* Auto-transitions seamlessly into the minimalist Coming Soon screen, with a subtle corner button to replay the entrance animation anytime.

### 2. Ultra-Clean Minimalist Coming Soon Screen
* Strictly focused layout with zero clutter:
  - Centered luxury editorial wordmark (`AVIIN`) in *Cormorant Garamond*.
  - Gold couture sub-headline: `Pure Luxury Clothing • Coming Soon`.
  - Editorial invitation text.
* **Single Email Input & Submit Button:**
  - Built with **`react-aria-components`** for W3C accessibility and focus management.
  - Custom pill layout with gold focus rings.
  - Interactive submit button with loading spinner state and celebratory confetti burst.
* **Dual Automated Email System:**
  - Dispatches an exclusive VIP welcome email to the subscriber (with serialized passcard `AVN-PRIVÉ-XXXX`).
  - Dispatches an alert email to the admin with subscriber details.
* **Centralized Vanilla CSS Architecture (`src/styles/`)**:
  - `src/styles/index.css` — Master manifest.
  - `src/styles/theme.css` — Reset, CSS variables, typography & custom scrollbar.
  - `src/styles/preloader.css` — Vector hummingbird stage & Mode 4 keyframes.
  - `src/styles/react-aria.css` — React Aria Components accessibility styling.
  - `src/styles/coming-soon.css` — Minimalist single email subscribe box and confirmation card.

### 2. Haute Couture Hero & Live Countdown
* Grand editorial headline with subtle iridescent ambient lighting echoing the hummingbird's palette.
* Live 14-day ticking countdown timer (Days, Hours, Minutes, Seconds) with luxury dividers.
* Trust badges highlighting serialized editions (001–100), 48-hour priority access, noble mulberry silk, and bespoke atelier appointments.

### 3. VIP Privé Circle Subscribe Form
* Clean email input with instant validation and optional patron name.
* Capsule interest selector (*Haute Couture Silks*, *Bespoke Sartorial Tailoring*, *Serialized Capsule 001*).
* Interactive magnetic CTA with shimmer sweep effect and spinner.
* Multi-colored celebratory particle burst (`canvas-confetti`) in gold, royal navy, and iridescent jewel tones.
* Immediate issuance of an exclusive serialized membership pass: e.g., `AVN-PRIVÉ-7842`.

### 4. Dual Automated Email Notification System
When a user subscribes, the system simultaneously dispatches **two separate luxury emails**:
1. **To Subscriber:**
   - Confidential invitation with custom gold-accented VIP Passcard.
   - Serialized pass code (`AVN-PRIVÉ-XXXX`).
   - Confirmation of selected capsule preference.
   - List of Privé privileges (48-hr priority booking, bespoke stylist consultations, numbered edition allocations).
2. **To Admin:**
   - Urgent VIP Patron Alert to the atelier concierge.
   - Patron email, full name, selected capsule interest, assigned VIP pass code, timestamp, and client IP origin.

---

## ✦ Quick Start

### 1. Start Both Frontend & Backend (Recommended)
Run the unified command to launch Vite (`http://localhost:5173`) and the Express Email API (`http://localhost:5000`) concurrently:

```bash
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

### 2. Standalone Commands

```bash
# Frontend only (Vite)
npm run dev:client

# Backend only (Express Email API)
npm run dev:server

# Production build
npm run build
```

---

## ✦ Configuring Real SMTP Delivery (Gmail, Resend, Brevo)

The app works right out of the box with **zero configuration**:
- If `.env` has no SMTP credentials, it automatically uses **Ethereal Test Mailer**, logging clickable web preview links directly to the terminal so you can test and view both emails instantly!
- You can also click **"Inspect Emails"** in the top navigation bar to inspect and copy the rendered HTML templates directly in a modal.

To deliver emails to real inboxes, update `.env`:

### Gmail Configuration
1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Enable 2-Step Verification if not already enabled.
3. Generate an **App Password** under "App Passwords" (choose "Mail" and "Other").
4. Update `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=yourbrand@gmail.com
SMTP_PASS=your-16-character-app-password
FROM_NAME="Aviin Privé Atelier"
FROM_EMAIL="yourbrand@gmail.com"
ADMIN_EMAIL="admin@yourbrand.com"
```

### Resend Configuration
```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=resend
SMTP_PASS=re_123456789...
FROM_NAME="Aviin Privé Atelier"
FROM_EMAIL="concierge@yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"
```

---

## ✦ File Structure

```
Aviin/
├── aviin_pure_luxury_clothing_preloader.html   # Original reference preloader
├── server/
│   ├── index.js                                # Express API & dual email dispatch logic
│   └── emailTemplates.js                       # Luxury HTML email templates (Subscriber & Admin)
├── src/
│   ├── components/
│   │   ├── AviinPreloader.jsx                  # 100% SVG hummingbird preloader (Modes 1-5, Spiral & Drop default)
│   │   └── SubscribeForm.jsx                   # Minimalist single email input & submit button
│   ├── styles/                                 # Centralized Vanilla CSS Architecture
│   │   ├── index.css                           # Master manifest importing all modular stylesheets
│   │   ├── theme.css                           # Variables, typography & custom scrollbar
│   │   ├── preloader.css                       # Hummingbird vector stage & Mode 4 keyframes
│   │   ├── react-aria.css                      # React Aria Components luxury states & selectors
│   │   └── coming-soon.css                     # Minimalist single email subscribe box & confirmation card
│   ├── App.jsx                                 # Master layout & preloader controller
│   └── main.jsx                                # React entry point
├── .env                                        # Environment configuration (SMTP, Ports)
├── .env.example                                # Template environment configuration
├── package.json                                # Scripts & dependencies
└── vite.config.js                              # Vite dev server with /api proxy
```

