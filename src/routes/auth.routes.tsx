import { NotFound } from "@/screens/404";
import { InitialScreen } from "@/screens/auth/InitialScreen";
import { AuthenticationLayout } from "@/screens/auth/layout";
import { RecoveryPassword } from "@/screens/auth/RecoveryPassword";
import { SignUp } from "@/screens/auth/SignUp";
import { UpdatePassword } from "@/screens/auth/UpdatePassword";
import { ErrorPage } from "@/screens/error";
import { ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

type route = {
  path: string;
  element: ReactNode;
};

const authRoutesBase: route[] = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <InitialScreen />,
  },
  {
    path: "/cadastro",
    element: <SignUp />,
  },
  {
    path: "/recuperar-senha",
    element: <RecoveryPassword />,
  },
  {
    path: "/redefinir-senha",
    element: <UpdatePassword />,
  },
];

const authRoutes = authRoutesBase.map((route) => ({
  path: route.path,
  element: <AuthenticationLayout>{route.element}</AuthenticationLayout>,
  errorElement: <ErrorPage />,
}));

const authRouter = createBrowserRouter(authRoutes);

const AuthRouter: React.FC = () => {
  return <RouterProvider router={authRouter} />;
};

export default AuthRouter;
