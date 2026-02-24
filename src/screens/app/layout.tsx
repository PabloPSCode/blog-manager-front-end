import logo_text from "@/assets/logo_text.svg";
import { CompanyFooterLink } from "@/components/miscellaneous/CompanyFooterLink";
import { Subtitle } from "@/components/typography/Subtitle";
import { Title } from "@/components/typography/Title";
import { menuItems } from "@/data/mocked";
import { useAuthenticationStore } from "@/store/auth";
import { useThemeStore } from "@/store/theme";
import {
  reactMobileMenuModalCustomStyles,
  reactModalCustomStyles,
  reactModalCustomStylesDark,
} from "@/styles/react-modal";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Breadcrumbs,
  Button,
  ListItem,
} from "@material-tailwind/react";
import FeatherIcon from "feather-icons-react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  MdClose,
  MdDarkMode,
  MdLightMode,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface LoadingBarProps {
  staticStart: () => void;
  complete: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}: DashboardLayoutProps) => {
  const [pathSegments, setPathSegments] = useState({ base: "", action: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const segments = window.location.pathname.split("/");
      setPathSegments({
        base: segments[1] || "",
        action: segments[2] || "",
      });
    }
  }, []);

  const { base, action } = pathSegments;

  const [openedAccordionIndexes, setOpenedAccordionIndexes] = useState<
    number[]
  >([]);

  const [breadCrumbBase, setBreadCrumbBase] = useState(base);
  const [breadCrumbAction, setBreadCrumbAction] = useState(action);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuModalOpen, setIsMobileMenuModalOpen] = useState(false);

  const { signOut } = useAuthenticationStore();

  const { theme, toggleTheme } = useThemeStore();

  const navigate = useNavigate();

  const ref = useRef<LoadingBarProps>(null);

  const handleOpenedAccordionIndexes = (idx: number) => {
    const filteredAccordionIndexes = openedAccordionIndexes.filter(
      (index) => index !== idx
    );

    if (openedAccordionIndexes.includes(idx)) {
      setOpenedAccordionIndexes(filteredAccordionIndexes);
    } else {
      setOpenedAccordionIndexes([...openedAccordionIndexes, idx]);
    }
  };

  const updateBreadcrumbs = useCallback(() => {
    if (typeof window !== "undefined") {
      const segments = window.location.pathname.split("/");
      setBreadCrumbBase(segments[1] || "");
      setBreadCrumbAction(segments[2] || "");
    }
  }, []);

  const handleToggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const handleToggleMobileMenuModal = () => {
    setIsMobileMenuModalOpen(!isMobileMenuModalOpen);
  };

  useEffect(() => {
    window.addEventListener("popstate", updateBreadcrumbs);

    const pushState = window.history.pushState;
    const replaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      pushState.apply(window.history, args);
      updateBreadcrumbs();
    };

    window.history.replaceState = function (...args) {
      replaceState.apply(window.history, args);
      updateBreadcrumbs();
    };

    return () => {
      window.removeEventListener("popstate", updateBreadcrumbs);
    };
  }, [updateBreadcrumbs]);

  const handleSignOut = () => {
    navigate("/");
    signOut();
  };

  useEffect(() => {
    setIsMobileMenuModalOpen(false);
  }, [breadCrumbBase, breadCrumbAction]);

  useEffect(() => {
    if (ref.current) {
      ref.current.staticStart();
      ref.current.complete();
    }
  }, [window.location.pathname]);

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <LoadingBar ref={ref as never} height={4} color="#0267FF" />
      <Toaster />
      <div className="flex flex-row w-full min-h-screen">
        <nav className="hidden xl:flex flex-col w-[320px] min-h-screen overflow-auto p-8 bg-white dark:bg-slate-900 items-start">
          <Link to="/dashboard">
            <img
              src={logo_text}
              alt="logo-text"
              width={240}
              height={120}
              className="mb-8"
            />
          </Link>
          {menuItems.map((item, idx) => (
            <Accordion
              className="flex flex-col"
              open={openedAccordionIndexes.includes(idx)}
              key={item.title}
            >
              <AccordionHeader
                className="flex  justify-start border-none mb-[-12px]"
                onClick={() => handleOpenedAccordionIndexes(idx)}
              >
                <ListItem
                  className={`text-[12px] lg:text-[14px] text-black dark:text-white hover:text-slate-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-800 focus:text-slate-800 dark:focus:text-gray-200 focus:bg-gray-200 dark:focus:bg-slate-800 font-secondary`}
                >
                  <FeatherIcon
                    icon={item.icon}
                    size={24}
                    className="text-black dark:text-white mr-2"
                    strokeWidth={1}
                  />
                  {item.title}
                </ListItem>
              </AccordionHeader>
              <AccordionBody className="flex flex-col py-0 px-4">
                {item.actions.map((action) => (
                  <Link
                    to={"/dashboard/" + action.link}
                    key={action.title}
                    className={`mb-1 p-0 text-[13px] font-bold text-black dark:text-white`}
                  >
                    <ListItem
                      className={`text-primary dark:text-primary-light font-light font-poppinshover:text-blue-700 hover:text-slate-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-800 focus:text-slate-800 dark:focus:text-gray-200 focus:bg-gray-200 dark:focus:bg-slate-800 font-secondary`}
                    >
                      {action.title}
                    </ListItem>
                  </Link>
                ))}
              </AccordionBody>
            </Accordion>
          ))}
        </nav>
        <div className="flex flex-1 flex-col justify-between pb-0 bg-gray-100 dark:bg-slate-800 h-screen w-full overflow-y-auto">
          <header
            className={
              !isMobileMenuModalOpen
                ? "w-full flex flex-row justify-between items-center border-bottom-2 lg:p-4 p-3 fixed bg-gray-50 dark:bg-slate-700 border-b-gray-200 dark:border-b-slate-600 border-b-2 z-50"
                : "w-full flex flex-row justify-between items-center border-bottom-2 mb-[400px] lg:p-4 p-3 fixed bg-gray-50 dark:bg-slate-700 border-b-gray-200 dark:border-b-slate-600 border-b-2"
            }
          >
            <div className="flex flex-row">
              <div className="hidden sm:flex">
                <Breadcrumbs className="mr-3 bg-gray-100 dark:bg-slate-800">
                  <Link to="/dashboard">
                    <span className="text-[11px] lx:text-sm hidden sm:flex dark:text-gray-100 text-slate-800">
                      {breadCrumbBase}
                    </span>
                  </Link>
                  <Link to={`/dashboard/${breadCrumbAction}`}>
                    <span className="opacity-60 text-[11px] lx:text-sm dark:text-gray-100 text-slate-800">
                      {breadCrumbAction}
                    </span>
                  </Link>
                </Breadcrumbs>
              </div>
              <div className="flex xl:hidden mx-auto">
                <button onClick={handleToggleMobileMenuModal}>
                  <MdMenu className="w-7 h-7 text-primary dark:text-primary-light ml-3" />
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center lg:mr-[320px] ml-8">
              <button onClick={toggleTheme}>
                {theme === "light" ? (
                  <MdDarkMode className="h-5 w-5  text-slate-800 dark:text-gray-100 mr-4 sm:mr-8" />
                ) : (
                  <MdLightMode className="h-5 w-5 text-slate-800 dark:text-gray-100 mr-4 sm:mr-8" />
                )}
              </button>
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                size="sm"
              />
              <button
                className="flex flex-row justify-between items-center p-2 ml-3"
                onClick={handleToggleLogoutModal}
              >
                <span className="text-[12px] lx:text-sm normal-case text-secondary-dark dark:text-secondary-light">
                  Sair
                </span>
                <MdLogout className="w-5 h-5 ml-1 text-secondary-dark dark:text-secondary-light" />
              </button>
            </div>
          </header>
          <div className="mt-[96px]">{children}</div>
          <footer className="flex bg-gray-100 dark:bg-slate-800 items-center justify-center md:p-8 px-2 my-8 mx-auto">
            <CompanyFooterLink
              companyText="Desenvolvido por PS Code. Acesse nosso site "
              companyLink="https://www.pablosilvadev.com.br"
            />
          </footer>
        </div>
      </div>
      <Modal
        isOpen={isLogoutModalOpen}
        style={
          theme === "light"
            ? reactModalCustomStyles
            : reactModalCustomStylesDark
        }
        onRequestClose={handleToggleLogoutModal as never}
      >
        <Title
          content="Você está deixando a plataforma"
          className="text-center text-black dark:text-white mb-4 font-bold text-[14px] md:text-[16px]"
        />
        <Subtitle
          content="Deseja realmente sair da plataforma?"
          className="text-center text-gray-700 dark:text-gray-100 mb-6  text-[13px] md:text-[14px]"
        />
        <div className="flex flex-col md:flex-row items-center justify-around w-full md:w-[480px]">
          <button
            onClick={handleToggleLogoutModal}
            className="text-black dark:text-white bg-gray-200 dark:bg-slate-700 px-4 py-2 rounded-lg text-sm w-[188px]"
          >
            Continuar na plataforma
          </button>
          <button
            onClick={handleSignOut}
            className="text-white text-sm bg-red-500 px-4 py-2 rounded-lg w-[188px] mt-4 md:mt-0"
          >
            Sair da plataforma
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isMobileMenuModalOpen}
        style={reactMobileMenuModalCustomStyles}
        onRequestClose={handleToggleMobileMenuModal as never}
      >
        <nav className="flex flex-col w-full h-screen overflow-auto p-4 bg-white dark:bg-slate-900 items-start overflow-x-hidden ">
          <div className="w-full flex flew-row justify-end mr-4 mb-[-16px] mt-1">
            <Button
              className="p-1 bg-transparent"
              onClick={handleToggleMobileMenuModal}
            >
              <MdClose className="w-5 h-5 text-black dark:text-white" />
            </Button>
          </div>
          <Link to="/dashboard">
            <img
              src={logo_text}
              alt="logo-text"
              width={240}
              height={120}
              className="mb-4 mt-8"
            />
          </Link>
          {menuItems.map((item, idx) => (
            <Accordion
              className="flex flex-col"
              open={openedAccordionIndexes.includes(idx)}
              key={item.title}
            >
              <AccordionHeader
                className="flex  justify-start border-none mb-[-12px]"
                onClick={() => handleOpenedAccordionIndexes(idx)}
              >
                <ListItem
                  className={`text-[12px] lg:text-[14px] text-black dark:text-white hover:text-slate-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-800 focus:text-slate-800 dark:focus:text-gray-200 focus:bg-gray-200 dark:focus:bg-slate-800`}
                >
                  <FeatherIcon
                    icon={item.icon}
                    size={24}
                    className="text-black dark:text-white mr-2"
                    strokeWidth={1}
                  />
                  {item.title}
                </ListItem>
              </AccordionHeader>
              <AccordionBody className="flex flex-col py-0 px-4">
                {item.actions.map((action) => (
                  <Link
                    to={"/dashboard/" + action.link}
                    key={action.title}
                    className={` mb-1 p-0 text-[12px] font-bold`}
                  >
                    <ListItem
                      className={`  text-primary dark:text-primary-light font-regular font-poppinshover:text-blue-700 hover:text-slate-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-800 focus:text-slate-800 dark:focus:text-gray-200 focus:bg-gray-200 dark:focus:bg-slate-800`}
                    >
                      {action.title}
                    </ListItem>
                  </Link>
                ))}
              </AccordionBody>
            </Accordion>
          ))}
        </nav>
      </Modal>
    </section>
  );
};
