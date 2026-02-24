import { useAuthenticationStore } from "@/store/auth";
import AppRouter from "./app.routes";
import AuthRouter from "./auth.routes";

export default function Routes() {
  const { isAuthenticated } = useAuthenticationStore();
  if (isAuthenticated) {
    return <AppRouter />;
  } else {
    return <AuthRouter />;
  }
}
