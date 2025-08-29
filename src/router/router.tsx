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
          const mod = await import("../pages/home/Home");
          return { Component: mod.default };
        },
      },
      {
        path: "projects",
        children: [
          {
            index: true,
            lazy: async () => {
              const mod = await import("../pages/projects/Projects.tsx");
              return { Component: mod.default };
            },
          },
          {
            path: "on-journal",
            lazy: async () => {
              const mod = await import("../pages/projects/on-journal/OnJournal.tsx");
              return { Component: mod.default };
            },
          },
        ]
      },
    ],
  },
]);
