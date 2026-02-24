import error_warning from "@/assets/error_warning.svg";
import { useAuthenticationStore } from "@/store/auth";
import { Link } from "react-router-dom";

export function ErrorPage() {
  const { isAuthenticated } = useAuthenticationStore();

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 items-center justify-between p-[40px]">
      <div className="flex flex-col items-center mt-[10vh]">
        <img src={error_warning} alt="error_warning" width={200} height={120} className="ml-4" />
        <Link to={isAuthenticated ? "/dashboard" : "/"}>
          <button className="text-primary-light text-md font-regular mt-6 ">
            Voltar para a tela inicial
          </button>
        </Link>
      </div>
    </div>
  );
}
