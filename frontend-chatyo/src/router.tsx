import { createBrowserRouter } from "react-router";
import LandingPages from "./features/landing/pages/LandingPages";
import SignUpPages from "./features/auth/pages/SignUpPages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPages />,
  },
  {
    path: "/sign-up",
    element: <SignUpPages />,
  },
]);

export default router;
