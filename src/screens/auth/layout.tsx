import dashboard_background from "@/assets/dashboard_background.png";
import logo_text from "@/assets/logo_text.svg";
import { CompanyFooterLink } from "@/components/miscellaneous/CompanyFooterLink";
import { Title } from "@/components/typography/Title";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface AuthenticationLayoutProps {
  children: ReactNode;
}

export const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({
  children,
}: AuthenticationLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* TODO-PABLO: Add a similar to NextProgress bar page loading for indicating page loading */}
      <Toaster />
      <section className="flex flex-col lg w-full lg:w-1/2 bg-white dark:bg-slate-900  p-10 lg:p-20">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex flex-col w-full items-center">
            <img src={logo_text} alt="logo_text" width={200} height={120} />
            <div className="flex flex-col lg:flex-row w-full mt-6 mb-2 justify-center">
              <CompanyFooterLink
                companyText="Desenvolvido por PS Code. Acesse nosso site "
                companyLink="https://www.pablosilvadev.com.br"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col w-full lg:w-1/2 bg-gradient-to-t from-secondary-light to-secondary-dark p-10 md:p-20">
        <div className="flex flex-col m-auto">
          <Title
            content="Gerencie seu negócio de maneira simples e otimizada"
            className="text-white mb-6 text-xl lg:text-3xl max-w-xs lg:max-w-lg font-bold"
          />
          <img src={dashboard_background} alt="logo_text" width={800} />
        </div>
      </section>
    </div>
  );
};
