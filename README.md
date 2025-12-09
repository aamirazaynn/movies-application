# Movie Application

A modern Next.js application for searching and managing your favorite movies. Built with TypeScript, SCSS modules, and Zustand for state management.

## 🚀 Features

- **Movie Search**: Search for movies using the OMDb API
- **Movie Details**: View comprehensive information about each movie
- **Favorites Management**: Add and remove movies from your favorites list
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **Responsive Design**: Fully responsive with mobile-friendly navigation
- **Server-Side Rendering**: Optimized performance with Next.js SSR
- **Type Safety**: Full TypeScript support throughout the application
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **SCSS Modules**: Modular and scoped styling
- **Zustand**: Lightweight state management
- **OMDb API**: Movie data source
- **Bun**: Fast package manager and runtime

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (Server Component)
│   ├── search/            # Search results page
│   ├── movie/[id]/       # Movie details page (Dynamic route)
│   ├── favorites/         # Favorites page (Client Component)
│   ├── layout.tsx         # Root layout
│   └── globals.scss      # Global styles
├── components/
│   ├── client/            # Client Components (use client)
│   │   ├── SearchBar.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── FavoriteButton.tsx
│   │   └── MobileMenu.tsx
│   └── server/            # Server Components
│       ├── Header.tsx
│       ├── MovieCard.tsx
│       ├── MovieGrid.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
├── lib/                   # Utility functions
│   ├── api.ts            # Custom fetch wrapper & API functions
│   └── utils.ts          # Helper functions
├── state/                 # State management
│   └── store.ts          # Zustand stores (favorites & theme)
└── types/                # TypeScript types
    └── movie.ts          # Movie-related types
```

## 🏗️ Architecture Decisions

### Server vs Client Components

The application follows Next.js best practices for component architecture:

- **Server Components** (default): Used for data fetching, static content, and components that don't need interactivity
  - `Header`, `MovieCard`, `MovieGrid`, `LoadingSpinner`, `ErrorMessage`
  - All page components (except `favorites` which needs client-side state)

- **Client Components** (`'use client'`): Used for interactive features and browser APIs
  - `SearchBar`: Handles user input and navigation
  - `ThemeToggle`: Manages theme state
  - `FavoriteButton`: Interacts with Zustand store
  - `MobileMenu`: Handles mobile navigation state

### State Management

- **Zustand**: Used for client-side state (favorites and theme)
- **localStorage**: Persists favorites and theme preferences
- **Server State**: Fetched directly in Server Components for optimal performance

## ⚙️ Setup

### Prerequisites

- **Bun**: Install from [bun.sh](https://bun.sh)
- **OMDb API Key**: Get a free API key from [omdbapi.com](https://www.omdbapi.com/apikey.aspx)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movies-application
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OMDb API key to `.env.local`:
   ```
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `bun run dev`: Start development server
- `bun run build`: Build for production
- `bun run start`: Start production server
- `bun run lint`: Run ESLint

## 🎨 Styling

The application uses SCSS modules for component-scoped styling:

- **Global Styles**: `src/app/globals.scss` - Theme variables and base styles
- **Component Styles**: Each component has its own `.module.scss` file
- **Theme Support**: CSS custom properties for light/dark themes
- **Responsive Design**: Mobile-first approach with breakpoints

## 🔍 Key Features Implementation

### Custom Fetch Wrapper

The `customFetch` function in `src/lib/api.ts`:
- Works on both server and client
- Handles API key injection
- Provides error handling
- Supports Next.js caching

### Favorites Management

- Uses Zustand for state management
- Persists to localStorage
- Accessible from any client component
- Optimistic UI updates

### Theme Management

- CSS custom properties for theming
- Zustand store for theme state
- localStorage persistence
- Smooth transitions

### Image Optimization

- Next.js Image component for automatic optimization
- Placeholder handling for missing posters
- Responsive image sizing
- Lazy loading support

## 🚢 Deployment

The application is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your `NEXT_PUBLIC_OMDB_API_KEY` environment variable
4. Deploy!

## 📚 Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting with Next.js config
- **Accessibility**: ARIA labels and semantic HTML
- **Performance**: Server-side rendering, image optimization, code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
