import { Link } from "react-router-dom";

interface CompanyFooterLinkProps {
  companyLink: string;
  companyText: string;
}

export function CompanyFooterLink({
  companyLink,
  companyText,
}: CompanyFooterLinkProps) {
  return (
    <span className="text-black dark:text-white font-regular text-[11px] md:text-[12px] max-w-[200px] sm:max-w-[400px] m-auto text-center ">
      {companyText}
      <Link
        className="text-blue-600 text-[11px] md:text-[12px]"
        to={companyLink}
        target="_blank"
      >
        clicando aqui
      </Link>
      .
    </span>
  );
}
