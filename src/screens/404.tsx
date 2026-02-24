import page_not_found from "@/assets/page_not_found.svg";
import page_not_found_dark from "@/assets/page_not_found_dark.svg";
import { useAuthenticationStore } from "@/store/auth";
import { useThemeStore } from "@/store/theme";
import { Link } from "react-router-dom";

export function NotFound() {
  const { isAuthenticated } = useAuthenticationStore();
  const { theme } = useThemeStore();

  return (
    <div className="flex flex-col w-full  items-center justify-between p-[40px]">
      <div className="flex flex-col items-center mt-[10vh]">
        <img
          src={theme === "light" ? page_not_found : page_not_found_dark}
          alt="page_not_found"
          width={200}
          height={120}
        />
        <span className="text-gray-700 dark:text-gray-100 text-xl font-bold mt-2 font-secondary ">
          A página que você está tentando acessar não existe
        </span>
        <Link to={isAuthenticated ? "/dashboard" : "/"}>
          <button className="text-primary-light text-md font-regular mt-6 ">
            Voltar para a tela inicial
          </button>
        </Link>
      </div>
    </div>
  );
}
