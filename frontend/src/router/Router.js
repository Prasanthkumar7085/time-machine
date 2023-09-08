import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Disclaimer from "../components/Disclaimer";
import Demographics from "../components/Demographics";
import ScientistName from "../components/ScientistName";
import Layout from "../components/Layout/Layout";
import Welcome from "../components/Welcome";
import Question from "../components/Question";
import Summary from "../components/Summary";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import Intro from "../components/Intro/Intro";

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              exact: true,
              element: <Navigate to="/disclaimer" />,
            },
            {
              path: "/disclaimer",
              element: <Disclaimer />,
            },
            {
              path: "/scientist-name",
              element: <ScientistName />,
            },
            {
              path: "/welcome",
              element: <Welcome />,
            },
            {
              path: "/intro",
              element: <Intro />,
            },
            {
              path: "/question",
              element: <Question />,
            },
            {
              path: "/demographics",
              element: <Demographics />,
            },
            {
              path: "/summary",
              element: <Summary />,
            },
          ],
        },
        {
          element: <PublicRoute />,
          children: [
            {
              path: "/signup",
              element: <Signup />,
            },
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
      ],
    },
  ],
  { basename: "/game/" }
);
