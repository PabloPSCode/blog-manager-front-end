import { IAuthor, IPost } from "@/dtos";
import { authorsService } from "@/services/authors.service";
import { postsService } from "@/services/posts.service";
import { useAuthenticationStore } from "@/store/auth";
import { formatDate } from "@/utils/date";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FiWifi } from "react-icons/fi";
import { HiMiniDocumentText, HiUsers } from "react-icons/hi2";
import { FaLink } from 'react-icons/fa6'
import { MdLanguage } from "react-icons/md";
import { Link } from "react-router-dom";

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const site = useAuthenticationStore((state) => state.site);

  const siteInfo = useMemo(
    () => ({
      domain: site?.domain ?? "",
      sharingLink: site?.url ?? "",
      onlineSince: formatDate(site?.createdAt),
    }),
    [site],
  );

  const dashboardCards = [
    {
      title: "Posts cadastrados",
      total: posts.length,
      icon: HiMiniDocumentText,
      to: "/dashboard/gerenciar-posts",
    },
    {
      title: "Autores cadastrados",
      total: authors.length,
      icon: HiUsers,
      to: "/dashboard/gerenciar-autores",
    },
  ];

  const getAuthors = useCallback(async () => {
    try {
      const response = await authorsService.list();
      if (response && response.length > 0) {
        setAuthors(response as IAuthor[]);
      }
      return response;
    } catch (error) {
      console.error("Erro ao carregar os autores:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  const getPosts = useCallback(async () => {
    try {
      const response = await postsService.list();
      if (response && response.length > 0) {
        setPosts(response as IPost[]);
      }
      return response;
    } catch (error) {
      console.error("Erro ao carregar os posts:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <main className="flex flex-1 flex-col w-[90%] lg:w-full mx-auto lg:pl-8 bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col w-full mx-auto xl:pr-8">
        <div className="my-4 ml-4">
          <h1 className="text-black dark:text-white text-2xl font-bold font-primary">
            Início
          </h1>
        </div>

        <section className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 px-4 mb-4">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.to}
                className="rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-8 min-h-[220px] flex flex-col items-center justify-center transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-light"
              >
                <span className="text-gray-700 dark:text-gray-100 text-5xl font-bold leading-none">
                  {card.total}
                </span>
                <span className="text-gray-700 dark:text-gray-300 text-[20px] mt-2 font-medium">
                  {card.title}
                </span>
                <Icon className="w-14 h-14 text-black dark:text-gray-100 mt-5" />
              </Link>
            );
          })}
        </section>

        <section className="rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-8 py-10 mx-4 mb-6">
          <div className="flex items-center mb-8">
            <h2 className="text-black dark:text-white text-lg font-bold">
              Informações do site
            </h2>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <MdLanguage className="w-6 h-6 text-primary-light mr-3" />
                <span className="text-black dark:text-white font-bold text-lg md:md:text-lg">
                  Domínio:
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-lg md:text-lg mt-1 md:mt-0 ml-2">
                {siteInfo.domain || "Nao disponivel"}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <FaLink className="w-6 h-6 text-primary-light mr-3" />
                <span className="text-black dark:text-white font-bold text-lg md:md:text-lg">
                  URL do site:
                </span>
              </div>
              <a
                href={siteInfo.sharingLink || undefined}
                target="_blank"
                rel="noreferrer"
                className="text-primary dark:text-primary-light text-lg md:text-lg mt-1 md:mt-0 ml-2 break-all hover:underline"
              >
                {siteInfo.sharingLink || "Nao disponivel"}
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <FiWifi className="w-6 h-6 text-primary-light mr-3" />
                <span className="text-black dark:text-white font-bold text-lg md:md:text-lg">
                  Está online desde:
                </span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-lg md:text-lg mt-1 md:mt-0 ml-2">
                {siteInfo.onlineSince || "Nao disponivel"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
