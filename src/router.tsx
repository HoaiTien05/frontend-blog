import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./layouts";
import { PrivateRoute } from "./core/router/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import PostEditor from "./pages/PostEditor";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/posts",
        element: <PostList />,
      },
      {
        path: "/posts/:slug",
        element: <PostDetail />,
      },
      {
        path: "/posts/:id/edit",
        element: (
          <PrivateRoute>
            <PostEditor />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-post",
        element: (
          <PrivateRoute>
            <PostEditor />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
