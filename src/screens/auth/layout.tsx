import logo_text from "@/assets/logo_text.svg";
import { CompanyFooterLink } from "@/components/miscellaneous/CompanyFooterLink";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

interface AuthenticationLayoutProps {
  children: ReactNode;
}

export const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({
  children,
}: AuthenticationLayoutProps) => {
  const { pathname } = useLocation();
  const isCenteredAuthScreen =
    pathname === "/" || pathname === "/recuperar-senha";

  if (isCenteredAuthScreen) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-gray-100 dark:bg-slate-800 px-6 py-8">
        <Toaster />
        <div className="flex flex-1 flex-col justify-between">
          <section className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-[760px]">{children}</div>
            <div className="flex flex-col w-full items-center mt-16">
              <img src={logo_text} alt="logo_text" width={200} height={120} />
              <div className="flex flex-col lg:flex-row w-full mt-6 mb-2 justify-center">
                <CompanyFooterLink
                  companyText="Desenvolvido por PLS Sistemas. Acesse nosso site "
                  companyLink="https://www.plssistemas.com.br"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* TODO-PABLO: Add a similar to NextProgress bar page loading for indicating page loading */}
      <Toaster />
      <section className="flex flex-col lg w-full  bg-white dark:bg-slate-900  p-10 lg:p-20">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex flex-col w-full items-center">
            <img src={logo_text} alt="logo_text" width={200} height={120} />
            <div className="flex flex-col lg:flex-row w-full mt-6 mb-2 justify-center">
              <CompanyFooterLink
                companyText="Desenvolvido por PLS Sistemas. Acesse nosso site "
                companyLink="https://www.plssistemas.com.br"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
