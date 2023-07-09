import { createBrowserRouter } from "react-router-dom";

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

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/disclaimer",
            element: <Disclaimer />,
          },
          {
            path: "/demographics",
            element: <Demographics />,
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
            path: "/question",
            element: <Question />,
          },
          {
            path: "/summary",
            element: <Summary />,
          },
        ],
      },
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
]);
