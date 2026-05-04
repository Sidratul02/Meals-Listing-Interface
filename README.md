# Meals Explorer

A responsive meals and recipes listing interface built with React, TypeScript, and Vite. It fetches live data from the FreeAPI Meals API and displays recipes in a clean, card-based layout.

<img width="636" height="723" alt="Screenshot (269)" src="https://github.com/user-attachments/assets/b3ec197b-7adc-4a51-9813-dd2bcb878e5e" />

---

## Live API

**Base URL:** `https://api.freeapi.app/api/v1/public/meals`

Each page returns 10 meals out of 293 total (30 pages).

---

## Features

- Fetches and displays meals from the FreeAPI Meals endpoint
- Paginated browsing — 10 meals per page, 30 pages total
- Each meal card shows:
  - Meal thumbnail image with zoom on hover
  - Country/area badge overlaid on the image
  - Meal name
  - Category badge
  - Tags (when available)
  - Scrollable ingredients list with measurements
  - Watch Recipe button linking to YouTube
- Animated loading spinner while fetching
- Error message on fetch failure
- Smooth scroll to top on page change
- Fully responsive — single column on mobile, multi-column grid on desktop

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI library |
| TypeScript | 6 | Type safety |
| Vite | 8 | Dev server & bundler |
| CSS (vanilla) | — | Styling |
| Inter (Google Fonts) | — | Typography |
| FreeAPI Meals API | — | Data source |

---

## Project Structure

```
src/
├── App.tsx        # Main component — fetching, state, rendering
├── App.css        # All styles
├── index.css      # Global reset
└── main.tsx       # React entry point
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Component Breakdown

### `App.tsx`

**State:**
| State | Type | Description |
|---|---|---|
| `meals` | `Meal[]` | Array of meals for the current page |
| `page` | `number` | Current page number (starts at 1) |
| `totalPages` | `number` | Total pages returned by the API |
| `loading` | `boolean` | True while fetching |
| `error` | `string` | Error message if fetch fails |

**`getIngredients(meal)`**  
A helper function that loops through `strIngredient1`–`strIngredient20` and `strMeasure1`–`strMeasure20` on each meal object, filters out empty values, and returns a clean array of strings like `"1 cup Toor dal"`.

**Data flow:**
1. `useEffect` triggers on `page` change
2. Fetches `https://api.freeapi.app/api/v1/public/meals?page={page}&limit=10`
3. Sets `meals` and `totalPages` from the response
4. Renders cards inside a grid container

---

## API Response Shape

```json
{
  "statusCode": 200,
  "data": {
    "page": 1,
    "limit": 10,
    "totalPages": 30,
    "totalItems": 293,
    "data": [
      {
        "idMeal": "52785",
        "strMeal": "Dal fry",
        "strCategory": "Vegetarian",
        "strArea": "Indian",
        "strMealThumb": "https://www.themealdb.com/images/...",
        "strTags": "Curry,Vegetarian",
        "strYoutube": "https://www.youtube.com/watch?v=...",
        "strIngredient1": "Toor dal",
        "strMeasure1": "1 cup",
        ...
      }
    ]
  },
  "message": "Meals fetched successfully",
  "success": true
}
```

---

## Design

- **Color palette:** Deep navy `#0f2027` → teal `#2c5364` (header gradient), light blue-grey `#e8f0f5` (background)
- **Typography:** Inter (Google Fonts) — 400, 500, 600, 700 weights
- **Cards:** White background, 16px border radius, subtle shadow, lift + image zoom on hover
- **Grid:** CSS `auto-fill` grid with `minmax(300px, 1fr)` — adapts from 1 to 4 columns
- **Ingredients:** Scrollable list capped at `110px` height so all cards stay uniform in size

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
