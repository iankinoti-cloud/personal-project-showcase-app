# personal-project-showcase-app

**Live demo:** [https://pixelgear-admin-9o8ai0ja1-iankinoti-clouds-projects.vercel.app](https://pixelgear-admin-9o8ai0ja1-iankinoti-clouds-projects.vercel.app)

This is a React admin portal I built for a retro gaming shop called PixelGear. The shop sells refurbished consoles, handhelds, controllers, and accessories. The portal lets you manage the product catalogue — add new items, view details, edit prices and stock, delete listings, and search through everything.

## What it does

- Landing page with a featured products grid and live stats
- Product catalogue page with search and category filter
- Add a new product via a form
- View a single product and edit its details inline
- Delete a product
- About page explaining the stack
- 404 page for routes that do not exist

## How to run it

Install dependencies first:

```
npm install
```

Start the mock API (json-server on port 3001):

```
npm run api
```

Start the dev server:

```
npm run dev
```

Run the tests:

```
npm test
```

You need both the dev server and the API running at the same time for the app to work. Open two terminals.

## Routes

| Path | What it shows |
|---|---|
| `/` | Home page with hero and featured listings |
| `/products` | Full catalogue with search and filter |
| `/products/new` | Form to add a new product |
| `/products/:id` | Single product view, edit, and delete |
| `/about` | About the project |

## Tech stack

- React 18 with Vite
- React Router v7 for navigation
- json-server for a local REST API
- Vitest and React Testing Library for tests
- Plain CSS with custom properties

## Custom hooks

Three custom hooks live in `src/hooks/`:

- `useFetch` — fetches data from a URL, handles loading and error states, and cancels requests on unmount
- `useDebounce` — delays updating a value until the user stops typing, used for the search input
- `useLocalStorage` — reads and writes to localStorage, used to persist product favourites
- `useScrollY` — tracks window scroll position, used for the parallax effect on the home page hero

## Project structure

```
src/
  components/
    Layout/       shared page wrapper and navbar
    Navbar/       top navigation bar
    SearchBar/    search input component
    ProductCard/  product card used in grids
    ProductForm/  reusable create/edit form
  context/
    ProductsContext.jsx   global product state and CRUD methods
  hooks/
    useFetch.js
    useDebounce.js
    useLocalStorage.js
    useScrollY.js
  pages/
    HomePage.jsx
    ProductsPage.jsx
    ProductDetailPage.jsx
    NewProductPage.jsx
    AboutPage.jsx
    NotFoundPage.jsx
```

## Data shape

Each product in the catalogue looks like this:

```json
{
  "id": "p_001",
  "name": "SNES Classic Mini",
  "price": 79.99,
  "category": "Consoles",
  "stock": 14,
  "rating": 4.8,
  "image": "https://...",
  "description": "The classic Super Nintendo in mini form.",
  "tags": ["nintendo", "retro", "mini"],
  "featured": true,
  "createdAt": "2025-03-10"
}
```

The mock data is in `db.json` at the root. json-server reads it and exposes a REST API.

## Git workflow

Each feature was built on its own branch, then merged into main via a pull request:

- `feature/scaffold`
- `feature/hooks-and-context`
- `feature/routing-and-layout`
- `feature/pages-and-components`
- `feature/tests`

Branches were deleted after merging.
