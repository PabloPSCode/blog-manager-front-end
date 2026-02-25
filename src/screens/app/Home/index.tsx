import { authors, posts } from "@/data/mocked";
import { FiLink2, FiWifi } from "react-icons/fi";
import { HiMiniDocumentText, HiUsers } from "react-icons/hi2";
import { MdLanguage } from "react-icons/md";

export function Home() {
  const siteInfo = {
    domain: "meu-estabelecimento.mostraloja.com.br",
    sharingLink: "https://www.meu-estabelecimento.mostraloja.com.br",
    onlineSince: "12 de Janeiro de 2026",
  };

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col w-full mx-auto xl:pr-8">
        <div className="my-4 ml-4">
          <h1 className="text-black dark:text-white text-2xl font-bold font-primary">
            Início
          </h1>
        </div>

        <section className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 px-4 mb-4">
          <div className="rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-8 min-h-[220px] flex flex-col items-center justify-center">
            <span className="text-gray-700 dark:text-gray-100 text-5xl font-bold leading-none">
              {posts.length}
            </span>
            <span className="text-gray-700 dark:text-gray-300 text-[20px] mt-2 font-medium">
              Posts cadastrados
            </span>
            <HiMiniDocumentText className="w-14 h-14 text-black dark:text-gray-100 mt-5" />
          </div>

          <div className="rounded-2xl border-4 border-primary bg-white dark:bg-slate-900 shadow-sm p-8 min-h-[220px] flex flex-col items-center justify-center">
            <span className="text-gray-700 dark:text-gray-100 text-5xl font-bold leading-none">
              {authors.length}
            </span>
            <span className="text-gray-700 dark:text-gray-300 text-[20px] mt-2 font-medium">
              Autores cadastrados
            </span>
            <HiUsers className="w-14 h-14 text-black dark:text-gray-100 mt-5" />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-8 py-10 mx-4 mb-6">
          <div className="flex items-center mb-8">
            <MdLanguage className="w-7 h-7 text-primary-dark mr-3" />
            <h2 className="text-black dark:text-white text-lg font-bold">
              Informações do site
            </h2>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center min-w-[240px]">
                <MdLanguage className="w-6 h-6 text-primary-dark mr-3" />
                <span className="text-black dark:text-white font-bold text-lg md:md:text-lg">
                  Domínio:
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-lg md:text-lg mt-1 md:mt-0 -ml-1">
                {siteInfo.domain}
              </span>
            </div>


            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center min-w-[240px]">
                <FiWifi className="w-6 h-6 text-primary-dark mr-3" />
                <span className="text-black dark:text-white font-bold text-lg md:md:text-lg">
                  Está online desde:
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-lg md:text-lg mt-1 md:mt-0 ml-4">
                {siteInfo.onlineSince}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
