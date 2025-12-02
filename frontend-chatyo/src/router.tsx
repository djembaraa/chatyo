import { createBrowserRouter } from "react-router";
import LandingPages from "./features/landing/pages/LandingPages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPages />,
  },
]);

export default router;
