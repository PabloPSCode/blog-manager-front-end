import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound } from "@/screens/404";
import { Home } from "@/screens/app/Home";
import { DashboardLayout } from "@/screens/app/layout";
import { ManageAuthors } from "@/screens/app/ManageAuthors";
import { ManagePosts } from "@/screens/app/ManagePosts";
import { RegisterPost } from "@/screens/app/RegisterPost";
import { ErrorPage } from "@/screens/error";
import { ReactNode } from "react";
import { RegisterAuthor } from "@/screens/app/RegisterAuthor";

type route = {
  path: string;
  element: ReactNode;
};

const appRoutesBase: route[] = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path: "/dashboard/cadastrar-post",
    element: <RegisterPost />,
  },
  {
    path: "/dashboard/gerenciar-posts",
    element: <ManagePosts />,
  },
  {
    path: "/dashboard/cadastrar-autor",
    element: <RegisterAuthor />,
  },
  {
    path: "/dashboard/gerenciar-autores",
    element: <ManageAuthors />,
  },
];

const appRoutes = appRoutesBase.map((route) => ({
  path: route.path,
  element: <DashboardLayout>{route.element}</DashboardLayout>,
  errorElement: <ErrorPage />,
}));

const appRouter = createBrowserRouter(appRoutes);

const AppRouter: React.FC = () => {
  return <RouterProvider router={appRouter} />;
};

export default AppRouter;
