import { Navigate, createBrowserRouter } from "react-router-dom";

import Categories from "../components/Categories";
import Demographics from "../components/Demographics";
import Disclaimer from "../components/Disclaimer";
import Intro from "../components/Intro/Intro";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login";
import Question from "../components/Question";
import ScientistName from "../components/ScientistName";
import Signup from "../components/Signup";
import Stats from "../components/Stats";
import Summary from "../components/Summary";
import Welcome from "../components/Welcome";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

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
              path: "/categories",
              element: <Categories />,
            },
            {
              path: "/stats",
              element: <Stats />,
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
