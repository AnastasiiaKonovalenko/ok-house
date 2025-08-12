import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import React from "react";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <div>Что-то пошло не так</div>,
    children: [
      {
        index: true,
        lazy: async () => {
          const mod = await import("../pages/Home");
          return { Component: mod.default };
        },
      },
    ],
  },
]);
