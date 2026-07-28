# Hotel Booking App

A React hotel booking app where users can search for locations, browse hotels on an interactive map, view hotel details, and bookmark their favorite stays. Bookmarking is protected behind login.

**Live demo:** [bookinghotelappyasmin.netlify.app](https://booking-hotel-yasmin.netlify.app/)

> ⚠️ **Note:** The live demo is a static frontend deployment. The app depends on a backend/API server that isn't hosted, so data-dependent features (hotels, bookmarks, login) won't work there. To use the app fully, run the backend server locally alongside the frontend.

## Features

- **Search header** — search by location, dates, and guest count
- **Location list** — browse nearby locations/destinations
- **Hotel listing with map** — view hotels alongside an interactive map (Leaflet)
- **Hotel details** — view detailed information for a single hotel
- **Bookmarks** — save hotels to a personal bookmark list, view details, and add new bookmarks
- **Authentication** — login system with protected routes (bookmarks are only accessible when logged in)
- **Toast notifications** — user feedback via `react-hot-toast`


## Project Structure

```
src/
├── components/
│   ├── Header/                     # Search bar: location, dates, guests
│   ├── LocationList/                # List of nearby locations
│   ├── AppLayout/                    # Layout wrapper for the hotels section
│   ├── Hotels/                       # Hotel list + map view
│   ├── SingleHotel/                  # Single hotel detail page
│   ├── BookmarkLayout/               # Layout wrapper for the bookmarks section
│   ├── Bookmark/                     # Bookmark list
│   ├── SingleBookmark/               # Single bookmark detail page
│   ├── AddNewBookmark/               # Add a new bookmark
│   ├── Login/                        # Login page
│   ├── ProtectedRoute/               # Restricts access to authenticated users
│   └── context/
│       ├── HotelsProvider.jsx        # Hotels state/context
│       ├── BookmarkListContext.jsx   # Bookmarks state/context
│       └── AuthProvider.jsx          # Auth state/context
├── App.jsx                           # Route definitions
└── main.jsx                          # App entry point
```

## Routes

| Path            | Description             | Access    |
| ---------------- | ------------------------ | --------- |
| `/`               | Home — location list      | Public    |
| `/login`          | Login page               | Public    |
| `/hotels`         | Hotel list + map         | Public    |
| `/hotels/:id`     | Single hotel details     | Public    |
| `/bookmark`       | Bookmark list            | Protected |
| `/bookmark/:id`   | Single bookmark details  | Protected |
| `/bookmark/add`   | Add a new bookmark       | Protected |

## Getting Started

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the server first (required for hotels, bookmarks, and login to work)
   ```bash
   npm run server
   ```
4. Run the frontend development server
   ```bash
   npm run dev
   ```
5. Open the app at `http://localhost:5173` (or the URL shown in your terminal)
