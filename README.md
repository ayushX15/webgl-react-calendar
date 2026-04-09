# Interactive React Wall Calendar Challenge

A highly polished, interactive React/Next.js component built to emulate a premium, modern physical wall calendar aesthetic. The core engine is built strictly on the client-side utilizing React hooks, Framer Motion for liquid transitions, and WebGL for ambient visualizations.

## 🚀 Features & Engineering Implementation

### 1. The "Wall Calendar" Aesthetic & Theming
- **Dynamic Hero Widget:** Features a dedicated `CalendarHero` segment. The entire application transitions its primary accent colors depending on the active month, mapping visual hierarchy elegantly dynamically.
- **WebGL Interactive Backgrounds:** Built atop a `Liquid Ether` WebGL layer that interacts with the user's cursor forces while providing ultra-smooth, premium ambient illumination securely isolated in a canvas layer.
- **Glassmorphism UI:** Complete transition to a modern dashboard format using backdrop-blur utility layers mimicking physical frosted glass to keep typography legible regardless of the background complexities. 

### 2. Day Range Selector engine
- Powered by a custom `useRangeSelect` hook, the calendar inherently supports selecting ranges across the month.
- Distinct CSS structural styling using `framer-motion` visually bonds the Start Node and End Node via contiguous liquid pills (rather than disjointed boxes).
- An intelligent, floating `RangeBar` logs the current active gap (e.g., *12 Days*) preventing user confusion in long strings.

### 3. Integrated Notes & Local Storage
- Created a custom `useNotes` hook utilizing the `localStorage` browser API to satisfy the strictly client-side data persistence requirement. 
- You can apply custom text to any single day or any tracked range.
- The system renders independent color-coded dot-markers on the calendar for both your tracked Notes (`blue`) and integrated National Holidays (`red`) simultaneously without layout-shifts.
- **Side-by-Side Console:** Avoids endless vertical window stretching by containing appended notes inside a customized horizontal flex container locked to a rigid height, implementing iOS-style `snap-y` navigation.

### 4. Advanced UX & "Creative Liberties" (Bonus Features)
- **iOS-Inspired Date Wheel:** Implemented an inline, modal date picker using math-based positional scrolling. It sits safely behind an opaque mask, preventing grid-overlap while granting instant century-jumping.
- **Floating "Today" Anchor:** Added an auto-hiding glass floating action button (FAB) that dynamically renders out the bottom-right of the calendar grid when navigating external decades/months. A click instantly restores interpolation back to the current real-world date.
- **Web Audio Haptic Actuators:** Attached an embedded Web Audio `<OscillatorNode>` mathematically tied to the scroll position on the Date picker. Every time you cross a snap boundary, it sweeps a 150hz->40hz frequency triggering a highly satisfying physical "Tick" directly in the browser.
- **National Holiday Integration:** Actively pulls from a database of fixed and estimated regional holidays, displaying them dynamically in an animated tracker beneath the artwork. 


## 💻 How to Run Locally

### Requirements
- Node.js (v18 or higher)
- NPM or PNPM

### Quickstart
1. Clone the repository to your environment.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Boot up the NextJS development server:
   ```bash
   npm run dev
   ```
4. Access the application locally on `http://localhost:3000`

### Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Visuals:** Three.js / ReactBits
- **Icons:** Lucide React
