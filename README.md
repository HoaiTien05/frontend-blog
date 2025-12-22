# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])


# Mini Blog Frontend

React + TypeScript + Vite frontend application for a blog platform.

## Features

- ✅ User Authentication (Register, Login, Logout)
- ✅ View Blog Posts
- ✅ Create, Edit, Delete Posts
- ✅ User Profile Management
- ✅ Comments on Posts
- ✅ Search & Filter Posts
- ✅ Responsive Design with Ant Design

## Tech Stack

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **React Router v7** - Routing
- **Redux Toolkit** - State Management
- **React Query** - Data Fetching & Caching
- **Ant Design** - Component Library
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client

## Project Structure

```

src/
├── core/
│ ├── config/ # Axios configuration
│ ├── hooks/ # Custom hooks (useAuth)
│ ├── redux/ # Redux store, slices, hooks
│ ├── routes/ # Route components (PrivateRoute)
│ └── services/ # API services (authAPI, postAPI, commentAPI)
├── pages/ # Page components
├── layouts/ # Layout components
├── components/ # Reusable components
├── types/ # TypeScript interfaces
├── router.tsx # Route definitions
├── main.tsx # Entry point
└── index.css # Global styles

````

## Installation & Setup

### 1. Install Dependencies

```bash
cd d:\Training_DevPlus\mini-blog-frontend
npm install
````

### 2. Configure Environment

Create or edit `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```

Change `http://localhost:3000/api` to your backend API URL.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Check TypeScript errors
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues

## Key Files & Features

### Authentication

- **Login Page**: [src/pages/Login.tsx](src/pages/Login.tsx)
- **Register Page**: [src/pages/Register.tsx](src/pages/Register.tsx)
- **Auth Hook**: [src/core/hooks/useAuth.ts](src/core/hooks/useAuth.ts)
- **Auth Service**: [src/core/services/authAPI.ts](src/core/services/authAPI.ts)

### Posts Management

- **Post List**: [src/pages/PostList.tsx](src/pages/PostList.tsx)
- **Post Detail**: [src/pages/PostDetail.tsx](src/pages/PostDetail.tsx)
- **Post Editor**: [src/pages/PostEditor.tsx](src/pages/PostEditor.tsx)
- **Post Service**: [src/core/services/postAPI.ts](src/core/services/postAPI.ts)

### User Profile

- **Profile Page**: [src/pages/Profile.tsx](src/pages/Profile.tsx)

### Routes & Layouts

- **Router Config**: [src/router.tsx](src/router.tsx)
- **Root Layout**: [src/layouts/RootLayout.tsx](src/layouts/RootLayout.tsx)
- **Private Route Guard**: [src/core/routes/PrivateRoute.tsx](src/core/routes/PrivateRoute.tsx)

### State Management

- **Redux Store**: [src/core/redux/store.ts](src/core/redux/store.ts)
- **Auth Slice**: [src/core/redux/authSlice.ts](src/core/redux/authSlice.ts)

## API Endpoints Expected

The frontend expects these API endpoints on your backend:

```
Authentication:
- POST   /api/auth/register
- POST   /api/auth/login
- POST   /api/auth/logout
- POST   /api/auth/refresh

Users:
- GET    /api/users/profile
- PUT    /api/users/profile

Posts:
- GET    /api/posts (with pagination)
- POST   /api/posts
- GET    /api/posts/:slug
- PUT    /api/posts/:id
- DELETE /api/posts/:id

Comments:
- GET    /api/posts/:postId/comments
- POST   /api/posts/:postId/comments
- DELETE /api/comments/:id
```

## How to Use

### 1. Register & Login

Navigate to `/register` to create an account, then `/login` to access.

### 2. Create a Post

After login, click "New Post" button in header to create a new blog post.

### 3. Edit/Delete Posts

On the posts list or detail page, use Edit/Delete buttons (visible only for your own posts).

### 4. View & Comment

Click on any post to view full content and add comments.

### 5. Update Profile

Click on your avatar → "My Profile" to view/edit your profile.

## Token Management

- **Access Token**: Stored in localStorage, sent in Authorization header
- **Refresh Token**: Stored in localStorage for token refresh
- **Auto Refresh**: Axios interceptor automatically refreshes expired tokens
- **Logout**: Tokens cleared from localStorage on logout

## Form Validation

Uses Yup for validation:

- Email format validation
- Password requirements (min 6 chars)
- Confirm password matching
- Required field checks

## Error Handling

- API errors displayed as toast messages
- 401 errors trigger token refresh or redirect to login
- Network errors caught and displayed

## Development Tips

- Check Redux DevTools for state debugging
- React Query DevTools for API data inspection
- Browser DevTools for component debugging
- Ant Design components are pre-configured

## Connecting to Backend

1. Ensure backend is running (default: http://localhost:3000)
2. Update VITE_API_URL in `.env.local` to match backend URL
3. Backend should handle CORS properly
4. Both access and refresh tokens must be provided by backend

## Build for Production

```bash
npm run build
```

This creates optimized build in `dist/` folder. Deploy this folder to your hosting.

## Troubleshooting

### Cannot connect to backend

- Check `VITE_API_URL` in `.env.local`
- Ensure backend is running
- Check CORS configuration on backend

### Token expiration issues

- Backend refresh token endpoint should return new accessToken
- Ensure refreshToken is stored correctly

### Page shows blank

- Check browser console for errors
- Verify all dependencies are installed
- Clear browser cache and reload

## License

MIT

```

```
