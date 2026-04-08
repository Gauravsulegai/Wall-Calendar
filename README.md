# 🗓️ Interactive Wall Calendar Widget 

A highly polished, interactive wall calendar component. 

Focused on delivering a premium user experience, this widget features realistic UI elements, intelligent layout stability, smooth directional animations, and persistent local storage.

🚀 **[https://wall-calendar-wine-gamma.vercel.app/]([])**

---

## ✨ Key Features & UX Polish

While building this widget, I focused heavily on the UI/UX that separates a standard grid from a premium product:

* **Realistic "Wall Calendar" Aesthetic:** Implemented a pure-CSS twin-loop spiral binding and hanger hook to give the widget a tactile, physical presence without relying on heavy external SVG assets.
* **Intelligent Layout Stability:** Addressed the common "calendar bounce" issue. The grid dynamically adjusts to 4-week or 5-week months while the parent container's height is strictly locked, ensuring zero layout shift when navigating between months.
* **Directional Flip Animations:** Built custom `@keyframes` to slide the calendar *up* for future months and *down* for previous months, mimicking the physical action of flipping pages.
* **Smart Contextual Controls:** The "Today" action button dynamically disappears when the user is already viewing the current month, reducing UI clutter.
* **Persistent Memo Pad:** Used `localStorage` solution for the Notes section, allowing users to jot down context-specific thoughts.

## 🛠️ Tech Stack

* **Core:** React.js (Hooks, Functional Components)
* **Styling:** Tailwind CSS (Utility-first, highly responsive)
* **Build Tool:** Vite (For blazing fast HMR and optimized builds)
* **State Management:** Custom React Hooks (`useCalendarState`)
* **Deployment:** Vercel

---

## 🧠 Architectural Decisions

**1. CSS Animations over 3D Libraries**
To simulate flipping a page, I opted for directional CSS translations rather than importing a heavy 3D library (like Three.js or complex `rotateX` math). This keeps the bundle size incredibly small, maintains perfect hit-boxes for touch devices, and ensures completely smooth 60fps performance across all browsers.

**2. Separation of Concerns (`dateUtils.js`)**
All calendar math (calculating padding days, leap years, and grid matrices) is strictly separated from the React rendering logic into a pure JavaScript utility file. This makes the components highly readable and ensures the math functions are perfectly testable in isolation.

**3. Tailored Form Inputs**
The memo pad `textarea` is rigidly controlled (`resize-none` and fixed heights) to prevent the user from accidentally breaking the flexbox layout of the parent card, ensuring the UI remains pristine.

---

## 💻 Running Locally

To run this project on your local machine, follow these steps:

**1. Clone the repository**
```bash
git clone https://github.com/Gauravsulegai/Wall-Calendar
cd wall-calendar

**2. Install dependencies**
```bash
npm install

**3. Start the development server**
```bash
npm run dev

---

*Built by Gaurav for the TUF Engineering Assessment.*