import { useEffect } from "react";
import Routes from "./routes";
import { useThemeStore } from "./store/theme";
import "./styles/globals.css";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <div className="w-full overflow-hidden mr-5">
      <Routes />
    </div>
  );
}

export default App;
