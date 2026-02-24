import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound } from "@/screens/404";
import { ConsultCertificates } from "@/screens/app/ConsultCertificates";
import { FollowUserProgress } from "@/screens/app/FollowUserProgress";
import { Home } from "@/screens/app/Home";
import { DashboardLayout } from "@/screens/app/layout";
import { ManageClasses } from "@/screens/app/ManageClasses";
import { ManageCourses } from "@/screens/app/ManageCourses";
import { ManageModules } from "@/screens/app/ManageModules";
import { ManageTutors } from "@/screens/app/ManageTutors";
import { ManageUsers } from "@/screens/app/ManageUsers";
import { RegisterClass } from "@/screens/app/RegisterClass";
import { RegisterCourse } from "@/screens/app/RegisterCourse";
import { RegisterModule } from "@/screens/app/RegisterModule";
import { RegisterTutor } from "@/screens/app/RegisterTutor";
import { RegisterUser } from "@/screens/app/RegisterUser";
import { ErrorPage } from "@/screens/error";
import { ReactNode } from "react";

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
    path: "/dashboard/cadastrar-usuario",
    element: <RegisterUser />,
  },
  {
    path: "/dashboard/gerenciar-usuarios",
    element: <ManageUsers />,
  },
  {
    path: "/dashboard/cadastrar-curso",
    element: <RegisterCourse />,
  },
  {
    path: "/dashboard/gerenciar-cursos",
    element: <ManageCourses />,
  },
  {
    path: "/dashboard/cadastrar-modulo",
    element: <RegisterModule />,
  },
  {
    path: "/dashboard/gerenciar-modulos",
    element: <ManageModules />,
  },
  {
    path: "/dashboard/cadastrar-tutor",
    element: <RegisterTutor />,
  },
  {
    path: "/dashboard/gerenciar-tutores",
    element: <ManageTutors />,
  },
  {
    path: "/dashboard/cadastrar-videoaula",
    element: <RegisterClass />,
  },
  {
    path: "/dashboard/gerenciar-videoaulas",
    element: <ManageClasses />,
  },
  {
    path: "/dashboard/consultar-certificados",
    element: <ConsultCertificates />,
  },
  {
    path: "/dashboard/acompanhar-progresso-do-usuario",
    element: <FollowUserProgress />,
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
